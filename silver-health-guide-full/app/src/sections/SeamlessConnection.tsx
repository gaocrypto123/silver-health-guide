import { useEffect, useRef } from 'react';
import { Globe, Database, Languages, BookOpen, CheckCircle, Shield, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SeamlessConnection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.from(left.children, {
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(right, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const dataSources = [
    {
      icon: Globe,
      title: 'WHO 世界卫生组织',
      desc: '全球权威医疗指南与公共卫生数据',
      color: '#16c5d4',
    },
    {
      icon: Database,
      title: '国家卫健委',
      desc: '中国官方医疗政策与临床指南',
      color: '#3898ec',
    },
    {
      icon: Languages,
      title: '双语对照系统',
      desc: '中英文实时对照，确保海外子女准确理解',
      color: '#16c5d4',
    },
    {
      icon: BookOpen,
      title: '公开医疗文献',
      desc: '参考经过同行评审的医学研究',
      color: '#3898ec',
    },
  ];

  return (
    <section
      id="connection"
      ref={sectionRef}
      className="relative w-full py-28 lg:py-36 overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/glass-cubes-bg.jpg"
        >
          <source src="/videos/data-flow.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#1a1a1a]/80" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div ref={leftRef} className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16c5d4]/10 mb-6 border border-[#16c5d4]/20">
                <Globe className="w-3.5 h-3.5 text-[#16c5d4]" />
                <span className="text-xs font-medium text-[#16c5d4]">数据来源</span>
              </div>

              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                权威参考，<br />
                <span className="text-gradient-cyan">有据可查</span>
              </h2>

              <p className="text-base lg:text-lg text-white/60 mb-8 leading-relaxed max-w-lg">
                银发康鉴参考 WHO 公开医疗指南、国家卫健委科普文件等权威数据源，
                每条鉴别结论均标注具体来源，确保信息可追溯、可验证。
                纯公益项目，无商业广告。
              </p>

              <div className="p-4 rounded-xl bg-[#f59e0b]/5 border border-[#f59e0b]/15 mb-8">
                <p className="text-xs text-white/50 leading-relaxed">
                  <strong className="text-white/70">免责声明：</strong>
                  本工具仅提供公益医疗科普参考，不构成诊疗建议，不能替代执业医师医嘱。
                  身体不适请及时前往正规医疗机构就诊。
                </p>
              </div>

              <div className="space-y-3">
                {dataSources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${source.color}20` }}
                    >
                      <source.icon className="w-5 h-5" style={{ color: source.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-0.5">
                        {source.title}
                      </h3>
                      <p className="text-xs text-white/50">{source.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bilingual Demo */}
            <div ref={rightRef} className="lg:col-span-3">
              <div className="glass-card-dark rounded-2xl p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">双语鉴别结果示例</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-medium bg-[#16c5d4]/20 text-[#16c5d4] rounded-md">
                      中文
                    </span>
                    <span className="text-white/30">/</span>
                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 text-white/50 rounded-md">
                      EN
                    </span>
                  </div>
                </div>

                {/* Chat Demo */}
                <div className="space-y-4">
                  {/* User Query */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-white/70">子</span>
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                      <p className="text-sm text-white/90">爸妈被推销蜂胶治糖尿病，可信吗？</p>
                    </div>
                  </div>

                  {/* AI Response - CN */}
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-[#16c5d4]/20 to-[#3898ec]/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#ff3b30]" />
                        <p className="text-xs font-medium text-[#ff3b30]">疑似诈骗 · Truth Score 12/100</p>
                      </div>
                      <p className="text-sm text-white/90 mb-2">
                        蜂胶不能治疗糖尿病。WHO指南指出糖尿病需终身规范管理，蜂胶仅为膳食补充。
                      </p>
                      <p className="text-xs text-[#16c5d4]">参考：WHO Diabetes Guidelines, 2024</p>
                    </div>
                  </div>

                  {/* EN View */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-white/40 mb-3 flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      English translation for overseas children
                    </p>
                    <div className="flex items-start gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center flex-shrink-0">
                        <Languages className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/5 rounded-2xl rounded-tr-sm px-4 py-3 max-w-sm border border-white/10">
                        <p className="text-sm text-white/80 mb-1">
                          Propolis cannot treat diabetes. According to WHO guidelines, diabetes requires lifelong management. Propolis is only a dietary supplement.
                        </p>
                        <p className="text-xs text-white/40">Source: WHO Diabetes Guidelines, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Tags */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: '纯公益无广告', sub: '所有服务完全免费' },
                  { label: '权威数据源', sub: 'WHO / 国家卫健委' },
                  { label: '双语对照', sub: '中英文实时翻译' },
                  { label: '全链路可追溯', sub: '每条结论有据可查' },
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 text-[#16c5d4] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">{tag.label}</p>
                      <p className="text-xs text-white/40">{tag.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
