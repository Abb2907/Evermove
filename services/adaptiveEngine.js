const wearableSim = require("./wearableSim");
const calendarSim = require("./calendarSim");
const database = require("../models/mockDatabase");

class AdaptiveEngineService {
  constructor() {
    this.thresholds = {
      optimalSleep: 75,
      maxMeetings: 4,
      baselineHRV: 60,
    };
  }

  // Orchestrator method called by the API
  async evaluateUserContext(userId) {
    const user = database.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // 1. Intake Layer: Fetch External Data
    const wearableData = await wearableSim.getMorningTelemetry(userId);
    const meetingsCount = await calendarSim.getDailyMeetingsCount(userId);

    const context = {
      sleepEfficiency: wearableData.sleepEfficiency,
      meetingsToday: meetingsCount,
      currentHRV: wearableData.currentHRV,
      scheduledWorkout: user.scheduledWorkout
    };

    // 2. Evaluation Layer
    const stressScore = this.evaluateContext(context);

    // 3. Routing Layer
    if (stressScore >= 3) {
      // High Stress - Trigger Micro-Adjustment
      return this.triggerMicroAdjustment(context.scheduledWorkout, context, user.motivationAnchor);
    } else {
      // Optimal
      return {
        status: "OPTIMAL",
        stressScore: `${stressScore}/5`,
        action: "PROCEED",
        workout: context.scheduledWorkout,
        nudgePayload: {
          title: "You are fully recovered. Crush this session today!",
          body: `Time for ${context.scheduledWorkout.label} (${context.scheduledWorkout.duration} mins).`,
          tone: "motivating"
        }
      };
    }
  }

  evaluateContext(context) {
    let stressScore = 0;
    if (context.sleepEfficiency < this.thresholds.optimalSleep) stressScore += 2;
    if (context.meetingsToday > this.thresholds.maxMeetings) stressScore += 1;
    if (context.currentHRV < this.thresholds.baselineHRV) stressScore += 2;
    return stressScore;
  }

  triggerMicroAdjustment(scheduled, context, motivationAnchor) {
    const fallbackWorkout = {
      label: "15-minute mobility flow and core",
      duration: 15
    };

    return {
      status: "STRESSED",
      stressScore: `High Stress Detected`, // Simplified
      action: "INTERCEPT",
      originalWorkout: scheduled,
      newWorkout: fallbackWorkout,
      nudgePayload: {
        title: "Don't Break The Chain",
        body: `Looks like a heavy day with ${context.meetingsToday} meetings and poor sleep. We swapped your ${scheduled.label} for ${fallbackWorkout.label}. Remember the goal: ${motivationAnchor}. 15 mins gets you closer.`,
        tone: "empathetic_psychological"
      }
    };
  }
}

module.exports = new AdaptiveEngineService();
