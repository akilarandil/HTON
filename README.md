# &lt;HTON&gt; - Hyper Text Object Notation

HTON is a data structure specifically designed to reconstruct an HTML string. A Javascript and a PHP library is provided to use the data structure which will cause to increase development productivity and better communication efficiency.

Because the library automatically constructs the HTML string using HTON, there is very little workload in the client-end since it eliminates the extraction and data manipulation that is to be done in order to create an HTML string.

### Notice - The JavaSciprt and PHP libraries are for demonstration purposes. The algorithms may be adapted to any preferred language. The core of this project is the HTON data structure where as HTON is langauge independent.

1. Assume that the expected output is the following table.

  ![picture](Prototype/Resources/ExpectedResult.PNG)

2. The server side code would be the following (PHP).
```
    $element = new HTMLElement(
      "table",
      array(
          new HTMLElement("tr",
              array(
                  new HTMLElement("th", "Name"),
                  new HTMLElement("th", "Age"),
                  new HTMLElement("th", "City")
              )),
          new HTMLElement("tr",
              array(
                  new HTMLElement("td", "Akila"),
                  new HTMLElement("td", "22"),
                  new HTMLElement("td", "Mount Lavinia")
              )),
          new HTMLElement("tr",
              array(
                  new HTMLElement("td", "Randil"),
                  new HTMLElement("td", "23"),
                  new HTMLElement("td", "Colombo")
              ))
      ),
      array(
          new HTMLAttribute("id", "personTable"),
          new HTMLAttribute("class", "table table-hover table-dark table-bordered")));
    $encoder = new HTON();
    $code = $encoder->convertToHTON($element);
```

3. The client side code will only be limited to one single line.

```
    HTON.convertToHTML(result);
```

4. And you will have the full HTML string.

```
    <table id=personTable class=table-class>
       <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
       </tr>
       <tr>
          <td>Akila</td>
          <td>22</td>
          <td>Mount Lavinia</td>
       </tr>
       <tr>
          <td>Randil</td>
          <td>23</td>
          <td>Colombo</td>
       </tr>
    </table>
```

5. The HTON data structure for the above result is as the following

```
    <table id=personTable class="table table-hover table-dark table-bordered":[
          <tr:[
                <th:Name>,
                <th:Age>,
                <th:City>
              ]
          >,
          <tr:[
                <td:Akila>,
                <td:22>,
                <td:Mount Lavinia>
              ]
          >,
          <tr:[
                <td:Randil>,
                <td:23>,
                <td:Colombo>
              ]
          >
       ]
    >
```

# HTON Data Structure 

There are few simple rules that is crucial for the construction of an HTON data structure

1. An object is an unordered key-value pair which starts with **<** (open angle bracket) and ends with **>** (close angle brackets) separated by : (colon).

2. An array is an ordered collection which starts with **[** (left square bracket) and ends with  **]** (right square bracket). Values in array are separated by , (comma).

3. Values may contain objects or arrays or a string value. A key **MUST** contain an HTML element name.

4. All keys and values (Non-array and non-object) are considered as strings since HTML doesn’t distinguish a value as integer, bool or null.

5. Therefore, a key or a value (Non-array and non-object) does not need to have double quotations enclosed.

6. Although, if a value (Non-array and non-object) contains the following reserved characters, the value **MUST** be enclosed with double quotations.
    * **<**
    * **>**
    * **[**
    * **]**
    * **:**
    * **(**
    * **)**
    
 7. The value of an attribute **MUST** be enclosed with double quotations only if the value contains whitespaces (multiple values per attribute). This rule is very similar to HTML, since in HTML, attribute value **MUST** be within double quotations if it contains white spaces/multiple values.

