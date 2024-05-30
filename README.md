# stats-utils

一个用于展示统计数据的工具 😀

<h2 align="center">
  <a href="https://github.com/biaov/stats-utils"><img src="https://shields.io/github/v/release/biaov/stats-utils.svg?logo=github&label=version" alt="version" /></a>
  <a href="https://github.com/biaov/stats-utils/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="license" /></a>
</h2>

## 特性

- [x] [获取近 30 天内的 Github 仓库贡献记录](#获取近-30-天内的-github-仓库贡献记录)
- [x] [根据文本生成 SVG 图片](#根据文本生成-svg-图片)
- [x] [CSDN 统计面板](#csdn-统计面板)
- [x] [NPM 包下载量统计](#npm-包下载量统计)

## 使用

### 获取近 30 天内的 Github 仓库贡献记录

- `https://stats-utils.vercel.app/github-stats?username=[用户名]`
- 案例：`https://stats-utils.vercel.app/github-stats?username=biaov`

<details>
<summary>👀 点击查看 JSON 数据</summary>

```json
{
  "contributions": [
    {
      "contributionCount": 3,
      "date": "2023-08-28"
    },
    {
      "contributionCount": 3,
      "date": "2023-08-29"
    },
    {
      "contributionCount": 3,
      "date": "2023-08-30"
    },
    {
      "contributionCount": 3,
      "date": "2023-08-31"
    },
    {
      "contributionCount": 10,
      "date": "2023-09-01"
    },
    {
      "contributionCount": 39,
      "date": "2023-09-02"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-03"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-04"
    },
    {
      "contributionCount": 5,
      "date": "2023-09-05"
    },
    {
      "contributionCount": 4,
      "date": "2023-09-06"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-07"
    },
    {
      "contributionCount": 11,
      "date": "2023-09-08"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-09"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-10"
    },
    {
      "contributionCount": 20,
      "date": "2023-09-11"
    },
    {
      "contributionCount": 16,
      "date": "2023-09-12"
    },
    {
      "contributionCount": 20,
      "date": "2023-09-13"
    },
    {
      "contributionCount": 4,
      "date": "2023-09-14"
    },
    {
      "contributionCount": 5,
      "date": "2023-09-15"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-16"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-17"
    },
    {
      "contributionCount": 22,
      "date": "2023-09-18"
    },
    {
      "contributionCount": 6,
      "date": "2023-09-19"
    },
    {
      "contributionCount": 16,
      "date": "2023-09-20"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-21"
    },
    {
      "contributionCount": 6,
      "date": "2023-09-22"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-23"
    },
    {
      "contributionCount": 0,
      "date": "2023-09-24"
    },
    {
      "contributionCount": 20,
      "date": "2023-09-25"
    },
    {
      "contributionCount": 5,
      "date": "2023-09-26"
    },
    {
      "contributionCount": 3,
      "date": "2023-09-27"
    }
  ],
  "name": "biaov"
}
```

</details>

### 根据文本生成 SVG 图片

- `https://stats-utils.vercel.app/svg?text=[自定义文本]`
- ![案例](https://stats-utils.vercel.app/svg?text=案例)

```md
![案例](https://stats-utils.vercel.app/svg?text=案例)
```

#### Query 参数

| 名称  | 描述                                                 | 类型   | 默认值   |
| ----- | ---------------------------------------------------- | ------ | -------- |
| text  | 文本内容                                             | string | --       |
| size  | 文本字体大小, 单位像素                               | number | `34`     |
| color | 文本颜色, 支持 16 进制, 自带 `#`, 或者 `rgb`, `rgba` | string | `f56c6c` |

### CSDN 统计面板

```md
![CSDN 数据](https://stats-utils.vercel.app/csdn/biao_feng)
```

- [![CSDN 数据](https://stats-utils.vercel.app/csdn/biao_feng)](https://blog.csdn.net/biao_feng)

#### Query 参数

| 名称       | 描述                                                 | 类型   | 默认值      |
| ---------- | ---------------------------------------------------- | ------ | ----------- |
| color      | 文本颜色, 支持 16 进制, 自带 `#`, 或者 `rgb`, `rgba` | string | `38bdae`    |
| background | 背景颜色, 支持 16 进制, 自带 `#`, 或者 `rgb`, `rgba` | string | `1a1b27`    |
| title      | 标题内容                                             | string | `CSDN 数据` |
| titleColor | 标题颜色, 支持 16 进制, 自带 `#`, 或者 `rgb`, `rgba` | string | `70a5fd`    |

### NPM 包下载量统计

```md
![包名](https://stats-utils.vercel.app/downloads/包名)
```

- ![mine-h5-ui](https://stats-utils.vercel.app/downloads/mine-h5-ui)

#### Query 参数

| 名称       | 描述         | 类型   | 可选值                                   | 默认值           |
| ---------- | ------------ | ------ | ---------------------------------------- | ---------------- |
| color      | 下载量背景色 | string | --                                       | `4c1`            |
| label      | 标注         | string | --                                       | `downloads`      |
| labelColor | 标注背景色   | string | --                                       | `555`            |
| start      | 统计开始时间 | string | --                                       | 当前日期往前一年 |
| end        | 统计结束时间 | string | --                                       | 当前日期         |
| icon       | 图标名称     | string | [simple-icons](https://simpleicons.org/) | --               |
| svg        | 是否返回 svg | string | true / false                             | `true`           |

## 项目运行

### 安装依赖

- 运行以下命令安装依赖时, 会自动创建 `.env.development` 环境变量文件

```sh
npm i
```

### 运行项目

```sh
npm start
```

### 打包项目

```sh
npm run build
```

### 命名规范

- 短横线命名(kebab-case): 文件名
- 帕斯卡命名(PascalCase, 大驼峰命名: CamelCase): 枚举命名, 类型命名, 类命名
- 小驼峰命名(camelCase): 变量命名

### 技术栈

- `Vite` + `TS` + `NodeJs` + `Express`

### 依赖特性

#### dependencies

- `axios`: 网络请求工具
- `canvas`: 位图工具
- `dayjs`: 时间处理工具
- `dom-parser`: 解析 HTML
- `express`: Node 开发框架
- `simple-icons`: [icon 图标库](https://simpleicons.org/)

#### devDependencies

- `@types/express`: `express` 的类型
- `@types/node`: `node` 的类型
- `terser`: 压缩代码
- `typescript`: 编程语言
- `vite`: 项目构建工具
- `vite-plugin-node`: vite 插件, 开启 Node.js 服务器

## 贡献者们

[![贡献者们](https://contrib.rocks/image?repo=biaov/stats-utils)](https://github.com/biaov/stats-utils/graphs/contributors)
