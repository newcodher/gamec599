var f = new numberformat.Formatter({flavor:'short', format:'standard', sigfigs:'5'});
var d = new Date();

var player = jQuery.extend(true, {}, newPlayer);


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
// WORKING ON IT var prestigeTemplate = _.template($('#prestigeTemplate').html());

// Updating Stats
function updateStats(){
    var newStats = statsTemplate({
      statsTest:("great u did it dad thanks ")
    });
  $("#tabStats").html(newStats);
}

//function updatePrestige(){
//  var newPrestige = prestigeTemplate({
//      prestigeTest:("<b>WORK IN PROGRESS</b>")
//  });
//  $("#tabPrestige").html(newPrestige);
//}


// Runs on startup
$(document).ready(function() {
  loadGame();
  updateStats();
  //updatePrestige();
});
