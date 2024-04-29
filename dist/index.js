import express, { Router } from "express";
import dayjs from "dayjs";
import axios from "axios";
import { parseFromString } from "dom-parser";
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
const getTextImage = async (req, res) => {
  let { text, size = 34, color = "f56c6c" } = req.query;
  color = (color.includes("rgb") ? "" : "#") + color;
  if (!text) {
    res.status(422).json({ message: "文本内容必传" });
    return;
  }
  const height2 = +size * 1.31;
  const width2 = +size * getCharacterLength(text) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width2}" height="${height2}" viewBox="0 0 ${width2} ${height2}">
    <defs>
      <style>
        .cls-1 {
          fill: #${color};
          font-family: jiangxizhuokai-Regular, jiangxizhuokai;
          font-size: ${size}px;
        }
      </style>
    </defs>
    <g>
      <text class="cls-1" transform="translate(0 ${height2 * 0.7})"><tspan x="0" y="0">${text}</tspan></text>
    </g>
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
    ({ response }) => Promise.reject(response)
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
const command$1 = factory("https://api.github.com/", { Authorization: `bearer ${process.env.GITHUB_TOKEN}` });
const graphqlApi = command$1("graphql");
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
const getGithubStats = async (req, res) => {
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
const command = factory("https://blog.csdn.net/", {
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
});
const csdnApi = (username) => command(username);
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
const renderSvg = (data, option) => {
  Object.entries(option).forEach(([key, value]) => {
    defaultSVGOption[key] = (colorFields.includes(key) && value.includes("rgb") ? "" : `#`) + value;
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
const getCSDN = async (req, res) => {
  const { username } = req.params;
  csdnApi(username).get().then((data) => {
    const options = transformData(data);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(renderSvg(options, req.query));
  }).catch(() => {
    res.status(422).json({ message: `请检查 ${username} 是否正确` });
  });
};
const router = Router();
router.get("/github-stats", getGithubStats);
router.get("/text-image", getTextImage);
router.get("/csdn/:username", getCSDN);
const port = 4e3;
const baseURL = "/api";
const app = express();
app.use(baseURL, router);
app.listen(port);
