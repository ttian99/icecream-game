var xlsx = require('xlsx');
var fs = require('fs');
var path = require('path');

const ICECREAM_LIST = {
    1: { id: 1, name: '黑豆冰榛', stars: 1, cropId: 15 },
    2: { id: 2, name: '豆豆单球', stars: 2, cropId: 15 },
    3: { id: 3, name: '豆豆雪花杯', stars: 3, cropId: 15 },
    4: { id: 4, name: '豆你奇冰', stars: 4, cropId: 15 },
    5: { id: 5, name: '草莓冰棍', stars: 1, cropId: 16 },
    6: { id: 6, name: '草莓球球', stars: 2, cropId: 16 },
    7: { id: 7, name: '草莓蛋筒', stars: 3, cropId: 16 },
    8: { id: 8, name: '草莓卷卷冰', stars: 4, cropId: 16 },
    9: { id: 9, name: '傲蕉棒棒', stars: 1, cropId: 18 },
    10: { id: 10, name: '傲蕉杯', stars: 2, cropId: 18 },
    11: { id: 11, name: '傲蕉3号', stars: 3, cropId: 18 },
    12: { id: 12, name: '傲蕉船', stars: 4, cropId: 18 },
    13: { id: 13, name: '吃瓜冰', stars: 1, cropId: 2 },
    14: { id: 14, name: '蜜瓜小子', stars: 2, cropId: 2 },
    15: { id: 15, name: '蜜瓜大哥', stars: 3, cropId: 2 },
    16: { id: 16, name: '群众的蜜瓜', stars: 4, cropId: 2 },
    17: { id: 17, name: '苹果冰冰', stars: 2, cropId: 25 },
    18: { id: 18, name: '苹果单球', stars: 3, cropId: 25 },
    19: { id: 19, name: '苹果雪花杯', stars: 4, cropId: 25 },
    20: { id: 20, name: '红苹果船', stars: 5, cropId: 25 },
    21: { id: 21, name: '蓝莓双色冰棍', stars: 1, cropId: 29 },
    22: { id: 22, name: '蓝莓雪花糕', stars: 2, cropId: 29 },
    23: { id: 23, name: '蓝莓球球', stars: 3, cropId: 29 },
    24: { id: 24, name: '蓝莓卷卷冰', stars: 4, cropId: 29 },
    25: { id: 25, name: '黄瓜冰棒棒', stars: 1, cropId: 22 },
    26: { id: 26, name: '清爽黄瓜杯', stars: 2, cropId: 22 },
    27: { id: 27, name: '芳香黄瓜圣代', stars: 3, cropId: 22 },
    28: { id: 28, name: '幸福黄瓜盘', stars: 4, cropId: 22 },
    29: { id: 29, name: '双色胡萝卜', stars: 2, cropId: 11 },
    30: { id: 30, name: '兔子爱雪糕', stars: 3, cropId: 11 },
    31: { id: 31, name: '胡萝卜窝窝', stars: 4, cropId: 11 },
    32: { id: 32, name: '一盘胡萝卜', stars: 5, cropId: 11 },
    33: { id: 33, name: '双色樱桃冰', stars: 2, cropId: 6 },
    34: { id: 34, name: '樱桃雪球', stars: 3, cropId: 6 },
    35: { id: 35, name: '车厘子圣代', stars: 4, cropId: 6 },
    36: { id: 36, name: '樱桃雪冰纷', stars: 5, cropId: 6 },
    37: { id: 37, name: '菠萝批', stars: 2, cropId: 26 },
    38: { id: 38, name: '凤梨小杯子', stars: 3, cropId: 26 },
    39: { id: 39, name: '菠萝船', stars: 4, cropId: 26 },
    40: { id: 40, name: '开心凤梨碗', stars: 5, cropId: 26 },
    41: { id: 41, name: '鸡蛋仔冰棍', stars: 1, cropId: 27 },
    42: { id: 42, name: '鸡冠绵绵冰', stars: 2, cropId: 27 },
    43: { id: 43, name: '蛋蛋忧伤筒', stars: 3, cropId: 27 },
    44: { id: 44, name: '鸡你太美冰', stars: 4, cropId: 27 },
    45: { id: 45, name: '香柠冰棒', stars: 1, cropId: 1 },
    46: { id: 46, name: '爱柠一杯雪', stars: 2, cropId: 1 },
    47: { id: 47, name: '爱柠会蛋筒', stars: 3, cropId: 1 },
    48: { id: 48, name: '酸过初恋', stars: 4, cropId: 1 },
    49: { id: 49, name: '蓝瘦好棒', stars: 1, cropId: 7 },
    50: { id: 50, name: '伏地蘑菇冰', stars: 2, cropId: 7 },
    51: { id: 51, name: '蓝蘑菇蛋筒', stars: 3, cropId: 7 },
    52: { id: 52, name: '一盘都蓝瘦', stars: 4, cropId: 7 },
    53: { id: 53, name: '一二三冰棒', stars: 1, cropId: 4 },
    54: { id: 54, name: '一二三绵绵冰', stars: 2, cropId: 4 },
    55: { id: 55, name: '茄扭纹蛋筒', stars: 3, cropId: 4 },
    56: { id: 56, name: '茄子欢乐颂', stars: 4, cropId: 4 },
    57: { id: 57, name: '纯正奶牛冰', stars: 2, cropId: 28 },
    58: { id: 58, name: '阿牛雪花杯', stars: 3, cropId: 28 },
    59: { id: 59, name: '牛二哥雪糕', stars: 4, cropId: 28 },
    60: { id: 60, name: '牛大佬雪糕', stars: 5, cropId: 28 },
    61: { id: 61, name: '真的是雪糕', stars: 2, cropId: 30 },
    62: { id: 62, name: '认真的雪糕', stars: 3, cropId: 30 },
    63: { id: 63, name: '蛋包小雪糕', stars: 4, cropId: 30 },
    64: { id: 64, name: '雪人快乐冰', stars: 5, cropId: 30 },
    65: { id: 65, name: '牛油果冰棍', stars: 2, cropId: 19 },
    66: { id: 66, name: '牛油果缤纷', stars: 3, cropId: 19 },
    67: { id: 67, name: '冰雪牛油果', stars: 4, cropId: 19 },
    68: { id: 68, name: '牛油果雪葩', stars: 5, cropId: 19 },
    69: { id: 69, name: '串串葡萄冰', stars: 2, cropId: 8 },
    70: { id: 70, name: '葡萄雪泥', stars: 3, cropId: 8 },
    71: { id: 71, name: '葡萄满杯雪', stars: 4, cropId: 8 },
    72: { id: 72, name: '葡萄乐融融', stars: 5, cropId: 8 },
    73: { id: 73, name: '一朵雪花仙', stars: 3, cropId: 32 },
    74: { id: 74, name: '手捧花仙子', stars: 4, cropId: 32 },
    75: { id: 75, name: '花香卷卷冰', stars: 5, cropId: 32 },
    76: { id: 76, name: '巴拉小花仙', stars: 6, cropId: 32 },
    77: { id: 77, name: '芒果芝芝', stars: 3, cropId: 3 },
    78: { id: 78, name: '香芒四溢', stars: 4, cropId: 3 },
    79: { id: 79, name: '芒果冰纷', stars: 5, cropId: 3 },
    80: { id: 80, name: '芒果乐冰纷', stars: 6, cropId: 3 },
    81: { id: 81, name: '晶莹橙子冰棒', stars: 1, cropId: 20 },
    82: { id: 82, name: '香橙满杯', stars: 2, cropId: 20 },
    83: { id: 83, name: '橙子蛋筒', stars: 3, cropId: 20 },
    84: { id: 84, name: '香橙卷冰', stars: 4, cropId: 20 },
    85: { id: 85, name: '乌贼口味冰', stars: 2, cropId: 13 },
    86: { id: 86, name: '墨球乌贼冰', stars: 3, cropId: 13 },
    87: { id: 87, name: '外星乌贼冰', stars: 4, cropId: 13 },
    88: { id: 88, name: '乌贼飘雪盛宴', stars: 5, cropId: 13 },
    89: { id: 89, name: '头顶山竹冰', stars: 3, cropId: 10 },
    90: { id: 90, name: '山竹大甜筒', stars: 4, cropId: 10 },
    91: { id: 91, name: '台风山竹', stars: 5, cropId: 10 },
    92: { id: 92, name: '山竹暴风雪', stars: 6, cropId: 10 },
    93: { id: 93, name: '牵牛花紫薯冰', stars: 3, cropId: 17 },
    94: { id: 94, name: '紫薯藤蔓雪', stars: 4, cropId: 17 },
    95: { id: 95, name: '慕容紫薯冰', stars: 5, cropId: 17 },
    96: { id: 96, name: '紫薯暴雪冰', stars: 6, cropId: 17 },
    97: { id: 97, name: '蒲公鹰之飘', stars: 3, cropId: 12 },
    98: { id: 98, name: '蒲公鹰之花', stars: 4, cropId: 12 },
    99: { id: 99, name: '蒲公鹰之恋', stars: 5, cropId: 12 },
    100: { id: 100, name: '蒲公鹰之吻', stars: 6, cropId: 12 },
    101: { id: 101, name: '橘猫岁岁冰', stars: 3, cropId: 9 },
    102: { id: 102, name: '橘猫可爱多', stars: 4, cropId: 9 },
    103: { id: 103, name: '猫二货雪糕', stars: 5, cropId: 9 },
    104: { id: 104, name: '三猫传奇冰', stars: 6, cropId: 9 },
    105: { id: 105, name: '可乐乐可冰', stars: 3, cropId: 31 },
    106: { id: 106, name: '阿华田可乐冰', stars: 4, cropId: 31 },
    107: { id: 107, name: '可乐卷卷冰', stars: 5, cropId: 31 },
    108: { id: 108, name: '可乐冰便当', stars: 6, cropId: 31 },
    109: { id: 109, name: '奥利奥杯', stars: 3, cropId: 5 },
    110: { id: 110, name: '圣代奥利奥', stars: 4, cropId: 5 },
    111: { id: 111, name: '欢乐奥利奥', stars: 5, cropId: 5 },
    112: { id: 112, name: '绽放奥利奥', stars: 6, cropId: 5 },
    113: { id: 113, name: '橡果好棒', stars: 2, cropId: 34 },
    114: { id: 114, name: '橡果满杯雪', stars: 3, cropId: 34 },
    115: { id: 115, name: '橡果甜筒', stars: 4, cropId: 34 },
    116: { id: 116, name: '橡果田园', stars: 5, cropId: 34 },
    117: { id: 117, name: '南瓜冰淇淋', stars: 3, cropId: 33 },
    118: { id: 118, name: '万圣代', stars: 4, cropId: 33 },
    119: { id: 119, name: '南瓜配生巧冰', stars: 5, cropId: 33 },
    120: { id: 120, name: '万圣奇遇冰', stars: 6, cropId: 33 },
    121: { id: 121, name: '花仙杯子', stars: 3, cropId: 36 },
    122: { id: 122, name: '破茧小甜筒', stars: 4, cropId: 36 },
    123: { id: 123, name: '轻舞飞扬', stars: 5, cropId: 36 },
    124: { id: 124, name: '蝶恋花仙子', stars: 6, cropId: 36 },
    125: { id: 125, name: '巧克力雪葩', stars: 3, cropId: 35 },
    126: { id: 126, name: '双球生巧', stars: 4, cropId: 35 },
    127: { id: 127, name: '朱古力船', stars: 5, cropId: 35 },
    128: { id: 128, name: '生巧冰荟萃', stars: 6, cropId: 35 },
    129: { id: 129, name: '韭菜刚被割', stars: 3, cropId: 14 },
    130: { id: 130, name: '韭菜又被割', stars: 4, cropId: 14 },
    131: { id: 131, name: '韭菜已成冰', stars: 5, cropId: 14 },
    132: { id: 132, name: '韭州大冰雪', stars: 6, cropId: 14 },
    133: { id: 133, name: '马卡龙雪球', stars: 3, cropId: 21 },
    134: { id: 134, name: '马卡奇冰', stars: 4, cropId: 21 },
    135: { id: 135, name: '冰纷马卡龙', stars: 5, cropId: 21 },
    136: { id: 136, name: '冰雪奇缘马卡龙', stars: 6, cropId: 21 },
    137: { id: 137, name: '放飞姜饼侠', stars: 3, cropId: 23 },
    138: { id: 138, name: '姜饼甜甜雪糕', stars: 4, cropId: 23 },
    139: { id: 139, name: '姜饼雪糕盛宴', stars: 5, cropId: 23 },
    140: { id: 140, name: '姜饼兄弟冰', stars: 6, cropId: 23 },
    141: { id: 141, name: '原谅绿冰冰', stars: 3, cropId: 24 },
    142: { id: 142, name: '加料原谅绿', stars: 4, cropId: 24 },
    143: { id: 143, name: '原谅全家桶', stars: 5, cropId: 24 },
    144: { id: 144, name: '原谅者联盟', stars: 6, cropId: 24 },
}

