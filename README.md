# github-statistics

一个关于 Github 统计的项目

## 使用

### 获取近 30 天内的 Github 仓库贡献记录

- `https://github-statistics-biaov.vercel.app/api/github-statistics?username=[用户名]`
- 案例：`https://github-statistics-biaov.vercel.app/api/github-statistics?username=biaov`

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

- `https://github-statistics-biaov.vercel.app/api/generate-text-image?text=[自定义文本]`
- ![案例](https://github-statistics-biaov.vercel.app/api/generate-text-image?text=案例)

```text
![案例](https://github-statistics-biaov.vercel.app/api/generate-text-image?text=案例)
```

#### 参数

| 名称  | 描述                        |
| ----- | --------------------------- |
| text  | 文本内容                    |
| size  | 文本字体大小，推荐低于 34px |
| color | 文本颜色                    |

## 项目运行

### 安装依赖

```Basic
npm i
```

### 运行项目

- 本地运行推荐复制文件 `.env` 为 `.env.development`，并修改其中的环境变量

```Basic
npm start
```

### 打包项目

```Basic
npm run build
```

### 命名规范

- 短横线命名(kebab-case): 文件名
- 帕斯卡命名(PascalCase, 大驼峰命名: CamelCase): 枚举命名, 类型命名, 类命名
- 小驼峰命名(camelCase): 变量命名

### 技术栈

- `Vite` + `TS` + `Node` + `Express`

### 依赖特性

- `axios`: 网络请求工具
- `dayjs`: 时间处理工具
- `express`: Node 开发框架
- `@types/express`: `express` 的类型
- `@types/node`: `node` 的类型
- `terser`: 压缩代码
- `typescript`: 编程语言
- `vite`: 项目构建工具
- `vite-plugin-node`: vite 插件，开启 Node.js 服务器

## 贡献者们

[![贡献者们](https://contrib.rocks/image?repo=biaov/github-statistics)](https://github.com/biaov/github-statistics/graphs/contributors)
