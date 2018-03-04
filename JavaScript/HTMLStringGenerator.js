
let stack = [];
let htmlSnippetStr = "";
let HTMLEncoder={};
/**
 * @return {string}
 */
HTMLEncoder.GetHTMLSnippet = function(data) {
    stack = [];
    htmlSnippetStr = "";
    
    let k = HTMLEncoder.DeSerialize(data);
    IterateArray(k);
    return htmlSnippetStr;
};

HTMLEncoder.AppendToDOM = function(elementId,str){
    document.getElementById(elementId).innerHTML= str;
};


HTMLEncoder.GetAndAppend = function (elementID,data) {
    HTMLEncoder.AppendToDOM(
        elementID,
        HTMLEncoder.GetHTMLSnippet(data))
};

function IterateArray(data) {

    
    let key;
    let arrLength = data.length;
    if (arrLength === undefined) {
        key = Object.keys(data)[0];
        let v = data[key];
        let value = v["val"];
        htmlSnippetStr += ReturnHTMLOpenString(key,v);
        stack.push('</' + key+'>');
        if (typeof value !== "object") {
            htmlSnippetStr += value;
            htmlSnippetStr +=stack.pop();
        } else {
            IterateArray(value);
        }
        if (stack.length > 0) {
            htmlSnippetStr +=stack.pop();
        }
    } else {


        elsee(data, arrLength);
        if (stack.length > 0) {
            htmlSnippetStr +=stack.pop();
        }

    }

}

function elsee(data, arrLength) {
    let at;
    let arr;
    let nextArray = function () {
        if(at === arrLength){return}

        arr = data[at];
        at++;
    };
    let key = function () {
        nextArray();
        if( arr instanceof Array){
            IterateArray(arr);
            nextArray();

            return elsee(arr,arrLength);
        }
        let ke = Object.keys(arr)[0];
        
        let v = data[at-1][ke];
        let value = v["val"];
        htmlSnippetStr += ReturnHTMLOpenString(ke,v);
        stack.push('</' + ke+'>');
        if (typeof value !== "object") {
            htmlSnippetStr +=value;
            htmlSnippetStr +=stack.pop();
        } else {
            IterateArray(value);
        }
        if (arrLength === at) {
            return;
        }
        return key();
    };
    at = 0;
    return key();
}

HTMLEncoder.DeSerialize = function (data) {
    // 
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
        // 
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
        // 
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
        // 
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
        // 
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
    // 
    let at = 0;
    let ch = data.charAt(at);

    return value();
};

/**
 *
 * @param element
 * @param value
 * @returns {string}
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