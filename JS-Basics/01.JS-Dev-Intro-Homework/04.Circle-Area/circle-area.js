function calcCircleArea(radius){
	var area = (Math.PI)*Math.pow(radius, 2);
	return area;
}
document.getElementById("areaOne").innerHTML = calcCircleArea(7);
document.getElementById("areaTwo").innerHTML = calcCircleArea(1.5);
document.getElementById("areaThree").innerHTML = calcCircleArea(20);