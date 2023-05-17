import plugin from '../../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
import fs from 'fs'
import YAML from 'yaml'


const path = "./plugins/sese-plugin/config"
export class sese extends plugin {
    constructor() {
        super({
            name: '搜图',
            dsc: '涩涩搜图',
            event: 'message',
            priority: 1000,
            rule: [
                {
                    /** 6命令正则匹配 */
                    reg: '#?搜索.*',
                    /** 执行方法 */
                    fnc: 'search'
                }
            ]
        })
    }

    //搜索图片
    async search(e) {
        let blacklist = await YAML.parse(fs.readFileSync(`${path}/blacklist.yaml`, 'utf8'));
        let other_setting = await YAML.parse(fs.readFileSync(`${path}/other.yaml`, 'utf8'));
        let time_setting = await YAML.parse(fs.readFileSync(`${path}/time.yaml`, 'utf8'));
        let ismaster_setting = await YAML.parse(fs.readFileSync(`${path}/ismaster.yaml`, 'utf8'));
        let isopen = other_setting.search
        let Withdrawaltime = time_setting.Withdrawaltime_search
        let ismaster = ismaster_setting.search

        if (!isopen) {
            return await e.reply('该功能未开启')
        }
        if (ismaster) {
            if (!e.isMaster) {
                return e.reply('该设置已设置为只有主人使用')
            }
        }
        if (e.isGroup) { //群聊
            if (blacklist.groups.includes(e.group_id)) return await e.reply('该群聊已被禁用使用该功能')
            e.reply(`正在搜图...`);
            let keyword = e.msg.replace("#", "");
            keyword = keyword.replace("搜索", "");
            let url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=2`;
            const response = await fetch(url);//调用接口获取数据
            let res = await response.json();//结果json字符串转对象
            if (res.data.length == 0) {
                e.reply("暂时没有搜到哦！换个关键词试试吧！");
                return true;
            }
            let TagNumber = res.data[0].tags.length;
            let Atags;
            let Btags;
            let qwq = 0;
            while (TagNumber--) {
                Atags = res.data[0].tags[TagNumber];
                if (qwq == 0) {
                    Btags = "";
                }
                Btags = Btags + " " + Atags;
                qwq++;
            }
            //最后回复消息
            let msg = [
                "标题：",
                res.data[0].title,
                "\n作者：",
                res.data[0].author,
                "\n关键词：",
                Btags,
                segment.image(res.data[0].urls.original),
            ];
            //发送消息
            let flag = await e.reply(msg, false, { recallMsg: e.isGroup ? Withdrawaltime : 0 })
            if (!flag) return e.reply('好、好铯(//// ^ ////)……被、被吞啦o(≧口≦)o', false, { recallMsg: e.isGroup ? Withdrawaltime : 0 })
            return true;//返回true 阻挡消息不再往下
        }
        e.reply(`正在搜图...`);
        let keyword = e.msg.replace("#", "");
        keyword = keyword.replace("搜索", "");
        let url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=2`;
        const response = await fetch(url); //调用接口获取数据
        let res = await response.json(); //结果json字符串转对象
        if (res.data.length == 0) {
            e.reply("暂时没有搜到哦！换个关键词试试吧！");
            return true;
        }
        let TagNumber = res.data[0].tags.length;
        let Atags;
        let Btags;
        let qwq = 0;
        while (TagNumber--) {
            Atags = res.data[0].tags[TagNumber];
            if (qwq == 0) {
                Btags = "";
            }
            Btags = Btags + " " + Atags;
            qwq++;
        }
        //最后回复消息
        let msg = [
            "标题：",
            res.data[0].title,
            "\n作者：",
            res.data[0].author,
            "\n关键词：",
            Btags,
            segment.image(res.data[0].urls.original),
        ];
        //发送消息
        e.reply(msg);
        return true; //返回true 阻挡消息不再往下
    }
}
