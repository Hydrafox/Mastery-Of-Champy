module.exports = function() {

	this.ChampionConvert = function(controller) {

		this.controller = controller;
		this.championsListFromID = require('./IDToChampion.json'); // {idChampion: 1: [nom: "Annie",  lane: "Support"]}
		this.championsListFromName = require('./ChampionToID.json'); // {nom: "Annie":  [idChampion: 1, lane: "Support"]}

		this.convertGrade = function(grade) {
			return {
				"D-" : 0,
				"D" : 1,
				"D+" : 2,
				"C-" : 3,
				"C" : 4,
				"C+" : 5,
				"B-" : 6,
				"B" : 7,
				"B+" : 8,
				"A-" : 9,
				"A" : 10,
				"A+" : 11,
				"S-" : 12,
				"S" : 13,
				"S+" : 14
			}[grade];
		}

		this.convertGradeReverse = function(grade) {
			return {
				 0: "D-",
				 1: "D",
				 2: "D+",
				 3: "C-",
				 4: "C",
				 5: "C+",
				 6: "B-",
				 7: "B",
				 8: "B+",
				 9: "A-",
				10: "A",
				11: "A+",
				12: "S-",
				13: "S",
				11: "S+"
			}[grade];
		}

		this.convertPointsLevel = function(points) {
			
			var convert = {				
				 0: 0,
				 1: 1,
				 2: 1800,
				 3: 6000,
				 4: 12600,
				 5: 21600
			};

			for(var i=0; i<6; i++)
				if(points < convert[i])
					return i-1;
			return 5;
		}

		this.formatPoints = function(points) {
			
			var unit = Math.floor(points/1000);
			var float = Math.round((points/1000-unit)*1000);
			return (unit>0?(unit+"."):"")+float+(unit>0?"K":"");
		}

		this.convertIDChampion = function(id) {
			return this.championsListFromID[id][0];
		}

		this.convertNameChampion = function(name) {
			return this.championsListFromName[name][0];
		}

		this.getLane = function(champion) { // champion = id || name
			return (/[1-9][0-9]*/.test(champion)) ? this.championsListFromID[champion][1] : this.championsListFromName[champion][1];			 
		}
	}
};