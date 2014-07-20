var date = new Date();
var hours = date.getHours();
var min = date.getMinutes();
min = min + "";
if (min.length == 1) {
	min = "0" + min;
}
console.log(hours + ":" + min);