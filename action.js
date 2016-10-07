var regExp;
var result;
var text = "";
var flags;

function Replacer(match) {
    switch (match) {
        case "<":
            return "&lt;";
        case ">":
            return "&gt;"
        case "&":
            return "&amp;"
        default:
            return match;
    }
}

function FindText(string, re) {
    re.lastIndex = 0;

    if ($("#regex").val() == "")
        return;

    while ((result = re.exec(string)) != null) {
        if (result[0] == "") {
            do {
                re.lastIndex++;
            } while ((result = re.exec(string)) == "");

            console.log(result);

            if (result == null)
                return;
        }
        console.log("lastIndex: " + re.lastIndex);
        console.log(result);
        console.log(result.length);

        text += "<tr>";
        for (var i = 1; i < result.length; i++) {
            if (result[i] != "" && result[i] != undefined)
                text+="<td>" + result[i].replace(/[<>&]/, Replacer) + "</td>";
        }
        text += "</tr>";
        // next = string.substring(result.index + result[0].length, string.length).replace(/[<>&]/g, Replacer);
        // console.log(next);
        // console.log(prev + "<span>" + result[0].replace(/[<>&]/g, Replacer) + "</span>" + next);
        // return prev + "<span>" + result[0].replace(/[<>&]/g, Replacer) + "</span>" + next;

        //return prev + "<span>" + result[0].replace(/[<>&]/g, Replacer) + "</span>" + ReplaceText(string.substring(re.lastIndex, string.length), re, gFlag);
    }
}


function GetResult() {
    flags = "";

    $(".flag:checked").each(function() {
        flags += this.value;
    });

    text += "<table>";
    FindText($("#text").val(), RegExp($("#regex").val(), flags));
    text += "</table>";
    $("#result").innerHTML(text);
}
