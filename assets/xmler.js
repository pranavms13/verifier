var XMLParser = require('react-xml-parser')

export const parseXML = (xml) => {
    var pxml = new XMLParser().parseFromString(xml);
    return pxml;
}