var xu = require('./xlsx-utils');
var fs = require('fs');
var path = require('path');

function readNews(filePath, outDir) {
    var wb = xu.getWorkbook(filePath);
    var sheetNameArr = ['中文', '繁体'];
    let arr = xu.getSheets(wb, sheetNameArr);
    for (let i = 0; i < arr.length; i++) {
        var sheet = arr[i];
        var rowLen = xu.getSheetRowLen(sheet);
        var list = getSingleSheet(sheet, rowLen);
        
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
        }
        var fileNameArr = ['ZH', 'TW'];
        var sheetName = fileNameArr[i];
        let str = `const ${sheetName}_NEWS = ${JSON.stringify(list, null, 4)}; \nexport default ${sheetName}_NEWS;`
        fs.writeFileSync(path.join(outDir, sheetName + '_NEWS.ts'), str, {
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
        item.info = xu.getCellValue(sheet, 'B', j);
        var keys = xu.getCellValue(sheet, 'C', j);
        keys = keys.split(/,|，/ig);
        item.keys = keys;
        item.cropName = xu.getCellValue(sheet, 'D', j);
        item.cropId = xu.getCellValue(sheet, 'E', j);
        item.percent = xu.getCellValue(sheet, 'F', j);
        list[id] = item;
    }
    return list;
}

module.exports = readNews;