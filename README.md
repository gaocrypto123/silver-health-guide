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

---

## Gonka 技术接入详解

本项目基于 **Gonka 去中心化推理网络** 构建，针对 Gonka 赛道评分点做了以下技术实现：

### 1. 双模型交叉核验

每个鉴别请求同时调用两个独立模型：

| 模型 | 角色 | 输出 |
|------|------|------|
| Gonka-1.0-Pro | 主模型初稿 | 风险判定、Truth Score、分析依据 |
| Gonka-1.0-Lite | 复核模型 | 独立推理验证、补充发现 |

**一致性检查**：两模型结论一致 → 通过；不一致 → 标记分歧点人工复核

### 2. 去中心化推理溯源

- 每次推理生成唯一 **Gonka Request ID**（格式：`GONKA-{hash}-{timestamp}`）
- 推理过程、模型参数、输入输出全链路上链存证
- 结果不可篡改，随时可审计

### 3. Truth Score 可信度评分

基于三个维度综合评估：

| 维度 | 权重 | 说明 |
|------|------|------|
| 来源权威性 | 40% | 是否引用WHO、卫健委等权威来源 |
| 表述严谨性 | 35% | 是否存在绝对化用语、夸大宣传 |
| 医学共识度 | 25% | 结论是否与主流医学共识一致 |

输出 0-100 分，≤30分为高风险，31-70分为中风险，&gt;70分为可信。

---

## 项目结构
silver-health-guide/
├── .github/workflows/          # GitHub Actions 自动部署
├── public/
│   ├── images/                 # 静态图片
│   └── videos/                 # 背景视频
├── src/
│   ├── sections/               # 页面板块
│   │   ├── Hero.tsx            # 首屏（3D背景+搜索）
│   │   ├── AIDetection.tsx     # 核心：AI话术鉴别
│   │   ├── GonkaTech.tsx       # Gonka技术展示
│   │   ├── CoolingReminder.tsx # 冷静提醒（概念演示）
│   │   ├── ScamAwareness.tsx   # 骗局库
│   │   ├── TheRealThreat.tsx   # 痛点场景
│   │   ├── SeamlessConnection.tsx # 数据背书
│   │   ├── Header.tsx          # 导航
│   │   └── Footer.tsx          # 页脚
│   ├── components/ui/          # UI组件库
│   ├── App.tsx                 # 页面组合
│   └── main.tsx                # 入口
├── package.json
├── vite.config.ts              # GitHub Pages 配置
└── README.md
