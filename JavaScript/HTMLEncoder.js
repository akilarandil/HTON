let HTMLElement = function (elementName) {
    this.elementName = elementName;
    let attrArray =[];

    function addAttribute(htmlAttribute = HTMlAttribute) {
        attrArray.push(htmlAttribute)
    }

    function getAllAttributes() {return attrArray}

    function addValue(value) {
        this.value = value;
    }
};


let HTMlAttribute =function (attributeName, value) {
        this.attributeName = attributeName;
        this.value = value;
};

let elementsArray=[];

function createElement(elementName) {
    let element = new HTMLElement(elementName);
    elementName.push(element);
}

function printElements() {
    
}