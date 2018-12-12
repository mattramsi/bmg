var soap = require('soap');
var o2x = require('object-to-xml');
var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';
var args = {"login": "botz", "senha": "102030mmr@", "codigoEntidade": 1581, "Cpf": "10797116869" };


soap.createClientAsync(url).then((soapClient) => {
    console.log(o2x(args))
    soapClient.SaqueComplementarWebServiceService.SaqueComplementar.buscarCartoesDisponiveis(o2x(args), function(err,result){
        if (err) {
            console.log(err)
            throw err;
        } 
        
        console.log(result);
    })
})