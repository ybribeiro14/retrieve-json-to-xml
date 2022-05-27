const externalJs = require("./index2");
const mappedData = require("./mapping.json")

function objToXml (originData) {
    var xml = '';
    for (var prop in originData) {
      xml += originData[prop] instanceof Array ? '' : "<" + prop + ">";
      if (originData[prop] instanceof Array) {
        for (var array in originData[prop]) {
          xml += "<" + prop + ">";
          xml += objToXml(new Object(originData[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof originData[prop] == "object") {
        xml += objToXml(new Object(originData[prop]));
      } else {
        xml += originData[prop];
      }
      xml += originData[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
}

module.exports = function convertJsonToXml (jsonOrder) {
  
  const originData = JSON.parse(jsonOrder)
  return `<SalesOrders xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="SORTOIDOC.XSD">` + objToXml(externalJs(originData, mappedData)) + '</SalesOrders>'

}


