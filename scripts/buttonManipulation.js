// endregion Hiding/Unhiding/click manipulations Buttons// region Hiding/Unhiding/click manipulations Buttons
buttons = document.querySelectorAll('#startingDiv button');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', hidingStartingDiv);
}

function hidingStartingDiv() {
    elem = document.querySelector("#startingDiv");
    elem2 = document.querySelector("#gameBordDiv");
    elem.style.display = 'none';
    elem2.style.display = 'flex';
}

buttons[0].addEventListener('click', hidingOtherPlayers);
function hidingOtherPlayers() {
    elem = document.querySelector("#item2");
    elem2 = document.querySelector("#item3");
    elem.style.display = 'none';
    elem2.style.display = 'none';
    elem3 = document.querySelector(".item23");
    elem3.style.justifyContent = 'center';

    document.querySelector('#Player1Name').innerHTML="AI";
}
//buttons[0].addEventListener('click', startNewGame);
function startNewGame(){
    var diff=document.querySelector('#difficulty').value;
    game.start(diff);
}

buttons[1].addEventListener('click', enterUsername);
function enterUsername() {
    // 2 შემთხვევა, ტოკენი არსებობს და ტოკენი არ არსებობს

    var token=getCookie('token');
    if (token==""){
        var person = prompt("Please enter your name", "");
        while(person==""){
            person = prompt("Please enter your name", "");
        }
        
        if (person != null) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "authorization.php?username=" + person, true);
            xmlhttp.send();  
        }  
    }
    else{

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(this.responseText != "failure"){
                }
                else{
                    enterUsername();
                }
            }
        };
        xhttp.open("POST", "tokenCheck.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token="+token);
    }
}

buttons[1].addEventListener('click', getAllUsers);

function getIndexes(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText!=""){
                var o=JSON.parse(this.responseText);
                game.setArrIndexes(o);
            }
        }
    };
    xhttp.open("GET", "getIndexes.php", true);
    xhttp.send();
}

var tr;

function getAllUsers(){
    tr=setInterval(getThem,3000);
}

function getThem(){
    game.createPlayers();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            if(this.responseText!="")
            {
                // ვიწყებთ თამაშს ვქმნით ფლეიერებს
                game.createPlayers();
                clearInterval(tr);

                var o=JSON.parse(this.responseText);
                var meInd=0;
                for (var i=0;i<o.length;i++)
                {  
                    if(o[i].me==1){
                        meInd=i;
                        break;
                    } 
                }

                game.player1.username=o[meInd].username;
                var c=3;
                var j=meInd;
                var w=2;
                while(c--){
                    j++;
                    if(j==o.length){
                        j=0;
                    }

                    game["player"+w]['username']=o[j].username;

                    w++;
                }

                for (var i=0;i<o.length;i++)
                {  
                   
                    for (var t=1;t<5;t++)
                    {  
                        if(game["player"+t].username ==  o[i].username)
                        {
                            game["player"+t]["onQueue"]=i;
                            continue;
                        }
                    }
                }
                theCallBackIndexes();
            }
        }
    };
    xhttp.open("GET", "getAllUsers.php", true);
    xhttp.send();
}

function theCallBackIndexes(){
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText!=""){
                var o=JSON.parse(this.responseText);
                // --- game-ში ინდექსების ჩაწერა
                game.setArrIndexes(o);
                theCallBack();
            }
        }
    };
    xhttp1.open("GET", "getIndexes.php", true);
    xhttp1.send();

}
function theCallBack(){
    // ფლეიერებს ინდექების ჩაწერა
    game.setPlayerInds();

    // ფლეიერებს სახელების ჩაწერა
    game.UIplayerUsernames();

    // ასოების ჩაყრა
    game.UIdeskCards();

    // თაიმერის ფუნცია
    game.startTimer();
}



buttons[0].addEventListener('click', test);

function test(){
    game["player"+1]["username"]="yle";
    game.alertTraki();
}



// document.querySelector("#buttonOk").addEventListener('click', logOut);
function logOut(){
    alert(" logOut");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "logOut.php", true);
    xhttp.send();
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


document.querySelector("#buttonOk").addEventListener('click', OnOkClick);
document.querySelector('#buttonClear').addEventListener('click', OnClearClick);
//
inputs = document.querySelectorAll('.item4Nhalfcard7 .halfCards7 .cardHalf');
//
function OnOkClick() { // gets the user input and sends it to main
    var str = "";
    for (var i = 0; i < 9; i++) {
        var v=inputs[i].value.trim();
        if (v == false) break;
        if( !('ა'<=v && v<='ჰ' || v=='*') ){
            alert("სიტყვა არასწორად გაქვთ შეყვანილი");
            return;
        }
        str = str + v;
    }
    strTrimmed=str.trim();
    if(game.player1.isDoable(strTrimmed)){
        
        sendWordToTheServer(strTrimmed);
    }
    else{
        alert("Your input doesn't matches letters of yours");
    }
}

function OnClearClick(){
    for (var i = 0; i < 9; i++) {
        inputs[i].value="";
    }
}

function sendWordToTheServer(word){
    var score=main.getScore(word);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // document.getElementById("demo").innerHTML = this.responseText;
    }
    };
    xhttp.open("POST", "handleUserWord.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("word="+word+"&score="+score);
}


// endregion Hiding/Unhiding/click manipulations Buttons