import plugin from '../../../lib/plugins/plugin.js';
import common from '../../../lib/common/common.js'
import fs from 'fs'
import YAML from 'yaml'
import lodash from 'lodash'
import _path from 'path'

let imgpath = './resources/localimg/imgs/' //图片路径
const path = "./plugins/sese-plugin/config"


export class sese_sanciyuan extends plugin {
    constructor() {
        super({
            name: '[sese-plugin]三次元区',
            dsc: '三次元图',
            event: 'message',
            priority: 1000,//优先级，数越小优先度越高
            rule: [
                {
                    reg: '^#?(三次元|scy)(\\d+张?)?$',
                    fnc: 'sanciyuan'
                },
                {
                    reg: '^#?(看腿|kt)(\\d+张?)?$',
                    fnc: 'kantui'
                },
                {
                    reg: '^#?(看脚|kj)(\\d+张?)?$',
                    fnc: 'kanjiao'
                },
                {
                    reg: '^#?jk(\\d+张?)?$',
                    fnc: 'jk'
                },
                {
                    reg: '^#?(御姐|yj)(\\d+张?)?$',
                    fnc: 'yujie'
                },
                {
                    reg: '^#?(黑丝|hs)(\\d+张?)?$',
                    fnc: 'heisi'
                },
                {
                    reg: '^#?(白丝|bs)(\\d+张?)?$',
                    fnc: 'baisi'
                },
                {
                    reg: '^#?(旗袍|qp)(\\d+张?)?$',
                    fnc: 'qipao'
                },
                {
                    reg: '^#?(兔女郎|tnl)(\\d+张?)?$',
                    fnc: 'tunvlang'
                },
                {
                    reg: '^#?(性感美女|xgmn)(\\d+张?)?$',
                    fnc: 'Sexybeauty'
                },
                {
                    reg: '^#?(原神cos|yscs)(\\d+张?)?$',
                    fnc: 'yuanshencos'
                }
            ]
        })
    }


