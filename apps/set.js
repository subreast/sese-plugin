import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'


const SwitchCfgType = {
    二次元: 'ecy',
    银发: 'yinfa',
    兽耳: 'shouer',
    三次元: 'sanciyuan',
    看腿: 'kantui',
    看脚: 'kanjiao',
    jk: 'jk',
    御姐: 'yujie',
    黑丝: 'heisi',
    白丝: 'baisi',
    旗袍: 'qipao',
    兔女郎: 'tunvlang',
    性感美女: 'sexybeauty'
}
const SwitchCfgReg = new RegExp(`^#?(开启|关闭)(${Object.keys(SwitchCfgType).join('|')})$`)
const file = "./plugins/sese-plugin/config/other.yaml"
const settings = await YAML.parse(fs.readFileSync(`${file}`, 'utf8'));


export class Set extends plugin {
    constructor() {
        super({
            name: "[sese-plugin]设置",
            dsc: "更改涩涩设置",
            event: "message",
            priority: 1000,
            rule: [
                {
                    reg: SwitchCfgReg,
                    fnc: "setting",
                    permission: "master",
                },
            ],
        });
    }

    async setting(e) {
        let regRet = SwitchCfgReg.exec(e.msg)
        let key = regRet[2]
        let is = (regRet[1] == '开启')
        console.log(key + "已经" + (is ? "开启" : "关闭"))
        let _key = SwitchCfgType[key]
        settings[_key] = is
        fs.writeFileSync(`${file}`, YAML.stringify(settings), 'utf8')
        e.reply(key + "已经" + (is ? "开启" : "关闭") + "啦~")
    }
}