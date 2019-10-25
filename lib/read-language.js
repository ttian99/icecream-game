var xlsx = require('xlsx');
var fs = require('fs');
var path = require('path');

/** 获取表格的数量 */
function getSheetLen(sheet, total, key) {
    total = total || 2000;
    key = key || 'A';
    for (let i = 2; i < total; i++) {
        var value = getCellValue(sheet, key, i);
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
    const filePath = path.join(Editor.Project.path, 'doc', fileName + '.json');
    fs.writeFileSync(filePath, JSON.stringify(data), {
        encoding: 'utf8'
    });
}

/** 读取excel文件以及sheet表格 */
function readSheet(filePath, sheetName) {
    var workBook = xlsx.readFile(filePath);
    var sheet = workBook.Sheets[sheetName];
    return sheet;
}

function getLan(file, outDir) {
    // const FILE_PATH = '《放置牧语》in-game_全语言 190926.xlsx';
    const FILE_PATH = file;
    const SHEET_NAME = '游戏内翻译';
    const sheet = readSheet(FILE_PATH, SHEET_NAME);
    const list = {
        'B': 'ZH', // 中文
        'C': 'TW', // 繁体
        // 'D': 'EN', // 英文
        'E': 'EN',// 英文2
        'G': 'FR', // 法语
        'H': 'DE', // 德文
        'I': 'RU', // 俄语
        'J': 'AR', // 阿拉伯语
        'K': 'ES', // 西班牙语
        'L': 'JA', // 日语
        'M': 'PT', // 葡萄牙语
    }

    for (const key in list) {
        if (list.hasOwnProperty(key)) {
            const LAN = list[key];
            const data = getLanString(sheet, key, LAN);
            // const filePath = './language/' + LAN + '.ts';
            const filePath = path.join(outDir, LAN + '.ts');
            fs.writeFileSync(filePath, data, {
                encoding: 'utf8'
            });
        }
    }
}

function getLanString(sheet, key, LAN) {
    console.log(`key = ${key} , LAN = ${LAN}`);
    Editor.log(`key = ${key} , LAN = ${LAN}`);
    let task11 = getCellValue(sheet, key, 12);
    let arrTask11 = task11.split('\r\n');
    let task12 = getCellValue(sheet, key, 13);
    let arrTask12 = task12.split('\r\n');

    let SHOP_PROFIX_TIMES = getCellValue(sheet, key, 63);
    let SHOP_PROFIX_TIMES_ARR = SHOP_PROFIX_TIMES.split('\r\n');
    let SHOP_CUT_TIME = getCellValue(sheet, key, 64);
    let SHOP_CUT_TIME_ARR = SHOP_CUT_TIME.split('\r\n');
    console.log(SHOP_PROFIX_TIMES_ARR);
    console.log(SHOP_CUT_TIME_ARR);

    let str = `
    const GUIDER = {
        TASK: {
            1: "${getCellValue(sheet, key, 3)}",
            2: "${getCellValue(sheet, key, 4)}",
            3: "${getCellValue(sheet, key, 5)}",
            4: "${getCellValue(sheet, key, 6)}",
            5: "${getCellValue(sheet, key, 7)}",
            6: "${getCellValue(sheet, key, 8)}",
            7: "${getCellValue(sheet, key, 9)}",
            9: "${getCellValue(sheet, key, 10)}",
            10:" ${getCellValue(sheet, key, 11)}",
            11: { 1: "${arrTask11[0]}", 2: "${arrTask11[1]}" },
            12: { 1: "${arrTask12[0]}", 2: "${arrTask12[1]}" },
        },
        CLICK_CONTINUE: "${getCellValue(sheet, key, 14)}",
    }
    
    const LOAD = {
        LOAD_USER_INFO: "${getCellValue(sheet, key, 15)}",
        LOAD_GAME_ASSETS: "${getCellValue(sheet, key, 16)}",
        LOAD_SCENE: "${getCellValue(sheet, key, 17)}",
    }

    const LOADING_TIPS = [
        "${getCellValue(sheet, key, 18)}",
        "${getCellValue(sheet, key, 19)}",
        "${getCellValue(sheet, key, 20)}",
        "${getCellValue(sheet, key, 21)}",
        "${getCellValue(sheet, key, 22)}",
        "${getCellValue(sheet, key, 23)}",
        "${getCellValue(sheet, key, 24)}",
    ]

    const SHOUGE = {
        TIPS: "${getCellValue(sheet, key, 26)}",
        PANEL1_TIPS: "${getCellValue(sheet, key, 27)}",
        PANEL1_BTN: "${getCellValue(sheet, key, 28)}",
        PANEL2_TIPS1: "${getCellValue(sheet, key, 29)}",
        PANEL2_TIPS2: "${getCellValue(sheet, key, 30)}",
        PANEL2_TIPS3: "${getCellValue(sheet, key, 31)}",
        START_MAKE: "${getCellValue(sheet, key, 32)}",
        START_MAKE_AFTER_WATCH: "${getCellValue(sheet, key, 33)}",
    }

    const ZHONGZHI = {
        TIPS: "${getCellValue(sheet, key, 35)}",
        CHOOSE_CROP: "${getCellValue(sheet, key, 36)}",
    }
    
    const COLLECT = {
        COLLECT_TYPE_NAME: [${getCellValue(sheet, key, 38)}],
        RELATED_ICECREAMS: "${getCellValue(sheet, key, 39)}",
        CAN_LEVEL_UP: "${getCellValue(sheet, key, 40)}",
    }

    const POP_TXT = {
        LOCK: "${getCellValue(sheet, key, 42)}",
        TOMORROW: "${getCellValue(sheet, key, 43)}",
        ALL_CROP: "${getCellValue(sheet, key, 44)}",
        BUY_SUCCESS: "${getCellValue(sheet, key, 45)}",
        NO_DIAMON: "${getCellValue(sheet, key, 46)}",
        INSUFFICIENT_POTION: "${getCellValue(sheet, key, 47)}",
        ENERGY_IS_FULL: "${getCellValue(sheet, key, 48)}",
        MINUTE: "${getCellValue(sheet, key, 49)}",
        HOUR: "${getCellValue(sheet, key, 50)}",
        PRODUCE: "${getCellValue(sheet, key, 51)}",
        VIDEO_IS_NOT_COMPLETE: "${getCellValue(sheet, key, 52)}",
        VIDEO_IS_NOT_COMPLETE_ICECREAM: "${getCellValue(sheet, key, 53)}",
        VIDEO_CAN_NOT_PLAN: "${getCellValue(sheet, key, 54)}",
        REWARD: "${getCellValue(sheet, key, 55)}",
        VERSION: "${getCellValue(sheet, key, 56)}",
        RANCH_PRODUCTIVITY: "${getCellValue(sheet, key, 57)}",
    }

    const TEM = {
        // 作物碎片面板
        GET_FRAGMENT: (num) => \`${getCellValue(sheet, key, 59)}\`,
        UNLOCK_NEW_CROP: (cropName) => \`${getCellValue(sheet, key, 60)}\`,
        CROP_MAX_LEVEL: (cropName) => \`${getCellValue(sheet, key, 61)}\`,
        CROP_LEVEL_UP: (cropName) => \`${getCellValue(sheet, key, 62)}\`,
        // 商店
        SHOP_PROFIX_TIMES: (name, num) => name ? \`${SHOP_PROFIX_TIMES_ARR[0]}\` : \`${SHOP_PROFIX_TIMES_ARR[1]}\`,
        SHOP_CUT_TIME: (name, num) => name ? \`${SHOP_CUT_TIME_ARR[0]}\` :  \`${SHOP_CUT_TIME_ARR[1]}\`,
        SHOP_SEED_BOOST: (num) => \`${getCellValue(sheet, key, 65)}\`,
        SHOP_CUT_PRICE: (name, num) => \`${getCellValue(sheet, key, 66)}\`,
        SHOP_AUTO_PRODUCT: (name) => \`${getCellValue(sheet, key, 67)}\`,
        SHOP_ADD_TO_STACK: (name, num) => \`${getCellValue(sheet, key, 68)}\`,
        SHOP_COIN: (num) => \`${getCellValue(sheet, key, 69)}\`,
        SHOP_DIAMON: (num) => \`${getCellValue(sheet, key, 70)}\`,
        // 获得药水
        GAIN_POTION: (name, num) => \`${getCellValue(sheet, key, 71)}\`,
    }

    const CROP_NAME = {
        "1": "${getCellValue(sheet, key, 73)}",
        "2": "${getCellValue(sheet, key, 74)}",
        "3": "${getCellValue(sheet, key, 75)}",
        "4": "${getCellValue(sheet, key, 76)}",
        "5": "${getCellValue(sheet, key, 77)}",
        "6": "${getCellValue(sheet, key, 78)}",
        "7": "${getCellValue(sheet, key, 79)}",
        "8": "${getCellValue(sheet, key, 80)}",
        "9": "${getCellValue(sheet, key, 81)}",
        "10": "${getCellValue(sheet, key, 82)}",
        "11": "${getCellValue(sheet, key, 83)}",
        "12": "${getCellValue(sheet, key, 84)}",
        "13": "${getCellValue(sheet, key, 85)}",
        "14": "${getCellValue(sheet, key, 86)}",
        "15": "${getCellValue(sheet, key, 87)}",
        "16": "${getCellValue(sheet, key, 88)}",
        "17": "${getCellValue(sheet, key, 89)}",
        "18": "${getCellValue(sheet, key, 90)}",
        "19": "${getCellValue(sheet, key, 91)}",
        "20": "${getCellValue(sheet, key, 92)}",
        "21": "${getCellValue(sheet, key, 93)}",
        "22": "${getCellValue(sheet, key, 94)}",
        "23": "${getCellValue(sheet, key, 95)}",
        "24": "${getCellValue(sheet, key, 96)}",
        "25": "${getCellValue(sheet, key, 97)}",
        "26": "${getCellValue(sheet, key, 98)}",
        "27": "${getCellValue(sheet, key, 99)}",
        "28": "${getCellValue(sheet, key, 100)}",
        "29": "${getCellValue(sheet, key, 101)}",
        "30": "${getCellValue(sheet, key, 102)}",
        "31": "${getCellValue(sheet, key, 103)}",
        "32": "${getCellValue(sheet, key, 104)}",
        "33": "${getCellValue(sheet, key, 105)}",
        "34": "${getCellValue(sheet, key, 106)}",
        "35": "${getCellValue(sheet, key, 107)}",
        "36": "${getCellValue(sheet, key, 108)}",
    }

    const ICECREAM_NAME = {
        "1": "${getCellValue(sheet, key, 110)}",
        "2": "${getCellValue(sheet, key, 111)}",
        "3": "${getCellValue(sheet, key, 112)}",
        "4": "${getCellValue(sheet, key, 113)}",
        "5": "${getCellValue(sheet, key, 114)}",
        "6": "${getCellValue(sheet, key, 115)}",
        "7": "${getCellValue(sheet, key, 116)}",
        "8": "${getCellValue(sheet, key, 117)}",
        "9": "${getCellValue(sheet, key, 118)}",
        "10": "${getCellValue(sheet, key, 119)}",
        "11": "${getCellValue(sheet, key, 120)}",
        "12": "${getCellValue(sheet, key, 121)}",
        "13": "${getCellValue(sheet, key, 122)}",
        "14": "${getCellValue(sheet, key, 123)}",
        "15": "${getCellValue(sheet, key, 124)}",
        "16": "${getCellValue(sheet, key, 125)}",
        "17": "${getCellValue(sheet, key, 126)}",
        "18": "${getCellValue(sheet, key, 127)}",
        "19": "${getCellValue(sheet, key, 128)}",
        "20": "${getCellValue(sheet, key, 129)}",
        "21": "${getCellValue(sheet, key, 130)}",
        "22": "${getCellValue(sheet, key, 131)}",
        "23": "${getCellValue(sheet, key, 132)}",
        "24": "${getCellValue(sheet, key, 133)}",
        "25": "${getCellValue(sheet, key, 134)}",
        "26": "${getCellValue(sheet, key, 135)}",
        "27": "${getCellValue(sheet, key, 136)}",
        "28": "${getCellValue(sheet, key, 137)}",
        "29": "${getCellValue(sheet, key, 138)}",
        "30": "${getCellValue(sheet, key, 139)}",
        "31": "${getCellValue(sheet, key, 140)}",
        "32": "${getCellValue(sheet, key, 141)}",
        "33": "${getCellValue(sheet, key, 142)}",
        "34": "${getCellValue(sheet, key, 143)}",
        "35": "${getCellValue(sheet, key, 144)}",
        "36": "${getCellValue(sheet, key, 145)}",
        "37": "${getCellValue(sheet, key, 146)}",
        "38": "${getCellValue(sheet, key, 147)}",
        "39": "${getCellValue(sheet, key, 148)}",
        "40": "${getCellValue(sheet, key, 149)}",
        "41": "${getCellValue(sheet, key, 150)}",
        "42": "${getCellValue(sheet, key, 151)}",
        "43": "${getCellValue(sheet, key, 152)}",
        "44": "${getCellValue(sheet, key, 153)}",
        "45": "${getCellValue(sheet, key, 154)}",
        "46": "${getCellValue(sheet, key, 155)}",
        "47": "${getCellValue(sheet, key, 156)}",
        "48": "${getCellValue(sheet, key, 157)}",
        "49": "${getCellValue(sheet, key, 158)}",
        "50": "${getCellValue(sheet, key, 159)}",
        "51": "${getCellValue(sheet, key, 160)}",
        "52": "${getCellValue(sheet, key, 161)}",
        "53": "${getCellValue(sheet, key, 162)}",
        "54": "${getCellValue(sheet, key, 163)}",
        "55": "${getCellValue(sheet, key, 164)}",
        "56": "${getCellValue(sheet, key, 165)}",
        "57": "${getCellValue(sheet, key, 166)}",
        "58": "${getCellValue(sheet, key, 167)}",
        "59": "${getCellValue(sheet, key, 168)}",
        "60": "${getCellValue(sheet, key, 169)}",
        "61": "${getCellValue(sheet, key, 170)}",
        "62": "${getCellValue(sheet, key, 171)}",
        "63": "${getCellValue(sheet, key, 172)}",
        "64": "${getCellValue(sheet, key, 173)}",
        "65": "${getCellValue(sheet, key, 174)}",
        "66": "${getCellValue(sheet, key, 175)}",
        "67": "${getCellValue(sheet, key, 176)}",
        "68": "${getCellValue(sheet, key, 177)}",
        "69": "${getCellValue(sheet, key, 178)}",
        "70": "${getCellValue(sheet, key, 179)}",
        "71": "${getCellValue(sheet, key, 180)}",
        "72": "${getCellValue(sheet, key, 181)}",
        "73": "${getCellValue(sheet, key, 182)}",
        "74": "${getCellValue(sheet, key, 183)}",
        "75": "${getCellValue(sheet, key, 184)}",
        "76": "${getCellValue(sheet, key, 185)}",
        "77": "${getCellValue(sheet, key, 186)}",
        "78": "${getCellValue(sheet, key, 187)}",
        "79": "${getCellValue(sheet, key, 188)}",
        "80": "${getCellValue(sheet, key, 189)}",
        "81": "${getCellValue(sheet, key, 190)}",
        "82": "${getCellValue(sheet, key, 191)}",
        "83": "${getCellValue(sheet, key, 192)}",
        "84": "${getCellValue(sheet, key, 193)}",
        "85": "${getCellValue(sheet, key, 194)}",
        "86": "${getCellValue(sheet, key, 195)}",
        "87": "${getCellValue(sheet, key, 196)}",
        "88": "${getCellValue(sheet, key, 197)}",
        "89": "${getCellValue(sheet, key, 198)}",
        "90": "${getCellValue(sheet, key, 199)}",
        "91": "${getCellValue(sheet, key, 200)}",
        "92": "${getCellValue(sheet, key, 201)}",
        "93": "${getCellValue(sheet, key, 202)}",
        "94": "${getCellValue(sheet, key, 203)}",
        "95": "${getCellValue(sheet, key, 204)}",
        "96": "${getCellValue(sheet, key, 205)}",
        "97": "${getCellValue(sheet, key, 206)}",
        "98": "${getCellValue(sheet, key, 207)}",
        "99": "${getCellValue(sheet, key, 208)}",
        "100": "${getCellValue(sheet, key, 209)}",
        "101": "${getCellValue(sheet, key, 210)}",
        "102": "${getCellValue(sheet, key, 211)}",
        "103": "${getCellValue(sheet, key, 212)}",
        "104": "${getCellValue(sheet, key, 213)}",
        "105": "${getCellValue(sheet, key, 214)}",
        "106": "${getCellValue(sheet, key, 215)}",
        "107": "${getCellValue(sheet, key, 216)}",
        "108": "${getCellValue(sheet, key, 217)}",
        "109": "${getCellValue(sheet, key, 218)}",
        "110": "${getCellValue(sheet, key, 219)}",
        "111": "${getCellValue(sheet, key, 220)}",
        "112": "${getCellValue(sheet, key, 221)}",
        "113": "${getCellValue(sheet, key, 222)}",
        "114": "${getCellValue(sheet, key, 223)}",
        "115": "${getCellValue(sheet, key, 224)}",
        "116": "${getCellValue(sheet, key, 225)}",
        "117": "${getCellValue(sheet, key, 226)}",
        "118": "${getCellValue(sheet, key, 227)}",
        "119": "${getCellValue(sheet, key, 228)}",
        "120": "${getCellValue(sheet, key, 229)}",
        "121": "${getCellValue(sheet, key, 230)}",
        "122": "${getCellValue(sheet, key, 231)}",
        "123": "${getCellValue(sheet, key, 232)}",
        "124": "${getCellValue(sheet, key, 233)}",
        "125": "${getCellValue(sheet, key, 234)}",
        "126": "${getCellValue(sheet, key, 235)}",
        "127": "${getCellValue(sheet, key, 236)}",
        "128": "${getCellValue(sheet, key, 237)}",
        "129": "${getCellValue(sheet, key, 238)}",
        "130": "${getCellValue(sheet, key, 239)}",
        "131": "${getCellValue(sheet, key, 240)}",
        "132": "${getCellValue(sheet, key, 241)}",
        "133": "${getCellValue(sheet, key, 242)}",
        "134": "${getCellValue(sheet, key, 243)}",
        "135": "${getCellValue(sheet, key, 244)}",
        "136": "${getCellValue(sheet, key, 245)}",
        "137": "${getCellValue(sheet, key, 246)}",
        "138": "${getCellValue(sheet, key, 247)}",
        "139": "${getCellValue(sheet, key, 248)}",
        "140": "${getCellValue(sheet, key, 249)}",
        "141": "${getCellValue(sheet, key, 250)}",
        "142": "${getCellValue(sheet, key, 251)}",
        "143": "${getCellValue(sheet, key, 252)}",
        "144": "${getCellValue(sheet, key, 253)}",
    }

    const BARRAGE = [
        "${getCellValue(sheet, key, 255)}",
        "${getCellValue(sheet, key, 256)}",
        "${getCellValue(sheet, key, 257)}",
        "${getCellValue(sheet, key, 258)}",
        "${getCellValue(sheet, key, 259)}",
        "${getCellValue(sheet, key, 260)}",
        "${getCellValue(sheet, key, 261)}",
        "${getCellValue(sheet, key, 262)}",
        "${getCellValue(sheet, key, 263)}",
        "${getCellValue(sheet, key, 264)}",
        "${getCellValue(sheet, key, 265)}",
        "${getCellValue(sheet, key, 266)}",
        "${getCellValue(sheet, key, 267)}",
        "${getCellValue(sheet, key, 268)}",
        "${getCellValue(sheet, key, 269)}",
        "${getCellValue(sheet, key, 270)}",
        "${getCellValue(sheet, key, 271)}",
    ]
    
    const WAREHOUSE = {
        WAREHOUSE_TIPS: (time) => \`${getCellValue(sheet, key, 273)}\`,
        LEVEL_TITLE: "${getCellValue(sheet, key, 274)}",
        OFF_TIPS1: "${getCellValue(sheet, key, 275)}",
        OFF_TIPS2: "${getCellValue(sheet, key, 276)}",
        OFF_TIPS3: "${getCellValue(sheet, key, 277)}",
        OFF_TIPS4: "${getCellValue(sheet, key, 278)}",
        OFF_BTN: "${getCellValue(sheet, key, 279)}",
    }

    const SIGN = {
        DAY: (num) => \`${getCellValue(sheet, key, 290).replace('7', '\${num}')}\`,
        REWARD: {
            1: (num) => \`${getCellValue(sheet, key, 281)}\`,
            2: (num) => \`${getCellValue(sheet, key, 282)}\`,
            3: (num) => \`${getCellValue(sheet, key, 283)}\`,
            4: (num) => \`${getCellValue(sheet, key, 284)}\`,
            5: (num) => \`${getCellValue(sheet, key, 285)}\`,
            6: (num) => \`${getCellValue(sheet, key, 286)}\`,
            7: (num) => \`${getCellValue(sheet, key, 287)}\`,
        },
        TIPS: "${getCellValue(sheet, key, 288)}",
        DAY_7_TIPS: "${getCellValue(sheet, key, 289)}",
        DAY_7_TITLE: "${getCellValue(sheet, key, 290)}",
        SIGNED_START: "${getCellValue(sheet, key, 291)}",
        SIGNED_END: "${(getCellValue(sheet, key, 290) + '').replace(/(\S*)7/ig, '').trim()}",
    }

    /** 热气球 */
    const FIREBALL = {
        WATCH_VIDEO: "${getCellValue(sheet, key, 293)}",
        NO_THANKS: "${getCellValue(sheet, key, 294)}",
        SHARE: "${getCellValue(sheet, key, 293)}",
        POP: {
            PROFIX_TIMES: (cropName) => \`${getCellValue(sheet, key, 295)}\`,
            CUT_PRICE: (cropName) => \`${getCellValue(sheet, key, 296)}\`,
            CUT_TIME: (cropName) => \`${getCellValue(sheet, key, 297)}\`,
            AUTO_PRODUCT: (cropName) => \`${getCellValue(sheet, key, 298)}\`,
            ADD_TO_STACK: (num, cropName) => \`${getCellValue(sheet, key, 299)}\`,
            COLLECT_COIN: (num) => \`${getCellValue(sheet, key, 300)}\`,
            COLLECT_DIAMON: (num) => \`${getCellValue(sheet, key, 301)}\`,
            GET_FRAGMENT: (num) => \`${getCellValue(sheet, key, 302)}\`,
        }
    }

    const EXTRA_PROFIX = {
        TIP1: "${getCellValue(sheet, key, 304)}",
        TIP2: "${getCellValue(sheet, key, 305)}",
        TIP3: "${getCellValue(sheet, key, 306)}",
    }
    
    const WYS = {                                       
        TIPS: "${getCellValue(sheet, key, 308)}",
        TIMES: "${getCellValue(sheet, key, 309)}",
        START_BTN: "${getCellValue(sheet, key, 310)}",
        REWARD: "${getCellValue(sheet, key, 311)}",
        GOT_BTN: "${getCellValue(sheet, key, 312)}",
    }

    /** 雨神 */
    const XJT = {
        SING_BTN: "${getCellValue(sheet, key, 314)}",
        GAIN_DOUBLE_COIN: "${getCellValue(sheet, key, 315)}",
        NO_RAIN: "${getCellValue(sheet, key, 316)}",
        IS_RAIN: "${getCellValue(sheet, key, 317)}",
        ADD_BUFF_TIP: "${getCellValue(sheet, key, 318)}",
        HOUR_4: "${getCellValue(sheet, key, 319)}",
    }

    /** 药水 */
    const POTION = {
        1: "${getCellValue(sheet, key, 321)}",
        2: "${getCellValue(sheet, key, 322)}",
        3: "${getCellValue(sheet, key, 323)}",
    }

    /** 任务 */
    const TASK = {
        GAIN_RAINBOW_PROFIX: "${getCellValue(sheet, key, 325)}",
        REFRESH_TASK_TITLE: "${getCellValue(sheet, key, 326)}",
        DESCRIPTIONS: {
            1: "${getCellValue(sheet, key, 327)}",
            2: "${getCellValue(sheet, key, 328)}",
            3: "${getCellValue(sheet, key, 329)}",
            4: "${getCellValue(sheet, key, 330)}",
            5: "${getCellValue(sheet, key, 331)}",
            6: "${getCellValue(sheet, key, 332)}",
            7: "${getCellValue(sheet, key, 333)}",
            8: "${getCellValue(sheet, key, 334)}",
            9: "${getCellValue(sheet, key, 335)}",
            10: "${getCellValue(sheet, key, 336)}",
            11: "${getCellValue(sheet, key, 337)}",
            12: "${getCellValue(sheet, key, 338)}",
            13: "${getCellValue(sheet, key, 339)}",
            14: "${getCellValue(sheet, key, 340)}",
            15: "${getCellValue(sheet, key, 341)}",
            16: "${getCellValue(sheet, key, 342)}",
        },
        NO_TASK_TO_DO: "${getCellValue(sheet, key, 343)}",
        RESET_SUCCESS: "${getCellValue(sheet, key, 344)}",
    }

    /** 宝箱 */
    const BOX = {
        BOX_ITEM_INFO: "${getCellValue(sheet, key, 346)}",
        STATE: {
            FREE: "${getCellValue(sheet, key, 347)}",
            OPENING: "${getCellValue(sheet, key, 348)}",
            UNLOCKED: "${getCellValue(sheet, key, 349)}",
        },
        WATCH_VIDEO: {
            INFO: "${getCellValue(sheet, key, 350)}",
            BTN_YES: "${getCellValue(sheet, key, 351)}",
            BTN_NO: "${getCellValue(sheet, key, 352)}",
        },
        BTN: {
            CLICK_UNLOCK: "${getCellValue(sheet, key, 353)}",
            OPEN_RIGHT_NOW: "${getCellValue(sheet, key, 354)}",
            OPEN_NOW: "${getCellValue(sheet, key, 355)}",
            REDUCE_TIME: (num) => \`${getCellValue(sheet, key, 356)}\`,
            TO_OPEN: "${getCellValue(sheet, key, 357)}",
            GOT_IT: "${getCellValue(sheet, key, 358)}",
            OPEN: "${getCellValue(sheet, key, 357)}",
        },
        BOX_NAME: {
            0: "${getCellValue(sheet, key, 359)}",
            1: "${getCellValue(sheet, key, 360)}",
            2: "${getCellValue(sheet, key, 361)}",
            3: "${getCellValue(sheet, key, 362)}",
        },
        BOX_DES: {
            1: (num) => \`\${num}\`,
            2: (range) => \`\${range}\`,
            3: (num, icecreamDesc) => \`\${num} \${icecreamDesc}\`,
        },
        BOX_DES_3_ARR: [${getCellValue(sheet, key, 363)}],
        POP: (boxName) => \`${getCellValue(sheet, key, 364)}\`,
        SHARE_OPEN:  \`${getCellValue(sheet, key, 365)}\`
    }

    const SET = {
        ON: "${getCellValue(sheet, key, 366)}",
        OFF: "${getCellValue(sheet, key, 367)}",
    }

    /** 升级提示 */
    const LEVEL_UP = {
        THANKS: "${getCellValue(sheet, key, 369)}",
    }

    let ${LAN} = {
        GUIDER,
        LOAD,
        LOADING_TIPS,
        SHOUGE,
        ZHONGZHI,
        COLLECT,
        CROP_NAME,
        ICECREAM_NAME,
        POP_TXT,
        TEM,
        BARRAGE,
        WAREHOUSE,
        SIGN,
        FIREBALL,
        EXTRA_PROFIX,
        WYS,
        XJT,
        POTION,
        TASK,
        BOX,
        SET,
        LEVEL_UP
    };
    export default ${LAN};
    `
    // console.log(str)
    return str;
}

function readLanguage(file, outDir) {
    try {
        getLan(file, outDir);
    } catch (error) {
        console.error(error);
    }
}

module.exports = readLanguage;
