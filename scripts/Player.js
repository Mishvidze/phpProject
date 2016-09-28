var Player = function(){
};

Player.prototype.username;

Player.prototype.score=0;

Player.prototype.onQueue=0;

Player.prototype.totalScore=0;

Player.prototype.bestWord;

Player.prototype.currLetters; 

Player.prototype.inds=[];

Player.prototype.initInds = function(arrIndexes) // expected all index array in main
{
    this.inds=[];
    var i = 0;
    for ( ; i < 7; i++) {
        this.inds[i]=arrIndexes[i];
    }
    j=7+2*this.onQueue;
    for ( ; i < 9; i++) {
        this.inds[i]=arrIndexes[j];
        j++;
    }
    this.setCurrLetters();
};


Player.prototype.clear=function()
{
    this.score=undefined;
    this.bestWord=undefined;
    this.currentIndexes=undefined;
}


Player.prototype.isDoable=function(word)
{
    var currLetters=this.currLetters.slice(0,this.currLetters.length);
    for(var i=0; i<word.length; i++)
    {

        var indexOfi = currLetters.indexOf(word[i]);
        if(indexOfi==-1)
        {
            return false;
        }
        else
        {
            currLetters[indexOfi]="";
        }
    }
    return true;
}



Player.prototype.setCurrLetters=function()
{
    if(this.currLetters == undefined)
    {
        this.currLetters=new Array();
        for(var i=0; i<this.inds.length; i++)
        {
            this.currLetters.push(_arrOfal[this.inds[i]]);
        }
    }
}
