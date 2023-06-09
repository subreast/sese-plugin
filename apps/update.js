import plugin from "../../../lib/plugins/plugin.js";
import { createRequire } from "module";
import lodash from "lodash";
import { Restart } from '../../other/restart.js'
const require = createRequire(import.meta.url);
const { exec, execSync } = require("child_process");
let uping = false;
export class update extends plugin {
    constructor() {
        super({
            name: "[sese-plugin]更新",
            event: "message",
            priority: 1000,
            rule: [
                {
                    reg: "^#?涩涩(插件)?(强制)?更新$",
                    fnc: "update",
                },
            ],
        });
    }

    async update() {
        if (!this.e.isMaster) return false;
        if (uping) {
            await this.reply("已有命令更新中..请勿重复操作");
            return;
        }
        if (!(await this.checkGit())) return;
        const isForce = this.e.msg.includes("强制");
        await this.runUpdate(isForce);
        if (this.isUp) {
            setTimeout(() => this.restart(), 2000)
        }
    }

    restart() {
        new Restart(this.e).restart()
    }
    async runUpdate(isForce) {
        let command = "git -C ./plugins/sese-plugin/ pull --no-rebase";
        if (isForce) {
            command = `git -C ./plugins/sese-plugin/ checkout . && ${command}`;
            this.e.reply("正在执行强制更新操作，请稍等");
        } else {
            this.e.reply("正在执行更新操作，请稍等");
        }
        this.oldCommitId = await this.getcommitId("sese-plugin");
        uping = true;
        let ret = await this.execSync(command);
        uping = false;
        if (ret.error) {
            logger.mark(`${this.e.logFnc} 更新失败：sese-plugin`);
            this.gitErr(ret.error, ret.stdout);
            return false;
        }
        let time = await this.getTime("sese-plugin");
        if (/(Already up[ -]to[ -]date|已经是最新的)/.test(ret.stdout)) {
            await this.reply(`插件已经是最新版本\n最后更新时间：${time}`);
        } else {
            await this.reply(`插件\n最后更新时间：${time}`);
            this.isUp = true;
            let log = await this.getLog("sese-plugin");
            await this.reply(log);
        }
        logger.mark(`${this.e.logFnc} 最后更新时间：${time}`);
        return true;
    }
    async getLog(plugin = "") {
        let cm = `cd ./plugins/${plugin}/ && git log  -20 --oneline --pretty=format:"%h||[%cd]  %s" --date=format:"%m-%d %H:%M"`;
        let logAll;
        try {
            logAll = await execSync(cm, { encoding: "utf-8" });
        } catch (error) {
            logger.error(error.toString());
            this.reply(error.toString());
        }
        if (!logAll) return false;
        logAll = logAll.split("\n");
        let log = [];
        for (let str of logAll) {
            str = str.split("||");
            if (str[0] == this.oldCommitId) break;
            if (str[1].includes("Merge branch")) continue;
            log.push(str[1]);
        }
        let line = log.length;
        log = log.join("\n\n");
        if (log.length <= 0) return "";
        let end = "";
        end = "更多详细信息，请前往github查看";
        log = await this.makeForwardMsg(`sese-plugin更新日志，共${line}条`, log, end);
        return log;
    }
    async getcommitId(plugin = "") {
        let cm = `git -C ./plugins/${plugin}/ rev-parse --short HEAD`;

        let commitId = await execSync(cm, { encoding: "utf-8" });
        commitId = lodash.trim(commitId);

        return commitId;
    }
    async getTime(plugin = "") {
        let cm = `cd ./plugins/${plugin}/ && git log -1 --oneline --pretty=format:"%cd" --date=format:"%m-%d %H:%M"`;

        let time = "";
        try {
            time = await execSync(cm, { encoding: "utf-8" });
            time = lodash.trim(time);
        } catch (error) {
            logger.error(error.toString());
            time = "获取时间失败";
        }
        return time;
    }
    async makeForwardMsg(title, msg, end) {
        let nickname = Bot.nickname;
        if (this.e.isGroup) {
            let info = await Bot.getGroupMemberInfo(this.e.group_id, Bot.uin);
            nickname = info.card || info.nickname;
        }
        let userInfo = {
            user_id: Bot.uin,
            nickname,
        };
        let forwardMsg = [
            {
                ...userInfo,
                message: title,
            },
            {
                ...userInfo,
                message: msg,
            },
        ];
        if (end) {
            forwardMsg.push({
                ...userInfo,
                message: end,
            });
        }
        if (this.e.isGroup) {
            forwardMsg = await this.e.group.makeForwardMsg(forwardMsg);
        } else {
            forwardMsg = await this.e.friend.makeForwardMsg(forwardMsg);
        }
        forwardMsg.data = forwardMsg.data
            .replace(/\n/g, "")
            .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, "___")
            .replace(/___+/, `<title color="#777777" size="26">${title}</title>`);

        return forwardMsg;
    }
    async gitErr(err, stdout) {
        let msg = "更新失败！";
        let errMsg = err.toString();
        stdout = stdout.toString();
        if (errMsg.includes("Timed out")) {
            let remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, "");
            await this.reply(msg + `\n连接超时：${remote}`);
            return;
        }
        if (/Failed to connect|unable to access/g.test(errMsg)) {
            let remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, "");
            await this.reply(msg + `\n连接失败：${remote}`);
            return;
        }
        if (errMsg.includes("be overwritten by merge")) {
            await this.reply(
                msg +
                `存在冲突：\n${errMsg}\n` +
                "请解决冲突后再更新，或者执行#强制更新，放弃本地修改"
            );
            return;
        }
        if (stdout.includes("CONFLICT")) {
            await this.reply([
                msg + "存在冲突\n",
                errMsg,
                stdout,
                "\n请解决冲突后再更新，或者执行#强制更新，放弃本地修改",
            ]);
            return;
        }

        await this.reply([errMsg, stdout]);
    }
    async execSync(cmd) {
        return new Promise((resolve, reject) => {
            exec(cmd, { windowsHide: false }, (error, stdout, stderr) => {
                resolve({ error, stdout, stderr });
            });
        });
    }
    async checkGit() {
        let ret = await execSync("git --version", { encoding: "utf-8" });
        if (!ret || !ret.includes("git version")) {
            await this.reply("您未安装git,请先安装git");
            return false;
        }
        return true;
    }
}