var url = 'https://ws1.bmgconsig.com.br/webservices/SaqueComplementar?wsdl';

module.exports = {
  get: function(cpf, codigoEntidade, matricula, contaInterna) {

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

        const options = {
            body: xml,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                SOAPAction: 'runTransaction'
            }
        }

        new Promise(function(resolve, reject) {
            //GET SALDO
            const body = request.post(url, opts, (err, response) => {
            
                var json = JSON.parse(parser.toJson(response.body));

                var multiRef = json['soapenv:Envelope']['soapenv:Body'].multiRef

                var array = [];
                if(multiRef) {
                    console.log("Body", multiRef)
                    for(var i = 0; i < multiRef.length - 1; i++) {        
                        if(multiRef[i].valorSaqueMaximo && multiRef[i].valorSaqueMinimo) {
                            var obj = {};
                            obj.valorSaqueMinimo = multiRef[i].valorSaqueMinimo.href;
                            obj.valorSaqueMaximo = multiRef[i].valorSaqueMaximo.href;
                            arraySaldos.push(obj);
                        }
                    }

                    console.log("arraySaldo", array)
                    resolve(arraySaldos);
                } else{
                    reject(json)
                }
            })
        }); 
    }   
}  



