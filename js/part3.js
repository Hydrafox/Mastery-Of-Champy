socket.emit('getGraphData');

var gChampionMasteries;
var gPlayerData;
var gCursorGraphButtonSelected = "Bronze";
var gLimitGraph = 30;
var gPageGraph = 1;

var data = [];
for(var i=0; i<31; i++) data.push(1800);
var gDatasetLine2 = {type: 'line',label: 'Level 1',backgroundColor: "rgba(253,254,130,0.1)",data: data,borderColor: 'white',borderWidth: 2};
var data = [];
for(var i=0; i<31; i++) data.push(6000);
var gDatasetLine3 = {type: 'line',label: 'Level 2',backgroundColor: "rgba(251,200,130,0.1)",data: data,borderColor: 'white',borderWidth: 2};
var data = [];
for(var i=0; i<31; i++) data.push(12600);
var gDatasetLine4 = {type: 'line',label: 'Level 3',backgroundColor: "rgba(250,130,130,0.1)",data: data,borderColor: 'white',borderWidth: 2};
var data = [];
for(var i=0; i<31; i++) data.push(21600);
var gDatasetLine5 = {type: 'line',label: 'Level 4',backgroundColor: "rgba(250,40,40,0.1)",data: data,borderColor: 'white',borderWidth: 2};

socket.on('graphData', function(championMasteries) {

    gChampionMasteries = championMasteries;
    updateGraphData("Bronze", 1);
});

socket.on('playerData', function(data) {

	console.log(data);
    gPlayerData = data;

    changeGraphButton(gPlayerData.PlayerData.tier);
    updateGraphData();
});

$("#p3_buttons img").click(function() {
    var type = $(this).attr("type");

    changeGraphButton(type);
    updateGraphData();
});

function changeGraphButton(tier) {

    var array = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
    $($("#p3_buttons img")[array.indexOf(gCursorGraphButtonSelected)]).removeClass("p3_objectSelected");
    $($("#p3_buttons img")[array.indexOf(tier)]).addClass("p3_objectSelected");
    gCursorGraphButtonSelected = tier;
}

function updateGraphData() {

    var limit = gLimitGraph;
    var page = Math.min(Math.ceil(130/limit), gPageGraph);
    var tier = gCursorGraphButtonSelected;

    var limitName = 8;
    var dataTier = gChampionMasteries[tier];

    var data = [];
    var labels = [];
    for(var i=dataTier.length-1-(page-1)*limit; i>dataTier.length-1-page*limit; i--) {
        if(i>=0) {
            var name = dataTier[i][2].length > limitName ? dataTier[i][2].substr(0, limitName-1) : dataTier[i][2];
            labels.push(name);
            data.push(dataTier[i][1]);
        }
        else
            console.log("Page trop grande : " + (dataTier.length-1-(page-1)*limit)+" "+(dataTier.length-1-page*limit)+" "+i);
    }

    var convertTierToBackground = {"Bronze": "rgba(150,103,75,0.8)", 
                                   "Silver": "rgba(112,112,112,0.8)", 
                                   "Gold": "rgba(214,175,41,0.8)", 
                                   "Platinum": "rgba(97,158,128,0.8)", 
                                   "Diamond": "rgba(48,184,207,0.8)"};

    var dataset = {
        type: 'bar',
        label: tier,
        //backgroundColor: "rgba(151,187,205,0.5)",
        backgroundColor: convertTierToBackground[tier],
        data: data,//[dataBronze[dataBronze.length-1][1], dataBronze[dataBronze.length-2][1], dataBronze[dataBronze.length-3][1], dataBronze[dataBronze.length-4][1], dataBronze[dataBronze.length-5][1]],
        borderColor: 'blanchedalmond',
        borderWidth: 2
    };

    var datasetPlayer;
    if(typeof gPlayerData != "undefined") {
        var data = [];
        for(var i=0; i<limit; i++) {
            for(var j=0; j<gPlayerData["ChampionMasteries"].length ; j++) {

                if(gPlayerData["ChampionMasteries"][j][2] == labels[i]) {
                    console.log(gPlayerData["ChampionMasteries"][j][2]+" "+labels[i]+" "+gPlayerData["ChampionMasteries"][j]);
                    data.push(gPlayerData["ChampionMasteries"][j][1]);
                    j = gPlayerData["ChampionMasteries"].length;
                }
                else if(j == gPlayerData["ChampionMasteries"].length-1) {
                    data.push(0);
                }
            }
        }

        datasetPlayer = {
            type: 'bar',
            label: gPlayerData.PlayerData.name,
            //backgroundColor: "rgba(151,187,205,0.5)",
            backgroundColor: "rgba(255,235,205,0.8)",
            data: data,//[dataBronze[dataBronze.length-1][1], dataBronze[dataBronze.length-2][1], dataBronze[dataBronze.length-3][1], dataBronze[dataBronze.length-4][1], dataBronze[dataBronze.length-5][1]],
            borderColor: 'blanchedalmond',
            borderWidth: 2
        };
    }

    barChartData["labels"] = labels;
    barChartData["datasets"] = [dataset];
    if(typeof datasetPlayer != "undefined") barChartData["datasets"].push(datasetPlayer);
    barChartData["datasets"].push(gDatasetLine2, gDatasetLine3, gDatasetLine4, gDatasetLine5);
    myBar.update();
}

// Dropdown limit
$("#p3_listLimit li a").on('click', function () {

    var limit = $(this).text();
    gLimitGraph = limit;
    $("#p3_dropdownLimit_text").text($(this).text() + " ");
    updateGraphData();
});

// Dropdown page
$("#p3_listPage li a").on('click', function () {

    var page = $(this).text();
    gPageGraph = page;
    $("#p3_dropdownPage_text").text($(this).text() + " ");
    updateGraphData();
});