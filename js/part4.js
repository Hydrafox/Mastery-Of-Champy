socket.on('playerData', function(data) {


    // Variables    
    var tier = data["PlayerData"]["tier"];
    var tierList = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Challenger"];
    var championsPlayer = data["ChampionMasteries"];

    // Calculs
    var bestLane = {"name": 0, "perCent": 0}; // AD Carry, 25
    for(var prop in data["LanePerCent"])
        bestLane = bestLane["perCent"] > data["LanePerCent"][prop] ? bestLane : {"name": prop, "perCent": data["LanePerCent"][prop]};

    var worstLane = {"name": 0, "perCent": 100};
    for(var prop in data["LanePerCent"])
        worstLane = worstLane["perCent"] < data["LanePerCent"][prop] ? worstLane : {"name": prop, "perCent": data["LanePerCent"][prop]};

    // Convert
    var laneConvert = {"AD Carry" : "Adc", "Jungler" : "Jungle", "Middle Lane" : "Mid", "Support" : "Support", "Top Lane" : "Top"};
    var tierID = {"Bronze" : 0, "Silver" : 1, "Gold" : 2, "Platinum" : 3, "Diamond" : 4, "Master" : 5, "Challenger" : 6};

    // Variables
    var championsNextTier = data["AllChampionMasteries"][tierList[Math.min(6, tierID[tier]+1)]];


    var threeBestTop = []
    for(var i=championsNextTier.length-1; i>=0; i--) {
        if(championsNextTier[i][5] == "Top Lane") {
            threeBestTop.push(championsNextTier[i]);
            if(threeBestTop.length == 3) 
                i = 0;
        }
    }


    var threeBestJungle = []
    for(var i=championsNextTier.length-1; i>=0; i--) {
        if(championsNextTier[i][5] == "Jungler") {
            threeBestJungle.push(championsNextTier[i]);
            if(threeBestJungle.length == 3) 
                i = 0;
        }
    }


    var threeBestMid = []
    for(var i=championsNextTier.length-1; i>=0; i--) {
        if(championsNextTier[i][5] == "Middle Lane") {
            threeBestMid.push(championsNextTier[i]);
            if(threeBestMid.length == 3) 
                i = 0;
        }
    }


    var threeBestAdc = []
    for(var i=championsNextTier.length-1; i>=0; i--) {
        if(championsNextTier[i][5] == "AD Carry") {
            threeBestAdc.push(championsNextTier[i]);
            if(threeBestAdc.length == 3) 
                i = 0;
        }
    }


    var threeBestSupport = []
    for(var i=championsNextTier.length-1; i>=0; i--) {
        if(championsNextTier[i][5] == "Support") {
            threeBestSupport.push(championsNextTier[i]);
            if(threeBestSupport.length == 3) 
                i = 0;
        }
    }

    var playerCompare = {};
    playerCompare["Top"] = {};
    playerCompare["Jungle"] = {};
    playerCompare["Mid"] = {};
    playerCompare["Adc"] = {};
    playerCompare["Support"] = {};
    var increment = 0;



    for(var i=championsPlayer.length-1; i>=0; i--) {
        for(var j=0; j<3; j++) {

            if(threeBestTop[j][0] == championsPlayer[i][0]) {
                playerCompare["Top"][threeBestTop[j][2]] = championsPlayer[i];
                increment++;
            }
            if(threeBestJungle[j][0] == championsPlayer[i][0]) {
                playerCompare["Jungle"][threeBestJungle[j][2]] = championsPlayer[i];
                increment++;
            }
            if(threeBestMid[j][0] == championsPlayer[i][0]) {
                playerCompare["Mid"][threeBestMid[j][2]] = championsPlayer[i];
                increment++;
            }
            if(threeBestAdc[j][0] == championsPlayer[i][0]) {
                playerCompare["Adc"][threeBestAdc[j][2]] = championsPlayer[i];
                increment++;
            }
            if(threeBestSupport[j][0] == championsPlayer[i][0]) {
                playerCompare["Support"][threeBestSupport[j][2]] = championsPlayer[i];
                increment++;
            }
            if(increment == 15) i = -1;
        }
    }

    var playerBest = {};
    playerBest["Top"] = [];
    playerBest["Jungle"] = [];
    playerBest["Mid"] = [];
    playerBest["Adc"] = [];
    playerBest["Support"] = [];
    var increment = 0;



    for(var i=championsPlayer.length-1; i>=0; i--) {

        if(playerBest["Top"].length < 3 && championsPlayer[i][5] == "Top Lane") {
            playerBest["Top"].push(championsPlayer[i]);
            increment++;
        }
        if(playerBest["Jungle"].length < 3 && championsPlayer[i][5] == "Jungler") {
            playerBest["Jungle"].push(championsPlayer[i]);
            increment++;
        }
        if(playerBest["Mid"].length < 3 && championsPlayer[i][5] == "Middle Lane") {
            playerBest["Mid"].push(championsPlayer[i]);
            increment++;
        }
        if(playerBest["Adc"].length < 3 && championsPlayer[i][5] == "AD Carry") {
            playerBest["Adc"].push(championsPlayer[i]);
            increment++;
        }
        if(playerBest["Support"].length < 3 && championsPlayer[i][5] == "Support") {
            playerBest["Support"].push(championsPlayer[i]);
            increment++;
        }
        if(increment == 15) i = -1;
    }


    // General
    var text1 = "Well, there are a lot of funny data, but you need to use and analyse them to improve your capacities.<br />Let's take the time to see who you are...<br /><br />";

    var text2 = "";
    if(bestLane["perCent"] < 30)
        text2 = "You like playing different lanes ?<br />It's a good choice because you have a lot of things to learn in each lanes.<br /><br />";
    else if(bestLane["perCent"] < 50) {
        text2 = "Have you a preference for playing " + laneConvert[bestLane["name"]] + " ?<br />";
    }
    else if(bestLane["perCent"]) {
        text2 = "How can you always playing " + laneConvert[bestLane["name"]] +" ?! ";
    }
    if(bestLane["perCent"] >= 30) {
        if(bestLane["name"] == "AD Carry" || bestLane["name"] == "Support")
        text2 += "I'm agree, the bot lane is a good lane to learn how important it is to playing safe of aggressive, and taking care of your teammate. " +
                 "But each lane have something to learn to you. Don't forget that.<br /><br />";
        else if(bestLane["name"] == "Top Lane" || bestLane["name"] == "Middle Lane")
        text2 += "If you want to carry your game and don't want to blame your teammate, then yes, "+ laneConvert[bestLane["name"]] +" is the lane you need to play. " +
                 "But don't forget that each lane have something to learn to you.<br /><br />";
        else
        text2 += "It's not an easy lane because everyone need your help and you need to keep concentrated during the game.<br /><br />";
    }

    var text3 = "What about the "+ laneConvert[worstLane["name"]] +"?<br />";

    if(worstLane["name"] == "AD Carry" || worstLane["name"] == "Support")
        text3 += "If you don't play enough in the bot lane, it will be hard for you to understand how important it is to have a good adc.<br /><br />";
        else if(worstLane["name"] == "Top Lane")
        text3 += "Your top laner will need to clean his wave before and be nice on his lane if you want his TP. Take your time to play on top sometimes, "+
                 "it's a very good lane to learn how to manage a trade.<br /><br />";
        else if(worstLane["name"] == "Middle Lane")
        text3 += "The mid lanner have a good control on the map. If he have a good start, he will be able to roam easily. If you take more time to play on mid, " +
                 "you will better understand the mid lanner roam capacity and how you can help him.<br /><br />";

    var text4 = "It's not easy to play every lane. Now we just have to choose 2 lanes to start a game but you can't just staying focus on these 2. "+
                "If you think you are "+ tierList[Math.min(6, tierID[tier]+1)] +" with your "+ laneConvert[bestLane["name"]] +", "+
                "you still can be "+ tierList[Math.max(0, tierID[tier]-1)]+ " on "+ laneConvert[worstLane["name"]] +". Don't forget that.";

    if(worstLane[1] < 10)
        text4 += "<br /><br />Now go change your lane choice, and come back to show me have smart you are !";


    // Top
    $("#p4_topTitle").html("Top - "+ playerBest["Top"][0][2] +" - "+ playerBest["Top"][0][4]);


    var textT1 = "";
    if(tierID["tier"] < 2) {

        if(topPercent < 10)
            textT1 = "I didn't want to play on top too when I was "+ tier +". But now, I only play that.<br />Why ? If you want to get out of the elo hell, you will need"+
                     "to know how to farm, trade, ward, etc.. and the top lane is very good for that.";        
    }

    var textT2 = "Currently, the 3 top champions the most played in "+ tierList[Math.min(6, tierID[tier]+1)] +" are "+ threeBestTop[0][2]+", "+ threeBestTop[1][2]+" and "+ threeBestTop[2][2] +"<br />";

    var nbGoodWith = 0;
    if(typeof playerCompare["Top"][threeBestTop[0][2]] != "undefined" && playerCompare["Top"][threeBestTop[0][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Top"][threeBestTop[1][2]] != "undefined" && playerCompare["Top"][threeBestTop[1][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Top"][threeBestTop[2][2]] != "undefined" && playerCompare["Top"][threeBestTop[2][2]][1] >= 12600) nbGoodWith++;

    var textT3 = "You are good with "+ nbGoodWith +" of them.<br />";

    //if(nbGoodWith < 3 && tierID[tier] < 6)
    //    textT3 += "It could be interesting to train them and try to reach the "+ tierList[tierID[tier]+1];


    // Jungle
    $("#p4_jungleTitle").html("Jungle - "+ playerBest["Jungle"][0][2] +" - "+ playerBest["Jungle"][0][4]);

    var textJ1 = "";
    var textJ2 = "Currently, the 3 jungle champions the most played in "+ tierList[Math.min(6, tierID[tier]+1)] +" are "+ threeBestJungle[0][2]+", "+ threeBestJungle[1][2]+" and "+ threeBestJungle[2][2] +"<br />";

    var nbGoodWith = 0;
    if(typeof playerCompare["Jungle"][threeBestJungle[0][2]] != "undefined" && playerCompare["Jungle"][threeBestJungle[0][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Jungle"][threeBestJungle[1][2]] != "undefined" && playerCompare["Jungle"][threeBestJungle[1][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Jungle"][threeBestJungle[2][2]] != "undefined" && playerCompare["Jungle"][threeBestJungle[2][2]][1] >= 12600) nbGoodWith++;

    var textJ3 = "You are good with "+ nbGoodWith +" of them.<br />";

    //if(nbGoodWith < 3 && tierID[tier] < 6)
    //    textJ3 += "It could be interesting to train them and try to reach the "+ tierList[tierID[tier]+1];
 


    // Mid
    $("#p4_midTitle").html("Mid - "+ playerBest["Mid"][0][2] +" - "+ playerBest["Mid"][0][4]);

    var textM1 = "";
    var textM2 = "Currently, the 3 mid champions the most played in "+ tierList[Math.min(6, tierID[tier]+1)] +" are "+ threeBestMid[0][2]+", "+ threeBestMid[1][2]+" and "+ threeBestMid[2][2] +"<br />";

    var nbGoodWith = 0;
    if(typeof playerCompare["Mid"][threeBestMid[0][2]] != "undefined" && playerCompare["Mid"][threeBestMid[0][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Mid"][threeBestMid[1][2]] != "undefined" && playerCompare["Mid"][threeBestMid[1][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Mid"][threeBestMid[2][2]] != "undefined" && playerCompare["Mid"][threeBestMid[2][2]][1] >= 12600) nbGoodWith++;

    var textM3 = "You are good with "+ nbGoodWith +" of them.<br />";

    //if(nbGoodWith < 3 && tierID[tier] < 6)
    //    textM3 += "It could be interesting to train them and try to reach the "+ tierList[tierID[tier]+1];



    // Adc
    $("#p4_adcTitle").html("Adc - "+ playerBest["Adc"][0][2] +" - "+ playerBest["Adc"][0][4]);

    var textA1 = "";
    var textA2 = "Currently, the 3 adc champions the most played in "+ tierList[Math.min(6, tierID[tier]+1)] +" are "+ threeBestAdc[0][2]+", "+ threeBestAdc[1][2]+" and "+ threeBestAdc[2][2] +"<br />";

    var nbGoodWith = 0;
    if(typeof playerCompare["Adc"][threeBestAdc[0][2]] != "undefined" && playerCompare["Adc"][threeBestAdc[0][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Adc"][threeBestAdc[1][2]] != "undefined" && playerCompare["Adc"][threeBestAdc[1][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Adc"][threeBestAdc[2][2]] != "undefined" && playerCompare["Adc"][threeBestAdc[2][2]][1] >= 12600) nbGoodWith++;

    var textA3 = "You are good with "+ nbGoodWith +" of them.<br />";

    //if(nbGoodWith < 3 && tierID[tier] < 6)
    //    textA3 += "It could be interesting to train them and try to reach the "+ tierList[tierID[tier]+1];



    // Support
    $("#p4_supportTitle").html("Support - "+ playerBest["Support"][0][2] +" - "+ playerBest["Support"][0][4]);

    var textS1 = "";
    var textS2 = "Currently, the 3 support champions the most played in "+ tierList[Math.min(6, tierID[tier]+1)] +" are "+ threeBestSupport[0][2]+", "+ threeBestSupport[1][2]+" and "+ threeBestSupport[2][2] +"<br />";

    var nbGoodWith = 0;
    if(typeof playerCompare["Support"][threeBestSupport[0][2]] != "undefined" && playerCompare["Support"][threeBestSupport[0][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Support"][threeBestSupport[1][2]] != "undefined" && playerCompare["Support"][threeBestSupport[1][2]][1] >= 12600) nbGoodWith++;
    if(typeof playerCompare["Support"][threeBestSupport[2][2]] != "undefined" && playerCompare["Support"][threeBestSupport[2][2]][1] >= 12600) nbGoodWith++;

    var textS3 = "You are good with "+ nbGoodWith +" of them.<br />";

    //if(nbGoodWith < 3 && tierID[tier] < 6)
    //    textS3 += "It could be interesting to train them and try to reach the "+ tierList[tierID[tier]+1];



    $("#p4_generalContent").html(text1+text2+text3+text4);
    $("#p4_topContent").html(textT1+textT2+textT3);
    $("#p4_jungleContent").html(textJ1+textJ2+textJ3);
    $("#p4_midContent").html(textM1+textM2+textM3);
    $("#p4_adcContent").html(textA1+textA2+textA3);
    $("#p4_supportContent").html(textS1+textS2+textS3);

    $('.carousel').carousel({
      interval: 10000
    })
});