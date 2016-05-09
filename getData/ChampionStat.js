module.exports = function() {

	this.ChampionStat = function(controller) {

		this.controller = controller;
		this.championsMastery = require('./Bronze to Diamond jsonAverageMasteries.json'); // {tier: "Bronze" {idChampion: 1: [masteryLevel: 4839.716, masteryGrade: 3.443]}

		this.getAverageLane = function(player) {

			var playerMastery = {};
			if (typeof player != "undefined") 
				playerMastery[player["tier"]] = player["mastery"];
			else
				playerMastery = this.championsMastery;

			var totalPoints = {};
			var lanesPoints = {}; // {tier: "Bronze" {"Top Lane": 4839.716}}

			// Get points
			for(var tier in playerMastery) {

				totalPoints[tier] = 0;
				lanesPoints[tier] = {};

				for(var data in playerMastery[tier]) {

					var id = (typeof player == "undefined") ? data : playerMastery[tier][data]["championId"];
					var championPoints = (typeof player == "undefined") ? playerMastery[tier][data][0] : playerMastery[tier][data]["championPoints"];
					var lane = this.controller.getChampionConvert().getLane(id);

					totalPoints[tier] += championPoints;
					lanesPoints[tier][lane] = lanesPoints[tier].hasOwnProperty(lane) ? (lanesPoints[tier][lane] + championPoints) : championPoints;
				}
			}

			// Get average
			var lanesPointsAverage = {};
			for(var tier in lanesPoints) {

				var totalPercent = 0;
				var listLaneDecimal = {};
				lanesPointsAverage[tier] = {};
				for(var lane in lanesPoints[tier]) {

					var truePercent = (lanesPoints[tier][lane] / totalPoints[tier] * 100);
					var percent = Math.round(truePercent);
					listLaneDecimal[lane] = truePercent - percent;

					totalPercent += percent;
					lanesPointsAverage[tier][lane] = percent;
				}

				// Adjust the percent
				if(totalPercent != 100) {

					while(totalPercent > 100) {

						var biggestLaneName = "";
						var biggestLaneValue = 0;
						for(var lane in listLaneDecimal) {
							if(listLaneDecimal[lane] > biggestLaneValue) {
								biggestLaneName = lane;
								biggestLaneValue = listLaneDecimal[lane];
							}
						}
						if(biggestLaneName != "") {
							lanesPointsAverage[tier][biggestLaneName] --;
							delete listLaneDecimal[biggestLaneName];
						}
						totalPercent --;
					}

					while(totalPercent < 100) {

						var smallestLaneName = "";
						var smallestLaneValue = 0;
						for(var lane in listLaneDecimal) {
							if(listLaneDecimal[lane] < smallestLaneValue) {
								smallestLaneName = lane;
								smallestLaneValue = listLaneDecimal[lane];
							}
						}

						if(smallestLaneName != "") {
							lanesPointsAverage[tier][smallestLaneName] ++;
							delete listLaneDecimal[smallestLaneName];
						}
						totalPercent ++;
					}
				}
			}

			return lanesPointsAverage;
		}

		this.getMasterySorted = function(player) {
			
			var playerMastery = {};
			if (typeof player != "undefined") 
				playerMastery[player["tier"]] = player["mastery"];
			else
				playerMastery = this.championsMastery;

			var masteryShorted = {};
			for(var tier in playerMastery) {

				var masteryPointsShorted = [];
				for(var champion in playerMastery[tier]) {

					var id = (typeof player == "undefined") ? champion : playerMastery[tier][champion]["championId"];
					var championPoints = (typeof player == "undefined") ? playerMastery[tier][champion][0] : playerMastery[tier][champion]["championPoints"];
					masteryPointsShorted.push([id, Math.round(championPoints), this.controller.championConvert.convertIDChampion(id), this.controller.championConvert.convertPointsLevel(championPoints), this.controller.championConvert.formatPoints(championPoints), this.controller.getChampionConvert().getLane(id)]);

					// Sort
					masteryPointsShorted = masteryPointsShorted.sort(function(a,b) {
				      	return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
				    });
				}

				masteryShorted[tier] = masteryPointsShorted;
			}

			return masteryShorted;
		}
	}
};