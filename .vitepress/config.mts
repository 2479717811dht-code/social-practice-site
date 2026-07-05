import { defineConfig } from 'vitepress'

export default defineConfig({
  // 1. 极其重要：配置 GitHub 仓库路径前缀，确保线上部署后样式和图片不崩
  base: '/social-practice-site/',

  lang: 'zh-CN',
  // 浏览器标签页显示的宏大全称
  title: "浙江大学竺可桢学院学生团委青年志愿者指导中心赴广西壮族自治区南宁市暑期社会实践团",
  description: "桂脉赓红血，壮肩扛复兴",

  themeConfig: {
    // 2. 导航栏左上角显示的文字。全称太长会撑爆网页，这里用优雅的简写
    siteTitle: '浙大竺院赴南宁实践团',

    // 3. 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '团队简介', link: '/Intro/team' },
      { text: '实践动态', link: '/News/day01' },
      { text: '成果材料', link: '/Materials/report' }
    ],

    // 4. 左侧侧边栏（直接指向具体文件，彻底免去写各个 index.md 的烦恼）
    sidebar: [
      {
        text: '关于我们',
        collapsed: false,
        items: [
          { text: '团队与队员介绍', link: '/Intro/team' },
          { text: '实践背景与意义', link: '/Intro/background' }
        ]
      },
      {
        text: '实践动态（每日日志）',
        collapsed: false,
        items: [
          { text: 'Day 1：出征仪式与启程', link: '/News/day01' },
          { text: 'Day 2：深入基层调研', link: '/News/day02' }
        ]
      },
      {
        text: '成果成果归档',
        collapsed: false,
        items: [
          { text: '调研报告与支撑材料', link: '/Materials/report' }
        ]
      }
    ],

    // 5. 链接到你们队伍的专属 GitHub 仓库
    socialLinks: [
      { icon: 'github', link: 'https://github.com/2479717811dht-code/social-practice-site' }
    ],

    // 6. 顺手帮你把“官方页脚”也定制好了
    footer: {
      message: '浙江大学暑期社会实践团 · 南宁分队',
      copyright: 'Copyright © 2026'
    }
  }
})