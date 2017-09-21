function getHTML() {
    clearData();
    let startTime = new Date();
    getResponse("HTML", startTime)
}

function getJSON() {
    clearData();
    let startTime = new Date();
    getResponse("JSON", startTime);
}

function getHTMLEncoder() {
    clearData();
    let startTime = new Date();
    getResponse("HTMLEncoder", startTime)
}

function clearData() {
    $("#Result").empty();
    $("#Time").empty();
}

function getResponse(type, startTime) {

    $.ajax({
        url: "../PHP/HTMLEncoder.php?type=" + type,
        success: function (result) {
            let process = new ProcessResult(type, result, startTime);
            process.processData();

        }
    });
}

class ProcessResult {

    constructor(type, result, startTime) {
        this.type = type;
        this.result = result;
        this.startTime = startTime;
    }
    appendData(data) {
        $("#Result").html(data);
        let totalTime = new Date().getTime() - this.startTime.getTime();
        $("#Time").html("Total Time = " + totalTime + " ms");
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