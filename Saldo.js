var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
const request = require('request')
var parser = require('xml2json');

module.exports = {
  get: function(cpf, codigoEntidade, matricula, contaInterna, sequencialOrgao) {

        var xml = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.econsig.bmg.com"><soapenv:Header/><soapenv:Body><web:buscarLimiteSaque soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
            '<param xsi:type="web:DadosCartaoParameter">'+
                    '<login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">botz</login>'+
                    '<senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">102030mmr@</senha>'+
                    '<codigoEntidade xsi:type="xsd:int">' + codigoEntidade + '</codigoEntidade>'+ 
                    '<cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">'+ matricula + '</cpf>'+
                    '<matricula xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' + cpf + '</matricula>'+
                    '<numeroContaInterna xsi:type="xsd:long">' + contaInterna + '</numeroContaInterna>'+
                    '<tipoSaque xsi:type="xsd:int">1</tipoSaque>'+
                    '<sequencialOrgao>' + sequencialOrgao + '</sequencialOrgao>' +
                '</param>'+
            '</web:buscarLimiteSaque>'+
        '</soapenv:Body>'+
        '</soapenv:Envelope>';

        const opts = { body: xml, headers: { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: 'runTransaction' }}

        return new Promise((resolve, reject) => {
            //GET SALDO
           request.post(url, opts, (err, response) => {
                
                var json = JSON.parse(parser.toJson(response.body));

                var multiRef = json['soapenv:Envelope']['soapenv:Body'].multiRef

                if(multiRef) {

                    console.log("AQUI: ", multiRef)

                    var obj = {};
                    obj.valorSaqueMaximo = {};
                    obj.valorSaqueMinimo = {};

                    if(multiRef[0].valorSaqueMaximo) obj.valorSaqueMaximo.id = multiRef[0].valorSaqueMaximo.href.replace("#", ""); 
                    if(multiRef[0].valorSaqueMinimo) obj.valorSaqueMinimo.id = multiRef[0].valorSaqueMinimo.href.replace("#", ""); 

            
                    for(var i = 0; i < multiRef.length; i++) {        
                        if(multiRef[i].id == obj.valorSaqueMaximo.id) obj.valorSaqueMaximo.valor = multiRef[i].$t;
                        if(multiRef[i].id == obj.valorSaqueMinimo.id) obj.valorSaqueMinimo.valor = multiRef[i].$t;    
                    }

                    resolve(obj);
                    
                } else {
                    reject("Sem saldo")
                }
            })
        }); 
    }   
}  



