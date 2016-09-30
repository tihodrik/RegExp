var regExp;
var replace;
var result;
var text;
var flags;
function Replacer(match) {
    switch (match) {
        case "<": return "&lt;";
        case ">": return "&gt;"
        case "&": return "&amp;"
        default: return match;
    }
}

function GetResult() {
    flags = "";

    $(".flag:checked").each( function () {
        flags += this.value;
    });

    text = $("#text").val();

    if ($("#regex").val() != "") {
        regExp = new RegExp($("#regex").val(), flags);
        replace = $("#replace").val();
        console.log(replace);
        text = text.replace(regExp, replace);
    }

    text = text.replace(/[<>&]/g, Replacer);
    $("#result").css("display", "block");
    $("#saveText").css("display", "block");
    $("#result").html(text);

}

function SaveText() {
    var text = $("#result").text();
    console.log(text);
    var blob = new Blob([text], {type:"text/plain"});

    var linkURL = window.URL.createObjectURL(blob);
    var fileName = "regexp.txt";

    var link = document.createElement("a");
    link.download = fileName;
    link.href = linkURL;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