# JavaScript Library
#### Notice - Supports ECMAScript 6 & above
 The user may use the following methods to get the HTML string from an HTON data format value
 
    HTON.convertToHTML(data)
    
    HTON.decode(data) -- Use this only if the data is already processed to an object/array with proper values and structuring
 
  If the user desires to append the data to the DOM, use
 
    HTON.appendToDOM(elementId, HTMLString)
 
  If the user desires to decode the HTON data and append the resulted HTML string directly, use
 
    HTON.convertAndAppendToDOM(elementID,data)
 
  If the user desires to have only the JavaScript Object/Array, use,
 
    HTON.deSerialize(data)
 
  If the user desires to have a JSON structure converted from the HTON data type, use
 
    HTON.convertToJSONString(HTONData)
 
 # PHP Library
 #### Notice - Supports PHP 7 & above
 The user may use HTMLElement Object to create an element. It accepts two mandatory parameters and an optional parameter.
 
 1. The name of the element (Must be a string)
 2. The value of the element (Can be another HTMLElement or an array of HTMLElement objects or a string)
 3. Attributes of the element (Can be an HTMLAttribute object or an array of HTMLAttribute objects)
 
 ```
    $element = new HTMLElement("element","value",new HTMLAttribute("attributeName","value"));
 ```
 The user may use HTMLAttribute object to create an attribute for an element. It accepts two mandatory parameters.
 1. The name of the attribute (Must be a string)
 2. The value of the attribute (Must be a string)
 

 ```
    $attribute = new HTMLAttribute("attributeName","value");
 ```
 
 To encode data to HTON, use HTON object as following.
 
 ```
    $encoder = new HTON();
    $hton = $encoder->convertToHTON($element);
 ```
 If the user wants to convert this to an array and get the encoded HTON structure, do th following
 
 ```
    $array = $element->toArray();
    $encoder = new HTON();
    $code = $encoder->convertToHTON($array);
 ```
 If the user want to access and modify values before encoding, do the following
 
 * Use the **val** keyword to access the value of the element.
 
 ```
    $array["table"]["val"]= $newElement->toArray();
 ```
 * Use the **attr** keyword to access the value of the element.
 ```
    $array["table"]["attr"]= new HTMLAttribute("attributeName","value");
 ```
 
 If the user wants to add another HTMLElement to an existing HTMLElement as a peer, use the following method
 
 ```
    $newElementArray = $element1->attachElementAsPeer($element2);
    $encoder = new HTON();
    $code = $encoder->convertToHTON($newElementArray);
 ```
 
# FAQ

**Q1** - Is this Server Side Rendering?

**A**  - Server Rendering works by converting HTML files in the server into usable information for the browser. HTON is just a data structure that is created in the server side which is used to convert to an HTML code in the client side. Hence the rendering occurs at the client side.

**Q2**  - Is HTON a replacement for JSON?

**A**  - It was not created as a replacement for JSON. But rather to use HTON when necessary. Wherever a requirement changed frequently, HTON comes in handy. Because the only change you need to do is in the server side. Not in the client side. You may use both HTON and JSON in your application when necessary. 

**Q3**  - Can HTON be used for Mobile applications?

**A**  - No. The context is utilized for browser-based applications.

**Q4**  - Why not server side rendering?

**A**  - The same reason why you would choose client side rendering. As mentioned before, HTON is not a way to do server side rendering. Therefore, this is not suitable for server side rendering. 

**Q5**  - They why not use JSON in client side rendering at all?

**A**  - The aim of the project is to minimize the total development effort and to maintain the communication efficiency as JSON. With HTON, you don't have much of client side development as you would do when using JSON. Therefore, it reduces the total development effort. Additionally, due to the lesser size of HTON compared to HTML, XML and even JSON (As the data set grows, HTON tends to have lesser size than JSON), it has a considerable amount of impact on the network bandwidth. Therefore, it maintains the communication efficiency as it would do with JSON.


**Q6**  - The server side code seems bulk and tedious.

**A** - As this project is in development, more and more improvements on are yet to be implemented. The PHP library is just an implementational example on how to use HTON. Just like JSON has many libraries in most of the languages, anyone can use the formatting rules of HTON to create their own library and make it better. Therefore, more improvements to the current PHP library as well as for the JavaScript library (including performance optimization) are to be implemented.


## Important! - This is only if you want to run the Benchmark tool or the Prototype

* Update the config.ini file. Make sure the proper data is added to the necessary property. 
  Eg: userName = "Your user name"

 * The SQL file is included within this project as SqlData.sql. Use that to create the necessary table. 
 * Run the project in an Apache server to use the Prototype and the Benchmark Tool
