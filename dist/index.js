import express, { Router } from "express";
import { createCanvas } from "canvas";
import dayjs from "dayjs";
import axios from "axios";
import { parseFromString } from "dom-parser";
import * as icons from "simple-icons";
const transformColor = (color) => (`${color}`.includes("rgb") ? "" : "#") + `${color}`;
const svgTobase64 = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg.trim()).toString("base64")}`;
const getTextWidth = (text, { fontSize: fontSize2, fontFamily: fontFamily2 }) => {
  const canvas = createCanvas(1, 1);
  const context = canvas.getContext("2d");
  context.font = `${fontSize2}px ${fontFamily2}`;
  const metrics = context.measureText(text);
  return Math.ceil(metrics.width);
};
const titleCase = (str) => {
  const text = str.toLowerCase();
  return text[0].toUpperCase() + text.slice(1);
};
const getCharacterLength = (str) => {
  let length = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 0 && code <= 127 || code >= 65377 && code <= 65439) {
      length += 1.5;
    } else {
      length += 2;
    }
  }
  return length;
};
const svgHandler = async (req, res) => {
  let { text, size = 34, color = "f56c6c" } = req.query;
  color = transformColor(color);
  if (!text)
    return res.status(422).json({ message: "文本内容必传" });
  const height2 = Math.round(+size * 1.31);
  const width2 = Math.round(+size * getCharacterLength(text) / 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width2}" height="${height2}" viewBox="0 0 ${width2} ${height2}">
    <style>.cls-1{fill:${color};font-family: jiangxizhuokai-Regular, jiangxizhuokai;font-size: ${size}px;}</style>
    <text class="cls-1" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${text}</text>
  </svg>`;
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
};
const service = (baseURL2, headers = {}) => {
  const instance = axios.create({
    baseURL: baseURL2,
    timeout: 1e4,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
  instance.interceptors.response.use(
    (response) => response.data,
    (response) => Promise.reject(response)
  );
  return instance;
};
const factory = (baseURL2, headers = {}) => {
  const factory2 = service(baseURL2, headers);
  return (path) => ({
    get: (query = {}) => factory2.get(path, { params: query }),
    post: (data = {}, config = {}) => factory2.post(path, data, config)
  });
};
const command$2 = factory("https://api.github.com/", { Authorization: `bearer ${process.env.GITHUB_TOKEN}` });
const graphqlApi = command$2("graphql");
const getGraphqlParams = (to, from, name) => ({
  query: `
    query userInfo($name: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $name) {
        name
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `,
  variables: { name, from, to }
});
const githubStatsHandler = async (req, res) => {
  const { username } = req.query;
  const now = dayjs();
  const from = now.subtract(30, "days").toISOString();
  const to = now.add(1, "days").toISOString();
  if (!username) {
    res.status(422).json({ message: "请检查你的用户名" });
    return;
  }
  try {
    const {
      data: { user }
    } = await graphqlApi.post(getGraphqlParams(to, from, username));
    if (!user) {
      res.status(422).json({ message: "请检查你的用户名" });
    } else {
      const userData = { contributions: [], name: user.name };
      user.contributionsCollection.contributionCalendar.weeks.map(
        (week) => week.contributionDays.map((item) => {
          userData.contributions.push(item);
        })
      );
      const { length } = userData.contributions;
      userData.contributions[length - 1].contributionCount === 0 && userData.contributions.pop();
      const extra = userData.contributions.length - 31;
      userData.contributions.splice(0, extra);
      res.json(userData);
    }
  } catch (error) {
    return error;
  }
};
const header = {
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
};
const command$1 = factory("https://blog.csdn.net/", header);
factory("https://desktop.biaov.cn/api/", header);
const csdnApi = (username) => command$1(username);
const defaultSVGOption = {
  color: "#38bdae",
  background: "#1a1b27",
  title: "CSDN 数据",
  titleColor: "#70a5fd"
};
const duration = 300;
const colorFields = ["color", "background", "titleColor"];
const width = 340;
const height = 180;
const renderSvg$1 = (data, option) => {
  Object.entries(option).forEach(([key, value]) => {
    defaultSVGOption[key] = colorFields.includes(key) ? transformColor(value) : value;
  });
  const html = data.reduce((prev, item, i) => {
    const x = i % 2 ? 200 : 30;
    const floor = ~~(i / 2);
    const y = 70 + floor * 35;
    return `${prev}<text x="${x}" y="${y}" class="stats bold animation" dominant-baseline="middle" style="animation-delay:${floor * duration}ms;">${item.label}：${item.value}</text>`;
  }, "");
  return `<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <style>
    @keyframes fade-in{0%{opacity:0;}100%{opacity:1;}}.animation{opacity:0;animation:fade-in ${duration}ms ease-in-out forwards;}.bold{font-weight:600;}.stats,.title{font-family:'Segoe UI',Ubuntu,Sans-Serif,'Helvetica Neue','PingFang SC','Microsoft YaHei';}.stats{font-size:14px;fill:${defaultSVGOption.color};}.title{font-size:18px;fill:${defaultSVGOption.titleColor};}
    </style>
    <rect width="100%" height="100%" rx="4.5" fill="${defaultSVGOption.background}" />
    <text x="50%" y="30" class="title bold animation" dominant-baseline="middle" text-anchor="middle">${defaultSVGOption.title}</text>
    ${html}
  </svg>`;
};
const transformData = (data) => {
  const document = parseFromString(data);
  const [rewardBox] = document.getElementsByClassName("personal-reward-box");
  const rewardNum = rewardBox.getElementsByClassName("num");
  const options = rewardBox.getElementsByClassName("name").map((item, i) => ({ label: item.textContent, value: rewardNum[i].textContent }));
  const [tagBox] = document.getElementsByClassName("personal-tag-box");
  tagBox.getElementsByClassName("item").forEach((tag) => {
    const label = tag.getElementsByClassName("name")[0].textContent.slice(0, 2);
    const [numNode] = tag.getElementsByClassName("num");
    if (!numNode)
      return;
    const value = numNode.textContent;
    options.length < 6 && options.push({ label, value });
  });
  return options;
};
const csdnHandler = (req, res) => {
  const { username } = req.params;
  csdnApi(username).get().then((data) => {
    const options = transformData(data);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(renderSvg$1(options, req.query));
  }).catch((error) => {
    const { status, data } = error.response;
    res.status(status).json(data);
  });
};
const command = factory("https://api.npmjs.org/");
const downloadsApi = (path) => command(`downloads/range/${path}`);
const rectHeight = 20;
const imageInitWidth = 14;
const gap = 6 * 2;
const fontSize = 11;
const fontFamily = "Verdana,Geneva,sans-serif,Arial";
const textColor = "#fff";
const textStyle = { fontSize, fontFamily };
const renderSvg = ({ labelColor, color, label, value, image }) => {
  const labelWidth = getTextWidth(label, textStyle) + gap;
  const valueWidth = getTextWidth(value, textStyle) + gap;
  let imageWidth = 0;
  let imageRectWidth = 0;
  let imageHTML = "";
  if (image) {
    imageWidth = imageInitWidth;
    imageRectWidth = imageWidth + gap / 2;
    imageHTML = `<image x="${gap / 2}" y="${(rectHeight - imageWidth) / 2}" width="${imageWidth}" height="${imageWidth}" xlink:href="${image}" />`;
  }
  const prefixWidth = imageRectWidth + labelWidth;
  const rectWidth = prefixWidth + valueWidth;
  return ` <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${rectWidth}" height="${rectHeight}">
    <clipPath id="clipPath">
      <rect width="${rectWidth}" height="${rectHeight}" rx="3" />
    </clipPath>
    <g clip-path="url(#clipPath)">
      <rect width="${prefixWidth}" height="${rectHeight}" fill="${labelColor}"/>
      <rect x="${prefixWidth}" width="${valueWidth}" height="${rectHeight}" fill="${color}" />
    </g>
    <g fill="${textColor}" font-size="${fontSize}" dominant-baseline="central" text-anchor="middle" font-family="${fontFamily}">
      ${imageHTML}
      <text x="${prefixWidth - labelWidth / 2}" y="${rectHeight / 2}">${label}</text>
      <text x="${prefixWidth + valueWidth / 2}" y="${rectHeight / 2}">${value}</text>
    </g>
  </svg>`;
};
const downloadsHandler = async (req, res) => {
  const { pkgName } = req.params;
  const { start, end, labelColor: lc, color: c, label: l, svg = "true", icon } = req.query;
  const curDay = dayjs();
  const startDate = start || curDay.subtract(1, "y").format("YYYY-MM-DD");
  const endDate = end || curDay.format("YYYY-MM-DD");
  const labelColor = lc ? transformColor(lc) : "#555";
  const color = c ? transformColor(c) : "#4c1";
  const label = l || "downloads";
  let image = "";
  if (icon) {
    try {
      const svgContent = icons[`si${titleCase(icon)}`].svg.replace("<path", `<path fill="${textColor}"`);
      image = svgTobase64(svgContent);
    } catch {
      image = "";
    }
  }
  downloadsApi(`${startDate}:${endDate}/${pkgName}`).get().then((data) => {
    const downloads = data.downloads.reduce((prev, item) => prev + item.downloads, 0);
    if (svg === "false")
      return res.json({ data: downloads });
    let num = +(downloads / 1e3).toFixed(1);
    num > 1 && (num = `${num}k`);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(renderSvg({ labelColor, color, label, value: `${num}`, image }));
  }).catch((error) => {
    const { status, data } = error.response;
    res.status(status).json(data);
  });
};
const routes = [
  {
    name: "Github 统计",
    path: "github-stats",
    handler: githubStatsHandler
  },
  {
    name: "生成文字图",
    path: "svg",
    handler: svgHandler
  },
  {
    name: "获取 CSDN 面板",
    path: "csdn/:username",
    handler: csdnHandler
  },
  {
    name: "获取 NPM 包下载量",
    path: "downloads/:pkgName",
    handler: downloadsHandler
  }
];
const router = Router();
routes.forEach((route) => {
  router[route.method || "get"](`/${route.path}`, route.handler);
});
const port = 4e3;
const baseURL = "/";
const app = express();
app.use(baseURL, router);
app.listen(port);
