<?php
/**
 * Created by PhpStorm.
 * User: akilarhettiarachchi
 * Date: 2/21/18
 * Time: 9:44 PM
 */
class HTMLEncoder
{
    private $str="";
    private $escapes = array(
        '[',
        '<',
        ':',
        ']',
        '>'
    );
    public function sendToClient($array)
    {
        $this->recursiveCheck((object) $array);
        echo $this->str;
    }

    function recursiveCheck($data)
    {
        if (is_string($data)) {
            if($this->match($this->escapes,$data)){
                $this->str .= '"'.$data.'"';
            }else{
                $this->str .= $data;
            }
        } else if (is_array($data)) {
            $this->str .= '[';
            foreach ($data as $key => $value) {
                $this->recursiveCheck((object)$value);
                if (next($data) != null) {
                    $this->str .= ",";
                }
            }
            $this->str .= ']';
        } else if (is_object($data)) {
            foreach ($data as $key => $value) {
                $this->str .= '<' . $key . ':';
                $this->recursiveCheck($value);
                $this->str .= '>';
            }
        }
    }


    function match($chArray, $string)
    {
        foreach($chArray as $ch){
            if (strpos($string, $ch) !== false) {
                return true;
            }
        }
        return false;
    }

    function ValidateElement($key){
        $elements = array(
            "!DOCTYPE",
            "a",
            "abbr",
            "acronym",
            "address",
            "applet",
            "area",
            "article",
            "aside",
            "audio",
            "b",
            "base",
            "basefont",
            "bdi",
            "bdo",
            "big",
            "blockquote",
            "body",
            "br",
            "button",
            "canvas",
            "caption",
            "center",
            "cite",
            "code",
            "col",
            "colgroup",
            "datalist",
            "dd",
            "del",
            "details",
            "dfn",
            "dialog",
            "dir",
            "div",
            "dl",
            "dt",
            "em",
            "embed",
            "fieldset",
            "figcaption",
            "figure",
            "font",
            "footer",
            "form",
            "frame",
            "frameset",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "head",
            "header",
            "hr",
            "html",
            "i",
            "iframe",
            "img",
            "input",
            "ins",
            "kbd",
            "label",
            "legend",
            "li",
            "link",
            "main",
            "map",
            "mark",
            "menu",
            "menuitem",
            "meta",
            "meter",
            "nav",
            "noframes",
            "noscript",
            "object",
            "ol",
            "optgroup",
            "option",
            "output",
            "p",
            "param",
            "picture",
            "pre",
            "progress",
            "q",
            "rp",
            "rt",
            "ruby",
            "s",
            "samp",
            "script",
            "section",
            "select",
            "small",
            "source",
            "span",
            "strike",
            "strong",
            "style",
            "sub",
            "summary",
            "sup",
            "table",
            "tbody",
            "td",
            "template",
            "textarea",
            "tfoot",
            "th",
            "thead",
            "time",
            "title",
            "tr",
            "track",
            "tt",
            "u",
            "ul",
            "var",
            "video",
            "wbr"
        );
        if (in_array($key, $elements))
        {
            return true;
        }
        return false;
    }

}