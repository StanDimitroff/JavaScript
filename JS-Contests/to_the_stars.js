function solve(params) {

    var firstStarInfo = params[0];
    var secondStarInfo = params[1];
    var thirdStarInfo = params[2];

    var initialPos = params[3].split(' ');
    var n = params[4];

    var firstStar = firstStarInfo.split(' ');
    var secondStar = secondStarInfo.split(' ');
    var thirdStar = thirdStarInfo.split(' ');

    var leftDownCornerOne = Number(firstStar[1]) - 1;
    var rightDownCornerOne = Number(firstStar[1]) + 1;
    var leftUpCornerOne = Number(firstStar[2]) + 1;
    var rightUpCornerOne = Number(firstStar[2]) - 1;

    var leftDownCornerTwo = Number(secondStar[1]) - 1;
    var rightDownCornerTwo = Number(secondStar[1]) + 1;
    var leftUpCornerTwo = Number(secondStar[2]) + 1;
    var rightUpCornerTwo = Number(secondStar[2]) - 1;

    var leftDownCornerThree = Number(thirdStar[1]) - 1;
    var rightDownCornerThree = Number(thirdStar[1]) + 1;
    var leftUpCornerThree = Number(thirdStar[2]) + 1;
    var rightUpCornerThree = Number(thirdStar[2]) - 1;

    var x = Number(initialPos[0]);
    var y = Number(initialPos[1]);
    for (var i = 0; i <=n; i++) {


        if (x >= leftDownCornerOne && x <= rightDownCornerOne && y <= leftUpCornerOne && y >= rightUpCornerOne) {
            console.log(firstStar[0].toLowerCase());
        }
        else if (x >= leftDownCornerTwo && x <= rightDownCornerTwo && y <= leftUpCornerTwo && y >= rightUpCornerTwo) {
            console.log(secondStar[0].toLowerCase());
        }
        else if (x >= leftDownCornerThree && x <= rightDownCornerThree && y <= leftUpCornerThree && y >= rightUpCornerThree) {
            console.log(thirdStar[0].toLowerCase());
        } else {
            console.log('space');
        }
        y++;
    }


}


//solve(['Sirius 3 7', 'Alpha-Centauri 7 5', 'Gamma-Cygni 10 10', '8 1', '6']);
//solve(['Terra-Nova 16 2', 'Perseus 2.6 4.8', 'Virgo 1.6 7', '2 5', '4']);