var soap = require('soap');
var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
var args = {"tns:login": 'botz', "tns:senha": '102030mmr@', "tns:codigoEntidade": 1581, "tns:Cpf": '10797116869'};


soap.createClientAsync(url).then((soapClient) => {
    console.log("ola", soapClient)
    soapClient.buscarCartoesDisponiveis(args, function(err,result){
        if (err) throw err;
            console.log(result);
    })
})