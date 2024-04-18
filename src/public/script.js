/*
* I originally wrote this project with jQuery.
* When I wrote the backend in vanillaJs ( without express )
* I change the project name for TargetHit-vanillaJs.
*
* After renaming the project I was compelled to remove the jQuery dependency.
* That's the reason I created the PseudoJQuery and PseudoJQueryElement classes.
*
*/

// Instanciate pseudo jQuery
const $ = PseudoJQuery.init();

// Constants
const roundTime = 8000;

// Variables
let nClicks = 0;
let nHits = 0;

// Functions
// Game functions
function rp(){
	return Math.ceil(5 + Math.random()* 90) + "%";
}
function boardHit(){
	++nClicks;
}
function targetHit(){
	++nHits;
	$("#target").attr("cx", rp());
	$("#target").attr("cy", rp());
}

// Round functions
async function posRound(){
	$("#clicksDiv>.scValue").html(nClicks);
	$("#hitsDiv>.scValue").html(nHits);
	setTimeout(() => $("#menu").css("pointer-events", "all"), 800);
	postScores(userName, nClicks, nHits);
}

function playRound(){
	nClicks = 0;
	nHits = 0;

	$("#target").attr("cx", "50%");
	$("#target").attr("cy", "50%");

	$("#menu").css("pointer-events", "none").hide(0).delay(roundTime).show(0);
	$("#game").show(0).delay(roundTime).hide(0, posRound);
}

//UI functions
function showScreen(name){
	$(".screen").hide();
	$("#" + name).show();
}

// Fill functions
function makeScore(obj, index){
	return `
<tr>
	<td>${index + 1}</td>
	<td>${obj.name}</td>
	<td>${obj.hits}</td>
	<td>${obj.clicks}</td>
</tr>
`;
}

function fillScores(list){
	$("#rankList").html(list.map((el, i) => makeScore(el, i)).join(""));
}

// Liteners
// Adding listeners
$("#target").click(targetHit);
$("#board").click(boardHit);

$("#btnStart").click(playRound);

// Navigation buttons
$("#btnBack").click(() => showScreen("menu"));
$("#goBackRank").click(() => showScreen("menu"));
$("#btnLogin").click(() => showScreen("login"));
$("#btnRank").click(() => {
	getScores().then((all) => fillScores(all));
	showScreen("ranking");
});

// Run code
//showScreen("menu");
getScores().then((all) => fillScores(all));
showScreen("menu");
