function solve(params) {

var text = params[0];
var nums = text.match(/[0-9]+/g);
for (var i = 0; i < nums.length; i++) {
    nums[i] = Number(nums[i]);
    nums[i] = nums[i].toString(16).toUpperCase();

}

for (var j = 0; j < nums.length; j++) {
    if (nums[j].length == 1) {
        nums[j] = '000' + nums[j];
    }
    if (nums[j].length == 2) {
        nums[j] = '00' + nums[j];
    }
    if (nums[j].length == 3) {
        nums[j] = '0' + nums[j];
    }
}

for (var num in nums) {
    nums[num] = '0x' + nums[num];
    //console.log(nums[num]);
}
var result = nums.join('-');
console.log(result);

}


//solve(['5tffwj(//*7837xzc2---34rlxXP%$".']);
//solve(['482vMWo(*&^%$213;k!@41341((()&^>><///]42344p;e312']);
//solve(['20']);