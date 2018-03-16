/**
 * HTON.js
 *
 * @summary A library to convert a HTON data structure value to an HTML string. This reduces the workload in
 * client-end since it eliminates the extraction and data manipulation that is to be done in order to create an
 * HTML string.
 *
 * @version 1.0
 * @author Akila R. Hettiarachchi
 * @since 1.0
 * @link https://github.com/akilarandil/HTON
 *
 * Public Domain
 * This document can be minified before use.
 *
 * The user may use the following methods to get the HTML string from an HTON data format value
 *
 *     @code HTON.convertToHTML(data)
 *
 *     @code HTON.decode(data) -- Use this only if the data is already processed to an object/array with proper values and structuring
 *
 * If the use desires to append the data to the DOM, use
 *
 *     @code HTON.appendToDOM(elementId, HTMLString)
 *
 * If the user desires to decode the HTON data and append the resulted HTML string directly, use
 *
 *     @code HTON.convertAndAppendToDOM(elementID,data)
 *
 * If the user desires to have only the JavaScript Object/Array, use,
 *
 *     @code HTON.deSerialize(data)
 *
 * If the user desires to have a JSON structure converted from the HTON data type, use
 *
 *     @code HTON.convertToJSONString(HTONData)
 *
 */

/**
 * An intrinsic object that provides functions to De-serialize, decode and
 * Append to DOM an HTON data format value.
 * @since 1.0
 */
let HTON = {};

/**
 * Returns the decoded data as an HTML string based on the parsed data
 * @param data HTON data
 * @returns {string} HTML String
 * @constructor
 * @since 1.0
 */
HTON.convertToHTML = function (data) {
    let deserializeData = HTON.deSerialize(data);
    return HTON.decode(deserializeData);
};

/**
 * Appends the HTML data to the specified element ID.
 * It is a wrapper to the native method document.getElementById()
 * @param elementId element ID
 * @param HTMLString the HTML string
 * @constructor
 * @since 1.0
 */
HTON.appendToDOM = function (elementId, HTMLString) {
    document.getElementById(elementId).innerHTML = HTMLString;
};

/**
 * Decodes the HTON data and directly appends it to the DOM
 * @param elementID element ID
 * @param data HTON data
 * @constructor
 * @since 1.0
 */
HTON.convertAndAppendToDOM = function (elementID, data) {
    HTON.appendToDOM(
        elementID,
        HTON.convertToHTML(data))
};

/**
 * The decoding algorithm which converts the de-serialized HTON
 * data (javascript Object/Array) to an HTML string
 * @param data de-serialized HTON data (javascript Object/Array)
 * @constructor
 * @return {string} the HTML string
 * @since 1.0
 */
HTON.decode = function (data) {
    let elementStack = [];
    let htmlSnippetStr = "";

    /**
     * Algorithm for converting a JavaScriptLibrary Object/Array to an HTML String
     * @param data JavaScriptLibrary Object
     */
    let convertDataToHTMLString = function (data) {
        let arrLength = data.length;
        if (arrLength === undefined) { // a JavaScriptLibrary Object
            let key = Object.keys(data)[0];
            let value = data[key]; // contains value
            let htmlOpenTagObj = returnHTMLOpenString(key);
            htmlSnippetStr += htmlOpenTagObj["openTag"];
            elementStack.push('</' + htmlOpenTagObj["element"] + '>');
            if (typeof value !== "object") { //if the value is only a string
                htmlSnippetStr += value;
                htmlSnippetStr += elementStack.pop();
            } else {
                convertDataToHTMLString(value);
            }
            if (elementStack.length > 0) {
                htmlSnippetStr += elementStack.pop();
            }
        } else {
            convertArrayToHTMLString(data, arrLength);
            if (elementStack.length > 0) {
                htmlSnippetStr += elementStack.pop();
            }
        }
    };

    /**
     * Algorithm for converting a JavaScriptLibrary Array to an HTML string
     * @param data JavaScriptLibrary Array
     * @param arrLength length of data
     * @returns {*}
     */
    let convertArrayToHTMLString = function (data, arrLength) {
        let at;
        let arr;

        //Goes to the next array of data
        let nextArray = function () {
            if (at === arrLength) {
                return
            }
            arr = data[at];
            at++;
        };
        //Iterates through the array
        let iterate = function () {
            nextArray();
            if (arr instanceof Array) {
                convertDataToHTMLString(arr);
                nextArray();
                return convertArrayToHTMLString(arr, arrLength);
            }
            let key = Object.keys(arr)[0];

            let value = data[at - 1][key];
            let htmlOpenTagObj = returnHTMLOpenString(key);
            htmlSnippetStr += htmlOpenTagObj["openTag"];
            elementStack.push('</' + htmlOpenTagObj["element"] + '>');
            if (typeof value !== "object") { //if the value is only a string
                htmlSnippetStr += value;
                htmlSnippetStr += elementStack.pop();
            } else {
                convertDataToHTMLString(value);
            }
            if (arrLength === at) {//end of array reached
                return;
            }
            return iterate();
        };
        at = 0;
        return iterate();
    };

    /**
     * Returns the HTML element as an opening tag with or without the
     * specified attributes
     *
     * @param element HTML element
     * @returns {{element: string, openTag: string}} key represents the element name whereas openTag represents the opening tag with attributes
     * @constructor
     */
    let returnHTMLOpenString = function (element) {
        let length = element.length;
        let elemKey = '';
        let openTag = '';
        let firstWhiteSpace = false;
        let hasWhiteSpace = false;
        let iterate = function (element) {
            let ch, at;
            //Goes to the next character of the data stream
            let next = function () {
                at += 1;
                if (length === at) {
                    return;
                }
                ch = element.charAt(at);
                return ch;
            };

            let keyAttributation = function () {
                if (!firstWhiteSpace && element.charAt(at + 1) === " ") {
                    openTag += ch;
                    elemKey = openTag;
                    firstWhiteSpace = true;
                    hasWhiteSpace = true;
                    next();
                }
                if (ch === "=") {
                    openTag += "=";
                    next();
                }
                openTag += ch;
                next();
                if (length === at) {
                    if (!firstWhiteSpace && !hasWhiteSpace) {
                        elemKey = openTag;
                    }
                    return;
                }
                keyAttributation();
            };
            at = 0;
            ch = element.charAt(at);
            return keyAttributation();
        };
        iterate(element);
        return {"element": elemKey, "openTag": "<" + openTag + ">"};

    };
    convertDataToHTMLString(data);
    return htmlSnippetStr;
};

