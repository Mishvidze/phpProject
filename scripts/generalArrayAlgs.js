var arr={};
arr.binarySearch=function (items, value) {

    var startIndex = 0,
        stopIndex = items.length - 1,
        middle = Math.floor((stopIndex + startIndex) / 2);

    while (items[middle] != value && startIndex < stopIndex) {
        if (value < items[middle]) {
            stopIndex = middle - 1;
        } else if (value > items[middle]) {
            startIndex = middle + 1;
        }
        middle = Math.floor((stopIndex + startIndex) / 2);
    }
    return (items[middle] != value) ? -1 : 1;
}

arr.Search=function (items, value) {
    for(var i=0; i<items.length; i++){
        if(arr.checkForMatch(items[i], value)){
            return 1;
        }
    }
    return -1;
}

arr.checkForMatch=function(word,value){
    if(word.length != value.length){
        return false;
    }
    for(var i=0; i<word.length; i++){
        if(word[i] != value[i] && value[i] != '*'){
            return false;
        }
    }
    return true;
}

arr.shuffle=function (arrayConst, difficulty) {
    var array = arrayConst.slice(0,arrayConst.length);
    length = array.length;
    var numberOfItems = Math.floor(length * difficulty / 100);
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * length);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array.slice(0, numberOfItems).sort();
}