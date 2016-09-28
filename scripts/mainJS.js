

var _numberOfCards = 83; // index, in reality number of cards is 84
var _arrOfScores = []; // static alphabet's scores
var _arrOfal = []; // static alphabet array
var _arrIndexes = []; // dynamic

var main={}; // main namespace

main.checkWord=function(word){ // returns 1, or -1 in case of not found
    if(word==undefined)
        return -1;
    var contansAstrix=false;
    for(var i=0; i<word.length; i++){
        if(word[i]=='*'){
            contansAstrix=true;
        }
    }
    
    var res;
    if(contansAstrix){
        res=arr.Search(AllWords,word); 
    }
    else{
        res=arr.binarySearch(AllWords,word); 
    }

    return res;
}

AI.prototype.isDoable=function(word)
{
    var currLetters=this.currLetters.slice(0,this.currLetters.length);
    for(var i=0; i<word.length; i++)
    {

        var indexOfi = currLetters.indexOf(word[i]);
        if(indexOfi==-1)
        {
            
            var indexOfAstrix = currLetters.indexOf("*");
            if(indexOfAstrix == -1)
            {
                return false;
            }
            else
            {
                currLetters[indexOfAstrix]="";
            }
        }
        else
        {
            currLetters[indexOfi]="";
        }
    }
    return true;
}




main.getScore=function(word){
    var score=0;
    for(i=0; i<word.length; i++){
        score+=alphabet[word[i]];
    }
    return score;
}

main.alphabetToArrays=function (){
    var c = 0;
    for (var obj in alphabet) {
        _arrOfal[c] = obj;
        _arrOfScores[c] = alphabet[obj];
        c = c + 1;
    }
}


main.initial = function () {
    for (var i = 0; i <= _numberOfCards; i++) {
        _arrIndexes[i] = Math.floor(Math.random() * 34);
    }
}

main.achraOnce =function () {
    var fi = Math.floor(Math.random() * _numberOfCards);
    var si = Math.floor(Math.random() * _numberOfCards);
    var tmp = _arrIndexes[fi];
    _arrIndexes[fi] = _arrIndexes[si];
    _arrIndexes[si] = tmp;

}

main.achra=function() {
    main.initial();
    for (var i = 0; i < 84; i++) {
        main.achraOnce();
    }
}

main.uppers = document.querySelectorAll('.cards7 .upper'); // cardsOnBoard
main.lowers = document.querySelectorAll('.cards7 .lower'); // cardsOnBoard
main.uppersMe = document.querySelectorAll('#item4 .twoCards .card .upper'); // 4th players uppers
main.lowersMe = document.querySelectorAll('#item4 .twoCards .card .lower'); //
main.popUI=function() {
    main.achra();
    //
    var i = 0
    for (; i < main.uppers.length; i++) {
        main.uppers[i].innerHTML = _arrOfal[_arrIndexes[i]];
        main.lowers[i].innerHTML = _arrOfScores[_arrIndexes[i]];
    }
    //
    for (var j=0; j < main.uppersMe.length; j++) {
        main.uppersMe[j].innerHTML = _arrOfal[_arrIndexes[i]];
        main.lowersMe[j].innerHTML = _arrOfScores[_arrIndexes[i]];
        i++;
    }

};

main.clearUI=function(){
    var i = 0
    for (; i < main.uppers.length; i++) {
        main.uppers[i].innerHTML ="";
        main.lowers[i].innerHTML ="";
    }
    //
    for (var j=0; j < main.uppersMe.length; j++) {
        main.uppersMe[j].innerHTML = "";
        main.lowersMe[j].innerHTML = "";
        i++;
    }
}

var round={};
round.timerUI=document.querySelector("#timer");
round.startTimer=function(){
    var c = 40;
    var t;
    var timer_is_on = 0;

    var timedCount=function() {
        var str="";
        if(c<10)
        {
            str="0";
        }
        str+=c;
        round.timerUI.innerHTML= str;
        c = c - 1;
        t = setTimeout(function(){ timedCount() }, 1000);
        if(c==-1){
            clearTimeout(t);
           // round.showRoundResults();
        }
    }
    timedCount();
}

round.showRoundResults = function(){
    game.AIObj.score= main.getScore(game.AIObj.bestWord);  
    var str="AI word: "+game.AIObj.bestWord+", score: "+game.AIObj.score+"\n";
    if(main.checkWord(game.player1.bestWord) == 1){
        game.player1.score=main.getScore(game.player1.bestWord);
        str=str+"Player1 word: "+game.player1.bestWord+", score: "+game.player1.score;
        if(game.AIObj.score > game.player1.score)
        {
            str=str+"\n"+"AI won";
            game.AIObj.totalScore+=game.AIObj.score;
        }
        else 
        {
            if(game.AIObj.score < game.player1.score)
            {
                str=str+"\nPlayer1 won";
                game.player1.totalScore+=game.player1.score;
            }
            else
            {
                str=str+"It's a draw"    
            }
        }
    }
    else
    {
        str=str+"\n"+"AI won";
        game.AIObj.totalScore+=game.AIObj.score;
    }
    round.updateUI();
}

