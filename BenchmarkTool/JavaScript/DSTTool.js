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


    clearCanvas("1Serialization");
    clearCanvas("1De-Serialization");
    clearCanvas("1RequestResponse");
    clearCanvas("1TotalCom");
    clearCanvas("10Serialization");
    clearCanvas("10De-Serialization");
    clearCanvas("10RequestResponse");
    clearCanvas("10TotalCom");
    clearCanvas("20Serialization");
    clearCanvas("20De-Serialization");
    clearCanvas("20RequestResponse");
    clearCanvas("20TotalCom");
    clearCanvas("50Serialization");
    clearCanvas("50De-Serialization");
    clearCanvas("50RequestResponse");
    clearCanvas("50TotalCom");
    clearCanvas("100Serialization");
    clearCanvas("100De-Serialization");
    clearCanvas("100RequestResponse");
    clearCanvas("100TotalCom");
}
function clearCanvas(elementId) {
    let c=document.getElementById(elementId);
    let ctx=c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);


}

//validate for positive integer
function positiveIntegerCheck(iterateAll, type) {
    let iterationStr = document.getElementById("Iterations").value;
    let iterations = parseInt(iterationStr);
    if (iterations <= 0 || iterationStr === "" ) {
        alert("Please Enter a Positive Integer");
    }
    else {
        performIterations(iterateAll, type)

    }
}

let requestCompleted = true;
let executedIterations;
let currentProgressBarWidth=0;
//perform iteration requests as specified by the user's given number
function performIterations(iterateAll, type) {
    let iterations = parseInt(document.getElementById("Iterations").value);
    let timeStamp = new moment();
    let totalTimeOfAllIterations = 0;
    let totalResponseTimeOfAllIterations = 0;
    let totalDeSerialization = 0;
    currentProgressBarWidth=0;
    let count = -1;
    let types = ["HTON", "JSON", "HTML"];
    let dataSets = ["100","50","20","10","1"];
    let dataSet;
    if (iterateAll) {
        type = types.pop();
        dataSet = dataSets.pop();
    }
    let timeOfIterationsObj = {};
    let responseTimeObj = {};
    let deSerializationObj = {};
    $("#Notify").html("<h2><span style='color: red'>Please Wait</span></h2>");
    getResponse(type, dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations,
        totalDeSerialization, iterations, count, types,dataSets, iterateAll, timeStamp,timeOfIterationsObj,responseTimeObj,deSerializationObj);
}

