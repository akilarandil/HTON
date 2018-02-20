let stack = [];
let htmlSnippetStr = "";

/**
 * @return {string}
 */
function GetHTMLSnippet(jsonArray) {
    stack = [];
    htmlSnippetStr = "";
    // let json = ConvertToJson(jsonArray);

    // IterateArray(json);
    // IterateArray(JSON.parse(jsonArray));
    IterateArray(HTMLEncoder_Parser(jsonArray));
    return htmlSnippetStr;
}

function IterateArrayOld(jsonArray) {
    let key;
    let jsonArrayLength = jsonArray.length;
    if (typeof jsonArray.length === 'undefined') {
        key = Object.keys(jsonArray)[0];
        let value = jsonArray[key];
        let openingTag = ReturnHTMLOpenString(key, value);

        htmlSnippetStr = htmlSnippetStr.concat(openingTag);
        stack.push("</" + openingTag);
        if (typeof jsonArray[key] !== "object") {
            htmlSnippetStr = htmlSnippetStr.concat(value);
            htmlSnippetStr = htmlSnippetStr.concat(stack.pop());
        } else {
            IterateArray(value);
        }
        if (stack.length > 0) {
            htmlSnippetStr = htmlSnippetStr.concat(stack.pop());
        }
    } else {

        for (let i = 0; i < jsonArrayLength; i++) {
            if (Object.keys(jsonArray)[i] >= 0) {
                key = Object.keys(jsonArray[i])[0];
            }
            let value = jsonArray[i][key];
            let openingTag = ReturnHTMLOpenString(key, value);

            htmlSnippetStr = htmlSnippetStr.concat(openingTag);
            stack.push("</" + openingTag);
            if (typeof jsonArray[i][key] !== "object") {
                htmlSnippetStr = htmlSnippetStr.concat(value);
                htmlSnippetStr = htmlSnippetStr.concat(stack.pop());
            } else {
                IterateArray(value);
            }
        }
        if (stack.length > 0) {
            htmlSnippetStr = htmlSnippetStr.concat(stack.pop());
        }

    }

}

function IterateArray(jsonArray) {
    let key;
    let jsonArrLength = jsonArray.length;
    if (typeof jsonArrLength === 'undefined') {
        key = Object.keys(jsonArray)[0];
        let value = jsonArray[key];
        let openingTag = ReturnHTMLOpenString(key, value);

        htmlSnippetStr = htmlSnippetStr.concat(openingTag);
        stack.push("</" + openingTag);
        if (typeof value !== "object") {
            htmlSnippetStr = htmlSnippetStr.concat(value);
            htmlSnippetStr = htmlSnippetStr.concat(stack.pop());
        } else {
            IterateArray(value);
        }
        if (stack.length > 0) {
            htmlSnippetStr = htmlSnippetStr.concat(stack.pop());
        }
    } else {


        elsee(jsonArray, jsonArrLength);
        if (stack.length > 0) {
            htmlSnippetStr = htmlSnippetStr.concat(stack.pop());
        }

    }

}

function elsee(jsonArray, length) {
    let at;
    let jsonArr;
    let nextArray = function () {
        jsonArr = jsonArray[at];
        at++;
    };
    let key = function () {
        nextArray();
        let ke = Object.keys(jsonArr)[0];
        let value = jsonArr[ke];
        let openingTag = ReturnHTMLOpenString(ke, value);

        htmlSnippetStr = htmlSnippetStr.concat(openingTag);
        stack.push("</" + openingTag);
        if (typeof value !== "object") {
            htmlSnippetStr = htmlSnippetStr.concat(value);
            htmlSnippetStr = htmlSnippetStr.concat(stack.pop());
        } else {
            IterateArray(value);
        }
        if (length === at) {
            return;
        }
        key();
    };
    at = 0;
    return key();
}


function ConvertToJson(string) {
    let s = string
        .replace(/\$/g, "\"")
        .replace(/\:/g, "\":")
        .replace(/\[/g, "[{")
        .replace(/\,/g, "},")
        .replace(/\]/g, "}]")
        .replace(/\[$/g, "\"")
        .replace(/\,$/g, ",\"")
        .replace(/\:$/g, ":\"")
        .replace(/\,"/g, ",{\"")
    ;
    // console.log(s);
    let str = s.match(/[A-Za-z0-9]+}/g);
    for (let i = 0; i < str.length; i++) {
        let r = str[i].replace("}", "");
        s = s.replace(str[i], r + "\"" + "}");
    }
    // console.log("{"+s+"}");
    return JSON.parse("{" + s + "}");
}
let HTMLEncoder_Parser = function (data) {
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
            case '{':
                return object();
            case '[':
                return array();
            default:
                return string();
        }
    };
    let object = function () {

        let obj = {};

        let iterate = function (){

            if(!ch){return;}
            if (next() === '}') {
                return obj;
            }
            if (ch !== 'undefined' && ch !== ',') {
                let key = string();
                next();
                obj[key] = value();
                if (ch === '}') {  // object end reached
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
            if (ch !== 'undefined') {
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

    let string = function () {

        let str = '';
        let iterate = function () {

            if(!ch){return;}

            if (ch !== 'undefined') {
                if (ch === ',' || ch === ':' || ch === '}') {
                    return str;
                }
                str += ch;
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

let HTMLEncoder_Parser1 = function (data) {

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
            case '{':
                return object();
            case '[':
                return array();
            default:
                return string();
        }
    };
    let object = function () {

        let obj = {};

        do {

            if (next() === '}') {
                return obj;
            }
            if (ch !== 'undefined' && ch !== ',') {
                var key = string();
                next();
                obj[key] = value();
                if (ch === '}') {  // object end reached
                    next();
                    return obj;
                }
            }
        } while (ch);

    };
    let array = function () {

        let arr = [];
        if (ch !== '[') error('array should start with [');
        do {

            if (next() === ']') return array; // empty array
            if (ch !== 'undefined') {
                arr.push(value());
                if (ch === ']') { // array end reached
                    next();
                    return arr;
                }
            }

        } while (ch);

    };

    let string = function () {

        let str = '';
        while (ch) {

            if (ch !== 'undefined') {
                if (ch === ',' || ch === ':' || ch === '}') {
                    return str;
                }
                str += ch;
                next();
            }
        }

    };
    let at = 0;
    let ch = data.charAt(at);

    return value();
};
