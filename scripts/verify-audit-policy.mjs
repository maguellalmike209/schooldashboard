import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { npmAudit } from "audit-ci";

// Feed audit-ci a synthetic npm audit response. This tests the configured gate
// without adding a vulnerable package to the project or contacting the registry.
const config = JSON.parse(readFileSync(new URL("../audit-ci.jsonc", import.meta.url), "utf8"));
assert.equal(config.moderate, true);
assert.notEqual(config["skip-dev"], true);
assert.equal(config.allowlist.length, 1);
const approvedPath = "GHSA-vfj7-8cjw-p6xm|eslint-config-next>@next/eslint-plugin-next>fast-glob>micromatch>braces";
assert.deepEqual(Object.keys(config.allowlist[0]), [approvedPath]);
assert.equal(config.allowlist[0][approvedPath].active, true);
assert.equal(config.allowlist[0][approvedPath].expiry, "2026-11-06T00:00:00-08:00");

const fixtureDirectory = mkdtempSync(join(tmpdir(), "schooldashboard-audit-policy-"));
const originalPath = process.env.PATH;
try {
  const fixture = {
    auditReportVersion: 2,
    vulnerabilities: {
      "synthetic-audit-fixture": {
        name: "synthetic-audit-fixture",
        severity: "moderate",
        isDirect: true,
        via: [{
          source: 1,
          name: "synthetic-audit-fixture",
          dependency: "synthetic-audit-fixture",
          title: "Synthetic moderate finding for audit policy verification",
          url: "https://github.com/advisories/GHSA-aaaa-bbbb-cccc",
          severity: "moderate",
          range: "*",
        }],
        effects: [],
        range: "*",
        nodes: ["node_modules/synthetic-audit-fixture"],
        fixAvailable: false,
      },
    },
    metadata: {
      vulnerabilities: { info: 0, low: 0, moderate: 1, high: 0, critical: 0, total: 1 },
      dependencies: { prod: 0, dev: 1, optional: 0, peer: 0, peerOptional: 0, total: 1 },
    },
  };

  // Put a temporary npm shim first on PATH. audit-ci receives a real npm-audit
  // shaped response, but no package is installed and no registry is contacted.
  writeFileSync(join(fixtureDirectory, "npm.cmd"),
    "@echo off\r\nnode \"%~dp0fixture.cjs\"\r\n");
  writeFileSync(join(fixtureDirectory, "npm"),
    "#!/usr/bin/env node\nrequire('./fixture.cjs');\n", { mode: 0o755 });
  process.env.PATH = `${fixtureDirectory}${delimiter}${originalPath}`;

  for (const severity of ["moderate", "high", "critical"]) {
    fixture.vulnerabilities["synthetic-audit-fixture"].severity = severity;
    fixture.vulnerabilities["synthetic-audit-fixture"].via[0].severity = severity;
    fixture.metadata.vulnerabilities = {
      info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 1,
      [severity]: 1,
    };
    writeFileSync(join(fixtureDirectory, "fixture.cjs"),
      `process.stdout.write(${JSON.stringify(JSON.stringify(fixture))});\n`);
    await assert.rejects(
      npmAudit({
        ...config,
        directory: process.cwd(),
        "report-type": "summary",
      }),
      new RegExp(`Failed security audit due to ${severity} vulnerabilities`),
    );
    console.log(`Audit policy rejects an unrelated ${severity} advisory.`);
  }
} finally {
  process.env.PATH = originalPath;
  unlinkSync(join(fixtureDirectory, "fixture.cjs"));
  unlinkSync(join(fixtureDirectory, "npm.cmd"));
  unlinkSync(join(fixtureDirectory, "npm"));
  rmdirSync(fixtureDirectory);
}
