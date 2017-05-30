// Saves Game
function saveGame(){
  localStorage.setItem("mainSave", JSON.stringify(player));

  var d = new Date();
   lastSaved =  d.toLocaleTimeString();
      $("#lastSaved").text('Last Saved: ' + lastSaved);
}

// Loads Game
function loadGame() {
	$.extend(true, player, JSON.parse(localStorage.getItem("mainSave")));
  updateEverything();
}

// Resets Game
function resetGame(){
  var confirmReset = confirm("You are about to reset do u want to do that");
  if (confirmReset === true){
    localStorage.removeItem("mainSave");
    location.reload();
  }
}

// Exports Game
function exportSave(){
  var exportText = btoa(JSON.stringify(player));

  $("#exportText").toggle();
  $("#exportText").val(exportText);
  $("#exportText").select();
}

// Imports Game
function importSave(){
  var importText = prompt("Copy and paste your save here! =}");

  if (importText){
	   $.extend(true, player, JSON.parse(atob(importText)));
     updateStats();
  }

}
// Saves game every 5 Minutes
setInterval(saveGame,300000);
// reads save button and calls save Game
$("#saveButton").mousedown(saveGame);
