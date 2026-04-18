/**
 * Simulates fetching daily calendar density from Google Calendar / Outlook APIs.
 */
class CalendarSim {
  /**
   * Mock checking a user's calendar for the day to evaluate cognitive load.
   */
  async getDailyMeetingsCount(userId) {
    if (userId === "user_101") {
      // Very dense day
      return 6; 
    } else if (userId === "user_102") {
      // Light day
      return 1; 
    } else {
      // Average day
      return 3;
    }
  }
}

module.exports = new CalendarSim();
