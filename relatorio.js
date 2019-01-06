
var matricula = require('./Matricula');
var fs = require('fs'); 
var parse = require('csv-parser');
var json2xls = require('json2xls');

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
            for (let i = 0; i < 10 ; i++) {
                var cpf = csvData[i].cpf;

                if(cpf.length == 8) cpf = '0' + cpf
                console.log("CPF: ", cpf);

                var codigoEntidade = csvData[i].entidade;  
                if(codigoEntidade.length >= 5) codigoEntidade = codigoEntidade.slice(0, -1);
                console.log("Entidade: ", codigoEntidade);
          
                var loadPercent = ((i/10) * 100).toFixed(2) + "%";
                console.log(loadPercent)
                
                await matricula.get(cpf, codigoEntidade).then((response) => {
                    array.push(response)
                }).catch(function(e) {
                    array.push(e)
                })
                
                if(i == (10-1) ){
                    var xls = json2xls(array);
                    fs.writeFileSync('Relatório.xlsx', xls, 'binary');
                } 
            }
        })();

        
    })
}


gerarRelatorio()




