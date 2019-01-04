
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

    return new Promise((resolve, reject) => {
        readCSV().then((response) => {
            var csvData = response; 

            var array = [];

            (async function loop() {
                for (let i = 0; i < csvData.length ; i++) {
                    var cpf = csvData[i].cpf;
                    var codigoEntidade = csvData[i].codigoEntidade;  

                    var loadPercent = (csvData.length - i)/csvData.length + "%"
                    console.log(loadPercent)
                    
                    await matricula.get(cpf, codigoEntidade).then((response) => {
                        array.push(response)
                    
                        if(i == (csvData.length - 1) ) resolve(array)
                    }).catch(function(e) {
                        console.log(e); // "Ah, não!"
                    })
                }
            })();
        })
    })
}

gerarRelatorio().then((result) => {
    console.log(result)
})





