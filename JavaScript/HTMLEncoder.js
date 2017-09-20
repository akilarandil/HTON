function getHTML() {
    clearData();
    getResponse("HTML")
}

function getJSON() {
    clearData();
    getResponse("JSON")
}

function getHTMLEncoder() {
    clearData();
    getResponse("HTMLEncoder")
}

function clearData() {
    $("#Result").empty();
}
function getResponse(type) {

    $.ajax({
        url: "../PHP/HTMLEncoder.php?type=" + type,
        success: function (result) {
            let process = new ProcessResult(type,result);
            process.processData();

        }
    });
}

class ProcessResult {

    constructor(type,result){
        this.type = type;
        this.result = result;
    }
    appendData(data) {
        $("#Result").html(data);
    }

    processData(){
        if(this.type === "HTML"){
            this.appendData(this.result)
        }
        else if(this.type === "JSON"){

            let jsonData = JSON.parse(this.result);
            let htmlData =
                "<table>" +
                    "<tr>" +
                        "<th>Name</th>" +
                        "<th>Age</th>" +
                        "<th>City</th>" +
                    "</tr><tr>" +
                     "<td>" + jsonData["name"] + "</td>" +
                    "<td>" + jsonData["age"] + "</td>" +
                    "<td>" + jsonData["city"] + "</td>" +
                    "</tr>" +
                "</table>";
            this.appendData(htmlData)
        }

    }

}