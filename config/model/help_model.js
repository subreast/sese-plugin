//如需自定义插件帮助，请将改文件复制一份，粘贴到上一个目录（即此插件config文件夹内），并将粘贴过去的文件重命名为help.js，编辑完后重启云崽即可生效
export const helpCfg = {
  title: '涩涩帮助',
  subTitle: 'Yunzai-Bot & sese-Plugin',
  columnCount: 0,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
}
export const helpList = [
  {
    group: "二次元区",
    list: [
      {
        icon: 88,
        title: "#二次元/ecy?张",
        desc: "二次元图片"
      },
      {
        icon: 3,
        title: "#银发/yf?张",
        desc: "银发二次元图片"
      },
      {
        icon: 61,
        title: "#兽耳/sr?张",
        desc: "兽耳二次元图片"
      }
    ]
  },
  {
    group: "三次元区",
    list: [
      {
        icon: 88,
        title: "#三次元/scy?张",
        desc: "三次元图片"
      },
      {
        icon: 3,
        title: "#看腿/kt?张",
        desc: "涩涩的腿照"
      },
      {
        icon: 63,
        title: "#看脚/kj?张",
        desc: "涩涩的脚脚"
      },
      {
        icon: 61,
        title: "#jk?张",
        desc: "jk图"
      },
      {
        icon: 66,
        title: "#御姐/yj?张",
        desc: "喜欢御姐吗"
      },
      {
        icon: 65,
        title: "#黑丝/hs?张",
        desc: "黑丝图片"
      },
      {
        icon: 67,
        title: "#白丝/bs?张",
        desc: "白丝图片"
      },
      {
        icon: 69,
        title: "#旗袍/qp?张",
        desc: "旗袍美女图片"
      },
      {
        icon: 70,
        title: "#兔女郎/tnl?张",
        desc: "兔女郎美女图片"
      }
    ]
  },
  {
    group: "壁纸区",
    list: [
      {
        icon: 88,
        title: "#随机壁纸/sjbz",
        desc: "壁纸图片"
      },
      {
        icon: 3,
        title: "#星空/xk",
        desc: "星空壁纸"
      },
      {
        icon: 61,
        title: "#竖屏壁纸/spbz",
        desc: "竖屏类壁纸"
      },
      {
        icon: 63,
        title: "#横屏壁纸/hpbz",
        desc: "横屏类壁纸"
      },
      {
        icon: 66,
        title: "#动漫壁纸/dmbz",
        desc: "动漫壁纸"
      }
    ]
  },
  {
    group: "18+",
    list: [
      {
        icon: 88,
        title: "#性感美女/xgmn?张",
        desc: "岂止是性感"
      },
      {
        icon: 3,
        title: "#开发中",
        desc: "...."
      },
      {
        icon: 61,
        title: "开发中",
        desc: "......"
      }
    ]
  },
  {
    group: '管理类命令',
    auth: 'master',
    list: [
      {
        icon: 32,
        title: '#开启/关闭二次元',
        desc: '开启|关闭功能'
      },
      {
        icon: 3,
        title: '#开启/关闭银发',
        desc: '开启|关闭功能'
      },
      {
        icon: 35,
        title: '#开启/关闭兽耳',
        desc: '开启|关闭功能'
      },
      {
        icon: 34,
        title: '#开启/关闭三次元',
        desc: '开启|关闭功能'
      },
      {
        icon: 49,
        title: '#开启/关闭看腿',
        desc: '开启|关闭功能'
      },
      {
        icon: 11,
        title: '#开启/关闭看脚',
        desc: '开启|关闭功能'
      },
      {
        icon: 88,
        title: '#开启/关闭jk',
        desc: '开启|关闭功能'
      },
      {
        icon: 59,
        title: '#开启/关闭御姐',
        desc: '开启|关闭功能'
      },
      {
        icon: 57,
        title: '#开启/关闭黑丝',
        desc: '开启 | 关闭功能'
      },
      {
        icon: 53,
        title: '#开启/关闭白丝',
        desc: '开启|关闭功能'
      },
      {
        icon: 77,
        title: '#开启/关闭旗袍',
        desc: '开启|关闭功能'
      }, 
      {
        icon: 85,
        title: '#开启|关闭兔女郎',
        desc: '开启|关闭功能'
      },
      {
        icon: 86,
        title: '#开启|关闭性感美女',
        desc: '开启|关闭功能'
      }
    ]
  },
  {
    group: '仓库动态检测(仅主人生效)',
    auth: 'master',
    list: [
      {
        icon: 51,
        title: '#涩涩更新',
        desc: '更新插件'
      }]
  }
]