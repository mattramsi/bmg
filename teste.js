var soap = require('soap');
var DOMParser = require('xmldom').DOMParser;

var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
var text = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.econsig.bmg.com">\n\
   <soapenv:Header/>\n\
   <soapenv:Body>\n\
      <web:buscarCartoesDisponiveis soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\n\
         <param xsi:type="web:CartaoDisponivelParameter">\n\
            <login xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">botz</login>\n\
            <senha xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">102030mmr@</senha>\n\
            <codigoEntidade xsi:type="xsd:int">1581</codigoEntidade>\n\
            <cpf xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">10797116869</cpf>\n\
         </param>\n\
      </web:buscarCartoesDisponiveis>\n\
   </soapenv:Body>\n\
</soapenv:Envelope>';


var parser = new DOMParser();
var args = parser.parseFromString(text,"text/xml");

console.log(args)

soap.createClientAsync(url).then((soapClient) => {
    soapClient.SaqueComplementarWebServiceService.SaqueComplementar.buscarCartoesDisponiveis(args, function(err,result){
        if (err) {
            console.log(err)
            throw err;
        } 
        
        console.log(result);
    })
})