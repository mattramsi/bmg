
var matricula = require('./Matricula');
var fs = require('fs'); 
var parse = require('csv-parser');

var readCSV = function() {

    var csvData=[];
    return new Promise((resolve, reject) => {

        fs.createReadStream('ListaDeCpfs.csv')
        .pipe(parse({delimiter: ':'}))
        .on('data', function(csvrow) {
            csvData.push(csvrow);        
        })
        .on('end',function() {
            //do something wiht csvData
            resolve(csvData);
        });
    });
}

var gerarRelatorio = function() {

    readCSV().then((response) => {
        var csvData = response; 

        var array = [];
        for(var i = 0; i < csvData.length; i++) {        
            var cpf = csvData[i].cpf
            var codigoEntidade = csvData[i].codigoEntidade

            matricula.get(cpf, codigoEntidade).then((response) => {
                array.push(response)

                if(i == (csvData.length - 1)) console.log(array)
            })
        }

        
    })
}

gerarRelatorio()





