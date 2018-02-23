"use strict";
let stack = [];
let htmlSnippetStr = "";
let HTMLEncoder={};
/**
 * @return {string}
 */
HTMLEncoder.GetHTMLSnippet = function(data) {
    stack = [];
    htmlSnippetStr = "";
    IterateArray(HTMLEncoder.DeSerialize(data));
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
        let value = data[key];
        htmlSnippetStr += '<'+key+'>';
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
        arr = data[at];
        at++;
    };
    let key = function () {
        nextArray();
        let ke = Object.keys(arr)[0];
        let value = arr[ke];
        htmlSnippetStr+='<'+ke+'>';
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
 * @return {string}
 */
// function ReturnElementString(element) {
//
//     let elementDictionary={
//         "!DOCTYPE":"!DOCTYPE>",
//         "a":"a>",
//         "abbr":"abbr>",
//         "acronym":"acronym>",
//         "address":"address>",
//         "applet":"applet>",
//         "area":"area>",
//         "article":"article>",
//         "aside":"aside>",
//         "audio":"audio>",
//         "b":"b>",
//         "base":"base>",
//         "basefont":"basefont>",
//         "bdi":"bdi>",
//         "bdo":"bdo>",
//         "big":"big>",
//         "blockquote":"blockquote>",
//         "body":"body>",
//         "br":"br>",
//         "button":"button>",
//         "canvas":"canvas>",
//         "caption":"caption>",
//         "center":"center>",
//         "cite":"cite>",
//         "code":"code>",
//         "col":"col>",
//         "colgroup":"colgroup>",
//         "datalist":"datalist>",
//         "dd":"dd>",
//         "del":"del>",
//         "details":"details>",
//         "dfn":"dfn>",
//         "dialog":"dialog>",
//         "dir":"dir>",
//         "div":"div>",
//         "dl":"dl>",
//         "dt":"dt>",
//         "em":"em>",
//         "embed":"embed>",
//         "fieldset":"fieldset>",
//         "figcaption":"figcaption>",
//         "figure":"figure>",
//         "font":"font>",
//         "footer":"footer>",
//         "form":"form>",
//         "frame":"frame>",
//         "frameset":"frameset>",
//         "h1":"h1>",
//         "h2":"h2>",
//         "h3":"h3>",
//         "h4":"h4>",
//         "h5":"h5>",
//         "h6":"h6>",
//         "head":"head>",
//         "header":"header>",
//         "hr":"hr>",
//         "html":"html>",
//         "i":"i>",
//         "iframe":"iframe>",
//         "img":"img>",
//         "input":"input>",
//         "ins":"ins>",
//         "kbd":"kbd>",
//         "label":"label>",
//         "legend":"legend>",
//         "li":"li>",
//         "link":"link>",
//         "main":"main>",
//         "map":"map>",
//         "mark":"mark>",
//         "menu":"menu>",
//         "menuitem":"menuitem>",
//         "meta":"meta>",
//         "meter":"meter>",
//         "nav":"nav>",
//         "noframes":"noframes>",
//         "noscript":"noscript>",
//         "object":"object>",
//         "ol":"ol>",
//         "optgroup":"optgroup>",
//         "option":"option>",
//         "output":"output>",
//         "p":"p>",
//         "param":"param>",
//         "picture":"picture>",
//         "pre":"pre>",
//         "progress":"progress>",
//         "q":"q>",
//         "rp":"rp>",
//         "rt":"rt>",
//         "ruby":"ruby>",
//         "s":"s>",
//         "samp":"samp>",
//         "script":"script>",
//         "section":"section>",
//         "select":"select>",
//         "small":"small>",
//         "source":"source>",
//         "span":"span>",
//         "strike":"strike>",
//         "strong":"strong>",
//         "style":"style>",
//         "sub":"sub>",
//         "summary":"summary>",
//         "sup":"sup>",
//         "table":"table>",
//         "tbody":"tbody>",
//         "td":"td>",
//         "template":"template>",
//         "textarea":"textarea>",
//         "tfoot":"tfoot>",
//         "th":"th>",
//         "thead":"thead>",
//         "time":"time>",
//         "title":"title>",
//         "tr":"tr>",
//         "track":"track>",
//         "tt":"tt>",
//         "u":"u>",
//         "ul":"ul>",
//         "var":"var>",
//         "video":"video>",
//         "wbr":"wbr>"
//     };
//
//     // let elementArray = [
//     //     "!DOCTYPE",
//     //     "a",
//     //     "abbr",
//     //     "acronym",
//     //     "address",
//     //     "applet",
//     //     "area",
//     //     "article",
//     //     "aside",
//     //     "audio",
//     //     "b",
//     //     "base",
//     //     "basefont",
//     //     "bdi",
//     //     "bdo",
//     //     "big",
//     //     "blockquote",
//     //     "body",
//     //     "br",
//     //     "button",
//     //     "canvas",
//     //     "caption",
//     //     "center",
//     //     "cite",
//     //     "code",
//     //     "col",
//     //     "colgroup",
//     //     "datalist",
//     //     "dd",
//     //     "del",
//     //     "details",
//     //     "dfn",
//     //     "dialog",
//     //     "dir",
//     //     "div",
//     //     "dl",
//     //     "dt",
//     //     "em",
//     //     "embed",
//     //     "fieldset",
//     //     "figcaption",
//     //     "figure",
//     //     "font",
//     //     "footer",
//     //     "form",
//     //     "frame",
//     //     "frameset",
//     //     "h1",
//     //     "h2",
//     //     "h3",
//     //     "h4",
//     //     "h5",
//     //     "h6",
//     //     "head",
//     //     "header",
//     //     "hr",
//     //     "html",
//     //     "i",
//     //     "iframe",
//     //     "img",
//     //     "input",
//     //     "ins",
//     //     "kbd",
//     //     "label",
//     //     "legend",
//     //     "li",
//     //     "link",
//     //     "main",
//     //     "map",
//     //     "mark",
//     //     "menu",
//     //     "menuitem",
//     //     "meta",
//     //     "meter",
//     //     "nav",
//     //     "noframes",
//     //     "noscript",
//     //     "object",
//     //     "ol",
//     //     "optgroup",
//     //     "option",
//     //     "output",
//     //     "p",
//     //     "param",
//     //     "picture",
//     //     "pre",
//     //     "progress",
//     //     "q",
//     //     "rp",
//     //     "rt",
//     //     "ruby",
//     //     "s",
//     //     "samp",
//     //     "script",
//     //     "section",
//     //     "select",
//     //     "small",
//     //     "source",
//     //     "span",
//     //     "strike",
//     //     "strong",
//     //     "style",
//     //     "sub",
//     //     "summary",
//     //     "sup",
//     //     "table",
//     //     "tbody",
//     //     "td",
//     //     "template",
//     //     "textarea",
//     //     "tfoot",
//     //     "th",
//     //     "thead",
//     //     "time",
//     //     "title",
//     //     "tr",
//     //     "track",
//     //     "tt",
//     //     "u",
//     //     "ul",
//     //     "var",
//     //     "video",
//     //     "wbr"
//     //
//     // ];
//
//     let value = elementDictionary[element];
//     // let value = elementArray.find(obj=> obj === element);
//     // let value =
//     if(value!==undefined){
//     //     // console.log(value);
//         return value;
//     // }
//     // if(elementArray.has(element)){
//     // if(iterate(elementArray,element)){
//     //     return element + ">";
//     }
//     throw "Invalid HTML Element - "+  element;
// }
