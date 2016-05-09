module.exports = function() {


	this.RequestAPI = function(socket, parameter) {

		this.request = require('request');
		this.socket = socket;

		this.setAPIValues = function(keyAPI) {
			this.keyAPI = keyAPI;
		}

		this.getIdChampion = function(nameChampionToStart, region, controller) {

			var url = "https://euw.api.pvp.net/api/lol/"+ region.toLowerCase() +"/v1.4/summoner/by-name/"+ nameChampionToStart +"?api_key="+ this.keyAPI;
			this.request(url, function (error, response, body) {
			  	if (!error && response.statusCode == 200) {
			  		var data = JSON.parse(body);
	    			var lowerCaseName = nameChampionToStart.toLowerCase().replace(/ /g,"");
			  		var id = data[lowerCaseName].id;	

					controller.callback_championIdFound({"id" : id});
			  	}
			  	else {
					controller.callback_championIdFound({"erreur" : response.statusCode});
			  	}
			});
		}

		this.getTierChampion = function(id, region, controller) {
			
			var url = "https://euw.api.pvp.net/api/lol/"+ region.toLowerCase() +"/v2.5/league/by-summoner/"+ id +"?api_key="+ this.keyAPI;
			this.request(url, function (error, response, body) {
			  	if (!error && response.statusCode == 200) {
			  		var data = JSON.parse(body);
			  		var tier = data[id][0]["tier"].toLowerCase();
			  		tier = tier.charAt(0).toUpperCase() + tier.slice(1);

					controller.callback_championTierFound({"tier" : tier});
			  	}
			  	else {
					controller.callback_championTierFound({"erreur" : response.statusCode});
			  	}
			});
		}

		this.getMastery = function(id, region, controller) {

			var url = "https://euw.api.pvp.net/championmastery/location/"+ this.convertRegion(region).toLowerCase() +"/player/"+ id +"/champions?api_key="+ this.keyAPI;
			this.request(url, function (error, response, body) {
			  	if (!error && response.statusCode == 200) {
			  		data = JSON.parse(body);	
					controller.callback_gatherPlayerMastery({"data" : data});
			  	}
			  	else {
					controller.callback_gatherPlayerMastery({"erreur" : response.statusCode});
			  	}
			});
		}

		this.convertRegion = function(region) {
			return {
				"BR" : "BR1",
				"EUNE" : "EUN1",
				"EUW" : "EUW1",
				"JP" : "JP1",
				"KR" : "KR",
				"LAN" : "LA1",
				"LAS" : "LA2",
				"NA" : "NA1",
				"OCE" : "OC1",
				"RU" : "RU",
				"TR" : "TR1"
			}[region];
		}
	}
};