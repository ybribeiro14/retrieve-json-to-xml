const externalJs = require("./index2");
const mappedData = require("./mapping.json")

function objToXml (originData) {
    var xml = '';
    for (var prop in data) {
      xml += data[prop] instanceof Array ? '' : "<" + prop + ">";
      if (data[prop] instanceof Array) {
        for (var array in data[prop]) {
          xml += "<" + prop + ">";
          xml += objToXml(new Object(data[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof data[prop] == "object") {
        xml += objToXml(new Object(data[prop]));
      } else {
        xml += data[prop];
      }
      xml += data[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
}

module.exports = function convertJsonToXml (jsonOrder) {
  
  const originData = JSON.parse(jsonOrder)
  return `<SalesOrders xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="SORTOIDOC.XSD">` + objToXml(externalJs(originData, mappedData)) + '</SalesOrders>'

}

