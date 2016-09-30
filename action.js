var regExp;
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

function ReplaceText(string, re, gFlag) {
    re.lastIndex = 0;

    if ( $("#regex").val() == "" || (result = re.exec(string)) == null)
        return string.replace(/[<>&]/g, Replacer);

    console.log("Replace text, string: " + string);
    console.log(result);
    console.log("lastIndex: " + re.lastIndex);

    if (result[0] == "") {
        do {
            re.lastIndex++;
        }
        while ( (result = re.exec(string)) == "");

        console.log(result);

        if (result == null)
            return string.replace(/[<>&]/g, Replacer);
    }


    console.log("lastIndex: " + re.lastIndex);

    prev = string.substring(0, result.index).replace(/[<>&]/g, Replacer);
    console.log("Prev: " + prev);

    if (!gFlag) {
        next = string.substring(result.index + result[0].length, string.length).replace(/[<>&]/g, Replacer);
        console.log(next);
        console.log(prev + "<span>" + result[0].replace(/[<>&]/g, Replacer) + "</span>" + next);
        return prev + "<span>" + result[0].replace(/[<>&]/g, Replacer) + "</span>" + next;
    }

    return prev + "<span>" + result[0].replace(/[<>&]/g, Replacer) + "</span>" + ReplaceText(string.substring(re.lastIndex, string.length), re, gFlag);
}


function GetResult() {
    flags = "";

    $(".flag:checked").each( function () {
        flags += this.value;
    });

    if ($("#global").prop("checked") == true)
        $("#result").html(ReplaceText($("#text").val(), new RegExp($("#regex").val(), flags), true));
    else
        $("#result").html(ReplaceText($("#text").val(), new RegExp($("#regex").val(), flags), false));
}
