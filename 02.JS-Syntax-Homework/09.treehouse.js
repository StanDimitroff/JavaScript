//Write a JavaScript function treeHouseCompare(value) that accepts the following parameters: integers a and b. The function compares the area of the house and the area of the tree (Figure 1) and returns the name of the figure with bigger area (house or tree) and the value of the area. Write JS program treehouse.js that compares a few houses and trees. The result should be printed on the console. Run the program through Node.js.

function treeHouseCompare(a, b) {
	var houseArea = (a * a) + (a * 2 / 3 * a) / 2;
	var treeArea = (b * 1 / 3 * b) + (Math.PI * Math.pow((2 / 3 * b), 2));
	return houseArea > treeArea ? "house/" + houseArea.toFixed(2) : "tree/" + treeArea.toFixed(2);
}

console.log(treeHouseCompare(3, 2));
console.log(treeHouseCompare(3, 3));
console.log(treeHouseCompare(4, 5));