// send the request and get the response
function getResponse(type, dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization,
                     iterations, count, types,dataSets, iterateAll, timeStamp,timeOfIterationsObj,responseTimeObj,deSerializationObj) {
    if (count !== iterations) {
        requestCompleted = false;
        let startTime;
        let contentSize;
        let responseTime;
        let deSerializationTime;
        $.ajax({

            url: "PHP/DSTTool.php?type=" + type + "&dataSets=" + dataSet + "&timeStamp=" + timeStamp + "&count=" + count,
            beforeSend: function (x, y) {
                startTime = new moment();
            },
            success: function (result, status, request) {
                responseTime = new moment().diff(startTime, 'milliseconds');
                let deStart = new moment();
                processData(type, result);
                deSerializationTime = new moment().diff(deStart, 'milliseconds');
                contentSize = result.length;
            },
            complete: function (x, y) {
                let timeOfRequest = new moment().diff(startTime, 'milliseconds');
                if (count !== -1) { // this is to ignore the results of the first request due to the time taken for handshaking
                    totalResponseTimeOfAllIterations += responseTime;
                    totalTimeOfAllIterations += timeOfRequest;
                    totalDeSerialization += deSerializationTime;
                }
                ++count;
                // addTimeAndSizeDetails(type, contentSize, ++count, timeOfRequest, responseTime, deSerializationTime, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization);
                if (iterateAll) {
                    if (count === iterations) {
                        if (types.length === 0) {
                            if (dataSets.length !== 0) {
                                DisplayDataSetDone(dataSet,type);
                                CalculateAverage(type,dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization,
                                    count,timeOfIterationsObj,responseTimeObj,deSerializationObj);
                                types = ["HTON", "JSON", "HTML"];
                                type = types.pop();
                                dataSet = dataSets.pop();
                                count = 0;
                                totalResponseTimeOfAllIterations = 0;
                                totalTimeOfAllIterations = 0;
                                totalDeSerialization = 0;
                                getResponse(type, dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization,
                                    iterations, count, types,dataSets, iterateAll, timeStamp,timeOfIterationsObj,responseTimeObj,deSerializationObj);

                            }else{
                                DisplayDataSetDone(dataSet,type);
                                CalculateAverage(type,dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization,
                                    count,timeOfIterationsObj,responseTimeObj,deSerializationObj);
                                GetSerializationTime(timeStamp, iterations, responseTimeObj, timeOfIterationsObj, deSerializationObj);
                                return;
                            }
                        }else{
                            DisplayDataSetDone(dataSet,type);
                            CalculateAverage(type,dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization,
                                count,timeOfIterationsObj,responseTimeObj,deSerializationObj);
                            count = 0;
                            totalResponseTimeOfAllIterations = 0;
                            totalTimeOfAllIterations = 0;
                            totalDeSerialization = 0;
                            getResponse(types.pop(), dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization,
                                iterations, count, types,dataSets, iterateAll, timeStamp,timeOfIterationsObj,responseTimeObj,deSerializationObj);
                        }

                    } else {
                        getResponse(type, dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization,
                            iterations, count, types,dataSets, iterateAll, timeStamp,timeOfIterationsObj,responseTimeObj,deSerializationObj);
                    }
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

function CalculateAverage(type,dataSet, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization,
                          count,timeOfIterationsObj,responseTimeObj,deSerializationObj){

    if (responseTimeObj.hasOwnProperty(dataSet)){
            responseTimeObj[dataSet][type]= totalResponseTimeOfAllIterations/count;
    }else{
        let a = {};
        a[type] = totalResponseTimeOfAllIterations / count;
        responseTimeObj[dataSet] = a;
    }

    if (timeOfIterationsObj.hasOwnProperty(dataSet)){
        timeOfIterationsObj[dataSet][type]= totalTimeOfAllIterations/count;
    }else{
        let a = {};
        a[type] = totalTimeOfAllIterations / count;
        timeOfIterationsObj[dataSet] = a;
    }

    if (deSerializationObj.hasOwnProperty(dataSet)){
        deSerializationObj[dataSet][type]= totalDeSerialization/count;
    }else{
        let a = {};
        a[type] = totalDeSerialization / count;
        deSerializationObj[dataSet] = a;
    }

}

function DisplayDataSetDone(dataSet,type){

    let str;
    if(dataSet==="1"){
        str =
            "1 DataSet      - Done<br>"+
            "10 DataSet     - <br>"+
            "20 DataSet     - <br>"+
            "50 DataSet     - <br>"+
            "100 DataSet    - <br>";
    }else if (dataSet==="10"){
        str =
            "1 DataSet      - Done<br>"+
            "10 DataSet     - Done<br>"+
            "20 DataSet     - <br>"+
            "50 DataSet     - <br>"+
            "100 DataSet    - <br>";
    }else if (dataSet==="20"){
        str =
            "1 DataSet      - Done<br>"+
            "10 DataSet     - Done<br>"+
            "20 DataSet     - Done<br>"+
            "50 DataSet     - <br>"+
            "100 DataSet    - <br>";
    }else if (dataSet==="50"){
        str =
            "1 DataSet      - Done<br>"+
            "10 DataSet     - Done<br>"+
            "20 DataSet     - Done<br>"+
            "50 DataSet     - Done<br>"+
            "100 DataSet    - ";
    }else if (dataSet==="100"){
        str =
            "1 DataSet      - Done<br>"+
            "10 DataSet     - Done<br>"+
            "20 DataSet     - Done<br>"+
            "50 DataSet     - Done<br>"+
            "100 DataSet    - Done<br>";
    }
    document.getElementById(type+"Time").innerHTML = str;

    let elem = document.getElementById("myBar");
    currentProgressBarWidth+=100/15;
    elem.style.width = currentProgressBarWidth + '%';
    elem.innerHTML = Math.round(parseInt(elem.style.width))+ '%';

}


function addTimeAndSizeDetails(type, contentSize, count, timeOfRequest, responseTime, deSerializationTime, totalTimeOfAllIterations, totalResponseTimeOfAllIterations, totalDeSerialization) {

    if (type === "HTML") {
        $("#HTMLTime").html(
            "Content Size = " + contentSize + "<br>" +
            "Request #" + count + "  - Time of Request/Response = " + responseTime + " Milli seconds <br>" +
            "Average per Request/Response= " + (totalResponseTimeOfAllIterations / count) + " Milli seconds" + "<br><br>" +

            "Request #" + count + "  - Time of De-Serialization = " + deSerializationTime + " Milli seconds <br>" +
            "Average per De-Serialization= " + (totalDeSerialization / count) + " Milli seconds" + "<br><br>" +

            "Request #" + count + "  - Total Time = " + timeOfRequest + " Milli seconds <br>" +
            "Average per Total Time= " + (totalTimeOfAllIterations / count) + " Milli seconds");
    }
    else if (type === "JSON") {
        $("#JSONTime").html(
            "Content Size = " + contentSize + "<br>" +
            "Request #" + count + "  - Time of Request/Response = " + responseTime + " Milli seconds <br>" +
            "Average per Request/Response= " + (totalResponseTimeOfAllIterations / count) + " Milli seconds" + "<br><br>" +

            "Request #" + count + "  - Time of De-Serialization = " + deSerializationTime + " Milli seconds <br>" +
            "Average per De-Serialization= " + (totalDeSerialization / count) + " Milli seconds" + "<br><br>" +

            "Request #" + count + "  - Total Time = " + timeOfRequest + " Milli seconds <br>" +
            "Average per Total Time= " + (totalTimeOfAllIterations / count) + " Milli seconds");

    } else if (type === "HTON") {
        $("#HTONTime").html(
            "Content Size = " + contentSize + "<br>" +
            "Request #" + count + "  - Time of Request/Response = " + responseTime + " Milli seconds <br>" +
            "Average per Request/Response= " + (totalResponseTimeOfAllIterations / count) + " Milli seconds" + "<br><br>" +

            "Request #" + count + "  - Time of De-Serialization = " + deSerializationTime + " Milli seconds <br>" +
            "Average per De-Serialization= " + (totalDeSerialization / count) + " Milli seconds" + "<br><br>" +

            "Request #" + count + "  - Total Time = " + timeOfRequest + " Milli seconds <br>" +
            "Average per Total Time= " + (totalTimeOfAllIterations / count) + " Milli seconds");
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


function GetSerializationTime(timeStamp, iterations,responseTimeObj, timeOfIterationsObj, deSerializationObj) {
    let serializationObj={};
    $.ajax({

        url: "PHP/Statistics.php?timeStamp=" + timeStamp + "&iterations=" + iterations,
        success: function (result, status, request) {
            let serializationTimeAll = JSON.parse(result);
            for (let j=0; j<5;j++){
                let dataSet = Object.keys(serializationTimeAll)[j];

                for (let i=0; i<3;i++){
                    let dataSetVal =serializationTimeAll[dataSet][i];
                    let type = Object.keys(dataSetVal)[0];
                    let values = dataSetVal[type];
                    let total=0;
                    for (let k=0; k<values.length;k++){
                        total+=values[k];
                    }
                    let average = total/values.length;

                    if (serializationObj.hasOwnProperty(dataSet)){
                        serializationObj[dataSet][type]= average;
                    }else{
                        let a = {};
                        a[type] = average;
                        serializationObj[dataSet] = a;
                    }
                }
            }
            ShowSummary(responseTimeObj, timeOfIterationsObj, deSerializationObj,serializationObj);

        }
    });
}

function ShowSummary(responseTimeObj, timeOfIterationsObj, deSerializationObj,serializationObj){
    $("#Notify").html("<h2><span style='color: green'>Results</span></h2>");
    for(let dataSet in serializationObj){
        let value = serializationObj[dataSet];
        let valueArray = [
            value["HTML"]*1000000,
            value["JSON"]*1000000,
            value["HTON"]*1000000
        ];
        let elementId = dataSet+"Serialization";
        bar(elementId,valueArray,"Serialization Time in Pico Seconds")
    }

    for(let dataSet in deSerializationObj){
        let value = deSerializationObj[dataSet];
        let valueArray = [
            value["HTML"],
            value["JSON"],
            value["HTON"]
        ];
        let elementId = dataSet+"De-Serialization";
        bar(elementId,valueArray,"De-Serialization Time in Milli Seconds")
    }
    for(let dataSet in responseTimeObj){
        let value = responseTimeObj[dataSet];
        let valueArray = [
            value["HTML"],
            value["JSON"],
            value["HTON"]
        ];
        let elementId = dataSet+"RequestResponse";
        bar(elementId,valueArray,"Request Response Time in Milli Seconds")
    }
    for(let dataSet in timeOfIterationsObj){
        let value = timeOfIterationsObj[dataSet];
        let valueArray = [
            value["HTML"],
            value["JSON"],
            value["HTON"]
        ];
        let elementId = dataSet+"TotalCom";
        bar(elementId,valueArray,"Total Time in Milli Seconds")
    }
}

function bar(elementId,dataArray,label) {
    let ctx = document.getElementById(elementId).getContext('2d');
    // ctx.canvas.parentNode.style.height = '50vw';
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["HTML","JSON","HTON"],
            datasets: [{
                label: label,
                data: dataArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.85)',
                    'rgba(54, 162, 235, 0.85)',
                    'rgba(255, 206, 86, 0.85)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: .5
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
