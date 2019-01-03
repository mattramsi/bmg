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
const body = request.post(url, opts, (err, response) => {
   
    var json = JSON.parse(parser.toJson(response.body));

    var multiRef = json['soapenv:Envelope']['soapenv:Body'].multiRef
    // if(multiRef) console.log('response', multiRef)

    var array = [];
    for(var i = 0; i < multiRef.length - 1; i++) {        
        if(multiRef[i].matricula && multiRef[i].numeroContaInterna) {
            var obj = {};
            obj.matricula = multiRef[i].matricula.$t;
            obj.contaInterna = multiRef[i].numeroContaInterna.$t
            obj.saldo = getSaldo(obj.matricula, obj.contaInterna)
    
            array.push(obj);
        }
    }

    console.log(array)
})

function getSaldo(matricula, contaInterna) {

    
    var xml = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.econsig.bmg.com"><soapenv:Header/><soapenv:Body><web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
        '<param xsi:type="web:DadosCartaoParameter">'+
                '<login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">botz</login>'+
                '<senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">102030mmr@</senha>'+
                '<codigoEntidade xsi:type="xsd:int">' + codigoEntidade + '</codigoEntidade>'+ 
                '<cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">'+ matricula + '</cpf>'+
                '<matricula xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' + cpf + '</matricula>'+
                '<numeroContaInterna xsi:type="xsd:long">' + contaInterna + '</numeroContaInterna>'+
                '<tipoSaque xsi:type="xsd:int">1</tipoSaque>'+
            '</param>'+
        '</web:buscarLimiteSaque>'+
    '</soapenv:Body>'+
    '</soapenv:Envelope>';

    var arraySaldos = [];

    new Promise(function(resolve, reject) {
        //GET SALDO
        const body = request.post(url, opts, (err, response) => {
        
            var json = JSON.parse(parser.toJson(response.body));

            var multiRef = json['soapenv:Envelope']['soapenv:Body'].multiRef
            if(multiRef) {
                console.log("entoru")
                for(var i = 0; i < multiRef.length - 1; i++) {        
                    if(multiRef[i].valorSaqueMaximo && multiRef[i].valorSaqueMinimo) {
                        var obj = {};
                        obj.valorSaqueMinimo = multiRef[i].valorSaqueMinimo.href;
                        obj.valorSaqueMaximo = multiRef[i].valorSaqueMaximo.href;
                        arraySaldos.push(obj);
                    }
                }

                console.log("saldo", arraySaldos)
                resolve(arraySaldos);
            } else{
                reject(json)
            }
        })
    });
} 