function generateHTML() {
    let fromInput = document.getElementById("inputHTMLEncoderString").value;
    HTMLEncoder.GetAndAppend("actualOutput", fromInput);
}

$(document).ready(function () {
    let idArray = [
        "expectedResult",
        "serverSideCode",
        "HTMLEncoderString",
        "frontEndCode"
    ];

    for (let i = 0; i < idArray.length; i++) {
        let id = idArray[i];
        $.ajax({
            url: "PHP/Prototype.php?id=" + id,
            success: function (result) {
                // console.log(result);
                HTMLEncoder.GetAndAppend(id, result);
            }
        });
    }
});