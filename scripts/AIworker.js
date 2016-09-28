// AI class
var AI=function(difficulty, arrIndexes)
{
    this.words=arr.shuffle(AllWords,difficulty);
    this.initInds(arrIndexes);
};

AI.prototype.score=0;
AI.prototype.totalScore=0;
AI.inds=[];  // needs to be cleared after every round // indexes current letter's; dynamic to instance; changes per round
AI.prototype.words=[]; // AI's word list to play with; static to instance
AI.currLetters; // needs to be cleared after every round // current letter avaliable
AI.bestWord; // needs to be cleared after every round //
AI.prototype.initInds = function(arrIndexes) // expected all index array in main
{
    AI.inds=[];
    var i = 0;
    for ( ; i < 7; i++) {
        AI.inds[i]=arrIndexes[i];
    } 
    var j=i+2;
    for ( ; i < 9; i++) {
        AI.inds[i]=arrIndexes[j];
        j++;
    }
    this.setCurrLetters();
};

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

AI.prototype.findTheBestWord=function()
{
    var maxScore=0;
    var bestWord="";
    for(var i=0; i<this.words.length; i++)
    {
        if(
            this.isDoable(this.words[i]) &&
            maxScore<main.getScore(this.words[i]) 
        )
        {
            bestWord=this.words[i];
        }
    }
    this.setBestWord(bestWord);
    return bestWord;
}

AI.prototype.setBestWord=function(word)
{
    this.bestWord=word;
}


AI.prototype.setCurrLetters=function()
{
    if(this.currLetters == undefined)
    {
        this.currLetters=new Array();
        for(var i=0; i<AI.inds.length; i++)
        {
            this.currLetters.push(_arrOfal[AI.inds[i]]);
        }
    }
}



AI.prototype.clear=function()
{
    this.bestWord=undefined;
    this.score=undefined;
    this.currLetters=undefined;
    this.inds=undefined;
}



