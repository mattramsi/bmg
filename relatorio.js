
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

        (async function loop() {
            for (let i = 0; i < 3 ; i++) {
                var cpf = csvData[i].cpf;
                var codigoEntidade = csvData[i].codigoEntidade;  

                var loadPercent = ((i/csvData.length) * 100).toFixed(2) + "%";
                console.log(loadPercent)
                
                await matricula.get(cpf, codigoEntidade).then((response) => {
                    array.push("1")
                    array.push(response)
                
                    if(i == (csvData.length - 1) ) console.log(array)
                }).catch(function(e) {
                    array.push("1")
                    console.log(e); // "Ah, não!"
                })

                console.log(array)
            }
        })();
    })
}


gerarRelatorio()




