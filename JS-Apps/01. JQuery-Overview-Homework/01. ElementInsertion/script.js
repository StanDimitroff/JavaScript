// Using jQuery write a script for adding elements before/after other elements.

$(document).ready(function (){
    $('#second').before('<li>Before second</li>');
    $('#third').after('<li>After third</li>');
});