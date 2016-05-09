require('./ChampionConvert.js')();
require('./ChampionMastery.js')();
require('./ChampionStat.js')();
require('./PlayerData.js')();

module.exports = function() {

	this.Controller = function(socket) {

		this.socket = socket;
		this.championConvert = new ChampionConvert(this);
		this.championMastery = new ChampionMastery(this);
		this.championStat = new ChampionStat(this);
		this.playerData = new PlayerData(this, socket);

		this.player;

		this.getChampionConvert = function() {
			return this.championConvert;
		}

		this.getChampionMastery = function() {
			return this.championMastery;
		}

		this.getPlayerData = function(namePlayer, region) {

			var namePlayer = this.checkNamePlayer(namePlayer);
			var region = this.checkRegion(region);

			if(namePlayer !== false && region !== false) {
				this.playerData.getPlayerData(namePlayer, region);
			}
		}

		this.callback_getPlayerData = function(player) {

			this.player = player;
			var playerAverageLane = this.championStat.getAverageLane(player); // {tier: "Bronze" {"Top Lane": 4839.716}}
			var playerMasterySorted = this.championStat.getMasterySorted(player); // {tier: "Bronze" [idChampion: 1, masteryPoints: 4839.716, name: "Annie", masteryLevel: 5, pointsFormatted: 4.44K, lane: "Top Lane"]}

			//var allAverageLane = this.championStat.getAverageLane();
			var allMasterySorted = this.championStat.getMasterySorted();
/*
			console.log("player.playerName");
			console.log(player.name);
			console.log("player.playerRegion");
			console.log(player.region);
			console.log("player.playerID");
			console.log(player.id);
			console.log("player.playerTier");
			console.log(player.tier);
*/
			//console.log("player.playerMastery");
			//console.log(player.playerMastery);

			//console.log(this.championMastery.getPlayerMastery(player, "84"));
			var back = {};
			back["LanePerCent"] = playerAverageLane[player.tier];
			back["PlayerData"] = player;
			back["ChampionMasteries"] = playerMasterySorted[player.tier];
			back["AllChampionMasteries"] = allMasterySorted;
			socket.emit('playerData', back);
		}

		this.checkNamePlayer = function(namePlayer) {
			var name = namePlayer.replace(/ö/g, "o");
			var name = name.replace(/é/g, "e");
			var name = name.replace(/è/g, "e");
			var name = name.replace(/ê/g, "e");
			var name = name.replace(/ï/g, "i");
			var name = name.replace(/à/g, "a");
			
			if(/^[0-9a-zA-Z]*$/.test(name)) 
				return name;
			return false;
		}

		this.checkRegion = function(region) {
			listRegion = ["EUW", "EUNE", "BR", "JR", "KR", "LAN", "LAS", "NA", "OCE", "RU", "TR"];
			if(this.in_array(region, listRegion))
				return region;
			
			socket.emit('log', "Region incorrect");
			return false;
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