    //三次元
    async sanciyuan(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_sexybeauty
        let isopen = other_setting.sanciyuan
        let Withdrawaltime = time_setting.Withdrawaltime_sanciyuan

        let ismaster = ismaster_setting.sanciyuan
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://imagesapi.sesepic.top/3r18`
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://imagesapi.sesepic.top/3r18`
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //看腿
    async kantui(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_kantui
        let isopen = other_setting.kantui
        let Withdrawaltime = time_setting.Withdrawaltime_kantui

        let ismaster = ismaster_setting.kantui
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://api.kgbots.com/api/siwa/api.php`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://api.kgbots.com/api/siwa/api.php`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //看脚
    async kanjiao(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_kanjiao
        let isopen = other_setting.kanjiao
        let Withdrawaltime = time_setting.Withdrawaltime_kanjiao

        let ismaster = ismaster_setting.kanjiao
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://api.uomg.com/api/rand.img4?sort=${encodeURI('脚控')}&format=images`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://api.uomg.com/api/rand.img4?sort=${encodeURI('脚控')}&format=images`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //jk
    async jk(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_jk
        let isopen = other_setting.jk
        let Withdrawaltime = time_setting.Withdrawaltime_jk
        let ismaster = ismaster_setting.jk
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `http://www.ggapi.cn/api/jkzf`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `http://www.ggapi.cn/api/jkzf`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //御姐
    async yujie(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_yujie
        let isopen = other_setting.yujie
        let Withdrawaltime = time_setting.Withdrawaltime_yujie

        let ismaster = ismaster_setting.yujie
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://api.uomg.com/api/rand.img4?sort=${encodeURI('御姐')}&format=images`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://api.uomg.com/api/rand.img4?sort=${encodeURI('御姐')}&format=images`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //黑丝
    async heisi(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_heisi
        let isopen = other_setting.baisi
        let Withdrawaltime = time_setting.Withdrawaltime_heisi

        let ismaster = ismaster_setting.heisi
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `http://api.caonm.net/api/bhs/h.php`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `http://api.caonm.net/api/bhs/h.php`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //白丝
    async baisi(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_baisi
        let isopen = other_setting.baisi
        let Withdrawaltime = time_setting.Withdrawaltime_baisi

        let ismaster = ismaster_setting.baisi
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `http://api.caonm.net/api/bhs/b.php`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `http://api.caonm.net/api/bhs/b.php`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //旗袍
    async qipao(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_qipao
        let isopen = other_setting.qipao
        let Withdrawaltime = time_setting.Withdrawaltime_qipao

        let ismaster = ismaster_setting.qipao
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://api.uomg.com/api/rand.img4?sort=${encodeURI('旗袍')}&format=images`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://api.uomg.com/api/rand.img4?sort=${encodeURI('旗袍')}&format=images`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }
    //兔女郎
    async tunvlang(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_tunvlang
        let isopen = other_setting.tunvlang
        let Withdrawaltime = time_setting.Withdrawaltime_tunvlang

        let ismaster = ismaster_setting.tunvlang
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://api.uomg.com/api/rand.img4?sort=${encodeURI('兔女郎')}&format=images`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://api.uomg.com/api/rand.img4?sort=${encodeURI('兔女郎')}&format=images`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    //性感美女 
    async Sexybeauty(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_sexybeauty
        let isopen = other_setting.sexybeauty
        let Withdrawaltime = time_setting.Withdrawaltime_sexybeauty

        let ismaster = ismaster_setting.sexybeauty
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

            let num = e.msg.match(/\d+/) || 10;
            if (num > number) {
                return e.reply(`你个大色P，你是要冲死是叭！注意身体啊！最多只能发送${number}张`);
            }
            await e.reply('正在为你寻找图片啦~');
            const files = fs.readdirSync(imgpath);
            const samples = lodash.sampleSize(files, num);
            const msg = await Promise.all(samples.map(async (file) => {
                const filepath = _path.join(imgpath, file);
                const imgseg = segment.image(filepath);
                return imgseg;
            }));
            const forwardMsg = await this.makeForwardMsg('已帮你整理好了😍', msg);
            e.reply(forwardMsg, false, { recallMsg: Withdrawaltime });
            return true
        }
        let num = e.msg.match(/\d+/) || 10;
        if (num > number) {
            return e.reply(`你个大色P，你是要冲死是叭！注意身体啊！最多只能发送${number}张`);
        }
        await e.reply('正在为你寻找图片啦~');
        const files = fs.readdirSync(imgpath);
        const samples = lodash.sampleSize(files, num);
        const msg = await Promise.all(samples.map(async (file) => {
            const filepath = _path.join(imgpath, file);
            const imgseg = segment.image(filepath);
            return imgseg;
        }));
        const forwardMsg = await this.makeForwardMsg('已帮你整理好了😍', msg);
        e.reply(forwardMsg);
    }

    //原神cos
    async yuanshencos(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let number_setting = await YAML.parse(fs.readFileSync(`${path}/number.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let number = number_setting.maxNumber_yuanshencos
        let isopen = other_setting.yuanshencos
        let Withdrawaltime = time_setting.Withdrawaltime_yuanshencos

        let ismaster = ismaster_setting.yuanshencos
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
            await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
            for (let i = 0; i < [num]; i++) {
                let url = `https://imagesapi.sesepic.top/cos`;
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
        }
        await e.reply('正在给你找图片啦～', true, { recallMsg: 7 })
        for (let i = 0; i < [num]; i++) {
            let url = `https://imagesapi.sesepic.top/cos`;
            let msg = [segment.image(url)]
            let abc = await e.reply(msg, false, { recallMsg: 0 })
            if (!abc) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', true, { recallMsg: 10 })
            console.log('已获取图片链接 ' + (i + 1) + ' 个');
            await common.sleep(500);
        }
        return true
    }

    // 制作转发消息
    async makeForwardMsg(title, msg) {
        const userInfo = {
            nickname: this.e.sender.card || Bot.nickname,
            user_id: this.e.user_id
        }
        if (this.e.isGroup) {
            const info = await Bot.getGroupMemberInfo(this.e.group_id, Bot.uin)
            userInfo.nickname = info.nickname
        }
        let forwardMsg = [
            { ...userInfo, message: title },
            { ...userInfo, message: msg }
        ]
        /** 制作转发内容 */
        const target = this.e.isGroup ? this.e.group : this.e.friend
        forwardMsg = await target.makeForwardMsg(forwardMsg)

        /** 处理描述 */
        forwardMsg.data = forwardMsg.data
            .replace(/\n/g, '')
            .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, '___')
            .replace(/___+/, `<title color="#777777" size="26">${title}</title>`)

        return forwardMsg
    }

}
