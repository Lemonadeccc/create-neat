import React from "react";
import "./index.<%= ReactEjs.styleType %>";

function App() {
  /* slot: store-slot */
  return <>
    /* slot: router-start-slot */
    <div className="container">
      <header className="header">
        <h1 className="title">create-neat</h1>
        <div className="description">
          🚀🚀🚀 Developed a front-end scaffold based on PNPM and Turborepo, aimed at quickly
          creating various types of projects for users.
        </div>
        <div className="button_wrapper">
          <a
            className="button_blue"
            href="https://test-docs-tesrt.vercel.app/guide/what-is-create-neat.html"
          >
            开始
          </a>
          <a className="button_white" href="https://github.com/xun082/create-neat">
            Github
          </a>
        </div>
      </header>

      <main className="main">
        <div className="box_container">
          <div className="box">
            <div className="box_emoji">📦</div>
            <div className="box_text">零配置,开箱即用;</div>
          </div>
          <div className="box">
            <div className="box_emoji">🚀</div>
            <div className="box_text">
              使用 axios + npm 的方式构建你的项目基础模板，初始化速度要比 create-react-app 快;
            </div>
          </div>
          <div className="box">
            <div className="box_emoji">💯</div>
            <div className="box_text">代码风格统一，项目统一配置 Eslint、Prettier、Husky;</div>
          </div>
          <div className="box">
            <div className="box_emoji">🥂</div>
            <div className="box_text">
              使用 Rollup 打包你的 Typescript 库，支持 UMD、CJS、ESM 输出格式，并生成全局 .d.ts
              文件;
            </div>
          </div>
          <div className="box">
            <div className="box_emoji">🍻</div>
            <div className="box_text">
              支持用户自定义 Rollup 配置扩展原有的配置，为项目添加特有的功能;
            </div>
          </div>
          <div className="box">
            <div className="box_emoji">🥂</div>
            <div className="box_text">
              使用 Webpack 打包你的 Web
              应用程序,实现多环境打包部署，代码分割优化，配合官方分析工具，实时优化代码;
            </div>
          </div>
          <div className="box">
            <div className="box_emoji">🍻</div>
            <div className="box_text">
              支持用户自定义 Webpack 配置扩展原有的配置，为项目添加特有的功能;
            </div>
          </div>
          <div className="box">
            <div className="box_emoji">🎯</div>
            <div className="box_text">支用户自定义 Babel 配置，让你的程序更健壮;</div>
          </div>
          <div className="box">
            <div className="box_emoji">📕</div>
            <div className="box_text">友好的日志输出，让你快速定位问题所在以及增加开发体验;</div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="footer_text">Released under the MIT License.</div>
        <div className="footer_text">Copyright © 2023-present Moment</div>
      </footer>
    </div>
    /* slot: router-end-slot */
  </>
}

export default App;
