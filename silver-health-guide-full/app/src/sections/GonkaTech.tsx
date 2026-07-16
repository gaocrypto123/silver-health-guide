import { useEffect, useRef } from 'react';
import {
  Cpu,
  GitCompare,
  Fingerprint,
  ShieldCheck,
  Layers,
  Timer,
  CheckCircle2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GonkaTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    const ctx = gsap.context(() => {
      gsap.from(content.children, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const techFeatures = [
    {
      icon: GitCompare,
      title: '双模型交叉核验',
      subtitle: 'Dual-Model Cross Verification',
      desc: '主模型 Gonka-1.0-Pro 负责初稿推理，复核模型 Gonka-1.0-Lite 独立完成二次验证，确保结论的一致性与可靠性。',
      highlights: ['独立推理路径', '结论一致性比对', '分歧点人工复核'],
      color: '#16c5d4',
    },
    {
      icon: Fingerprint,
      title: '去中心化推理溯源',
      subtitle: 'Decentralized Reasoning Trace',
      desc: '每次推理生成唯一的 Gonka Request ID，推理过程、模型参数、输入输出全链路上链存证，确保结果不可篡改、随时可审计。',
      highlights: ['唯一推理 ID', '全链路上链存证', '结果不可篡改'],
      color: '#3898ec',
    },
    {
      icon: ShieldCheck,
      title: 'Truth Score 可信度评分',
      subtitle: 'Multi-Dimension Credibility Score',
      desc: '基于信息来源权威性、表述严谨性、医学共识度等多个维度，综合计算出 0-100 的可信度评分，直观呈现结论可靠程度。',
      highlights: ['多维度综合评估', '0-100 量化评分', '动态阈值预警'],
      color: '#8b5cf6',
    },
  ];

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative w-full py-28 lg:py-36 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 section-padding">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16c5d4]/10 mb-6 border border-[#16c5d4]/20">
              <Cpu className="w-3.5 h-3.5 text-[#16c5d4]" />
              <span className="text-xs font-medium text-[#16c5d4]">Gonka 赛道技术架构</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight">
              可信推理，<span className="text-gradient-cyan">全链可溯</span>
            </h2>
            <p className="text-base lg:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              银发康鉴基于 Gonka 去中心化推理网络构建，每一条鉴别结论都经过双模型交叉核验、
              全链路上链存证，确保结果的可信度与可追溯性。
            </p>
          </div>

          {/* Tech Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {techFeatures.map((feat, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#16c5d4]/20 transition-all duration-500"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feat.color}15` }}
                >
                  <feat.icon className="w-6 h-6" style={{ color: feat.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{feat.title}</h3>
                <p className="text-xs text-white/30 mb-4 font-mono">{feat.subtitle}</p>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{feat.desc}</p>
                <ul className="space-y-2">
                  {feat.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: feat.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Process Flow */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
            <h3 className="text-sm font-semibold text-white/70 mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#16c5d4]" />
              推理全链路流程
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { step: '01', label: '接收话术', desc: '用户粘贴推销内容' },
                { step: '02', label: '主模型推理', desc: 'Gonka-1.0-Pro 初稿' },
                { step: '03', label: '复核模型验证', desc: 'Gonka-1.0-Lite 独立验证' },
                { step: '04', label: 'Truth Score 评分', desc: '多维度可信度评估' },
                { step: '05', label: '全链路上链存证', desc: '生成唯一推理 ID' },
              ].map((s, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-10 h-10 rounded-full bg-[#16c5d4]/10 border border-[#16c5d4]/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xs font-bold text-[#16c5d4]">{s.step}</span>
                  </div>
                  <p className="text-xs font-medium text-white/70 mb-1">{s.label}</p>
                  <p className="text-xs text-white/35">{s.desc}</p>
                  {i < 4 && (
                    <div className="hidden lg:block absolute top-5 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#16c5d4]/30 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/20">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span className="text-xs">推理耗时 &lt; 3s</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs">全链路上链存证</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              <span className="text-xs">唯一 Request ID 溯源</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
