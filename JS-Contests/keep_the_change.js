function solve(params){

    var bill = Number(params[0]);
    var mood = params[1];
    var tip = 0;
    var drunk = (bill*15)/100;
    drunk = drunk.toString();
    var firstDigit =Number(drunk[0]);

    switch (mood){
        case'happy': tip= (bill*10)/100;break;
        case'married':tip =(bill*0.05)/100;break;
        case'drunk':tip = (bill*15)/100;
            tip=Math.pow(tip,firstDigit);break;
        default:tip=(bill*5)/100;break;
    }

console.log(tip.toFixed(2));
}






//solve(['120.44','happy']);
//solve(['1230.83','drunk']);
//solve(['716.00','married']);
