# EverMove

**Solving Consistency Drift through Contextual Intelligence.**

EverMove is a behavior-first fitness API designed to counter "consistency drift." Instead of relying on static calendars and numeric guilt (like traditional trackers), EverMove employs an **Adaptive Engine**. It automatically reads a user's contextual variables (e.g., sleep efficiency, HRV, calendar density) and conditionally downgrades or upgrades their daily scheduled workouts. This ensures the psychological *habit loop* never breaks, even on the hardest days.

## 🚀 Backend Infrastructure
This repository houses the Node.js / Express backend that drives EverMove's logical routing. 

### Key Components
- **Adaptive Engine (`services/adaptiveEngine.js`)**: The core logic layer. It intercepts a user's schedule, calculates a `stressScore`, and issues "Micro-Adjustments" or "Proceed" JSON payloads.
- **Wearable Simulator (`services/wearableSim.js`)**: Mocks data streams comparable to Apple HealthKit or Google Fit (Sleep %, HRV).
- **Calendar Simulator (`services/calendarSim.js`)**: Mocks fetching daily meetings to gauge cognitive load constraints.
- **Mock Database (`models/mockDatabase.js`)**: Stores user profiles, including their scheduled workouts and their deeply anchored emotional motivations.

---

## ⚡ Quick Start

### Installation
Ensure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
cd a:/Google_event_problem2
npm install
```

### Running the Server
```bash
node server.js
```
The server will start on `http://localhost:4000`.

---

## 📡 API Endpoints

### 1. Trigger Adaptive Nudge Evaluation
Forces the engine to ingest the morning telemetry for a user, cross-reference their schedule, and return the modified psychological nudge and workout plan.

**Request:**
```http
POST /api/engine/evaluate
Content-Type: application/json

{
  "userId": "user_101"
}
```

**Response (Context == Stressed):**
```json
{
    "success": true,
    "data": {
        "status": "STRESSED",
        "stressScore": "High Stress Detected",
        "action": "INTERCEPT",
        "originalWorkout": {
            "label": "60-minute HIIT Session",
            "duration": 60
        },
        "newWorkout": {
            "label": "15-minute mobility flow and core",
            "duration": 15
        },
        "nudgePayload": {
            "title": "Don't Break The Chain",
            "body": "Looks like a heavy day with 6 meetings and poor sleep...",
            "tone": "empathetic_psychological"
        }
    }
}
```

### 2. Fetch User Status
Retrieves a user's defined physical profile and motivational anchor.

**Request:**
```http
GET /api/engine/status/:userId
```

---

## 🧠 Core Philosophy
1. **Context-Aware Routing**: Modifies the *what* and the *how* based on your current biological and environmental capacity, not just a static calendar.
2. **Identity Momentum**: Treats a 5-minute fallback workout equivalent to a 60-minute one if it preserves the user's psychological habit streak during a slump.
3. **Behavioral Guardrails**: Prevents fitness tech from fueling obsessive/disordered loops by intelligently backing down targets.
