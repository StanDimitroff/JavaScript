/*Write a script using jQuery that reads a JSON string which contains information about cars and generates
 an HTML table.*/

$(document).ready(function () {
    'use strict';

    $.getJSON('input.json', function (data) {

        $('body').append('<table></table>');
        $('table').append('<tr id="header"></tr>');

        // appending the table headers
        $.each(data[0], function (key) {
            $('#header').append('<td>' + key + '</td>');
        });

        // appending the data
        for (var i = 0; i < data.length; i++) {
            var row = '<tr id="' + i + '"></tr>';
            $('table').append(row);

            $.each(data[i], function (_, value) {
                $('#' + i).append('<td>' + value + '</td>');
            });
        }
    });
});