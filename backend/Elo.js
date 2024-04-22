function calculateElo(players, kFactor = 32) {
    // Sort players by placement based on their scores
    const sortedPlayers = Object.values(players).sort((a, b) => b.score - a.score);
  
    // Helper function to calculate the expected score
    const expectedScore = (player) => {
      let totalExpected = 0;
      for (const opponent of sortedPlayers) {
        if (player !== opponent) {
          totalExpected += 1 / (1 + 10 ** ((opponent.rank - player.rank) / 400));
        }
      }
      return totalExpected;
    };
  
    // Helper function to calculate the new rating 
    const newRating = (player, i) => {
      const numPlayers = sortedPlayers.length; 
      let actualOutcome = 0;
  
      // Dynamically assign wins based on number of players
      for (let j = i + 1; j < numPlayers; j++) { 
        actualOutcome++;
      }
  
      const expectedOutcome = expectedScore(player);
      const ratingChange = Math.round(kFactor * (actualOutcome - expectedOutcome));
  
      console.log("player name:", player.name, "player rank: ", player.rank, "rating change: ", ratingChange, "new rank: ", player.rank + ratingChange)
      return player.rank + ratingChange;
    };
  
    // Calculate the new ratings for each player
    const newRatings = sortedPlayers.map(newRating);
  
    // Update the players' ranks with the new ratings
    Object.keys(players).forEach((key, i) => {
      players[key].rank = newRatings[i];
    });

    return players;
  }

module.exports = { calculateElo };
