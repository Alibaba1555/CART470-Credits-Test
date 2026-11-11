# CART470 Credits Test — v1

Standalone credits prototype for Documentary Encounters in the Hochelaga Archipelago.

## 本地预览

解压后，直接双击 `index.html`。不需要 npm install、服务器或外部字体。
保持 index.html、style.css、script.js 在同一个文件夹内。

## 内容与交互

- 米白纸纹背景，浅绿水彩河流和流动细线。
- 滚动页面时，纸船沿河移动，名字依次浮现。
- 右上角 Pause water 暂停背景水流；纸船仍跟随滚动。
- 点击 Special thanks 下的海鸥查看彩蛋，也支持键盘 Tab / Enter。
- 页面底部回到开头。可配置为返回正式地图。
- 窄屏排版与系统减少动态效果偏好支持。
- 无自动播放声音，无外部依赖或网络请求。

## 更改名单

在 `script.js` 顶部编辑 `creditGroups`。
每个人由 role（职位）和 name（姓名）组成，可以增加、删除或改分组。
真实姓名保留了小组和 Liz；其余都是测试占位，请正式发布前替换。
Liz 的 Project collaborator 是暂定描述；小组暂统一为 Project team。

## 返回地图

在 `script.js` 设置 `MAP_URL` 为正式地图 URL。
空字符串表示回到本测试页面顶部。不要在不知道实际部署路径时写死根路径。

## 新 repo

建议使用名称 `CART470-Credits-Test`。
将本目录内的文件放在新仓库根目录，index.html 不要多套一层文件夹。
需要线上演示时，为该仓库启用 GitHub Pages，从包含这些文件的分支根目录发布。
这是一份可上传的源代码包；本包不会自动创建仓库或部署网页。

## 之后整合 React

先在这个独立页面调好视觉和节奏，再迁移成 Credits.jsx。
名单数据可以直接复用。正式整合时应为 CSS 添加页面作用域，
并将 scroll / resize 监听和 IntersectionObserver 放进 useEffect，卸载时清理。
无需把这个测试项目的全局 body / header 样式直接复制进正式项目。

## 验证状态

JavaScript 通过 node --check 语法检查。
当前运行环境限制了 Chromium 启动，因此未完成真实浏览器视觉与交互验证。
本地建议检查：滚动到底、返回开头、暂停水流、点击海鸥、缩窄窗口。

All graphics are procedural SVG/CSS included in this project.
