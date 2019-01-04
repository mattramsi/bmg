
var matricula = require('./Matricula');
var fs = require('fs'); 
var parse = require('csv-parser');

var csvData=[];
fs.createReadStream('ListaDeCpfs.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something wiht csvData
      console.log(csvData);
    });

var gerarRelatorio = function() {

    for(var i = 0; i < csvData.length; i++) {        
        var cpf = csvData[i].cpf
        var codigoEntidade = csvData[i].codigoEntidade

        matricula.get(cpf, codigoEntidade).then((response) => {

                console.log("oi" + i , JSON.stringify(response))
                
        })
    }
}

gerarRelatorio()



