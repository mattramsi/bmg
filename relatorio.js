
var matricula = require('./Matricula');
var fs = require('fs'); 
var parse = require('csv-parser');
var json2xls = require('json2xls');

var readCSV = function() {

    var csvData=[];
    return new Promise((resolve, reject) => {

        fs.createReadStream('planilhatestenova.csv')
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

    var horaInicial = new Date();

    readCSV().then((response) => {
        var csvData = response; 

        var array = [];

        (async function loop() {
            for (let i = 0; i < 2 ; i++) {
                var cpf = csvData[i].cpf;

                if(cpf.length == 8) cpf = '0' + cpf

                var codigoEntidade = csvData[i].codigoEntidade;  
                if(codigoEntidade.length >= 5) codigoEntidade = codigoEntidade.slice(0, -1);

                var sequencialOrgao = csvData[i].sequencialOrgao;  
          
                var loadPercent = ((i/csvData.length) * 100).toFixed(2) + "%";
                console.log(loadPercent)
                
                await matricula.get(cpf, codigoEntidade, sequencialOrgao).then((response) => {
                    array.push(response)
                }).catch(function(e) {
                    array.push(e)
                })
                
                var xls = json2xls(array);
                fs.writeFileSync('Relatório2.xlsx', xls, 'binary');

                if(i == (2 - 1) ){
                    var horaFinal = new Date();

                    console.log("Início: ", horaInicial)
                    console.log("Fim:", horaFinal)
                } 
            }
        })();

        
    })
}


gerarRelatorio()




