module.exports = function() {

	this.ChampionMastery = function(controller) {

		this.controller = controller;
		this.championsMastery = require('./Bronze to Diamond jsonAverageMasteries.json'); // {tier: "Bronze" {idChampion: 1: [masteryPoints: 4839.716, masteryGrade: 3.443]}

		this.getMastery = function(tier, champion) { // champion = id || name

			//var nameChampion = (/[1-9][0-9]*/.test(champion)) ? controller.getChampionConvert().convertIDChampion(champion) : champion;
			var idChampion = (/[1-9][0-9]*/.test(champion)) ? champion : this.controller.getChampionConvert().convertNameChampion(champion);

			return this.championsMastery[tier][idChampion]; // [masteryPoints: 4839.716, masteryGrade: 3.443]
		}

		this.getPlayerMastery = function(player, champion) { // champion = id || name

			var championData = player["mastery"][champion];

			if(typeof championData != "undefined") {
				var championPoints = championData["championPoints"];
				var highestGrade = this.controller.getChampionConvert().convertGrade(championData["highestGrade"]);

				return [championPoints, highestGrade]; // [masteryPoints: 4839.716, masteryGrade: 3.443]
			}
			else
				return "No mastery for this champion";
		}

		this.in_array = function(needle, haystack) {
		    for(var i in haystack) {
		        if(haystack[i] == needle) 
		        	return true;
		    }
		    return false;
		}
	}
};