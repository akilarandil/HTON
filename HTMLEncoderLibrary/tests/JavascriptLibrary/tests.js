const {test} = QUnit;
QUnit.module("De-Serializing Algorithm", () => {
    test("De-Serialize with attributes", t => {
        let htmlEncoderStr = '[<table id=personTable class="table table-hover table-dark table-bordered":[<tr:[<th:Name>,<th:Age>,<th:City>]>]>]';
        let expectedResult = [
            {
                "table id=personTable class=\"table table-hover table-dark table-bordered\"": [
                    {
                        "tr": [
                            {"th": "Name"},
                            {"th": "Age"},
                            {"th": "City"}
                        ]
                    }
                ]
            }
        ];
        let actualResult = HTMLEncoder.DeSerialize(htmlEncoderStr);
        console.log(actualResult);
        t.equal(QUnit.dump.parse(actualResult), QUnit.dump.parse(expectedResult), "Passed");
    });
    test("De-serialize without attributes", t => {
        let htmlEncoderStr = '[<table:[<tr:[<th:Name>,<th:Age>,<th:City>]>]>]';
        let expectedResult = [
            {
                "table": [
                    {
                        "tr": [
                            {"th": "Name"},
                            {"th": "Age"},
                            {"th": "City"}
                        ]
                    }
                ]
            }
        ];
        let actualResult = HTMLEncoder.DeSerialize(htmlEncoderStr);
        t.equal(QUnit.dump.parse(actualResult), QUnit.dump.parse(expectedResult), "Passed");
    });
    test("De-serialize with values in double quotations", t => {
        let htmlEncoderStr = '[<table:[<tr:[<th:"[Name">,<th:Age>,<th:City>]>]>]';
        let expectedResult = [
            {
                "table": [
                    {
                        "tr": [
                            {"th": "[Name"},
                            {"th": "Age"},
                            {"th": "City"}
                        ]
                    }
                ]
            }
        ];
        let actualResult = HTMLEncoder.DeSerialize(htmlEncoderStr);
        t.equal(QUnit.dump.parse(actualResult), QUnit.dump.parse(expectedResult), "Passed");
    });
    test("De-serialize with errors in the structure ", t => {
        let htmlEncoderStr = '[<table:[<tr:[<th:"[Name">,<th:Age>,<th:City>]>]';
        t.throws(
            function () {
                HTMLEncoder.DeSerialize(htmlEncoderStr);
            }, function (err) {
                return err === "Incorrect Data Structure";
            },
            "Throws Incorrect Data Structure");
    });
});

QUnit.module("Decoding Algorithm", () => {
    test("Decode with attributes", t => {
        let deserializeDataWithAttr = [
            {
                "table id=personTable class=table-class": [
                    {
                        "tr": [
                            {"th": "Name"},
                            {"th": "Age"},
                            {"th": "City"}
                        ]
                    }
                ]
            }
        ];
        let expectedResultWithAttr = '<table id=personTable class=table-class>' +
            '<tr>' +
            '<th>Name</th>' +
            '<th>Age</th>' +
            '<th>City</th>' +
            '</tr>' +
            '</table>';
        let actualResult = HTMLEncoder.Decode(deserializeDataWithAttr);
        t.equal(actualResult, expectedResultWithAttr, "Passed");
    });
    test("Decode with attributes with whitespace", t => {
        let deserializeDataWithAttr = [
            {
                "table id=personTable class=\"table table-hover table-dark table-bordered\"": [
                    {
                        "tr": [
                            {"th": "Name"},
                            {"th": "Age"},
                            {"th": "City"}
                        ]
                    }
                ]
            }
        ];
        let expectedResultWithAttr = '<table id=personTable class="table table-hover table-dark table-bordered">' +
            '<tr>' +
            '<th>Name</th>' +
            '<th>Age</th>' +
            '<th>City</th>' +
            '</tr>' +
            '</table>';
        let actualResult = HTMLEncoder.Decode(deserializeDataWithAttr);
        t.equal(actualResult, expectedResultWithAttr, "Passed");
    });

    test("Decode without attributes", t => {
        let deserializeData = [
            {
                "table": [
                    {
                        "tr": [
                            {"th": "Name"},
                            {"th": "Age"},
                            {"th": "City"}
                        ]
                    }
                ]
            }
        ];
        let expectedResult = '<table>' +
            '<tr>' +
            '<th>Name</th>' +
            '<th>Age</th>' +
            '<th>City</th>' +
            '</tr>' +
            '</table>';
        let actualResult = HTMLEncoder.Decode(deserializeData);
        t.equal(actualResult, expectedResult, "Passed");
    });

});

