
// Dropdown region
$("#p1_listRegion li a").on('click', function () {

    $("#p1_dropdownRegion_text").text($(this).text() + " ");
});

// On click "OK"
$("#p1_submit").on('click', function () {

	var pseudo = $("#p1_pseudo_input").val();
	var region = $("#p1_dropdownRegion_text").html();
	socket.emit('playerSelected', pseudo, region);
});
var pseudo = $("#p1_pseudo_input").val();
	var region = $("#p1_dropdownRegion_text").html();
	socket.emit('playerSelected', pseudo, region);

socket.on('playerData', function(data) {

	console.log(data);

    $("#p1_laneTop span").html(data["LanePerCent"]["Top Lane"] + "%");
    $("#p1_laneJungle span").html(data["LanePerCent"]["Jungler"] + "%");
    $("#p1_laneMid span").html(data["LanePerCent"]["Middle Lane"] + "%");
    $("#p1_laneAdc span").html(data["LanePerCent"]["AD Carry"] + "%");
    $("#p1_laneSupport span").html(data["LanePerCent"]["Support"] + "%");

    $("#p1_pseudoContainer_row").css("display", "none");
    $("#p1_pseudoContainer_row_display").css("display", "block");
    $("#p1_pseudo").html($("#p1_pseudo_input").val());

    var speed = 20;
    var increment = {"top": 0, "jungle": 0, "mid": 0, "adc": 0, "support": 0};
    setInterval(function(){ $("#p1_topIcon .p1_iconBorder").css("transform", "rotate("+(increment["top"]++)+"deg)") }, (100-data["LanePerCent"]["Top Lane"]*5) * 10/speed);
    setInterval(function(){ $("#p1_jungleIcon .p1_iconBorder").css("transform", "rotate("+(increment["jungle"]++)+"deg)") }, (100-data["LanePerCent"]["Jungler"]*5) * 10/speed);
    setInterval(function(){ $("#p1_midIcon .p1_iconBorder").css("transform", "rotate("+(increment["mid"]++)+"deg)") }, (100-data["LanePerCent"]["Middle Lane"]*5) * 10/speed);
    setInterval(function(){ $("#p1_adcIcon .p1_iconBorder").css("transform", "rotate("+(increment["adc"]++)+"deg)") }, (100-data["LanePerCent"]["AD Carry"]*5) * 10/speed);
    setInterval(function(){ $("#p1_supportIcon .p1_iconBorder").css("transform", "rotate("+(increment["support"]++)+"deg)") }, (100-data["LanePerCent"]["Support"]*5) * 10/speed);
});

// On click "pseudo"
$("#p1_pseudoContainer_row_display").on('click', function () {

    $("#p1_pseudoContainer_row_display").css("display", "none");
    $("#p1_pseudoContainer_row").css("display", "block");
});

// Select all elements with data-toggle="tooltips" in the document
$('[data-toggle="tooltip"]').tooltip(); 


