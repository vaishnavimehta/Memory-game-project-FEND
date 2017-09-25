/*
 * global variable and arrays
 */
var gametime;
var totalsecscount;
var game_secs;
var game_mins;
var tstring;
var movecount;
var starcount;
var front_img='<img src="img/question2.ico" alt="???" height="100px" width="100px">';
var star_img_tag='<img src="img/star.ico" height="25px" width="25px">';
var cards_storage = ['#','#','@','@','&','&','$','$','?','?','%','%','(',')','(',')'];
var cards_pushed = [];
var cardids = [];
var cardsFlippedc = 0;

/* main function calling on window load*/
window.onload= main;

function main(){
	gameConstruct();
	util_fun();
}

//Shuffle function from http://stackoverflow.com/a/2450976
Array.prototype.shuffleUtil = function(){
    var l = this.length, m, t;
    while(--l > 0){
        m = Math.floor(Math.random() * (l+1));
        t = this[m];
        this[m] = this[l];
        this[l] = t;
    }
};

//time and rating function.
function setInfoTandR()
{
	if(movecount < 31){
		starcount = 3;
	}
	else if(movecount > 30 && movecount < 51){
		starcount = 2;
	}
	else{
		starcount = 1;
	}
	ge = document.getElementById("stars");
	ge.innerHTML="";
	
	for (var j = 0; j < this.starcount; j++){
		var a = document.createElement('span');
		a.innerHTML=star_img_tag;
		ge.appendChild(a);
	}
	++totalsecscount;
    game_secs = format_time(totalsecscount%60);
    game_mins = format_time(parseInt(totalsecscount/60));
	gametime.innerHTML= game_mins+":"+game_secs;
}

// time function.
function format_time(val)
{
    tstring = val + "";
    if(tstring.length == 2)
    {
		return tstring;       
    }
    else if(tstring.length < 2)
    {
        return "0" + tstring;
    }
}


//A utility function to display timer and star rating
function util_fun(){
	
        gametime = document.getElementById("timer");
		gametime.innerHTML="0";
		game_secs=0;
		game_mins=0;
        totalsecscount = 0;
        setInterval(setInfoTandR, 1000);
}
		
//initial board creation and flipping cardss
function gameConstruct(){
	document.getElementById('board').innerHTML = "";
	cardsFlippedc = 0;
	movecount=0;
	var output = '';
    cards_storage.shuffleUtil();
	
	//appending tiles in memory board.
	for(var k = 0; k < cards_storage.length; k++){
		output += '<div id="tile_'+k+'" onclick="flipCardCheck(this,\''+cards_storage[k]+'\')">'+front_img+'</div>';
	}
	document.getElementById('board').innerHTML = output;
	document.getElementById('points').innerHTML = '0';
	document.getElementById('stars').innerHTML = '0';
	document.getElementById('timer').innerHTML = '0';
}

//functio dat performs all critical tasks when card id fliped or clicked.
function flipCardCheck(cardr,data){
	//check if card is already flipped.
	if(cardr.innerHTML == front_img && cards_pushed.length < 2){
		//updating card value. incrementing move value and updating it on board.
		cardr.innerHTML = data;
		++movecount;
		document.getElementById('moves').innerHTML = movecount;
		//check if no card is already flipped, then push tha card in array.
		if(cards_pushed.length == 0){
			cards_pushed.push(data);
			cardids.push(cardr.id);
		} 
		else if(cards_pushed.length == 1){
			cards_pushed.push(data);
			cardids.push(cardr.id);
			
			//check if both cards in array are same then increments cards flipped, set cards to permanent fliped and clear cache arrays.
			if(cards_pushed[0] == cards_pushed[1]){
				cardsFlippedc += 2;
				document.getElementById('points').innerHTML = cardsFlippedc;
				cards_pushed = [];
            	cardids = [];
				
				// if it is end of game, display message.
				if(cardsFlippedc == cards_storage.length){
					var v = confirm("Cogratulations!! , Game completed successfuly. Time elapsed " +game_mins+" min "+ game_secs+" sec, "+
					        "Rating given by the game "+starcount+" stars. Do you want to play it again ?");
					if (v == true) {
						 window.location.reload();
					}
				}
				//if cards in array are different flip the cards again and clear cache arrays.
			} 
			else{
				function cardflip(){
				    var tile_1 = document.getElementById(cardids[0]);
				    var tile_2 = document.getElementById(cardids[1]);
            	    tile_1.innerHTML = front_img;
            	    tile_2.innerHTML = front_img;
				    cards_pushed = [];
            	    cardids = [];
				}
				setTimeout(cardflip, 400);
			}
		}
	}
}