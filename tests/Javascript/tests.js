const {test} = QUnit;
QUnit.module("De-Serializing Algorithm", () => {
    test("De-Serialize with attributes", t => {
        let htmlEncoderStr = '[<table:<val:[<tr:<val:[<th:<val:Name>>,<th:<val:Age>>,<th:<val:City>>]>>],attr:[<id:personTable>,<class:table-class>]>>]';
        let expectedResult = [
            {
                "table": {
                    "val": [
                        {
                            "tr": {
                                "val": [
                                    {"th": {"val": "Name"}},
                                    {"th": {"val": "Age"}},
                                    {"th": {"val": "City"}}
                                ]
                            }
                        }
                    ],
                    "attr": [
                        {"id": "personTable"},
                        {"class": "table-class"}
                    ]
                }
            }
        ];
        let actualResult = HTMLEncoder.DeSerialize(htmlEncoderStr);
        t.equal(QUnit.dump.parse(actualResult), QUnit.dump.parse(expectedResult), "Passed");
    });
    test("De-serialize without attributes", t => {
        let htmlEncoderStr = '[<table:<val:[<tr:<val:[<th:<val:Name>>,<th:<val:Age>>,<th:<val:City>>]>>]>>]';
        let expectedResult = [
            {
                "table": {
                    "val": [
                        {
                            "tr": {
                                "val": [
                                    {"th": {"val": "Name"}},
                                    {"th": {"val": "Age"}},
                                    {"th": {"val": "City"}}
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        let actualResult = HTMLEncoder.DeSerialize(htmlEncoderStr);
        t.equal(QUnit.dump.parse(actualResult), QUnit.dump.parse(expectedResult), "Passed");
    });
    test("De-serialize with errors in the structure ", t => {
        let htmlEncoderStr = '[table:<val:[<tr:<val:[<th:<val:Name>>,<th:<val:Age>>,<th:<val:City>>>>]>>]';
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
                "table": {
                    "val": [
                        {
                            "tr": {
                                "val": [
                                    {"th": {"val": "Name"}},
                                    {"th": {"val": "Age"}},
                                    {"th": {"val": "City"}}
                                ]
                            }
                        }
                    ],
                    "attr": [
                        {"id": "personTable"},
                        {"class": "table-class"}
                    ]
                }
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

    test("Decode without attributes", t => {
        let deserializeData = [
            {
                "table": {
                    "val": [
                        {
                            "tr": {
                                "val": [
                                    {"th": {"val": "Name"}},
                                    {"th": {"val": "Age"}},
                                    {"th": {"val": "City"}}
                                ]
                            }
                        }
                    ]
                }
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

    test("Decode with errors (without the val keyword)", t => {
        let deserializeData = [
            {
                "table":
                    {
                        "tr": {
                            "val": [
                                {"th": {"val": "Name"}},
                                {"th": {"val": "Age"}},
                                {"th": {"val": "City"}}
                            ]
                        }


                    }
            }
        ];
        t.throws(function () {
            HTMLEncoder.Decode(deserializeData);
        }, function (err) {
            return err === "Cannot find val";
        }, "Passed");
    });
});

