var soap = require('soap');
var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
var args = {login: 'botz', senha: '102030mmr@', codigoEntidade: 1581, Cpf: '10797116869'};
console.log("ola", soapClient.lastClient)

soap.createClientAsync(url, args).then((soapClient) => {
    
    soapClient.buscarCartoesDisponiveis(function(err,result){
        if(err) { console.log(err); }
        else { console.log('Result: \n' + JSON.stringify(result)); }
    })
})