round.player4ScoreUI=document.querySelector('#player4Score');
round.AIScoreUI=document.querySelector('#player1Score');
round.updateUI = function(){
    round.player4ScoreUI.innerHTML="score: "+game.player1.totalScore;
    round.AIScoreUI.innerHTML="score: "+game.AIObj.totalScore;
    game.startNewRound();
}




var game={}; // game namespace
game.offline=false;
game.AIObj;
game.player1;
game.player2;
game.player3;
game.player4;
game.arrIndexes; // online
game.traki;
game.start=function (diff)
{
    main.alphabetToArrays();
    if(game.offline)
    {
        this.AIObj=new AI(diff,_arrIndexes);
        this.player1=new Player();
        game.startNewRound();
    }
    // TODO: shevqmna players
    else{ // online
       // // game.createPlayerslayers();
        //main.alphabetToArrays();
        game.startNewRound();
    
    }
}


game.setArrIndexes=function(arr){
    console.log("game.setArrIndexes");

    main.alphabetToArrays(); // ინდექსები გადაყავს დიქშენერიში
    game.arrIndexes=arr.slice(0,arr.length);
   
    console.dir(game.setArrIndexes);
    // შევამოწმოთ მოდის თუ არა ინდექსები
    // for (var i=0;i<game.arrIndexes.length;i++)
    // {  
    //     console.log(game.arrIndexes[i]);
    // }
    //game.setPlayerInds();
}

game.createPlayers=function(){
        game.player1=new Player();
        game.player2=new Player();
        game.player3=new Player();
        game.player4=new Player();

        console.log("game.player2");
        console.dir(game.player2);
}

game.startNewRound=function(){
    main.clearUI();
    //game.clear();
    if(game.offline){
        main.popUI();
        this.player1.initInds(_arrIndexes);
        this.AIObj.initInds(_arrIndexes);
        this.AIObj.findTheBestWord();
        round.startTimer();
    }
    else{        
        
        //game.onlineUI();
    }
}

game.setPlayerInds=function(){
    console.log("game.setPlayerInds");
    console.dir(game.arrIndexes);
    ////alert("aq");
    this.player1.initInds(game.arrIndexes);
    this.player2.initInds(game.arrIndexes);
    this.player3.initInds(game.arrIndexes);
    this.player4.initInds(game.arrIndexes);

    //game.onlineUI();
}

game.clear=function(){
    if(game.offline){
        this.AIObj.clear();
        this.player1.clear();
    }
    else{
        this.player1.clear();
        this.player2.clear();
        this.player3.clear();
        this.player4.clear();
    }
}


game.UIplayerUsernames=function(){
    for(var i=1; i<5; i++){
        var span=document.querySelector('#Player'+i+'Name');
        // game["player"+w]['username']
        span.innerHTML=game["player"+i]['username'];
    } 

    //game.popCardOnDesk();
    console.log("UIplayerUsernames");
    console.log("player2 username");
    console.dir(game["player"+2]['username']);
}


game.UIdeskCards=function() {
   // game.setPlayerInds();
    var i = 0
    for (; i < main.uppers.length; i++) {
        main.uppers[i].innerHTML = _arrOfal[game.player1.inds[i]];
        main.lowers[i].innerHTML = _arrOfScores[game.player1.inds[i]];
    }
    for (var j=0; j < main.uppersMe.length; j++) {
        main.uppersMe[j].innerHTML = _arrOfal[game.player1.inds[i]];
        main.lowersMe[j].innerHTML = _arrOfScores[game.player1.inds[i]];
        i++;
    }

    console.log("UI card desk");
     console.log("_arrOfal[game.player1.inds[1]]");
    console.dir(_arrOfal[game.player1.inds[1]]);
};


game.timerUI=document.querySelector("#timer");
game.startTimer=function(){
    var c = 40;
    var t;
    var timer_is_on = 0;

    var timedCount=function() {
        var str="";
        if(c<10)
        {
            str="0";
        }
        str+=c;
        round.timerUI.innerHTML= str;
        c = c - 1;
        t = setTimeout(function(){ timedCount() }, 1000);
        if(c==-1){
            // TODO: რექვესთი შედეგის მოთხოვნაზე
            //game.sendRequestRoundResults();
            clearTimeout(t);
        }
    }
    timedCount();
}

game.sendRequestRoundResults = function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // document.getElementById("demo").innerHTML = this.responseText;
       
    }
    };
    xhttp.open("GET", "getRoundResults.php", true);
}

