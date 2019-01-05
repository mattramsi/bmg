
var saldo = require('./Saldo');
const request = require('request')
var parser = require('xml2json');

var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';

// // //GET MATRICULA
module.exports = {

    get: function(cpf, codigoEntidade) {

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

        const opts = { body: xml, headers: { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: 'runTransaction' }}

        return new Promise((resolve, reject) => {
            
            request.post(url, opts, (err, response) => {
            
                var json = JSON.parse(parser.toJson(response.body));
                var multiRef = json['soapenv:Envelope']['soapenv:Body'].multiRef

                if(multiRef) {
                    for(var i = 0; i < multiRef.length - 1; i++) {  
                        
                        if(multiRef[i].matricula && multiRef[i].numeroContaInterna) {
                            var matricula = multiRef[i].matricula.$t;
                            var contaInterna = multiRef[i].numeroContaInterna.$t

                            saldo.get(cpf, codigoEntidade, matricula, contaInterna).then( (response) => {
                                
                                var obj = {};
                                obj.cpf = cpf
                                obj.codigoEntidade = codigoEntidade
                                obj.matricula = matricula;
                                obj.contaInterna = contaInterna
                                obj.valorSaqueMaximo = response.valorSaqueMaximo.valor
                                obj.valorSaqueMinimo = response.valorSaqueMinimo.valor

                                resolve(obj)
                            })   
                        }
                    }
                } else{

                    var obj = {};
                    obj.cpf = cpf
                    obj.codigoEntidade = codigoEntidade
                    obj.matricula = "N/A";
                    obj.contaInterna = "N/A";
                    obj.valorSaqueMaximo = "N/A";
                    obj.valorSaqueMinimo = "N/A";

                    reject(obj);
                }
                
            }); 
        })
    }
}

