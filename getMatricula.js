var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
var xml = '<soapenv:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.econsig.bmg.com"><soapenv:Header/><soapenv:Body><web:buscarCartoesDisponiveis >'+
         '<param>'+
            '<login>botz</login>'+
            '<senha>102030mmr@</senha>'+
            '<codigoEntidade>1581</codigoEntidade>'+
            '<cpf>44004265053</cpf>'+
         '</param>'+
      '</web:buscarCartoesDisponiveis>'+
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
    if(multiRef) console.log('response', multiRef)

    var arrayMatriculas = [];
    for(var i = 0; i < multiRef.length - 1; i++) {        
        if(multiRef[i].matricula && multiRef[i].numeroContaInterna) {
            var obj = {};
            obj.matricula = multiRef[i].matricula.$t;
            obj.contaInterna = multiRef[i].numeroContaInterna.$t
            arrayMatriculas.push(obj);
        }
    }

    console.log(arrayMatriculas)
})

