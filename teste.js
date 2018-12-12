var soap = require('soap');
var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
var args = {"tns:login": 'botz', "tns:senha": '102030mmr@', "tns:codigoEntidade": 1581, "tns:Cpf": '10797116869'};
console.log("ola", args)

soap.createClientAsync(url).then((soapClient) => {
    
    soapClient.buscarCartoesDisponiveis(function(err,result){
        if(err) { console.log(err); }
        else { console.log('Result: \n' + JSON.stringify(result)); }
    })
})