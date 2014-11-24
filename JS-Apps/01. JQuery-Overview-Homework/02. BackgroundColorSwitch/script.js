/*Write a script using jQuery for switching the background color of elements with a specified class.
 The input should be read from an input form.*/

$(document).ready(function (){
   $('#button').click(function(){
       var elementClass = $('#class').val();
       var color = $('#color').val();
       $('.'+ elementClass).css('background', color);
   });
});