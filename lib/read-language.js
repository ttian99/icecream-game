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
        'D': 'EN', // 英文
        // 'E': 'EN2',// 英文2
        'F': 'FR', // 法语
        'G': 'DE', // 德文
        'H': 'RU', // 俄语
        'I': 'AR', // 阿拉伯语
        'J': 'ES', // 西班牙语
        'K': 'JA', // 日语
        // 'L': 'PT', // 葡萄牙语
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
    let task11 = getCellValue(sheet, key, 12);
    let arrTask11 = task11.split('\r\n');
    let task12 = getCellValue(sheet, key, 13);
    let arrTask12 = task12.split('\r\n');

    let SHOP_PROFIX_TIMES = getCellValue(sheet, key, 57);
    let SHOP_PROFIX_TIMES_ARR = SHOP_PROFIX_TIMES.split('\r\n');
    let SHOP_CUT_TIME = getCellValue(sheet, key, 58);
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
        LOAD_USER_INFO: "${getCellValue(sheet, key, 16)}",
        LOAD_GAME_ASSETS: "${getCellValue(sheet, key, 17)}",
        LOAD_SCENE: "${getCellValue(sheet, key, 18)}",
    }

    const SHOUGE = {
        TIPS: "${getCellValue(sheet, key, 20)}",
        PANEL1_TIPS: "${getCellValue(sheet, key, 21)}",
        PANEL1_BTN: "${getCellValue(sheet, key, 22)}",
        PANEL2_TIPS1: "${getCellValue(sheet, key, 23)}",
        PANEL2_TIPS2: "${getCellValue(sheet, key, 24)}",
        PANEL2_TIPS3: "${getCellValue(sheet, key, 25)}",
        START_MAKE: "${getCellValue(sheet, key, 26)}",
        START_MAKE_AFTER_WATCH: "${getCellValue(sheet, key, 27)}",
    }

    const ZHONGZHI = {
        TIPS: "${getCellValue(sheet, key, 29)}",
        CHOOSE_CROP: "${getCellValue(sheet, key, 30)}",
    }
    
    const COLLECT = {
        COLLECT_TYPE_NAME: [${getCellValue(sheet, key, 32)}],
        RELATED_ICECREAMS: "${getCellValue(sheet, key, 33)}",
        CAN_LEVEL_UP: "${getCellValue(sheet, key, 34)}",
    }
    
    const POP_TXT = {
        LOCK: "${getCellValue(sheet, key, 36)}",
        TOMORROW: "${getCellValue(sheet, key, 37)}",
        ALL_CROP: "${getCellValue(sheet, key, 38)}",
        BUY_SUCCESS: "${getCellValue(sheet, key, 39)}",
        NO_DIAMON: "${getCellValue(sheet, key, 40)}",
        INSUFFICIENT_POTION: "${getCellValue(sheet, key, 41)}",
        ENERGY_IS_FULL: "${getCellValue(sheet, key, 42)}",
        MINUTE: "${getCellValue(sheet, key, 43)}",
        HOUR: "${getCellValue(sheet, key, 44)}",
        PRODUCE: "${getCellValue(sheet, key, 45)}",
        VIDEO_IS_NOT_COMPLETE: "${getCellValue(sheet, key, 46)}",
        VIDEO_IS_NOT_COMPLETE_ICECREAM: "${getCellValue(sheet, key, 47)}",
        VIDEO_CAN_NOT_PLAN: "${getCellValue(sheet, key, 48)}",
        REWARD: "${getCellValue(sheet, key, 49)}",
        VERSION: "${getCellValue(sheet, key, 50)}",
        RANCH_PRODUCTIVITY: "${getCellValue(sheet, key, 51)}",
    }

    const TEM = {
        // 作物碎片面板
        GET_FRAGMENT: (num) => \`${getCellValue(sheet, key, 53)}\`,
        UNLOCK_NEW_CROP: (cropName) => \`${getCellValue(sheet, key, 54)}\`,
        CROP_MAX_LEVEL: (cropName) => \`${getCellValue(sheet, key, 55)}\`,
        CROP_LEVEL_UP: (cropName) => \`${getCellValue(sheet, key, 56)}\`,
        // 商店
        SHOP_PROFIX_TIMES: (name, num) => name ? \`${SHOP_PROFIX_TIMES_ARR[0]}\` : \`${SHOP_PROFIX_TIMES_ARR[1]}\`,
        SHOP_CUT_TIME: (name, num) => name ? \`${SHOP_CUT_TIME_ARR[0]}\` :  \`${SHOP_CUT_TIME_ARR[1]}\`,
        SHOP_SEED_BOOST: (num) => \`${getCellValue(sheet, key, 59)}\`,
        SHOP_CUT_PRICE: (name, num) => \`${getCellValue(sheet, key, 60)}\`,
        SHOP_AUTO_PRODUCT: (name) => \`${getCellValue(sheet, key, 61)}\`,
        SHOP_ADD_TO_STACK: (name, num) => \`${getCellValue(sheet, key, 62)}\`,
        SHOP_COIN: (num) => \`${getCellValue(sheet, key, 63)}\`,
        SHOP_DIAMON: (num) => \`${getCellValue(sheet, key, 64)}\`,
        // 获得药水
        GAIN_POTION: (name, num) => \`${getCellValue(sheet, key, 65)}\`,
    }

    const CROP_NAME = {
        "1": "${getCellValue(sheet, key, 67)}",
        "2": "${getCellValue(sheet, key, 68)}",
        "3": "${getCellValue(sheet, key, 69)}",
        "4": "${getCellValue(sheet, key, 70)}",
        "5": "${getCellValue(sheet, key, 71)}",
        "6": "${getCellValue(sheet, key, 72)}",
        "7": "${getCellValue(sheet, key, 73)}",
        "8": "${getCellValue(sheet, key, 74)}",
        "9": "${getCellValue(sheet, key, 75)}",
        "10": "${getCellValue(sheet, key, 76)}",
        "11": "${getCellValue(sheet, key, 77)}",
        "12": "${getCellValue(sheet, key, 78)}",
        "13": "${getCellValue(sheet, key, 79)}",
        "14": "${getCellValue(sheet, key, 80)}",
        "15": "${getCellValue(sheet, key, 81)}",
        "16": "${getCellValue(sheet, key, 82)}",
        "17": "${getCellValue(sheet, key, 83)}",
        "18": "${getCellValue(sheet, key, 84)}",
        "19": "${getCellValue(sheet, key, 85)}",
        "20": "${getCellValue(sheet, key, 86)}",
        "21": "${getCellValue(sheet, key, 87)}",
        "22": "${getCellValue(sheet, key, 88)}",
        "23": "${getCellValue(sheet, key, 89)}",
        "24": "${getCellValue(sheet, key, 90)}",
        "25": "${getCellValue(sheet, key, 91)}",
        "26": "${getCellValue(sheet, key, 92)}",
        "27": "${getCellValue(sheet, key, 93)}",
        "28": "${getCellValue(sheet, key, 94)}",
        "29": "${getCellValue(sheet, key, 95)}",
        "30": "${getCellValue(sheet, key, 96)}",
        "31": "${getCellValue(sheet, key, 97)}",
        "32": "${getCellValue(sheet, key, 98)}",
        "33": "${getCellValue(sheet, key, 99)}",
        "34": "${getCellValue(sheet, key, 100)}",
        "35": "${getCellValue(sheet, key, 101)}",
        "36": "${getCellValue(sheet, key, 102)}",
    }

    const ICECREAM_NAME = {
        "1": "${getCellValue(sheet, key, 104)}",
        "2": "${getCellValue(sheet, key, 105)}",
        "3": "${getCellValue(sheet, key, 106)}",
        "4": "${getCellValue(sheet, key, 107)}",
        "5": "${getCellValue(sheet, key, 108)}",
        "6": "${getCellValue(sheet, key, 109)}",
        "7": "${getCellValue(sheet, key, 110)}",
        "8": "${getCellValue(sheet, key, 111)}",
        "9": "${getCellValue(sheet, key, 112)}",
        "10": "${getCellValue(sheet, key, 113)}",
        "11": "${getCellValue(sheet, key, 114)}",
        "12": "${getCellValue(sheet, key, 115)}",
        "13": "${getCellValue(sheet, key, 116)}",
        "14": "${getCellValue(sheet, key, 117)}",
        "15": "${getCellValue(sheet, key, 118)}",
        "16": "${getCellValue(sheet, key, 119)}",
        "17": "${getCellValue(sheet, key, 120)}",
        "18": "${getCellValue(sheet, key, 121)}",
        "19": "${getCellValue(sheet, key, 122)}",
        "20": "${getCellValue(sheet, key, 123)}",
        "21": "${getCellValue(sheet, key, 124)}",
        "22": "${getCellValue(sheet, key, 125)}",
        "23": "${getCellValue(sheet, key, 126)}",
        "24": "${getCellValue(sheet, key, 127)}",
        "25": "${getCellValue(sheet, key, 128)}",
        "26": "${getCellValue(sheet, key, 129)}",
        "27": "${getCellValue(sheet, key, 130)}",
        "28": "${getCellValue(sheet, key, 131)}",
        "29": "${getCellValue(sheet, key, 132)}",
        "30": "${getCellValue(sheet, key, 133)}",
        "31": "${getCellValue(sheet, key, 134)}",
        "32": "${getCellValue(sheet, key, 135)}",
        "33": "${getCellValue(sheet, key, 136)}",
        "34": "${getCellValue(sheet, key, 137)}",
        "35": "${getCellValue(sheet, key, 138)}",
        "36": "${getCellValue(sheet, key, 139)}",
        "37": "${getCellValue(sheet, key, 140)}",
        "38": "${getCellValue(sheet, key, 141)}",
        "39": "${getCellValue(sheet, key, 142)}",
        "40": "${getCellValue(sheet, key, 143)}",
        "41": "${getCellValue(sheet, key, 144)}",
        "42": "${getCellValue(sheet, key, 145)}",
        "43": "${getCellValue(sheet, key, 146)}",
        "44": "${getCellValue(sheet, key, 147)}",
        "45": "${getCellValue(sheet, key, 148)}",
        "46": "${getCellValue(sheet, key, 149)}",
        "47": "${getCellValue(sheet, key, 150)}",
        "48": "${getCellValue(sheet, key, 151)}",
        "49": "${getCellValue(sheet, key, 152)}",
        "50": "${getCellValue(sheet, key, 153)}",
        "51": "${getCellValue(sheet, key, 154)}",
        "52": "${getCellValue(sheet, key, 155)}",
        "53": "${getCellValue(sheet, key, 156)}",
        "54": "${getCellValue(sheet, key, 157)}",
        "55": "${getCellValue(sheet, key, 158)}",
        "56": "${getCellValue(sheet, key, 159)}",
        "57": "${getCellValue(sheet, key, 160)}",
        "58": "${getCellValue(sheet, key, 161)}",
        "59": "${getCellValue(sheet, key, 162)}",
        "60": "${getCellValue(sheet, key, 163)}",
        "61": "${getCellValue(sheet, key, 164)}",
        "62": "${getCellValue(sheet, key, 165)}",
        "63": "${getCellValue(sheet, key, 166)}",
        "64": "${getCellValue(sheet, key, 167)}",
        "65": "${getCellValue(sheet, key, 168)}",
        "66": "${getCellValue(sheet, key, 169)}",
        "67": "${getCellValue(sheet, key, 170)}",
        "68": "${getCellValue(sheet, key, 171)}",
        "69": "${getCellValue(sheet, key, 172)}",
        "70": "${getCellValue(sheet, key, 173)}",
        "71": "${getCellValue(sheet, key, 174)}",
        "72": "${getCellValue(sheet, key, 175)}",
        "73": "${getCellValue(sheet, key, 176)}",
        "74": "${getCellValue(sheet, key, 177)}",
        "75": "${getCellValue(sheet, key, 178)}",
        "76": "${getCellValue(sheet, key, 179)}",
        "77": "${getCellValue(sheet, key, 180)}",
        "78": "${getCellValue(sheet, key, 181)}",
        "79": "${getCellValue(sheet, key, 182)}",
        "80": "${getCellValue(sheet, key, 183)}",
        "81": "${getCellValue(sheet, key, 184)}",
        "82": "${getCellValue(sheet, key, 185)}",
        "83": "${getCellValue(sheet, key, 186)}",
        "84": "${getCellValue(sheet, key, 187)}",
        "85": "${getCellValue(sheet, key, 188)}",
        "86": "${getCellValue(sheet, key, 189)}",
        "87": "${getCellValue(sheet, key, 190)}",
        "88": "${getCellValue(sheet, key, 191)}",
        "89": "${getCellValue(sheet, key, 192)}",
        "90": "${getCellValue(sheet, key, 193)}",
        "91": "${getCellValue(sheet, key, 194)}",
        "92": "${getCellValue(sheet, key, 195)}",
        "93": "${getCellValue(sheet, key, 196)}",
        "94": "${getCellValue(sheet, key, 197)}",
        "95": "${getCellValue(sheet, key, 198)}",
        "96": "${getCellValue(sheet, key, 199)}",
        "97": "${getCellValue(sheet, key, 200)}",
        "98": "${getCellValue(sheet, key, 201)}",
        "99": "${getCellValue(sheet, key, 202)}",
        "100": "${getCellValue(sheet, key, 203)}",
        "101": "${getCellValue(sheet, key, 204)}",
        "102": "${getCellValue(sheet, key, 205)}",
        "103": "${getCellValue(sheet, key, 206)}",
        "104": "${getCellValue(sheet, key, 207)}",
        "105": "${getCellValue(sheet, key, 208)}",
        "106": "${getCellValue(sheet, key, 209)}",
        "107": "${getCellValue(sheet, key, 210)}",
        "108": "${getCellValue(sheet, key, 211)}",
        "109": "${getCellValue(sheet, key, 212)}",
        "110": "${getCellValue(sheet, key, 213)}",
        "111": "${getCellValue(sheet, key, 214)}",
        "112": "${getCellValue(sheet, key, 215)}",
        "113": "${getCellValue(sheet, key, 216)}",
        "114": "${getCellValue(sheet, key, 217)}",
        "115": "${getCellValue(sheet, key, 218)}",
        "116": "${getCellValue(sheet, key, 219)}",
        "117": "${getCellValue(sheet, key, 220)}",
        "118": "${getCellValue(sheet, key, 221)}",
        "119": "${getCellValue(sheet, key, 222)}",
        "120": "${getCellValue(sheet, key, 223)}",
        "121": "${getCellValue(sheet, key, 224)}",
        "122": "${getCellValue(sheet, key, 225)}",
        "123": "${getCellValue(sheet, key, 226)}",
        "124": "${getCellValue(sheet, key, 227)}",
        "125": "${getCellValue(sheet, key, 228)}",
        "126": "${getCellValue(sheet, key, 229)}",
        "127": "${getCellValue(sheet, key, 230)}",
        "128": "${getCellValue(sheet, key, 231)}",
        "129": "${getCellValue(sheet, key, 232)}",
        "130": "${getCellValue(sheet, key, 233)}",
        "131": "${getCellValue(sheet, key, 234)}",
        "132": "${getCellValue(sheet, key, 235)}",
        "133": "${getCellValue(sheet, key, 236)}",
        "134": "${getCellValue(sheet, key, 237)}",
        "135": "${getCellValue(sheet, key, 238)}",
        "136": "${getCellValue(sheet, key, 239)}",
        "137": "${getCellValue(sheet, key, 240)}",
        "138": "${getCellValue(sheet, key, 241)}",
        "139": "${getCellValue(sheet, key, 242)}",
        "140": "${getCellValue(sheet, key, 243)}",
        "141": "${getCellValue(sheet, key, 244)}",
        "142": "${getCellValue(sheet, key, 245)}",
        "143": "${getCellValue(sheet, key, 246)}",
        "144": "${getCellValue(sheet, key, 247)}",
    }

    const BARRAGE = [
        "${getCellValue(sheet, key, 249)}",
        "${getCellValue(sheet, key, 250)}",
        "${getCellValue(sheet, key, 251)}",
        "${getCellValue(sheet, key, 252)}",
        "${getCellValue(sheet, key, 253)}",
        "${getCellValue(sheet, key, 254)}",
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
    ]

    const WAREHOUSE = {
        WAREHOUSE_TIPS: (time) => \`${getCellValue(sheet, key, 267)}\`,
        LEVEL_TITLE: "${getCellValue(sheet, key, 268)}",
        OFF_TIPS1: "${getCellValue(sheet, key, 269)}",
        OFF_TIPS2: "${getCellValue(sheet, key, 270)}",
        OFF_TIPS3: "${getCellValue(sheet, key, 271)}",
        OFF_TIPS4: "${getCellValue(sheet, key, 272)}",
        OFF_BTN: "${getCellValue(sheet, key, 273)}",
    }

    const SIGN = {
        DAY: (num) => \`${getCellValue(sheet, key, 284).replace('7', '\${num}')}\`,
        REWARD: {
            1: (num) => \`${getCellValue(sheet, key, 275)}\`,
            2: (num) => \`${getCellValue(sheet, key, 276)}\`,
            3: (num) => \`${getCellValue(sheet, key, 277)}\`,
            4: (num) => \`${getCellValue(sheet, key, 278)}\`,
            5: (num) => \`${getCellValue(sheet, key, 279)}\`,
            6: (num) => \`${getCellValue(sheet, key, 280)}\`,
            7: (num) => \`${getCellValue(sheet, key, 281)}\`,
        },
        TIPS: "${getCellValue(sheet, key, 282)}",
        DAY_7_TIPS: "${getCellValue(sheet, key, 283)}",
        DAY_7_TITLE: "${getCellValue(sheet, key, 284)}",
        SIGNED_START: "${getCellValue(sheet, key, 285)}",
        SIGNED_END: "${(getCellValue(sheet, key, 284) + '').replace(/(\S*)7/ig, '').trim()}",
    }

    /** 热气球 */
    const FIREBALL = {
        WATCH_VIDEO: "${getCellValue(sheet, key, 287)}",
        NO_THANKS: "${getCellValue(sheet, key, 288)}",
        SHARE: "${getCellValue(sheet, key, 287)}",
        POP: {
            PROFIX_TIMES: (cropName) => \`${getCellValue(sheet, key, 289)}\`,
            CUT_PRICE: (cropName) => \`${getCellValue(sheet, key, 290)}\`,
            CUT_TIME: (cropName) => \`${getCellValue(sheet, key, 291)}\`,
            AUTO_PRODUCT: (cropName) => \`${getCellValue(sheet, key, 292)}\`,
            ADD_TO_STACK: (num, cropName) => \`${getCellValue(sheet, key, 293)}\`,
            COLLECT_COIN: (num) => \`${getCellValue(sheet, key, 294)}\`,
            COLLECT_DIAMON: (num) => \`${getCellValue(sheet, key, 295)}\`,
            GET_FRAGMENT: (num) => \`${getCellValue(sheet, key, 296)}\`,
        }
    }

    const EXTRA_PROFIX = {
        TIP1: "${getCellValue(sheet, key, 298)}",
        TIP2: "${getCellValue(sheet, key, 299)}",
        TIP3: "${getCellValue(sheet, key, 300)}",
    }
    
    const WYS = {                                       
        TIPS: "${getCellValue(sheet, key, 302)}",
        TIMES: "${getCellValue(sheet, key, 303)}",
        START_BTN: "${getCellValue(sheet, key, 304)}",
        REWARD: "${getCellValue(sheet, key, 305)}",
        GOT_BTN: "${getCellValue(sheet, key, 306)}",
    }

    /** 雨神 */
    const XJT = {
        SING_BTN: "${getCellValue(sheet, key, 308)}",
        GAIN_DOUBLE_COIN: "${getCellValue(sheet, key, 309)}",
        NO_RAIN: "${getCellValue(sheet, key, 310)}",
        IS_RAIN: "${getCellValue(sheet, key, 311)}",
        ADD_BUFF_TIP: "${getCellValue(sheet, key, 312)}",
        HOUR_4: "${getCellValue(sheet, key, 313)}",
    }

    /** 药水 */
    const POTION = {
        1: "${getCellValue(sheet, key, 315)}",
        2: "${getCellValue(sheet, key, 316)}",
        3: "${getCellValue(sheet, key, 317)}",
    }

    /** 任务 */
    const TASK = {
        GAIN_RAINBOW_PROFIX: "${getCellValue(sheet, key, 319)}",
        REFRESH_TASK_TITLE: "${getCellValue(sheet, key, 320)}",
        DESCRIPTIONS: {
            1: "${getCellValue(sheet, key, 321)}",
            2: "${getCellValue(sheet, key, 322)}",
            3: "${getCellValue(sheet, key, 323)}",
            4: "${getCellValue(sheet, key, 324)}",
            5: "${getCellValue(sheet, key, 325)}",
            6: "${getCellValue(sheet, key, 326)}",
            7: "${getCellValue(sheet, key, 327)}",
            8: "${getCellValue(sheet, key, 328)}",
            9: "${getCellValue(sheet, key, 329)}",
            10: "${getCellValue(sheet, key, 330)}",
            11: "${getCellValue(sheet, key, 331)}",
            12: "${getCellValue(sheet, key, 332)}",
            13: "${getCellValue(sheet, key, 333)}",
            14: "${getCellValue(sheet, key, 334)}",
            15: "${getCellValue(sheet, key, 335)}",
            16: "${getCellValue(sheet, key, 336)}",
        },
        NO_TASK_TO_DO: "${getCellValue(sheet, key, 337)}",
        RESET_SUCCESS: "${getCellValue(sheet, key, 338)}",
    }

    /** 宝箱 */
    const BOX = {
        BOX_ITEM_INFO: "${getCellValue(sheet, key, 340)}",
        STATE: {
            FREE: "${getCellValue(sheet, key, 341)}",
            OPENING: "${getCellValue(sheet, key, 342)}",
            UNLOCKED: "${getCellValue(sheet, key, 343)}",
        },
        WATCH_VIDEO: {
            INFO: "${getCellValue(sheet, key, 344)}",
            BTN_YES: "${getCellValue(sheet, key, 345)}",
            BTN_NO: "${getCellValue(sheet, key, 346)}",
        },
        BTN: {
            CLICK_UNLOCK: "${getCellValue(sheet, key, 347)}",
            OPEN_RIGHT_NOW: "${getCellValue(sheet, key, 348)}",
            OPEN_NOW: "${getCellValue(sheet, key, 349)}",
            REDUCE_TIME: (num) => \`${getCellValue(sheet, key, 350)}\`,
            TO_OPEN: "${getCellValue(sheet, key, 351)}",
            GOT_IT: "${getCellValue(sheet, key, 352)}",
            OPEN: "${getCellValue(sheet, key, 351)}",
        },
        BOX_NAME: {
            0: "${getCellValue(sheet, key, 353)}",
            1: "${getCellValue(sheet, key, 354)}",
            2: "${getCellValue(sheet, key, 355)}",
            3: "${getCellValue(sheet, key, 356)}",
        },
        BOX_DES: {
            1: (num) => \`\${num}\`,
            2: (range) => \`\${range}\`,
            3: (num, icecreamDesc) => \`\${num} \${icecreamDesc}\`,
        },
        BOX_DES_3_ARR: [${getCellValue(sheet, key, 357)}],
        POP: (boxName) => \`${getCellValue(sheet, key, 358)}\`,
        SHARE_OPEN:  \`${getCellValue(sheet, key, 359)}\`
    }

    const SET = {
        ON: "${getCellValue(sheet, key, 360)}",
        OFF: "${getCellValue(sheet, key, 361)}",
    }

    /** 升级提示 */
    const LEVEL_UP = {
        THANKS: "${getCellValue(sheet, key, 363)}",
    }

    let ${LAN} = {
        GUIDER,
        LOAD,
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
        LEVEL_UP,
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
