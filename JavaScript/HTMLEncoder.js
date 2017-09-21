function getHTML() {
    clearData();
    positiveIntegerCheck("HTML");
}

function getJSON() {
    clearData();
    positiveIntegerCheck("JSON");
}

function getHTMLEncoder() {
    clearData();
    positiveIntegerCheck("HTMLEncoder");
}

function clearData() {
    $("#Result").empty();
    $("#Time").empty();
}

function positiveIntegerCheck(type) {
    let iterations = parseInt(document.getElementById("Iterations").value);
    if (iterations <= 0 || document.getElementById("Iterations").value === "") {
        alert("Please Enter a Positive Integer");
    }
    else {
        performIterations(type)
    }
}

function performIterations(type) {
    let iterations = parseInt(document.getElementById("Iterations").value);
    let totalTimeOfAllIterations = 0;

    for (i = 0; i < iterations; i++) {
        let startTime = new Date();
        getResponse(type);
        totalTimeOfAllIterations = totalTimeOfAllIterations + (new Date().getTime() - startTime.getTime());
    }

    $("#Time").html("Average Time per request= " + (totalTimeOfAllIterations / iterations) * 1000 + " micro seconds");
}

function getResponse(type) {

    $.ajax({
        url: "../PHP/HTMLEncoder.php?type=" + type,
        success: function (result) {
            let process = new ProcessResult(type, result);
            process.processData();
        }
    });
}

class ProcessResult {

    constructor(type, result) {
        this.type = type;
        this.result = result;
    }

    appendData(data) {
        $("#Result").html(data);
    }

    processData() {
        if (this.type === "HTML") {
            this.appendData(this.result);
        }
        else if (this.type === "JSON") {

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