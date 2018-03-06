/**
 * HTMLEncoder.js
 * @summary A library to convert a HTMLEncoder data structure value to an HTML string. This reduces the workload in
 * client-end since it eliminates the extraction and data manipulation that is to be done in order to create an
 * HTML string
 * @version 1.0
 * @author Akila R. Hettiarachchi
 * @since 1.0
 * @link https://github.com/akilarandil/HTMLEncoder
 *
 * Public Domain
 * This document can be minified before use.
 *
 * The user may use the following methods to get the HTML string from an HTMLEncoder data format value
 *
 *     @code HTMLEncoder.GetHTMLSnippet(data)
 *
 *     @code HTMLEncoder.Decode(data) -- Use this only if the data is already processed to an object/array with proper values and structuring
 *
 * If the use desires to append the data to the DOM, use
 *
 *     @code HTMLEncoder.AppendToDOM(elementId, HTMLString)
 *
 * If the user desires to decode the HTMLEncoder data and append the resulted HTML string directly, use
 *
 *     @code HTMLEncoder.GetAndAppend(elementID,data)
 *
 * If the user desires to have only the JavaScript Object/Array, use,
 *
 *     @code HTMLEncoder.DeSerialize(data)
 *
 * If the user desires to have a JSON structure converted from the HTMLEncoder data type, use
 *
 *     @code HTMLEncoder.ConvertToJSONString(HTMLEncoderData)
 *
 */

/**
 * An intrinsic object that provides functions to De-serialize, Decode and
 * Append to DOM an HTMLEncoder data format value.
 * @since 1.0
 */
let HTMLEncoder = {};

/**
 * Returns the decoded data as an HTML string based on the parsed data
 * @param data HTMLEncoder data
 * @returns {string} HTML String
 * @constructor
 * @since 1.0
 */
HTMLEncoder.GetHTMLSnippet = function (data) {
    let deserializeData = HTMLEncoder.DeSerialize(data);
    return HTMLEncoder.Decode(deserializeData);
};

/**
 * Appends the HTML data to the specified element ID.
 * It is a wrapper to the native method document.getElementById()
 * @param elementId element ID
 * @param HTMLString the HTML string
 * @constructor
 * @since 1.0
 */
HTMLEncoder.AppendToDOM = function (elementId, HTMLString) {
    document.getElementById(elementId).innerHTML = HTMLString;
};

/**
 * Decodes the HTMLEncoder data and directly appends it to the DOM
 * @param elementID element ID
 * @param data HTMLEncoder data
 * @constructor
 * @since 1.0
 */
HTMLEncoder.GetAndAppend = function (elementID, data) {
    HTMLEncoder.AppendToDOM(
        elementID,
        HTMLEncoder.GetHTMLSnippet(data))
};

/**
 * The decoding algorithm which converts the de-serialized HTMLEncoder
 * data (javascript Object/Array) to an HTML string
 * @param data de-serialized HTMLEncoder data (javascript Object/Array)
 * @constructor
 * @return {string} the HTML string
 * @since 1.0
 */
HTMLEncoder.Decode = function (data) {
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
            let valueOfKey = data[key]; // contains val and attr
            let value = valueOfKey["val"];
            if (value === undefined) { //val keyword must exist. If not, an exception will be thrown
                throw "Cannot find val"
            }
            htmlSnippetStr += ReturnHTMLOpenString(key, valueOfKey);
            elementStack.push('</' + key + '>');
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

            let valueOfKey = data[at - 1][key];
            let value = valueOfKey["val"];
            if (value === undefined) { //val keyword must exist. If not, an exception will be thrown
                throw "Cannot find val";
            }
            htmlSnippetStr += ReturnHTMLOpenString(key, valueOfKey);
            elementStack.push('</' + key + '>');
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
     * @param value the value that is specified to be within the scope of the HTML element
     * @returns {string} opening HTML element
     * @constructor
     */
    let ReturnHTMLOpenString = function (element, value) {
        let attr = value["attr"];
        let openTag = "<" + element;
        if (attr === undefined) { // //if attr doesn't exist, return the naked HTML opening tag
            return openTag + ">";
        }
        let length = attr.length;
        let at = 0;
        let iterateAttributes = function () {
            if (at === length) { // array reached end
                return;
            }
            let key = Object.keys(attr[at])[0];
            let val = attr[at][key];
            openTag += " " + key + "=" + val;
            at++;
            iterateAttributes();
        };
        iterateAttributes();
        return openTag + ">";
    };
    convertDataToHTMLString(data);
    return htmlSnippetStr;
};

/**
 * The de-serializing algorithm which converts the raw HTMLEncoder data
 * to a javascript Object/Array. This algorithm is based on the
 * JSON.Parse algorithm by the creator of JSON, Douglas Crockford. The original
 * algorithm has been modified to support the use of the HTMLEncoder data structure.
 *
 * @link https://github.com/douglascrockford/JSON-js The original JSON.Parse algorithm
 * @param data raw HTMLEncoder data
 * @returns {*} javascript Object/Array
 * @constructor
 * @since 1.0
 */
HTMLEncoder.DeSerialize = function (data) {
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
    var white = function () {
        while (ch && ch <= " ") {
            next();
        }
    };

    //Returns the function relevant to the type of the character
    let value = function () {
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
    //Function for creating a JavaScriptLibrary Object
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
    //Function for creating a JavaScriptLibrary Array
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
        '\\': '\\',
        '"': "\""
    };
    // Function for creating a string with double quotations
    let stringQuotes = function () {
        next();
        let str = '';
        let iterate = function () {
            if (ch !== undefined) {
                if (ch === '"' && next() === ">") { //string end reached (double quotations)
                    // next();
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
 * Converts the HTMLEncoder data to a JavaScriptLibrary Object Notation (JSON) string.
 * @param HTMLEncoderData HTMLEncoder data
 * @constructor
 * @return {string} a JavaScriptLibrary Object Notation (JSON) string
 * @since 1.0
 */
HTMLEncoder.ConvertToJSONString = function (HTMLEncoderData) {
    return JSON.stringify(HTMLEncoder.DeSerialize(HTMLEncoderData));
};