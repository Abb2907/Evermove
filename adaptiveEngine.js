/**
 * EverMove - The Adaptive Engine Prototype
 * Focus: Contextual Intelligence & Micro-Adjustments 
 */

class AdaptiveEngine {
  constructor() {
    // Arbitrary baselines for demonstration
    this.thresholds = {
      optimalSleep: 75, // efficiency percentage
      maxMeetings: 4,   // calendar density
      baselineHRV: 60,  // ms (heart rate variability)
    };
  }

  // Simulates pulling data from Wearables and APIs (Data Intake Layer)
  fetchMorningContext(user) {
    console.log(`\n[Intake] Fetching contextual telemetry for ${user.name}...`);
    return {
      sleepEfficiency: user.sleepEfficiency,
      meetingsToday: user.meetingsToday,
      currentHRV: user.currentHRV,
      scheduledWorkout: user.scheduledWorkout
    };
  }

  // Evaluates user's capacity for the day
  evaluateContext(context) {
    let stressScore = 0; // Out of 5
    
    if (context.sleepEfficiency < this.thresholds.optimalSleep) stressScore += 2;
    if (context.meetingsToday > this.thresholds.maxMeetings) stressScore += 1;
    if (context.currentHRV < this.thresholds.baselineHRV) stressScore += 2;

    return stressScore;
  }

  // Core Goal Routing Logic
  processWorkout(user) {
    const context = this.fetchMorningContext(user);
    const stressScore = this.evaluateContext(context);
    
    console.log(`[Evaluation] Stress/Fatigue Score computed: ${stressScore}/5`);

    if (stressScore >= 3) {
      // High Stress / Fatigue -> Trigger Adaptive Micro-Action
      this.triggerMicroAdjustment(context.scheduledWorkout, context, user.motivationAnchor);
    } else {
      // Optimal Route -> Progressive Overload
      console.log(`✅ [Action] Capability is Optimal. Proceed with scheduled: ${context.scheduledWorkout.label} (${context.scheduledWorkout.duration} mins).`);
      console.log(`💬 Nudge: "You are fully recovered. Crush that ${context.scheduledWorkout.label} session today!"`);
    }
  }

  // The Motivation Framework & Safety Override in Action
  triggerMicroAdjustment(scheduled, context, motivationAnchor) {
    console.log(`⚠️ [Action] Capability Downgraded. Intercepting scheduled workout...`);
    
    const missedWorkout = scheduled.label;
    const fallbackWorkout = "15-minute mobility flow and stretching";
    
    console.log(`\n📲 --- PUSH NOTIFICATION SENDING ---`);
    console.log(`"Looks like a heavy day with ${context.meetingsToday} meetings and poor sleep. Your HRV dropped to ${context.currentHRV}."`);
    console.log(`"We are swapping your ${missedWorkout} for a ${fallbackWorkout}.`);
    console.log(`Remember the goal: ${motivationAnchor}. 15 mins gets you closer. Don't break the chain!"`);
    console.log(`------------------------------------\n`);
  }
}

// ==========================================
//                 SIMULATION
// ==========================================
const engine = new AdaptiveEngine();

console.log("=== EVERMOVE ENGINE BOOT SEQUENCE ===");

// Scenario 1: Slump/High Stress 
const userAlex = {
  name: "Alex",
  sleepEfficiency: 55, // Low
  meetingsToday: 6,    // High
  currentHRV: 45,      // Low
  scheduledWorkout: { label: "60-minute HIIT Session", duration: 60 },
  motivationAnchor: "Having energy to play with my kids this weekend"
};

// Scenario 2: Fully Recovered
const userSam = {
  name: "Sam",
  sleepEfficiency: 85, // Optimal
  meetingsToday: 2,    // Low
  currentHRV: 65,      // Optimal
  scheduledWorkout: { label: "Barbell Deadlifts", duration: 45 },
  motivationAnchor: "Building raw strength"
};

engine.processWorkout(userAlex);
engine.processWorkout(userSam);
