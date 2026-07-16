import { useEffect, useRef } from 'react';
import { AlertTriangle, Globe, Clock, MessageSquare, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TheRealThreat() {
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
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(right, {
        x: 80,
        opacity: 0,
        duration: 1,
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

  const painPoints = [
    {
      icon: MessageSquare,
      title: '爸妈发来推销链接',
      desc: '收到父母转发的"养生文章"或"专家推荐"链接，想确认是否可信却无从查证',
    },
    {
      icon: Globe,
      title: '跨洋信息差',
      desc: '身处海外，难以及时了解国内保健品市场动态，对父母面临的风险鞭长莫及',
    },
    {
      icon: ShieldAlert,
      title: '辨别能力有限',
      desc: '老年人群体对网络诈骗的辨识能力相对较弱，容易被"免费体检""专家讲座"等套路吸引',
    },
    {
      icon: Clock,
      title: '远程劝阻困难',
      desc: '发现父母正在受骗时，隔着时差和网络很难有效劝阻，急需一个可信的第三方参考工具',
    },
  ];

  return (
    <section
      id="threat"
      ref={sectionRef}
      className="relative w-full py-28 lg:py-36"
    >
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <div ref={leftRef}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff3b30]/10 mb-6">
              <AlertTriangle className="w-3.5 h-3.5 text-[#ff3b30]" />
              <span className="text-xs font-medium text-[#ff3b30]">海外子女的共同困扰</span>
            </div>

            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              爸妈的保健品，<br />
              <span className="text-gradient-cyan">海外的你放心吗？</span>
            </h2>

            <p className="text-base lg:text-lg text-[#555555] mb-10 leading-relaxed max-w-lg">
              保健品诈骗是老年群体高发的财产安全问题之一。骗子利用老年人对健康的焦虑和对新技术的陌生，
              通过微信群、电话推销、线下讲座等渠道实施精准诈骗。身在海外，子女往往后知后觉。
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-5 hover:shadow-lg transition-shadow duration-300"
                >
                  <point.icon className="w-5 h-5 text-[#ff3b30] mb-3" />
                  <h3 className="text-sm font-semibold text-[#1a1a1a] mb-1.5">
                    {point.title}
                  </h3>
                  <p className="text-xs text-[#888888] leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef} className="relative">
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center">
                  <span className="text-xs text-white font-bold">AI</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">银发康鉴 · 消息提醒</p>
                  <p className="text-xs text-[#888888]">刚刚</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-gray-500">妈</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                    <p className="text-sm text-[#555555]">
                      儿子，社区里有个免费健康讲座，专家说他们的磁疗床垫能治腰椎病，我想买一个...
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-[#16c5d4]/10 to-[#3898ec]/10 rounded-2xl rounded-tr-sm px-4 py-3 max-w-sm border border-[#16c5d4]/20">
                    <p className="text-xs font-medium text-[#ff3b30] mb-1.5">⚠️ 已鉴别：疑似诈骗</p>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      磁疗床垫未被任何权威医学机构认可为有效疗法。腰椎间盘突出需要影像学确诊，床垫无法替代治疗。
                    </p>
                    <p className="text-xs text-[#16c5d4] mt-2">
                      参考：WHO Guidelines on Low Back Pain, 2023
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#3898ec]/5 rounded-2xl rounded-tr-sm px-4 py-3 max-w-sm border border-[#3898ec]/15">
                    <p className="text-xs font-medium text-[#3898ec] mb-1.5">💬 建议回复</p>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      "妈，这个磁疗床垫没有经过正规医院验证，不要买。我帮你约了下周医院的骨科号，咱们让医生看看腰椎的情况。"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-[#16c5d4]/20 to-[#3898ec]/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
