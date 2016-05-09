

socket.on('playerData', function(data) {

	console.log(data);

	var championMasteries = data["ChampionMasteries"];
	console.log(championMasteries[championMasteries.length-1]);
	console.log(championMasteries[championMasteries.length-1][2]);
	console.log(championMasteries[championMasteries.length-2][2]);
	console.log(championMasteries[championMasteries.length-3][2]);

    $($(".p2_championFace")[0]).css("background", "url('assets/champions/"+ championMasteries[championMasteries.length-2][2] +"_Square_0.png')");
    $($(".p2_championFace")[1]).css("background", "url('assets/champions/"+ championMasteries[championMasteries.length-1][2] +"_Square_0.png') repeat scroll 0 0 / cover");
    $($(".p2_championFace")[2]).css("background", "url('assets/champions/"+ championMasteries[championMasteries.length-3][2] +"_Square_0.png')");
    $(".p2_championBorder:nth-child(1)").css("background", "url('assets/mastery"+ championMasteries[championMasteries.length-1][3] +".png')");
    $(".p2_championBorder:nth-child(2)").css("background", "url('assets/mastery"+ championMasteries[championMasteries.length-2][3] +".png')");
    $(".p2_championBorder:nth-child(3)").css("background", "url('assets/mastery"+ championMasteries[championMasteries.length-3][3] +".png')");

    $($(".p2_championPoints")[0]).html(championMasteries[championMasteries.length-2][4]);
    $($(".p2_championPoints")[1]).html(championMasteries[championMasteries.length-1][4]);
    $($(".p2_championPoints")[2]).html(championMasteries[championMasteries.length-3][4]);

    
});