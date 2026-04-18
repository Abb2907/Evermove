/**
 * Mock Database mapping user profiles, their emotional anchors, 
 * and their scheduled workout for today.
 */
const users = {
  "user_101": {
    userId: "user_101",
    name: "Alex",
    motivationAnchor: "Having energy to play with my kids this weekend",
    scheduledWorkout: { label: "60-minute HIIT Session", duration: 60 }
  },
  "user_102": {
    userId: "user_102",
    name: "Sam",
    motivationAnchor: "Building raw strength and durability",
    scheduledWorkout: { label: "Barbell Deadlifts", duration: 45 }
  },
  "user_103": {
    userId: "user_103",
    name: "Jordan",
    motivationAnchor: "Staying agile for ultimate frisbee",
    scheduledWorkout: { label: "10k Trail Run", duration: 75 }
  }
};

module.exports = {
  getUser: (id) => users[id] || null
};
