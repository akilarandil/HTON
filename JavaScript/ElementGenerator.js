/**
 * @return {string}
 */
function ReturnHTMLOpenString(htmlElement,value){

    // if (AttributeCheck(htmlElement,value)){

       // return  ReturnHTMLOpenStringWithAttr(htmlElement,value);
    // }else{
       return ReturnHTMLOpenStringWithoutAttr(htmlElement);
    // }
}

/**
 * @return {string}
 */
function ReturnHTMLOpenStringWithAttr(htmlElement,value) {
    debugger;
    let openingTag = ReturnElementString(htmlElement)+" ";

    for(let i=0; i<value.length;i++){

        if(Object.keys(value)[i]=== "attr"){
            let attrArry = value[i];
            for(let j=0; j<attrArry.length;j++){
                let attrName  = Object.keys(attrArry)[i];
                let attrValue = attrArry[j];
                openingTag.concat(attrName + "=\"" + attrValue+"\" ")
            }
        }
    }
    return "<"+ openingTag;


}

/**
 * @return {string}
 */
function ReturnHTMLOpenStringWithoutAttr(htmlElement) {
    let element = ReturnElementString(htmlElement);
    return "<"+element;
}

/**
 * @return {string}
 */
function ReturnClosingString(htmlElement) {

    return "</"+ ReturnElementString(htmlElement);
}
/**
 * @return {boolean}
 */
function AttributeCheck(key,value) {
    return "attr" in Object.keys(value);
}