# 银发康鉴 (Silver Health Guide)

&gt; 基于 Gonka 去中心化推理网络的公益医疗常识助手，帮助海外华人子女鉴别父母收到的保健品推销话术，远离医疗诈骗。

**在线预览**：https://ylds5q6dstk7m.ok.kimi.link/

---

## 项目简介

银发康鉴面向海外华人子女，解决父母在国内遭遇保健品诈骗的痛点。子女粘贴推销内容，AI 自动鉴别真伪，给出权威科普依据和沟通建议。

**⚠️ 医疗免责声明**：本工具仅提供公益医疗科普参考，不构成诊疗建议，不能替代执业医师医嘱。身体不适请及时前往正规医疗机构就诊。

---

## 核心功能

- **AI 话术鉴别**：粘贴推销内容，双模型交叉核验，输出风险等级与 Truth Score
- **权威科普依据**：引用 WHO / 国家卫健委等公开数据源
- **沟通建议生成**：生成与长辈沟通的建议话术
- **冷静提醒**：识别高风险后推送提醒通知（概念演示）
- **骗局库**：五类高发诈骗套路，可交互查看鉴别分析
- **双语对照**：中英文实时对照

---

## 技术栈

React 18 + TypeScript + Vite + Tailwind CSS + Three.js + GSAP

---

## 安装与运行

```bash
git clone https://github.com/gaocrypto123/silver-health-guide.git
cd silver-health-guide
npm install
npm run dev
