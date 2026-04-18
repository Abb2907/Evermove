/**
 * Simulates fetching continuous telemetry from HealthKit/Google Fit APIs.
 */
class WearableSim {
  /**
   * Mock fetching data for a user.
   * We will generate a "Stressed" profile for user_101
   * and an "Optimal" profile for user_102.
   */
  async getMorningTelemetry(userId) {
    if (userId === "user_101") {
      return {
        sleepEfficiency: 55, // 55%, poor sleep
        currentHRV: 45,      // Low HRV indicating stress/lack of recovery
        restingHR: 68        // Elevated
      };
    } else if (userId === "user_102") {
      return {
        sleepEfficiency: 85, // 85%, great sleep
        currentHRV: 65,      // Optimal HRV
        restingHR: 52        // Low, athletic
      };
    } else {
      // Default / Random average state for user_103 or unknown
      return {
        sleepEfficiency: 70,
        currentHRV: 55,
        restingHR: 60
      };
    }
  }
}

module.exports = new WearableSim();
