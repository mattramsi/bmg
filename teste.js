var soap = require('soap');
var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';

soap.createClientAsync(url).then((soapClient) => {
    var args = {login: 'botz', senha: '102030mmr@', codigoEntidade: 1581, Cpf: '10797116869'};
    console.log("ola", args)
    soapClient.buscarCartoesDisponiveis(args, function(err,result,raw){

        console.log(result)
        // if(err) { console.log(err); }
        // else { console.log('Result: \n' + JSON.stringify(result)); }
    })
})