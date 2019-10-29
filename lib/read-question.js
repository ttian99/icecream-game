var xu = require('./xlsx-utils');
var fs = require('fs');
var path = require('path');

function readQuestion(filePath, outDir) {
    var wb = xu.getWorkbook(filePath);
    var sheetNameArr = ['中文', '繁体', '英文'];
    let arr = xu.getSheets(wb, sheetNameArr);
    for (let i = 0; i < arr.length; i++) {
        var sheet = arr[i];
        var rowLen = xu.getSheetRowLen(sheet);
        var list = getSingleSheet(sheet, rowLen);
        
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
        }
        var fileNameArr = ['ZH', 'TW', 'EN'];
        var sheetName = fileNameArr[i];
        let str = `const ${sheetName}_QUESTION = ${JSON.stringify(list, null, 4)}; \nexport default ${sheetName}_QUESTION;`
        fs.writeFileSync(path.join(outDir, sheetName + '_QUESTION.ts'), str, {
            encoding: 'utf8'
        });
    }
}
/** 获取单个sheet */
function getSingleSheet(sheet, rowLen) {
    var list = {};
    for (j = 2; j <= rowLen; j++) {
        var id = xu.getCellValue(sheet, 'A', j);
        var item = {};
        item.STEM = xu.getCellValue(sheet, 'B', j);
        var answerA = xu.getCellValue(sheet, 'C', j);
        var answerB = xu.getCellValue(sheet, 'D', j);
        var answerC = xu.getCellValue(sheet, 'E', j);
        item.ANSWERS = [answerA, answerB, answerC];
        item.correct = xu.getCellValue(sheet, 'F', j);
        item.TIPS = xu.getCellValue(sheet, 'G', j);
        item.cropId = xu.getCellValue(sheet, 'J', j);
        list[id] = item;
    }
    return list;
}

module.exports = readQuestion;