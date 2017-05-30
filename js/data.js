

var newPlayer = {
  money: 100,
  tick: 1000,
  firstMoneyGain: 0.5, 

//0 = firstBuilding,
//
//
  building: [new Building(1.1,25)]
};

// Makes Buildings :D
function Building(multi,cost){
  this.owned = 0;
  this.multi = multi;
  this.cost = cost;

}
