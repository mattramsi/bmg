var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
// var xml = '<soapenv:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.econsig.bmg.com"><soapenv:Header/><soapenv:Body><web:buscarCartoesDisponiveis >'+
//          '<param>'+
//             '<login>botz</login>'+
//             '<senha>102030mmr@</senha>'+
//             '<codigoEntidade>4194</codigoEntidade>'+
//             '<cpf>10131417843</cpf>'+
//          '</param>'+
//       '</web:buscarCartoesDisponiveis>'+
//    '</soapenv:Body>'+
// '</soapenv:Envelope>';

var xml = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.econsig.bmg.com"><soapenv:Header/><soapenv:Body><web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
        '<param xsi:type="web:DadosCartaoParameter">'+
            '<login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">botz</login>'+
            '<senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">102030mmr</senha>'+
            '<codigoEntidade xsi:type="xsd:int">1581</codigoEntidade>'+
            '<cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">17901669500</cpf>'+
            '<matricula xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">1508645423</matricula>'+
            '<numeroContaInterna xsi:type="xsd:long">5455945</numeroContaInterna>'+
            '<tipoSaque xsi:type="xsd:int">1</tipoSaque>'+
        '</param>'+
      '</web:buscarLimiteSaque>'+
   '</soapenv:Body>'+
'</soapenv:Envelope>';

const request = require('request')
var parser = require('xml2json');

const opts = {
    body: xml,
    headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: 'runTransaction'
    }
}

// //GET MATRICULA
const body = request.post(url, opts, (err, response) => {
   
    var json = JSON.parse(parser.toJson(response.body));
    console.log('response', json)

    var multiRef = json['soapenv:Envelope']['soapenv:Body'].multiRef
    console.log('response', multiRef)
 
})



function jsonParser(json) {

    var string = JSON.stringify(json);
    var objectValue = JSON.parse(string);
    return objectValue;
 }

