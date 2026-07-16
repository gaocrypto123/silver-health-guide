import Header from './sections/Header';
import Hero from './sections/Hero';
import TheRealThreat from './sections/TheRealThreat';
import AIDetection from './sections/AIDetection';
import GonkaTech from './sections/GonkaTech';
import CoolingReminder from './sections/CoolingReminder';
import ScamAwareness from './sections/ScamAwareness';
import SeamlessConnection from './sections/SeamlessConnection';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#f7f7f7]">
      <Header />
      <main>
        {/* 1. 核心定位 */}
        <Hero />
        {/* 2. 痛点场景（海外子女视角） */}
        <TheRealThreat />
        {/* 3. ★ C位：AI 话术鉴别核心功能 ★ */}
        <AIDetection />
        {/* 4. 技术可信性：Gonka 赛道架构 */}
        <GonkaTech />
        {/* 5. 冷静提醒（辅助工具） */}
        <CoolingReminder />
        {/* 6. 骗局识别示例 */}
        <ScamAwareness />
        {/* 7. 数据背书 + 双语演示 */}
        <SeamlessConnection />
      </main>
      <Footer />
    </div>
  );
}
