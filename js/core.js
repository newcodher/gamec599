var f = new numberformat.Formatter({flavor:'short', format:'standard', sigfigs:'5'});
var d = new numberformat.Formatter({backend: 'decimal.js', flavor:'short', format:'standard'});

var player = jQuery.extend(true, {}, newPlayer);

var isActive = true;

window.onfocus = function(){isActive = true;};
window.onblur = function(){isActive=false;};

//Add money
function moneyAdd(money){
  player.money = player.money + money;
}

// FOR TABS
$( function() {
  $( "#tabs" ).tabs();
} );

// FOR BUTTONS
$( function() {
  $( ".widget input[type=submit], .widget a, .widget button" ).button();
  $( "button, input, a" ).click( function( event ) {
    event.preventDefault();
  } );
} );

// Templates
var statsTemplate = _.template($('#statsTemplate').html());
var inventoryTemplate = _.template($('#inventoryTemplate').html());
// WORKING ON IT var prestigeTemplate = _.template($('#prestigeTemplate').html());

// Updating Stats
function updateStats(){
    var newStats = statsTemplate({
      money:(f.format(player.money)), tick:player.tick/1000
    });
  $("#tabStats").html(newStats);
}
// Updating Inventory
function updateInventory(){
    var newInventory = inventoryTemplate({
      firstBuildingCost:(f.format(player.building[0].cost)), firstBuildingOwned:(player.building[0].owned), firstBuildingGain:(player.firstMoneyGain * player.building[0].owned)
    });
    $("#loadInventory").html(newInventory);

    // button can buy (lit) /shrug
    var buttonList = jQuery.makeArray($("#loadInventory .button"));

    if(true){
      for(var i = 0; i < buttonList.length; i++){
        if(player.money < player.building[i].cost){
          buttonList[i].className = "button";
        }
        else {
          buttonList[i].className = "buttonCanBuy";
        }
      }
    }
}
// Updating Everything
  function updateEverything(){
    updateStats();
    updateInventory();
    // updatePrestige();
  }

//function updatePrestige(){
//  var newPrestige = prestigeTemplate({
//      prestigeTest:("<b>WORK IN PROGRESS</b>")
//  });
//  $("#tabPrestige").html(newPrestige);
//}

//
function buyBuildings(i){
  if (player.building[i].cost <= player.money) {
    player.building[i].owned++;
    player.money = player.money - player.building[i].cost;
    player.building[i].cost = Math.floor(player.building[i].cost * Math.pow(player.building[i].multi , player.building[i].owned));
    updateStats();
    updateInventory();
  }
}
// Runs on startup

$(document).ready(function(){
  updateEverything();
  loadGame();
});
// Updates on time/tick

var Updates = function(){

  if(typeof Updates.intervalTracker == 'undefined'){
    Updates.intervalTracker = 0;
  }

  if(typeof Updates.before == 'undefined'){
		Updates.before = new Date();
  }

  var now = new Date();
  var elapsedTime = now.getTime() - Updates.before.getTime();

  Updates.intervalTracker += isActive ? 0 : elapsedTime;

  do{
    moneyAdd(player.firstMoneyGain * player.building[0].owned);
    updateEverything();

    if(!isActive) Updates.intervalTracker -= player.tick;

  }while(!isActive && Updates.intervalTracker > 0 && elapsedTime > player.tick );

	Updates.before = new Date();

  setTimeout(Updates,player.tick);
};

setTimeout(Updates,player.tick);
