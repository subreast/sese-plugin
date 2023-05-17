/**
 * 二次元相关
 */
import plugin from '../../../lib/plugins/plugin.js';
import common from '../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'

const path = "./plugins/sese-plugin/config"



export class sese_erciyuan extends plugin {
    constructor() {
        super({
            name: '[sese-plugin]二次元区',
            dsc: '涩涩二次元',
            event: 'message',
            priority: 1000,
            rule: [
                {
                    reg: '^#?(二次元|ecy)(\\d+张?)?$',
                    fnc: 'ecy'
                },
                {
                    reg: '^#?(银发|yf)(\\d+张?)?$',
                    fnc: 'yinfa'
                },
                {
                    reg: '^#?(兽耳|sr)(\\d+张?)?$',
                    fnc: 'shouer'
                }
            ]
        })
    }


    //二次元
    async ecy(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_ecy
        let isopen = other_setting.ecy
        let Withdrawaltime = time_setting.Withdrawaltime_ecy //撤回时间

        let ismaster = ismaster_setting.ecy
        if (!isopen) {
            return await e.reply('该功能未开启')
        }
        if (ismaster) {
            if (!e.isMaster) {
                return e.reply('该设置已设置为只有主人使用')
            }
        }
        if (e.isGroup) {
            if (blacklist.groups.includes(e.group_id)) return await e.reply('该群聊已被禁用使用该功能')
            let image = []
            let num = e.msg.match(/\d+/) || 1
            if (num > number) {
                return await e.reply('一次最多' + number + '张哦')
            }
            await e.reply('正在给你找涩涩的图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = Math.floor(Math.random() * 5) + 1;
                if (url === 1) {
                    url = `https://image.anosu.top/pixiv/direct?r18=1`;
                } else if (url === 2) {
                    url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
                } else if (url === 4) {
                    url = `http://www.ashking.ltd/18.php`;
                } else if (url === 3) {
                    url = `https://www.acy.moe/api/r18`
                } else {
                    url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
                }
                let msg = [segment.image(url)]
                image.push(msg)
                console.log('已获取图片链接 ' + (i + 1) + ' 个');
                await common.sleep(500);
            }
            let abc = await e.reply(num > 1 ? await common.makeForwardMsg(e, image, '铯图来啦') : image, false, { recallMsg: Withdrawaltime })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            return true;
        }

        let num = e.msg.match(/\d+/) || 1
        if (num > number) {
            return await e.reply('一次最多' + number + '张哦')
        } else {
            num = e.msg.match(/\d+/) || 1
        }
        await e.reply('正在给你找涩涩的图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = Math.floor(Math.random() * 5) + 1;
            if (url === 1) {
                url = `https://image.anosu.top/pixiv/direct?r18=1`;
            } else if (url === 2) {
                url = `https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact`;
            } else if (url === 4) {
                url = `http://www.ashking.ltd/18.php`;
            } else if (url === 3) {
                url = `https://www.acy.moe/api/r18`
            } else {
                url = `https://moe.jitsu.top/api/?sort=r18&size=small&type=302`
            }
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //银发
    async yinfa(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_yinfa
        let isopen = other_setting.yinfa
        let Withdrawaltime = time_setting.Withdrawaltime_yinfa
        console.log(isopen);
        let ismaster = ismaster_setting.yinfa
        if (!isopen) {
            return await e.reply('该功能未开启')
        }
        if (ismaster) {
            if (!e.isMaster) {
                return e.reply('该设置已设置为只有主人使用')
            }
        }
        if (e.isGroup) {
            if (blacklist.groups.includes(e.group_id)) return await e.reply('该群聊已被禁用使用该功能')

            let image = []
            let num = e.msg.match(/\d+/) || 1
            if (num > number) {

                return await e.reply('一次最多' + number + '张哦')
            } else {
                num = e.msg.match(/\d+/) || 1
            }
            await e.reply('正在给你找涩涩的图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://dev.iw233.cn/api.php?sort=yin`;
                let msg = [segment.image(url)]
                image.push(msg)
                console.log('已获取图片链接 ' + (i + 1) + ' 个');
                await common.sleep(500);
            }
            let abc = await e.reply(num > 1 ? await common.makeForwardMsg(e, image, '铯图来啦') : image, false, { recallMsg: Withdrawaltime })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            return true;
        }

        let num = e.msg.match(/\d+/) || 1
        if (num > number) {
            return await e.reply('一次最多' + number + '张哦')
        } else {
            num = e.msg.match(/\d+/) || 1
        }
        await e.reply('正在给你找涩涩的图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://dev.iw233.cn/api.php?sort=yin`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //兽耳
    async shouer(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_shouer
        let isopen = other_setting.shouer
        let Withdrawaltime = time_setting.Withdrawaltime_shouer

        let ismaster = ismaster_setting.yinfa
        if (!isopen) {
            return await e.reply('该功能未开启')
        }
        if (ismaster) {
            if (!e.isMaster) {
                return e.reply('该设置已设置为只有主人使用')
            }
        }
        if (e.isGroup) {
            if (blacklist.groups.includes(e.group_id)) return await e.reply('该群已拉黑，不可使用')

            let image = []
            let num = e.msg.match(/\d+/) || 1
            if (num > number) {

                return await e.reply('一次最多' + number + '张哦')

            } else {
                num = e.msg.match(/\d+/) || 1
            }
            await e.reply('正在给你找涩涩的图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://dev.iw233.cn/api.php?sort=cat`;
                let msg = [segment.image(url)]
                image.push(msg)
                console.log('已获取图片链接 ' + (i + 1) + ' 个');
                await common.sleep(500);
            }
            let abc = await e.reply(num > 1 ? await common.makeForwardMsg(e, image, '铯图来啦') : image, false, { recallMsg: Withdrawaltime })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            return true;
        }

        let num = e.msg.match(/\d+/) || 1
        if (num > number) {
            return await e.reply('一次最多' + number + '张哦')
        } else {
            num = e.msg.match(/\d+/) || 1
        }
        await e.reply('正在给你找涩涩的图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://dev.iw233.cn/api.php?sort=cat`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

}