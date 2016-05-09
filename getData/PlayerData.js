require('./RequestAPI.js')();
require('./Player.js')();

module.exports = function() {

	this.PlayerData = function(controller, socket) {

		this.keyAPI = "";

		this.controller = controller;
		this.socket = socket;

		this.player = new Player(this);
		this.requestAPI = new RequestAPI(this);
		this.requestAPI.setAPIValues(this.keyAPI);

		this.error = {};

		this.getPlayerData = function(namePlayer, region) {

			this.player.name = namePlayer;
			this.player.region = region;
			this.requestAPI.getIdChampion(namePlayer, region, this);
		}

		this.callback_championIdFound = function(id) {

			if(id.hasOwnProperty('id')) {

		  		// Gather this player tier
				this.player.id = id.id;
		  		this.requestAPI.getTierChampion(id.id, this.player.region, this);
		  		this.requestAPI.getMastery(id.id, this.player.region, this);
			}
			else if(id.hasOwnProperty('erreur')) {

				if(this.error.hasOwnProperty("id") && this.error["id"] >= 3) {
					socket.emit('log', "Champion not found");
				}
				else {
			  		this.error["id"] = this.error.hasOwnProperty("id") ? this.error["id"]++ : 1;
					this.requestAPI.getIdChampion(this.player.name, this.player.region, this);
				}
			}
		}

		this.callback_championTierFound = function(tier) {

			if(tier.hasOwnProperty('tier')) {

				this.player.tier = tier.tier;
				this.dataGathered();
			}
			else if(tier.hasOwnProperty('erreur')) {

				if(this.error.hasOwnProperty("tier") && this.error["tier"] >= 3) {
					socket.emit('log', "Champion not found");
				}
				else {
			  		this.error["tier"] = this.error.hasOwnProperty("tier") ? this.error["tier"]++ : 1;
					this.requestAPI.getTierChampion(this.player.id, this.player.region, this);
				}		  		
			}
		}

		this.callback_gatherPlayerMastery = function(data) {

			if(data.hasOwnProperty('data')) {

				this.player.mastery = data.data;
				this.dataGathered();
			}
			else if(data.hasOwnProperty('erreur')) {

				if(this.error.hasOwnProperty("mastery") && this.error["mastery"] >= 3) {
					socket.emit('log', "Champion not found");
				}
				else {
			  		this.error["mastery"] = this.error.hasOwnProperty("mastery") ? this.error["mastery"]++ : 1;
					this.requestAPI.getMastery(this.player.id, this.player.region, this);
				}	
			}
		}

		this.dataGathered = function() {

			if(typeof this.player.name != "undefined" && typeof this.player.region != "undefined" && typeof this.player.id != "undefined" 
			&& typeof this.player.tier != "undefined" && typeof this.player.mastery != "undefined") {

				this.controller.callback_getPlayerData(this.player);
			}
		}
	}
};
