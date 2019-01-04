
var matricula = require('./Matricula');
var fs = require('fs'); 
var parse = require('csv-parser');
var forAsync = require('for-async');

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
            for(var i = 0; i <= csvData.length - 1; i++) {        
                var cpf = csvData[i].cpf;
                var codigoEntidade = csvData[i].codigoEntidade;   
                matricula.get(cpf, codigoEntidade).then((response) => {
                    array.push(response)

                    console.log(array)
                })
            }

            forAsync(csvData, function(item, idx){
                return new Promise(function(resolve){
                  setTimeout(function(){
                    console.info(item, idx);
                    // Logs 3 lines: `some 0`, `cool 1`, `array 2`
                    resolve(); // <-- signals that this iteration is complete
                  }, 25); // delay 25 ms to make async
                })
              })
        })
    })
}

gerarRelatorio().then((result) => {
    console.log(result)
})





