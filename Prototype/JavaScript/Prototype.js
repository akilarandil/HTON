function generateHTML() {
    let fromInput = document.getElementById("inputHTONString").value;
    HTON.convertAndAppendToDOM("actualOutput", fromInput);

    // $("#inputHTONString").height( $("#inputHTONString")[0].scrollHeight );
}

$(function () {
    new Clipboard('.btn');
});

$(document).ready(function () {
    let idArray = [
        "expectedResult",
        "serverSideCode",
        "HTONString",
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