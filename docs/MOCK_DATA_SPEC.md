# School Dashboard — Mock Data and Source Packet Specification

## 1. Purpose

This document defines how the initial School Dashboard prototype represents
academic information using static/hardcoded data.

The V1 prototype does NOT ingest files dynamically.

However, its static data should simulate the information that a future
course-ingestion system would eventually produce from real student-provided
course materials.

For the initial prototype, "mock data" means:

> static application data representing a realistic academic situation

It does NOT require the academic information itself to be invented.

A sanitized snapshot of real course information may be used when appropriate.

The initial reference course is based on a real student workflow:

UC Davis  
PHY 009D  
Fall Quarter 2026

The source packet currently contains:

- course syllabus information,
- lecture schedule information,
- assignment/deadline information,
- an assigned course textbook,
- and later may include student lecture notes and other course materials.

The application should represent the result of interpreting those materials.

It should NOT implement the interpretation process itself during V1.

---

# 2. The Three-Layer Model

The mock data must preserve three conceptually different layers.

```text
SOURCE MATERIALS
        ↓
COURSE FACTS
        ↓
PERSONAL ACADEMIC PLAN