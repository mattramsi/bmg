var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';

var xml = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.econsig.bmg.com"><soapenv:Header/><soapenv:Body><web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
        '<param xsi:type="web:DadosCartaoParameter">'+
            '<login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">botz</login>'+
            '<senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">102030mmr@</senha>'+
            '<codigoEntidade xsi:type="xsd:int">1581</codigoEntidade>'+
            '<cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">44004265053</cpf>'+
            '<matricula xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">1140997480</matricula>'+
            '<numeroContaInterna xsi:type="xsd:long">8223455</numeroContaInterna>'+
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

//GET SALDO
const body = request.post(url, opts, (err, response) => {
   
    var json = JSON.parse(parser.toJson(response.body));
    console.log('response', json)

    var multiRef = json['soapenv:Envelope']['soapenv:Body'].multiRef
    if(multiRef) console.log('response', multiRef)

    var arraySaldos = [];
    for(var i = 0; i < multiRef.length - 1; i++) {        
        if(multiRef[i].valorSaqueMaximo && multiRef[i].valorSaqueMinimo) {
            var obj = {};
            obj.valorSaqueMinimo = multiRef[i].valorSaqueMinimo;
            obj.valorSaqueMaximo = multiRef[i].valorSaqueMaximo;
            arraySaldos.push(obj);
        }
    }

    console.log(arraySaldos)
})