/** 获取表格的数量 */
function getSheetLen(sheet) {
    var total = 2000;
    for (let i = 2; i < total; i++) {
        var value = getCellValue(sheet, 'A', i);
        if (!value) return i - 1;
    }
}
/** 获取每个单元格的值 */
function getCellValue(sheet, col, row) {
    return sheet[col + row] ? sheet[col + row].v : '';
}
/**
 * 导出游戏配置
*/
function exportJson(fileName, data) {
    fs.writeFileSync(fileName + '.json', JSON.stringify(data), { encoding: 'utf8' });
}

/** 读取excel文件以及sheet表格 */
function readSheet(filePath, sheetName) {
    var workBook = xlsx.readFile(filePath);
    var sheet = workBook.Sheets[sheetName];
    return sheet;
}

function getIcecreamEnglishName() {
    const sheet = readSheet('放置牧语数值配置表.xlsx', '英语翻译');
    // 作物    
    let cropList = {};
    let cropName = {};
    const len = 36;
    for (let i = 2; i <= len + 1; i++) {
        var cropId = getCellValue(sheet, 'A', i);
        var cropCnName = getCellValue(sheet, 'C', i);
        var cropEnName = getCellValue(sheet, 'D', i);
        let crop = { cropCnName, cropEnName };
        crop.icecream = {};
        crop.icecream[1] = getCellValue(sheet, 'K', i);
        crop.icecream[2] = getCellValue(sheet, 'L', i);
        crop.icecream[3] = getCellValue(sheet, 'M', i);
        crop.icecream[4] = getCellValue(sheet, 'N', i);
        crop.icecream[5] = getCellValue(sheet, 'O', i);
        crop.icecream[6] = getCellValue(sheet, 'P', i);

        cropList[cropId] = crop;
        cropName[cropId] = cropEnName;
    }
    console.log(cropList);
    exportJson('cropName', cropName);
    exportJson('cropList', cropList);

    const list = ICECREAM_LIST;
    var len2 = Object.keys(list).length;
    // 读取名字
    let icecreamList = {};
    let icecreamName = {};
    for (let j = 1; j <= len2; j++) {
        const icecream = list[j];
        const crop = cropList[icecream.cropId];

        const idx = icecream.stars;
        const name = crop.icecream[idx];
        console.log(name);
        icecreamList[j] = { id: j, name: icecream.name, english: name };
        icecreamName[j] = name;
    }

    exportJson('icecreamName', icecreamName);
    exportJson('icecreamList', icecreamList);
}

getIcecreamEnglishName();

