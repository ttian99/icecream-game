var xlsx = require('xlsx');

/** 获取每个单元格的值 */
function getCellValue(sheet, col, row) {
    return sheet[col + row] ? sheet[col + row].v : '';
}
/** 获取每个列数 */
function getSheetColLen(sheet, isReturnCode) {
    let i = 'A'.charCodeAt();
    while (getCellValue(sheet, String.fromCharCode(i), 1)) {
        i++;
    }
    return isReturnCode ? i - 1 : String.fromCharCode(i - 1);
}
/** 获取行数 */
function getSheetRowLen(sheet) {
    let i = 1;
    while (getCellValue(sheet, 'A', i)) {
        i++;
    }
    return i - 1;
}
/** 获取总表 */
function getWorkbook(filePath) {
    var workBook = xlsx.readFile(filePath);
    return workBook;
}
/** 获取单个sheet */
function getSheet(workBook, sheetName) {
    return workBook.Sheets[sheetName];
}
/** 获取多个sheet */
function getSheets(workBook, sheetArr) {
    let arr = [];
    for (let i = 0, len = sheetArr.length; i < len; i++) {
        const sheetName = sheetArr[i];
        const sheet = getSheet(workBook, sheetName);
        arr.push(sheet);
    }
    return arr;
}

/** 创建新的工作表 */
function createWorkBook() {
    return xlsx.utils.book_new();
}

var xlsxUtils = { getWorkbook, getSheet, getCellValue, getSheetRowLen, getSheetColLen, createWorkBook, getSheets }
module.exports = xlsxUtils;