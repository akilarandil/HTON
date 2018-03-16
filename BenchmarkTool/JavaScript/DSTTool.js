//get HTML data
function getHTML() {
    $("#HTML").empty();
    $("#HTMLTime").empty();
    positiveIntegerCheck(false, "HTML");
}

//get JSON Data
function getJSON() {
    $("#JSON").empty();
    $("#JSONTime").empty();
    positiveIntegerCheck(false, "JSON");
}

// get HTML Encoded data
function getHTON() {
    $("#HTON").empty();
    $("#HTONTime").empty();
    positiveIntegerCheck(false, "HTON");
}

function runAll() {
    clearData();
    positiveIntegerCheck(true, "")
}

//Clear data on the browser
function clearData() {
    $("#HTML").empty();
    $("#HTMLTime").empty();
    $("#JSON").empty();
    $("#JSONTime").empty();
    $("#HTON").empty();
    $("#HTONTime").empty();
}

//validate for positive integer
function positiveIntegerCheck(iterateAll, type) {
    let iterationStr = document.getElementById("Iterations").value;
    let iterations = parseInt(iterationStr);
    let dataSetStr = document.getElementById("DataSets").value;
    let dataSets = parseInt(dataSetStr);
    if (iterations <= 0 || iterationStr === "" || dataSets <= 0 || dataSetStr === "") {
        alert("Please Enter a Positive Integer");
    }
    else {
        performIterations(iterateAll, type, dataSets)

    }
}

let requestCompleted = true;
let executedIterations;

//perform iteration requests as specified by the user's given number
function performIterations(iterateAll, type, dataSets) {
    let iterations = parseInt(document.getElementById("Iterations").value);

    let totalTimeOfAllIterations = 0;
    executedIterations = 0;
    let x = -1;
    let types = ["HTON", "JSON", "HTML"];
    if (iterateAll) {
        type = types.pop();
    }
    getResponse(type, dataSets, totalTimeOfAllIterations, iterations, x, types, iterateAll);


}

// send the request and get the response
function getResponse(type, dataSets, totalTimeOfAllIterations, iterations, count, types, iterateAll) {
    if (count !== iterations) {
        requestCompleted = false;
        let startTime;
        let contentSize;
        $.ajax({

            url: "PHP/DSTTool.php?type=" + type + "&dataSets=" + dataSets,
            beforeSend: function (x, y) {
                startTime = new moment();
            },
            success: function (result, status, request) {
                processData(type, result);
                contentSize = result.length;
            },
            complete: function (x, y) {


                let timeOfRequest = new moment().diff(startTime, 'milliseconds');
                if (count !== -1) {
                    totalTimeOfAllIterations += timeOfRequest;
                }
                addTimeAndSizeDetails(type, contentSize, ++count, timeOfRequest, totalTimeOfAllIterations);

                if (iterateAll) {
                    if (count === iterations) {
                        if (types.length === 0) return;
                        count = 0;
                        totalTimeOfAllIterations = 0;

                        getResponse(types.pop(), dataSets, totalTimeOfAllIterations, iterations, count, types, iterateAll);
                    } else {
                        getResponse(type, dataSets, totalTimeOfAllIterations, iterations, count, types, iterateAll);
                    }
                } else {
                    getResponse(type, dataSets, totalTimeOfAllIterations, iterations, count, types, iterateAll);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
}


function addTimeAndSizeDetails(type, contentSize, count, timeOfRequest, totalTimeOfAllIterations) {

    if (type === "HTML") {
        $("#HTMLTime").html(
            "Content Size = " + contentSize + "<br>" +
            "Request #" + count + "  - Time of Request = " + timeOfRequest + " Milli seconds <br>" +
            "Average Time per request= " + (totalTimeOfAllIterations / count) + " Milli seconds");
    }
    else if (type === "JSON") {
        $("#JSONTime").html(
            "Content Size = " + contentSize + "<br>" +
            "Request #" + count + "  - Time of Request = " + timeOfRequest + " Milli seconds <br>" +
            "Average Time per request= " + (totalTimeOfAllIterations / count) + " Milli seconds");

    } else if (type === "HTON") {
        $("#HTONTime").html(
            "Content Size = " + contentSize + "<br>" +
            "Request #" + count + "  - Time of Request = " + timeOfRequest + " Milli seconds <br>" +
            "Average Time per request= " + (totalTimeOfAllIterations / count) + " Milli seconds");
    }

}

//Process Data from the response
function processData(type, result) {
    // console.log(result);
    if (type === "HTML") {

        $("#HTML").html(result);
    }
    else if (type === "JSON") {

        let jsonData = JSON.parse(result);
        let htmlData =
            "<table id=personTable class=table-class>" +
            "<tr>" +
            "<th>Name</th>" +
            "<th>Age</th>" +
            "<th>City</th>" +
            "</tr>";
        for (let a = 0; a < jsonData.length; a++) {
            htmlData +=
                "<tr>" +
                "<td>" + jsonData[a]['name'] + "</td>" +
                "<td>" + jsonData[a]['age'] + "</td> " +
                "<td>" + jsonData[a]['city'] + "</td>" +
                "</tr>";
        }
        htmlData += "</table>";
        $("#JSON").html(htmlData);
    } else if (type === "HTON") {
        HTON.convertAndAppendToDOM("HTON", result);
    }
}
