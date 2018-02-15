
let stack=[];
let htmlSnippetStr="";
/**
 * @return {string}
 */
function GetHTMLSnippet(jsonArray) {
    stack=[];
    htmlSnippetStr="";
    IterateArray(ConvertToJson(jsonArray));
    return htmlSnippetStr;
}

function IterateArray(jsonArray) {
    let key;
    if (typeof jsonArray.length === 'undefined'){
        key = Object.keys(jsonArray)[0];
        let value = jsonArray[key];
        let openingTag = ReturnHTMLOpenString(key, value);
        stack.push(key);
        htmlSnippetStr = htmlSnippetStr.concat(openingTag);

        if(typeof jsonArray[key] !== "object"){
            htmlSnippetStr = htmlSnippetStr.concat(value);
            htmlSnippetStr = htmlSnippetStr.concat(ReturnClosingString(stack.pop()));
        } else {
            IterateArray(value);
        }
        if(stack.length>0) {
            htmlSnippetStr = htmlSnippetStr.concat(ReturnClosingString(stack.pop()));
        }
    }else{

        for (let i=0; i< jsonArray.length;i++) {
            if (Object.keys(jsonArray)[i] >= 0) {
                key = Object.keys(jsonArray[i])[0];
            }
            let value = jsonArray[i][key];
            let openingTag = ReturnHTMLOpenString(key, value);
            stack.push(key);
            htmlSnippetStr =htmlSnippetStr.concat(openingTag);

            if(typeof jsonArray[i][key] !== "object"){
                htmlSnippetStr = htmlSnippetStr.concat(value);
                htmlSnippetStr = htmlSnippetStr.concat(ReturnClosingString(stack.pop()));
            } else {
                IterateArray(value);
            }
        }
        if(stack.length>0) {
            htmlSnippetStr = htmlSnippetStr.concat(ReturnClosingString(stack.pop()));
        }

    }

}


function ConvertToJson(string) {
    // console.log(string);
   let s=  string
        .replace(/\$/g,"\"")
        .replace(/:/g,"\":")
        .replace(/\[/g,"[{")
        .replace(/,/g,"},")
        .replace(/]/g,"}]")
        .replace(/\[$/g,"\"")
        .replace(/,$/g,",\"")
        .replace(/:$/g,":\"")
        .replace(/,"/g,",{\"")
   ;
   let str = s.match(/[A-Za-z0-9]+}/g);
   for(let i =0; i<str.length;i++){
       let r = str[i].replace("}","");
       s =s.replace(str[i],r+"\""+"}");
   }
   // console.log("{"+s+"}");
   return JSON.parse("{"+s+"}");
}
