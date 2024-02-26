// Constants
const roundTime = 8000;

// Variables
let nClicks = 0;
let nHits = 0;

// Functions
// Game functions
function rp() {
	return Math.ceil(5 + Math.random() * 90) + "%";
}
function boardHit() {
	++nClicks;
}
function targetHit() {
	++nHits;
	$("#target").attr("cx", rp());
	$("#target").attr("cy", rp());
}

// Round functions
async function posRound() {
	$("#clicksDiv>.scValue").html(nClicks);
	$("#hitsDiv>.scValue").html(nHits);
	setTimeout(() => $("#menu").css("pointer-events", "all"), 800);
	postScores(userName, nClicks, nHits);
}

function playRound() {
	nClicks = 0;
	nHits = 0;

	$("#target").attr("cx", "50%");
	$("#target").attr("cy", "50%");

	$("#menu")
		.css("pointer-events", "none")
		.fadeOut(0)
		.delay(roundTime)
		.fadeIn(0);
	$("#game").fadeIn(0).delay(roundTime).fadeOut(0, posRound);
}

//UI functions
function showScreen(name) {
	$(".screen").hide();
	$("#" + name).show();
}

// Fill functions
function makeScore(obj, index) {
	return `
<tr>
<td>${index + 1}</td>
<td>${obj.name}</td>
<td>${obj.hits}</td>
<td>${obj.clicks}</td>
</tr>
`;
}
function fillScores(list) {
	$("#rankList").empty();
	list.forEach((el, i) => $("#rankList").append(makeScore(el, i)));
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
showScreen("menu");

