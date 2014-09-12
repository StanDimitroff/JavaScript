function solve(params) {
    "use strict";
    if(params.length<2){
        var text = params[0];
    }else{
        var text = params.join(" ");

    }
    //extract a tags
    var matches = text.match(/<a[^>]+>/g).join("\n");
    //extract hrefs attributes
    var hrefs = matches.match(/(href(\s*=\s*"[^"]+"))|(href(\s*=\s*'[^']+'))|(href(\s*=\s*[^\s>]+))/g).join("\n");
    //replace hrefs
    var links =hrefs.replace(/href\s*=\s*/g,'').split("\n");
    for(var i = 0;i < links.length;i++){
        //ignore rear left and right quotes
        if(links[i][0]='"'){
            var length = links[i].length;
            links[i]=links[i].substring(1,length-1);
        }
        if(links[i][0]=="'"){
            links[i]=links[i].substring(1,length-1);
        }
        console.log(links[i]);
    }
}

//solve(['<a href="http://softuni.bg" class="new"></a>']);
//solve(['<p class="moreinfo">',
//    '<a href="docs/users.html#Options">Help</a> on the options is available.',
//    '</p>',
//    '<p>If you find any issues',
//    '	with this feature, please <a href=\'feedback.html\'>report them</a>. Thank you.',
//    '</p>',
//    '<link href="/Content/bootstrap/bootstrap?v=7EVAkqrqyPC0hRsMoFTAzVOblhjeHKzBszkwWmAAtAM1" rel="stylesheet"/>',
//    '<link href="/Content/KendoUI/kendo?v=yEZZ9ILtaR4K0OJxF0INspvLb81SfmFTf_GdfhBezog1" rel="stylesheet"/>',
//    '<link href="/Content/css?v=vsNNPhofDD7xmJW73shybKWTN92ALtNKb3eGqaCkJGM1" rel="stylesheet"/>',
//    '<ul class="dropdown-menu">',
//    '		<li><a href="/Contests/#!/List/ByCategory/1/CSharp-Basics">C# Basics</a></li>',
//    '		<li><a href="/Contests/#!/List/ByCategory/3/JavaScript-Basics">JavaScript Basics</a></li>',
//    '		<li><a href="/Contests/#!/List/ByCategory/2/Java-Basics">Java Basics</a></li>',
//    '	<li class="divider"></li>',
//    '	<li><a href="/Contests">All</a></li>',
//    '	<li>',
//    '		<a class="text-primary" href="/Users/Profile" title="Settings">Hello, nakov!</a>',
//    '	</li>',
//    '	<li><a href="javascript:document.getElementById(\'logoutForm\').submit()">Log out</a></li>',
//    '	<li><a href=\'javascript:document.getElementById("logoutForm").submit()\'>Log out</a></li>',
//'</ul>']);