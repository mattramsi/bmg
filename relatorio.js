var XLSX = require('xlsx')
var matricula = require('./Matricula');

var workbook = XLSX.readFile('ListaDeCpfs.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
console.log(xlData.length);

function gerarRelatorio() {

    for(var i = 0; i < xlData.length - 1; i++) {        
       var cpf = xlData[i].cpf
       var codigoEntidade = xlData[i].codigoEntidade

       matricula.get(cpf, codigoEntidade).then((response) => {
            console.log(response)
       })
    }

}

gerarRelatorio()

