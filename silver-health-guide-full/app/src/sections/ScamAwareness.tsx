import { useEffect, useRef, useState } from 'react';
import {
  Eye,
  X,
  ChevronRight,
  Stethoscope,
  FlaskConical,
  Users,
  Mic,
  FileCheck,
  Shield,
  AlertTriangle,
  Sparkles,
  Loader2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScamCard {
  id: number;
  icon: React.ElementType;
  title: string;
  tagline: string;
  hook: string;
  verdict: 'scam' | 'suspicious';
  truthScore: number;
  analysis: string;
  sourceRef: string;
  howToSpot: string[];
  color: string;
}

const scamCards: ScamCard[] = [
  {
    id: 1,
    icon: Users,
    title: '虚假专家',
    tagline: '"我是XX医院退休教授"',
    hook: '穿着白大褂的"老专家"在直播间推荐特效药，声称包治百病。',
    verdict: 'scam',
    truthScore: 8,
    analysis:
      '真正的退休医生不会通过网络直播推销药品。所有医生执业信息可在国家卫健委网站查询。正规医院的药品推荐有严格的院内流程，不会委托个人进行推销。',
    sourceRef: '国家卫健委《医师执业注册管理办法》',
    howToSpot: ['在卫健委官网查询医生执业注册信息', '正规医院不会委托个人推销药品', '凡是"包治百病"的宣传均为违法'],
    color: '#ff3b30',
  },
  {
    id: 2,
    icon: Stethoscope,
    title: '免费体检',
    tagline: '"免费体检，还送鸡蛋"',
    hook: '社区门口搭棚"义诊"，免费量血压、测血糖，随后推销高价保健品。',
    verdict: 'scam',
    truthScore: 12,
    analysis:
      '正规医疗机构的体检需要预约和专业设备，不会通过送礼品的方式招揽。免费体检后推销产品是保健品诈骗的标准套路，体检结果往往被夸大以制造恐慌。',
    sourceRef: '国家卫健委《健康体检中心基本标准和管理规范》',
    howToSpot: ['正规医院体检需预约，不会在路边搭棚', '不会现场推销产品', '警惕"体检异常"恐吓式营销'],
    color: '#3898ec',
  },
  {
    id: 3,
    icon: FlaskConical,
    title: '祖传秘方',
    tagline: '"祖传三代，药到病除"',
    hook: '声称拥有古代皇家秘方，天然草本无副作用，专治疑难杂症。',
    verdict: 'scam',
    truthScore: 15,
    analysis:
      '所谓"祖传秘方"多为普通食品或非法添加西药成分。正规药品必须有国药准字批号。天然草本不等于无副作用，任何药物都可能产生不良反应。',
    sourceRef: '国家药监局《保健食品管理办法》',
    howToSpot: ['查询国药准字批号', '没有"无副作用"的药物', '正规医院才是疾病治疗的途径'],
    color: '#16c5d4',
  },
  {
    id: 4,
    icon: Mic,
    title: '健康讲座',
    tagline: '"健康大讲堂，名额有限"',
    hook: '以健康科普为名举办讲座，实则通过制造焦虑推销天价保健品。',
    verdict: 'scam',
    truthScore: 18,
    analysis:
      '真正的健康科普不会现场销售产品。凡是讲座后"限时促销"的，都是营销套路。这类讲座往往精心挑选目标人群，通过制造健康焦虑促成冲动消费。',
    sourceRef: '国家市场监督管理总局《广告法》',
    howToSpot: ['科普讲座不卖货', '警惕"限时优惠"的购买压力', '不轻信现场患者"证言"'],
    color: '#f59e0b',
  },
  {
    id: 5,
    icon: FileCheck,
    title: '伪造证明',
    tagline: '"有FDA认证，国际认可"',
    hook: '出示虚假的进口证明、国际认证、名人代言，营造权威假象。',
    verdict: 'suspicious',
    truthScore: 22,
    analysis:
      '进口保健品应有中文标签和国食健字批号。可通过国家市场监督管理总局官网验证产品信息。所谓"FDA认证"多为虚假或误导性表述。',
    sourceRef: '国家市场监督管理总局',
    howToSpot: ['查看中文标签和批准文号', '在总局官网验证批准信息', '不轻信英文"洋认证"'],
    color: '#8b5cf6',
  },
];

export default function ScamAwareness() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.scam-card-item', {
        y: 60,
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

  const handleCardClick = (id: number) => {
    setActiveCard(id);
    setAnalyzing(true);
    setShowResult(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 1200);
  };

  const activeScam = scamCards.find((c) => c.id === activeCard);

  const verdictConfig = {
    scam: { label: '高风险 · 疑似诈骗', color: '#ff3b30' },
    suspicious: { label: '中风险 · 存在疑点', color: '#f59e0b' },
  };

  return (
    <section
      id="scams"
      ref={sectionRef}
      className="relative w-full py-28 lg:py-36 bg-[#f7f7f7]"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff3b30]/10 mb-6">
              <Eye className="w-3.5 h-3.5 text-[#ff3b30]" />
              <span className="text-xs font-medium text-[#ff3b30]">骗局识别</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-5 leading-tight">
              五类高发套路，<span className="text-gradient-cyan">逐一拆解</span>
            </h2>
            <p className="text-base lg:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed">
              点击卡片查看 AI 鉴别分析，了解骗局的运作方式和识别方法。
            </p>
          </div>

          {/* Scam Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scamCards.map((card) => (
              <div
                key={card.id}
                className="scam-card-item tilted-card glass-card rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => handleCardClick(card.id)}
              >
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, ${card.color} 1px, transparent 0)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      <card.icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-[#888888] italic">"{card.tagline}"</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{card.title}</h3>
                  <p className="text-xs text-[#888888] mb-4 leading-relaxed">{card.hook}</p>
                  <div className="flex items-center text-xs font-medium text-[#16c5d4] group-hover:gap-2 transition-all">
                    <Shield className="w-3.5 h-3.5 mr-1" />
                    <span>AI 鉴别分析</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeScam && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => {
            setActiveCard(null);
            setShowResult(false);
            setAnalyzing(false);
          }}
        >
          <div
            className="glass-card rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-100">
              <button
                onClick={() => {
                  setActiveCard(null);
                  setShowResult(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-[#555555]" />
              </button>
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${activeScam.color}15` }}
                >
                  <activeScam.icon className="w-5 h-5" style={{ color: activeScam.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">{activeScam.title}</h3>
                  <p className="text-xs text-[#888888] italic">"{activeScam.tagline}"</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Analyzing State */}
              {analyzing && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 rounded-full bg-[#16c5d4]/10 flex items-center justify-center mb-4">
                    <Loader2 className="w-6 h-6 text-[#16c5d4] animate-spin" />
                  </div>
                  <p className="text-sm text-[#555555]">AI 正在分析话术...</p>
                  <p className="text-xs text-[#888888] mt-1">双模型交叉核验中</p>
                </div>
              )}

              {/* Result */}
              {showResult && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  {/* Verdict */}
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{
                      backgroundColor: `${verdictConfig[activeScam.verdict].color}10`,
                    }}
                  >
                    <AlertTriangle
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: verdictConfig[activeScam.verdict].color }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: verdictConfig[activeScam.verdict].color }}
                      >
                        {verdictConfig[activeScam.verdict].label}
                      </p>
                      <p className="text-xs text-[#888888]">
                        Truth Score: {activeScam.truthScore}/100
                      </p>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a1a] mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#16c5d4]" />
                      AI 鉴别分析
                    </h4>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {activeScam.analysis}
                    </p>
                    <p className="text-xs text-[#888888] mt-2">
                      参考来源：{activeScam.sourceRef}
                    </p>
                  </div>

                  {/* How to Spot */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a1a] mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#3898ec]" />
                      识别要点
                    </h4>
                    <ul className="space-y-2">
                      {activeScam.howToSpot.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#555555]">
                          <ChevronRight className="w-4 h-4 text-[#16c5d4] flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Medical Disclaimer */}
                  <div className="p-3 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/10">
                    <p className="text-xs text-[#555555] leading-relaxed">
                      <strong>免责声明：</strong>本分析仅提供公益科普参考，不构成诊疗建议。
                      身体不适请及时前往正规医疗机构就诊。
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
