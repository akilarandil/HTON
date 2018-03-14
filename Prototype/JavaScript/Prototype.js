function generateHTML() {
    let fromInput = document.getElementById("inputHTMLEncoderString").value;
    HTON.convertAndAppendToDOM("actualOutput", fromInput);

    // $("#inputHTMLEncoderString").height( $("#inputHTMLEncoderString")[0].scrollHeight );
}

$(function () {
    new Clipboard('.btn');
});

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
                HTON.convertAndAppendToDOM(id, result);
            },
            complete: function (x, y) {
                $(document).ready(function () {
                    $('code').each(function (i, block) {
                        hljs.highlightBlock(block);
                    });
                });
            }
        });
    }
});