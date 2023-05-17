import plugin from '../../../lib/plugins/plugin.js';

const API_URL = 'https://dev.iw233.cn/api.php';
const RANDOM_BIZHI = 'random';
const XINGKONG_BIZHI = 'xing';
const SP_BIZHI = 'sp';
const HP_BIZHI = 'hp';
const DM_BIZHI = 'dm';
const REPLY_TIMEOUT = 0;

export class BizhiPlugin extends plugin {
    constructor() {
        super({
            name: '涩涩壁纸区',
            dsc: '涩涩壁纸',
            event: 'message',
            priority: 1000,
            rule: [
                {
                    reg: /^#?(随机壁纸|sjbz)$/,
                    fnc: 'randomBizhi',
                },
                {
                    reg: /^#?(星空|xk)$/,
                    fnc: 'xingkongBizhi',
                },
                {
                    reg: /^#?(竖屏壁纸|spbz)$/,
                    fnc: 'spbizhi',
                },
                {
                    reg: /^#?(横屏壁纸|hpbz)$/,
                    fnc: 'hpbizhi',
                },
                {
                    reg: /^#?(动漫壁纸|dmbz)$/,
                    fnc: 'dmbizhi',
                },
            ],
        });
    }

    async randomBizhi(e) {
        const url = `${API_URL}?sort=${RANDOM_BIZHI}`;
        await this.sendBizhi(e, url, '正在给你找壁纸啦～');
    }

    async xingkongBizhi(e) {
        const url = `${API_URL}?sort=${XINGKONG_BIZHI}`;
        await this.sendBizhi(e, url, '正在给你找星空的壁纸啦～');
    }

    async spbizhi(e) {
        const url = `${API_URL}?sort=${SP_BIZHI}`;
        await this.sendBizhi(e, url, '正在给你找竖屏的壁纸啦～');
    }

    async hpbizhi(e) {
        const url = `${API_URL}?sort=${HP_BIZHI}`;
        await this.sendBizhi(e, url, '正在给你找横屏的壁纸啦～');
    }

    async dmbizhi(e) {
        const url = `${API_URL}?sort=${DM_BIZHI}`;
        await this.sendBizhi(e, url, '正在给你找动漫的壁纸啦～');
    }

    async sendBizhi(e, url, msg) {
        await e.reply(msg, false, { recallMsg: REPLY_TIMEOUT });
        const imageMsg = [segment.image(url)];
        const flag = await e.reply(imageMsg, false, { recallMsg: REPLY_TIMEOUT });
        if (!flag) {
            await e.reply('不好被、被吞啦o(≧口≦)o', false, { recallMsg: REPLY_TIMEOUT });
        }
    }
}