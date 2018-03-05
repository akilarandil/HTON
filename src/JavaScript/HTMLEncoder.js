let HTMLEncoder={};

/**
 * Returns the decoded data as an HTML string based on the parsed data
 * @param data HTMLEncoder data
 * @returns {string} HTML String
 * @constructor
 */
HTMLEncoder.GetHTMLSnippet = function(data) {
    let deserializeData = HTMLEncoder.DeSerialize(data);
    return HTMLEncoder.Decode(deserializeData);
};

/**
 * Appends the HTML data to the specified element ID.
 * It is a wrapper to the native method document.getElementById()
 * @param elementId element ID
 * @param str the HTML string
 * @constructor
 */
HTMLEncoder.AppendToDOM = function (elementId, str) {
    document.getElementById(elementId).innerHTML= str;
};

/**
 * Decodes the HTMLEncoder data and directly appends it to the DOM
 * @param elementID element ID
 * @param data HTMLEncoder data
 * @constructor
 */
HTMLEncoder.GetAndAppend = function (elementID,data) {
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
 */
HTMLEncoder.Decode = function (data) {
    let elementStack = [];
    let htmlSnippetStr = "";
    let iterateData = function (data) {
        let key;
        let arrLength = data.length;
        if (arrLength === undefined) {
            key = Object.keys(data)[0];
            let valueOfKey = data[key];
            let value = valueOfKey["val"];
            htmlSnippetStr += ReturnHTMLOpenString(key, valueOfKey);
            elementStack.push('</' + key + '>');
            if (typeof value !== "object") {
                htmlSnippetStr += value;
                htmlSnippetStr += elementStack.pop();
            } else {
                iterateData(value);
            }
            if (elementStack.length > 0) {
                htmlSnippetStr += elementStack.pop();
            }
        } else {
            iterateDataForArrays(data, arrLength);
            if (elementStack.length > 0) {
                htmlSnippetStr += elementStack.pop();
            }
        }
    };
    let iterateDataForArrays = function (data, arrLength) {
        let at;
        let arr;
        let nextArray = function () {
            if (at === arrLength) {
                return
            }
            arr = data[at];
            at++;
        };
        let keyFunc = function () {
            nextArray();
            if (arr instanceof Array) {
                iterateData(arr);
                nextArray();
                return iterateDataForArrays(arr, arrLength);
            }
            let key = Object.keys(arr)[0];

            let valueOfKey = data[at - 1][key];
            let value = valueOfKey["val"];
            htmlSnippetStr += ReturnHTMLOpenString(key, valueOfKey);
            elementStack.push('</' + key + '>');
            if (typeof value !== "object") {
                htmlSnippetStr += value;
                htmlSnippetStr += elementStack.pop();
            } else {
                iterateData(value);
            }
            if (arrLength === at) {
                return;
            }
            return keyFunc();
        };
        at = 0;
        return keyFunc();
    };

    iterateData(data);
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
 */
HTMLEncoder.DeSerialize = function (data) {
    let length = data.length;
    let next = function () {
        at += 1;
        if (length === at) {
            return;
        }
        ch = data.charAt(at);
        return ch;
    };
    let error = function (message) {
        console.log(message);
        throw undefined;
    };
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
    let object = function () {
        let obj = {};
        if(ch!== '<') error('Object should start with <');
        let iterate = function (){

            if(!ch){return;}
            if (next() === '>') {
                return obj;
            }
            if (ch !== undefined && ch !== ',') {
                let k = stringWithoutQuotes();
                next();
                obj[k] = value();
                if (ch === '>') {  // object end reached
                    next();
                    return obj;
                }
            }
            return  iterate();
        };
        return iterate();
    };
    let array = function () {
        let arr = [];
        if (ch !== '[') error('array should start with [');
        let iterate = function () {
            if(!ch){return;}
            if (next() === ']') return array; // empty array
            if (ch !== undefined) {
                arr.push(value());
                if (ch === ']') { // array end reached
                    next();
                    return arr;
                }
            }
            return iterate();
        };
        return iterate();

    };
    let stringWithoutQuotes = function () {
        let str = '';
        let iterate = function () {
            if (ch !== undefined) {
                if (ch === ',' || ch === ':' || ch === '>') {
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
    let stringQuotes = function () {
        next();
        let str = '';
        let iterate = function () {
            if (ch !== undefined) {
                if(ch === '\"'){
                    next();
                    return str;
                }
                if(ch==='\\'){
                    next();
                    if(escapes.hasOwnProperty(ch)) {
                        str += escapes[ch];
                    } else {
                        str += ch;
                    }
                }else{
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
    return value();
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
function ReturnHTMLOpenString(element,value) {
    let attr = value["attr"];
    let openTag = "<"+element;
    if(attr===undefined){
        return openTag+">";
    }
    let length = attr.length;
    let at=0;
    let iterateAttributes = function () {
        if (at===length){return;}
        let key = Object.keys(attr[at])[0];
        let val = attr[at][key];
        openTag+=" "+key+"="+val;
        at++;
        iterateAttributes();
    };
    iterateAttributes();
    return openTag+">";
}