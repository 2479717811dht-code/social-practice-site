import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

import { tasklist } from '@mdit/plugin-tasklist'
import { footnote } from '@mdit/plugin-footnote'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import { mark } from '@mdit/plugin-mark'

console.log('>>> 当前 VitePress 配置已加载 <<<')

// 让 Typora 的 [toc] 在 VitePress 中自动变成 [[toc]]
const typoraTocCompat = {
  name: 'typora-toc-compat',
  enforce: 'pre' as const,

  transform(code: string, id: string) {
    if (!id.endsWith('.md')) return

    const result = code.replace(
      /^[ \t]*\[toc\][ \t]*$/gim,
      '[[toc]]'
    )

    if (result === code) return

    return {
      code: result,
      map: null
    }
  }
}

export default withMermaid(
  defineConfig({
    // 1. 线上部署的核心路径前缀
    base: '/social-practice-site/',

    lang: 'zh-CN',

    // 尊贵全面的浏览器标签页标题
    title: "浙江大学竺可桢学院学生团委青年志愿者指导中心赴广西壮族自治区南宁市暑期社会实践团",
    description: "桂脉赓红血，壮肩扛复兴",

    // 开启深色 / 浅色模式切换
    appearance: true,

    // 读取 Git 提交时间，显示文章最后更新时间
    lastUpdated: true,

    markdown: {
      // 所有代码块默认显示行号
      lineNumbers: true,

      // 数学公式：$...$ 和 $$...$$
      math: true,

      // 图片进入视口时再加载
      image: {
        lazyLoading: true
      },

      // Typora 常用 Markdown 扩展（任务列表、脚注、下标、上标、高亮）
      config: (md) => {
        md.use(tasklist) // - [ ] / - [x]
        md.use(footnote) // [^1]
        md.use(sub) // H~2~O
        md.use(sup) // x^2^
        md.use(mark) // ==高亮==
      }
    },

    mermaid: {
      startOnLoad: false,
      flowchart: {
        htmlLabels: true
      }
    },

    vite: {
      plugins: [typoraTocCompat]
    },

    head: [
      // 这里的路径前缀也同步自动修正为当前项目路径
      ['link', { rel: 'icon', href: '/social-practice-site/linking.png' }] 
    ],

    themeConfig: {
      // 2. 完美继承你指定的图标与标题
      logo: '/20260323101521_872_96.png',

      siteTitle: '竺可桢学院 \& 相思湖学校',

      // 右侧目录：显示 h2 到 h6
      outline: {
        level: 'deep',
        label: '本页目录'
      },

      // 3. 顶部导航栏
      nav: [
        { text: '首页', link: '/' },
        {
          text: '实践专区',
          items: [
            { text: '团队简介', link: '/Intro/readme' },
            { text: '实践动态', link: '/News/readme' },
            { text: '成果材料', link: '/Materials/readme' }
          ]
        },

        {
          text: '院网点这里',
          link: 'http://ckc.zju.edu.cn/'
        }

     ],

      // 4. 左侧侧边栏
      sidebar: [
        {
          text: '开始阅读',
          collapsed: false,
          items: [
            { text: '前言', link: '/start/start_reading' }
          ]
        },
        {
          text: '关于我们',
          collapsed: false,
          items: [
            { text: '概览', link: '/Intro/readme' },
            { text: '人员招募与前期准备', link: '/Intro/prepare' },
            { text: '团队与队员介绍', link: '/Intro/team' },
            { text: '破冰活动', link: '/Intro/ice_breaking' },
            { text: '社会实践立项', link: '/Intro/project_initiation' },
            { text: '实践背景与意义', link: '/Intro/background' }
          ]
        },
        {
          text: '实践动态（每日日志）',
          collapsed: false,
          items: [
            { text: '概览', link: '/News/readme' },
            { text: 'Day 1：出征仪式与启程', link: '/News/day01' },
            { text: 'Day 2：深入基层调研', link: '/News/day02' }
          ]
        },
        {
          text: '成果归档',
          collapsed: false,
          items: [
            { text: '概览', link: '/Materials/readme' },
            { text: '红色调研', link: '/Materials/research' },
            { text: '暑期支教', link: '/Materials/volunteer_teaching' }
          ]
        }
      ],

      // 5. 链接到你的专属 GitHub 仓库
      socialLinks: [
        { icon: 'github', link: 'https://github.com/2479717811dht-code/social-practice-site' }
      ],

      // 6. 完美汉化的本地搜索系统
      search: {
        provider: 'local',
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: '搜索',
                  buttonAriaLabel: '搜索'
                },
                modal: {
                  displayDetails: '显示详细列表',
                  resetButtonTitle: '重置搜索',
                  backButtonTitle: '关闭搜索',
                  noResultsText: '没有找到相关内容',
                  footer: {
                    selectText: '选择',
                    selectKeyAriaLabel: '回车',
                    navigateText: '切换',
                    navigateUpKeyAriaLabel: '向上箭头',
                    navigateDownKeyAriaLabel: '向下箭头',
                    closeText: '关闭',
                    closeKeyAriaLabel: 'Esc'
                  }
                }
              }
            }
          }
        }
      },

      // 7. 全套精细化汉化 UI 标签
      docFooter: {
        prev: '上一篇',
        next: '下一篇'
      },

      lastUpdated: {
        text: '最后更新于'
      },

      darkModeSwitchLabel: '外观',
      lightModeSwitchTitle: '切换为浅色模式',
      darkModeSwitchTitle: '切换为深色模式',
      sidebarMenuLabel: '实践目录', // 适配当前实践项目的全景目录
      returnToTopLabel: '返回顶部',
      skipToContentLabel: '跳到正文',

      // 8. 官方页脚
      footer: {
        message: '浙江大学暑期社会实践团 · 南宁分队',
        copyright: 'Copyright © 2026'
      }
    }
  })
)

