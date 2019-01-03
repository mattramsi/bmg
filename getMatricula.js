
var saldo = require('./getSaldo');

var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
var cpf = '44004265053';
var codigoEntidade = '1581';

var xml = '<soapenv:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.econsig.bmg.com"><soapenv:Header/><soapenv:Body><web:buscarCartoesDisponiveis >'+
         '<param>'+
            '<login>botz</login>'+
            '<senha>102030mmr@</senha>'+
            '<codigoEntidade>' + codigoEntidade + '</codigoEntidade>'+
            '<cpf>' + cpf + '</cpf>'+
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
request.post(url, opts, (err, response) => {
   
    var json = JSON.parse(parser.toJson(response.body));

    var multiRef = json['soapenv:Envelope']['soapenv:Body'].multiRef
    // if(multiRef) console.log('response', multiRef)

    var array = [];
    for(var i = 0; i < multiRef.length - 1; i++) {  
        
        if(multiRef[i].matricula && multiRef[i].numeroContaInterna) {
            var obj = {};
            var matricula = multiRef[i].matricula.$t;
            var contaInterna = multiRef[i].numeroContaInterna.$t

            saldo.get(cpf, codigoEntidade, matricula, contaInterna).then( (response) => {
                obj.matricula = multiRef[i].matricula.$t;
                obj.contaInterna = multiRef[i].numeroContaInterna.$t
                obj.saldo = response
                array.push(obj);
            })   
        }
    }

    console.log(array)
})

