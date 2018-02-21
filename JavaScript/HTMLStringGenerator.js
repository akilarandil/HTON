let stack = [];
let htmlSnippetStr = "";

/**
 * @return {string}
 */
function GetHTMLSnippet(jsonArray) {
    stack = [];
    htmlSnippetStr = "";
    IterateArray(HTMLEncoder_Parser(jsonArray));
    return htmlSnippetStr;
}


function IterateArray(jsonArray) {
    let key;
    let jsonArrLength = jsonArray.length;
    if (typeof jsonArrLength === 'undefined') {
        key = Object.keys(jsonArray)[0];
        let value = jsonArray[key];
        let openingTag = ReturnHTMLOpenString(key);

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
        let openingTag = ReturnHTMLOpenString(ke);

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

function ReturnElementString(element) {

    let elementDictionary={
        "!DOCTYPE":"!DOCTYPE>",

        "a":"a>",

        "abbr":"abbr>",

        "acronym":"acronym>",

        "address":"address>",

        "applet":"applet>",

        "area":"area>",

        "article":"article>",

        "aside":"aside>",

        "audio":"audio>",

        "b":"b>",

        "base":"base>",

        "basefont":"basefont>",

        "bdi":"bdi>",

        "bdo":"bdo>",

        "big":"big>",

        "blockquote":"blockquote>",

        "body":"body>",

        "br":"br>",

        "button":"button>",

        "canvas":"canvas>",

        "caption":"caption>",

        "center":"center>",

        "cite":"cite>",

        "code":"code>",

        "col":"col>",

        "colgroup":"colgroup>",

        "datalist":"datalist>",

        "dd":"dd>",

        "del":"del>",

        "details":"details>",

        "dfn":"dfn>",

        "dialog":"dialog>",

        "dir":"dir>",

        "div":"div>",

        "dl":"dl>",

        "dt":"dt>",

        "em":"em>",

        "embed":"embed>",

        "fieldset":"fieldset>",

        "figcaption":"figcaption>",

        "figure":"figure>",

        "font":"font>",

        "footer":"footer>",

        "form":"form>",

        "frame":"frame>",

        "frameset":"frameset>",

        "h1":"h1>",

        "h2":"h2>",

        "h3":"h3>",

        "h4":"h4>",

        "h5":"h5>",

        "h6":"h6>",

        "head":"head>",

        "header":"header>",

        "hr":"hr>",

        "html":"html>",

        "i":"i>",

        "iframe":"iframe>",

        "img":"img>",

        "input":"input>",

        "ins":"ins>",

        "kbd":"kbd>",

        "label":"label>",

        "legend":"legend>",

        "li":"li>",

        "link":"link>",

        "main":"main>",

        "map":"map>",

        "mark":"mark>",

        "menu":"menu>",

        "menuitem":"menuitem>",

        "meta":"meta>",

        "meter":"meter>",

        "nav":"nav>",

        "noframes":"noframes>",

        "noscript":"noscript>",

        "object":"object>",

        "ol":"ol>",

        "optgroup":"optgroup>",

        "option":"option>",

        "output":"output>",

        "p":"p>",

        "param":"param>",

        "picture":"picture>",

        "pre":"pre>",

        "progress":"progress>",

        "q":"q>",

        "rp":"rp>",

        "rt":"rt>",

        "ruby":"ruby>",

        "s":"s>",

        "samp":"samp>",

        "script":"script>",

        "section":"section>",

        "select":"select>",

        "small":"small>",

        "source":"source>",

        "span":"span>",

        "strike":"strike>",

        "strong":"strong>",

        "style":"style>",

        "sub":"sub>",

        "summary":"summary>",

        "sup":"sup>",

        "table":"table>",

        "tbody":"tbody>",

        "td":"td>",

        "template":"template>",

        "textarea":"textarea>",

        "tfoot":"tfoot>",

        "th":"th>",

        "thead":"thead>",

        "time":"time>",

        "title":"title>",

        "tr":"tr>",

        "track":"track>",

        "tt":"tt>",

        "u":"u>",

        "ul":"ul>",

        "var":"var>",

        "video":"video>",

        "wbr":"wbr>"

    };

    return elementDictionary[element];
}
/**
 * @return {string}
 */
function ReturnHTMLOpenString(htmlElement){

    return "<"+ReturnElementString(htmlElement);


}
