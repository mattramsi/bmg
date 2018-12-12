var soap = require('soap');

var url = 'https://ws1.bmgconsig.com.br/webservices/ScriptAdesao?wsdl';
var args = {login: '2112', senha: 'asjkdsa', numeroAde: '5243421'};

soap.createClientAsync(url).then((soapClient) => {
    soapClient.buscarScript(args, function(err,result,raw){
        if(err) { console.log(err); }
        else { console.log('Result: \n' + JSON.stringify(result)); }
    })
})