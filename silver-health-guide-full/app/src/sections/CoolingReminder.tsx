import { useEffect, useRef, useState } from 'react';
import {
  Bell,
  Clock,
  Send,
  CheckCircle,
  Smartphone,
  MessageCircle,
  AlertTriangle,
  ChevronRight,
  Info,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CoolingReminder() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [coolingActive, setCoolingActive] = useState(false);
  const [notified, setNotified] = useState(false);
  const [countdown, setCountdown] = useState(24 * 60 * 60); // 24 hours in seconds
  const [showParentView, setShowParentView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    const ctx = gsap.context(() => {
      gsap.from(content.children, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
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

  // Countdown
  useEffect(() => {
    if (!coolingActive || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [coolingActive, countdown]);

  const handleActivate = () => {
    setCoolingActive(true);
    setNotified(false);
    setCountdown(24 * 60 * 60);
    setTimeout(() => {
      setNotified(true);
      setShowParentView(true);
    }, 1200);
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="cooling"
      ref={sectionRef}
      className="relative w-full py-28 lg:py-36 bg-[#f7f7f7] overflow-hidden"
    >
      <div className="section-padding">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16c5d4]/10 mb-6 border border-[#16c5d4]/15">
              <Bell className="w-3.5 h-3.5 text-[#16c5d4]" />
              <span className="text-xs font-medium text-[#16c5d4]">辅助工具 · 冷静提醒</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-5 leading-tight">
              一键开启<span className="text-gradient-cyan">冷静提醒</span>
            </h2>
            <p className="text-base lg:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed">
              AI 识别高风险骗局后，一键向爸妈推送风险提醒卡片，
              建议"先和子女沟通再付款"，为远程劝阻争取时间。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Interactive Demo */}
            <div className="relative">
              <div className="glass-card rounded-2xl p-6 lg:p-8 shadow-xl">
                {/* Concept Label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a1a]">冷静提醒中心</p>
                      <p className="text-xs text-[#888888]">银发康鉴 · 辅助工具</p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      coolingActive
                        ? 'bg-[#16c5d4]/10 text-[#16c5d4]'
                        : 'bg-gray-100 text-[#888888]'
                    }`}
                  >
                    {coolingActive ? '已开启' : '未开启'}
                  </div>
                </div>

                {/* Risk Alert Card */}
                <div className="bg-[#ff3b30]/5 border border-[#ff3b30]/15 rounded-xl p-4 mb-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#ff3b30] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#ff3b30] mb-1">
                        AI 检测到高风险骗局
                      </p>
                      <p className="text-xs text-[#555555] leading-relaxed">
                        "蜂胶软胶囊宣称根治糖尿病，三个疗程2999元" — 已判定为疑似诈骗（Truth Score 12/100）
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cooling Status */}
                {coolingActive && (
                  <div className="bg-[#16c5d4]/5 border border-[#16c5d4]/15 rounded-xl p-4 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#16c5d4]" />
                        <span className="text-sm font-medium text-[#1a1a1a]">
                          冷静提醒已开启
                        </span>
                      </div>
                      <span className="text-lg font-bold text-[#16c5d4] font-mono">
                        {formatTime(countdown)}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#16c5d4] to-[#3898ec] rounded-full transition-all"
                        style={{ width: `${(countdown / (24 * 60 * 60)) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#888888] mt-2">
                      已向爸妈推送提醒通知，建议先沟通再决定
                    </p>
                  </div>
                )}

                {/* Notification Sent */}
                {notified && (
                  <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-xl mb-5 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-green-700">
                        提醒通知已发送
                      </p>
                      <p className="text-xs text-green-600/70 mt-0.5">
                        爸妈手机上已收到风险提醒卡片
                      </p>
                    </div>
                  </div>
                )}

                {/* Toggle Parent View */}
                {notified && (
                  <button
                    onClick={() => setShowParentView(!showParentView)}
                    className="flex items-center gap-2 text-xs text-[#16c5d4] hover:underline mb-4"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    {showParentView ? '隐藏' : '查看'}爸妈收到的提醒
                    <ChevronRight
                      className={`w-3 h-3 transition-transform ${showParentView ? 'rotate-90' : ''}`}
                    />
                  </button>
                )}

                {/* Parent's Phone View */}
                {showParentView && (
                  <div className="border border-gray-200 rounded-xl p-4 bg-[#fafafa] mb-5 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center">
                        <Bell className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-[#1a1a1a]">银发康鉴 · 提醒</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#ff3b30] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-[#1a1a1a] mb-1">
                            ⚠️ 请先和子女沟通再付款
                          </p>
                          <p className="text-xs text-[#555555] leading-relaxed">
                            您收到的"蜂胶软胶囊"宣传存在疑似诈骗风险。建议先和{`
                            `}儿子/女儿商量一下，或到正规医院咨询医生。
                          </p>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-gray-100">
                        <p className="text-xs text-[#16c5d4] font-medium mb-1">
                          💡 科普小知识
                        </p>
                        <p className="text-xs text-[#555555] leading-relaxed">
                          蜂胶是保健食品，不能治疗糖尿病。糖尿病需要遵医嘱用药，任何宣称"根治"的产品都不可信。
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!coolingActive ? (
                    <button
                      onClick={handleActivate}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#16c5d4] to-[#3898ec] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#16c5d4]/25 transition-all"
                    >
                      <Bell className="w-4 h-4" />
                      一键开启冷静提醒
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCoolingActive(false);
                        setNotified(false);
                        setShowParentView(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-100 text-[#555555] text-sm font-medium rounded-xl hover:bg-gray-200 transition-all"
                    >
                      关闭提醒
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#f7f7f7] text-[#555555] text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                    <MessageCircle className="w-4 h-4" />
                    给爸妈发消息
                  </button>
                </div>
              </div>

              {/* Concept Boundary Label */}
              <div className="flex items-start gap-2 mt-4 px-2">
                <Info className="w-3.5 h-3.5 text-[#aaaaaa] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#aaaaaa] leading-relaxed">
                  此功能为概念演示效果，实际落地需遵循金融监管要求，与银行机构合规对接后实现。
                  当前版本通过消息推送方式实现风险提醒，不触碰支付接口。
                </p>
              </div>
            </div>

            {/* Right: Features */}
            <div className="space-y-5">
              {[
                {
                  icon: Bell,
                  title: '风险提醒推送',
                  desc: 'AI 识别高风险骗局后，自动生成风险提醒卡片，推送到长辈手机端',
                  color: '#16c5d4',
                },
                {
                  icon: Clock,
                  title: '24小时冷静期',
                  desc: '开启冷静提醒后进入24小时观察期，期间持续提醒长辈"先沟通再决定"',
                  color: '#3898ec',
                },
                {
                  icon: Send,
                  title: '子女即时通知',
                  desc: '同时通知海外子女，附上 AI 鉴别结果和建议沟通话术',
                  color: '#16c5d4',
                },
                {
                  icon: Smartphone,
                  title: '长辈友好界面',
                  desc: '推送卡片采用大字体、简洁文案，配合科普小知识，降低长辈抵触心理',
                  color: '#3898ec',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 glass-card rounded-xl hover:shadow-lg transition-all group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}12` }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1a1a1a] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