/**
 * The de-serializing algorithm which converts the raw HTON data
 * to a javascript Object/Array. This algorithm is based on the
 * JSON.Parse algorithm by the creator of JSON, Douglas Crockford. The original
 * algorithm has been modified to support the use of the HTON data structure.
 *
 * @link https://github.com/douglascrockford/JSON-js The original JSON.Parse algorithm
 * @param data raw HTON data
 * @returns {*} javascript Object/Array
 * @constructor
 * @since 1.0
 */
HTON.deSerialize = function (data) {
    let length = data.length;

    //Goes to the next character of the data stream
    let next = function () {
        at += 1;
        if (length === at) {
            return;
        }
        ch = data.charAt(at);
        return ch;
    };
    //Function for throwing custom errors
    let error = function (message) {
        console.log(message);
        throw message;
    };

    // Skip whitespace.
    let white = function () {
        while (ch && ch <= " ") {
            next();
        }
    };

    //Returns the function relevant to the type of the character
    let value = function () {
        white();
        switch (ch) {
            case '<':
                return object();
            case '[':
                return array();
            case '"':
                return stringQuotes();
            default:
                return stringWithoutQuotes();
        }
    };
    //Function for creating a JavaScript Object
    let object = function () {
        let obj = {};
        if (ch !== '<') error('Object should start with <');
        let iterate = function () {
            if (!ch) { // No more characters to go
                return;
            }
            if (next() === '>') {// empty object
                white();
                return obj;
            }
            white();
            if (ch !== undefined && ch !== ',') { //has more characters to go

                let k = stringWithoutQuotes();
                next();
                white();
                obj[k] = value();
                if (ch === '>') {  // object end reached
                    next();
                    white();
                    return obj;
                }
            }
            return iterate();
        };
        return iterate();
    };
    //Function for creating a JavaScript Array
    let array = function () {
        let arr = [];
        if (ch !== '[') error('array should start with [');
        let iterate = function () {
            if (!ch) {  // No more characters to go
                return;
            }
            if (next() === ']') {
                white();
                return array;
            }// empty array
            white();
            if (ch !== undefined) {
                arr.push(value());
                if (ch === ']') { // array end reached
                    next();
                    white();
                    return arr;
                }
            }
            return iterate();
        };
        return iterate();

    };
    // Function for creating a string without double quotations
    let stringWithoutQuotes = function () {
        let str = '';
        let iterate = function () {
            if (ch !== undefined) { //has more characters to go
                if (ch === ',' || ch === ':' || ch === '>') { // string end reached
                    return str;
                }
                str += ch;
                next();
            }
            return iterate();
        };
        return iterate();

    };
    let escapes = { // helper variable
        'b': '\b',
        'n': '\n',
        't': '\t',
        'r': '\r',
        'f': '\f',
        '\"': '\"',
        '\\': '\\'
    };
    // Function for creating a string with double quotations
    let stringQuotes = function () {
        next();
        let str = '';
        let iterate = function () {
            if (ch !== undefined) {
                if (ch === '"') { //string end reached (double quotations)
                    next();
                    return str;
                }
                if (ch === '\\') {
                    next();
                    if (escapes.hasOwnProperty(ch)) { //contains escape characters
                        str += escapes[ch];
                    } else {
                        str += ch;
                    }
                } else {
                    str += ch;
                }
                next();
            }
            return iterate();
        };
        return iterate();
    };
    let at = 0;
    let ch = data.charAt(at);
    try {
        return value();
    } catch (ex) {
        if ("Maximum call stack size exceeded" === ex.message) {
            throw "Incorrect Data Structure";
        } else {
            throw ex;
        }
    }
};

/**
 * Converts the HTON data to a JavaScriptLibrary Object Notation (JSON) string.
 * @param HTONData HTON data
 * @constructor
 * @return {string} a JavaScriptLibrary Object Notation (JSON) string
 * @since 1.0
 */
HTON.convertToJSONString = function (HTONData) {
    return JSON.stringify(HTON.deSerialize(HTONData));
};