import { useEffect, useRef, useState } from 'react';
import {
  Shield,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  FileText,
  Loader2,
  Zap,
  GitCompare,
  Fingerprint,
  ShieldCheck,
  Send,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DetectionResult {
  verdict: 'scam' | 'legitimate' | 'suspicious';
  truthScore: number;
  analysis: string;
  sourceRef: string;
  talkingPoints: string[];
  reasoningId: string;
  modelUsed: string;
  crossChecked: boolean;
  timestamp: string;
  primaryModelOutput: string;
  reviewModelOutput: string;
}

const sampleInputs = [
  '我妈说有人推荐"蜂胶软胶囊"，宣称能根治糖尿病，三个疗程只要2999，还送血压计。',
  '小区里有免费健康讲座，讲座后专家说他们的磁疗床垫能治腰椎间盘突出。',
  '有人加了我妈微信，说是协和医院的退休教授，推荐一款进口的抗癌保健品。',
];

const sampleResults: Record<number, DetectionResult> = {
  0: {
    verdict: 'scam',
    truthScore: 12,
    analysis:
      '该产品宣传存在多处典型诈骗特征：(1) 宣称"根治糖尿病"违反《广告法》第16条，糖尿病目前无法根治，需终身管理；(2) 价格策略采用"疗程"包装制造紧迫感；(3) 赠品策略是常见引流手段。WHO明确指出蜂胶仅为膳食补充，不能替代降糖药物。',
    sourceRef: 'WHO Diabetes Guidelines, 2024；国家药监局《保健食品管理办法》',
    talkingPoints: [
      '"根治"是绝对化用语，正规药品不会这样宣传',
      '蜂胶是保健食品，不是药品，不能降血糖',
      '建议带爸妈去医院内分泌科复查，遵医嘱用药',
      '可以在国家药监局网站查询产品批号真伪',
    ],
    reasoningId: 'GONKA-2f8a1e9d-20241215',
    modelUsed: 'Gonka-1.0-Pro × Gonka-1.0-Lite 交叉核验',
    crossChecked: true,
    timestamp: '2024-12-15 08:32:16 UTC',
    primaryModelOutput:
      '高置信度判定为诈骗。核心依据：(1) "根治糖尿病"属绝对化虚假宣传；(2) 蜂胶为保健食品，非药品；(3) "疗程"定价模式为典型营销套路。Truth Score: 10/100。',
    reviewModelOutput:
      '复核一致。补充发现：定价策略使用锚定效应（2999元+赠品），赠品血压计为低成本引流工具。 WHO 2024指南明确蜂胶无降糖功效。Truth Score: 14/100。',
  },
  1: {
    verdict: 'scam',
    truthScore: 8,
    analysis:
      '磁疗床垫宣传属于典型的伪科学营销。WHO及全球主要医学机构均未认可磁疗对腰椎间盘突出有治疗效果。腰椎间盘突出属于器质性病变，治疗方式包括保守治疗和手术，不存在"床垫治愈"的可能。此类产品常通过免费讲座筛选目标人群。',
    sourceRef: 'WHO Guidelines on Low Back Pain, 2023；中华医学会骨科学分会',
    talkingPoints: [
      '磁疗未被任何权威医学机构认可为有效疗法',
      '腰椎间盘突出需要影像学确诊，床垫无法替代',
      '"免费讲座+现场促销"是保健品诈骗的标准套路',
      '建议爸妈到正规医院骨科就诊',
    ],
    reasoningId: 'GONKA-7c3d4f0a-20241210',
    modelUsed: 'Gonka-1.0-Pro × Gonka-1.0-Lite 交叉核验',
    crossChecked: true,
    timestamp: '2024-12-10 14:21:33 UTC',
    primaryModelOutput:
      '高置信度判定为诈骗。磁疗未被WHO或任何主流医学机构认可有效。腰椎间盘突出为器质性病变，需影像确诊。Truth Score: 6/100。',
    reviewModelOutput:
      '复核一致。补充：免费讲座是精准筛选目标人群的典型手段，现场"患者证言"多为雇佣。Truth Score: 10/100。',
  },
  2: {
    verdict: 'suspicious',
    truthScore: 35,
    analysis:
      '存在多个可疑信号：(1) 真正的退休教授不会通过微信私下推荐产品；(2) 协和医院等正规医院有严格的药品推荐流程；(3) "进口抗癌保健品"本身即矛盾——保健品不能宣称抗癌功效。建议通过卫健委官网核实该"教授"身份。',
    sourceRef: '国家卫健委《医师执业注册管理办法》；国家药监局',
    talkingPoints: [
      '真正的医生不会在微信上推销保健品',
      '可以在卫健委官网查询医生的真实执业信息',
      '保健品不能宣称抗癌功效，这是法律红线',
      '建议把对方的执业证书编号发给我来核实',
    ],
    reasoningId: 'GONKA-9e1b2c4d-20241208',
    modelUsed: 'Gonka-1.0-Pro × Gonka-1.0-Lite 交叉核验',
    crossChecked: true,
    timestamp: '2024-12-08 09:45:52 UTC',
    primaryModelOutput:
      '中高风险，多项可疑。身份无法验证+渠道非正规+宣称矛盾。建议要求对方提供执业医师编号。Truth Score: 30/100。',
    reviewModelOutput:
      '复核一致。补充："抗癌保健品"违反《广告法》第18条，保健食品不得宣称疾病预防治疗功能。Truth Score: 40/100。',
  },
};

export default function AIDetection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [showTechDetail, setShowTechDetail] = useState(false);

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

  const handleDetect = (e?: React.FormEvent, sampleIdx?: number) => {
    if (e) e.preventDefault();
    const text = sampleIdx !== undefined ? sampleInputs[sampleIdx] : input;
    if (!text.trim()) return;
    setInput(text);
    setDetecting(true);
    setResult(null);
    setShowTechDetail(false);
    setTimeout(() => {
      const idx = sampleIdx ?? 0;
      setResult(sampleResults[idx]);
      setDetecting(false);
    }, 2000);
  };

  const verdictConfig = {
    scam: {
      label: '高风险 · 疑似诈骗',
      color: '#ff3b30',
      bg: '#ff3b3010',
      border: '#ff3b3020',
    },
    legitimate: {
      label: '可信',
      color: '#22c55e',
      bg: '#22c55e10',
      border: '#22c55e20',
    },
    suspicious: {
      label: '中风险 · 存在疑点',
      color: '#f59e0b',
      bg: '#f59e0b10',
      border: '#f59e0b20',
    },
  };

  return (
    <section
      id="detection"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28"
    >
      <div className="section-padding">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16c5d4]/10 mb-5 border border-[#16c5d4]/15">
              <Zap className="w-3.5 h-3.5 text-[#16c5d4]" />
              <span className="text-xs font-medium text-[#16c5d4]">核心功能 · AI 可信鉴别</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a1a1a] mb-4 leading-tight">
              粘贴话术，<span className="text-gradient-cyan">秒辨真伪</span>
            </h2>
            <p className="text-base text-[#555555] max-w-2xl mx-auto leading-relaxed">
              把爸妈收到的保健品推销内容粘贴进来，AI 自动鉴别是否为骗局，
              给出权威科普依据和与爸妈沟通的建议。
            </p>
          </div>

          {/* Medical Disclaimer */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f59e0b]/5 border border-[#f59e0b]/12 mb-6 max-w-3xl mx-auto">
            <AlertTriangle className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#555555] leading-relaxed">
              <strong className="text-[#1a1a1a]">医疗免责声明：</strong>
              本工具仅提供公益医疗科普参考，不构成诊疗建议，不能替代执业医师医嘱。
              身体不适请及时前往正规医疗机构就诊。
            </p>
          </div>

          {/* Sample Prompts */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {sampleInputs.map((text, i) => (
              <button
                key={i}
                onClick={() => handleDetect(undefined, i)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs text-[#555555] bg-white border border-gray-200 rounded-lg hover:border-[#16c5d4] hover:text-[#16c5d4] transition-all"
              >
                <FileText className="w-3 h-3" />
                {text.length > 22 ? text.slice(0, 20) + '...' : text}
              </button>
            ))}
          </div>

          {/* ====== C位：大输入框 ====== */}
          <form onSubmit={(e) => handleDetect(e)} className="mb-8">
            <div className="glass-card rounded-2xl p-2 shadow-lg">
              <div className="flex flex-col gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="粘贴爸妈收到的推销话术或产品宣传内容...&#10;例如：我妈说有人推荐一款蜂胶软胶囊，宣称能根治糖尿病，三个疗程只要2999"
                  className="w-full bg-transparent px-5 py-4 text-base text-[#1a1a1a] placeholder:text-[#aaaaaa] outline-none resize-none min-h-[100px] leading-relaxed"
                  rows={3}
                />
                <div className="flex items-center justify-between px-2 pb-1">
                  <span className="text-xs text-[#aaaaaa]">
                    基于 Gonka 双模型交叉核验 · WHO 公开指南
                  </span>
                  <button
                    type="submit"
                    disabled={detecting || !input.trim()}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#16c5d4] to-[#3898ec] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#16c5d4]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {detecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        双模型交叉核验中...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        可信鉴别
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* ====== 鉴别结果面板 ====== */}
          {result && (
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Result Header */}
              <div
                className="flex items-center justify-between p-5 border-b"
                style={{
                  backgroundColor: verdictConfig[result.verdict].bg,
                  borderColor: verdictConfig[result.verdict].border,
                }}
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon =
                      result.verdict === 'legitimate'
                        ? CheckCircle
                        : AlertTriangle;
                    return (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${verdictConfig[result.verdict].color}18`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: verdictConfig[result.verdict].color }}
                        />
                      </div>
                    );
                  })()}
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: verdictConfig[result.verdict].color }}
                    >
                      {verdictConfig[result.verdict].label}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#888888]">
                        Truth Score
                      </span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${result.truthScore}%`,
                            backgroundColor: verdictConfig[result.verdict].color,
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: verdictConfig[result.verdict].color }}
                      >
                        {result.truthScore}/100
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowTechDetail(!showTechDetail)}
                  className="flex items-center gap-1 text-xs text-[#16c5d4] hover:underline px-3 py-1.5 rounded-lg hover:bg-[#16c5d4]/5 transition-colors"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  {showTechDetail ? '隐藏' : '查看'}技术溯源
                  <ChevronRight
                    className={`w-3 h-3 transition-transform ${showTechDetail ? 'rotate-90' : ''}`}
                  />
                </button>
              </div>

              {/* Gonka Tech Detail */}
              {showTechDetail && (
                <div className="p-5 border-b border-gray-100 bg-[#16c5d4]/[0.02]">
                  {/* Dual Model Comparison */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-[#1a1a1a] mb-3 flex items-center gap-2">
                      <GitCompare className="w-3.5 h-3.5 text-[#16c5d4]" />
                      双模型交叉核验对比
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-lg bg-[#16c5d4]/5 border border-[#16c5d4]/10">
                        <p className="text-xs font-medium text-[#16c5d4] mb-1.5">
                          Gonka-1.0-Pro · 主模型初稿
                        </p>
                        <p className="text-xs text-[#555555] leading-relaxed">
                          {result.primaryModelOutput}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#3898ec]/5 border border-[#3898ec]/10">
                        <p className="text-xs font-medium text-[#3898ec] mb-1.5">
                          Gonka-1.0-Lite · 复核模型终稿
                        </p>
                        <p className="text-xs text-[#555555] leading-relaxed">
                          {result.reviewModelOutput}
                        </p>
                      </div>
                    </div>
                    {result.crossChecked && (
                      <div className="flex items-center gap-2 mt-3 p-2.5 rounded-lg bg-green-50 border border-green-100">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        <p className="text-xs text-green-700">
                          两模型结论一致，交叉核验通过
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Traceability */}
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-white border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Fingerprint className="w-3 h-3 text-[#16c5d4]" />
                        <p className="text-xs text-[#888888]">推理溯源 ID</p>
                      </div>
                      <p className="text-xs font-mono text-[#1a1a1a] break-all">
                        {result.reasoningId}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <ShieldCheck className="w-3 h-3 text-[#16c5d4]" />
                        <p className="text-xs text-[#888888]">核验模型</p>
                      </div>
                      <p className="text-xs text-[#1a1a1a]">{result.modelUsed}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3 h-3 text-[#16c5d4]" />
                        <p className="text-xs text-[#888888]">核验时间</p>
                      </div>
                      <p className="text-xs font-mono text-[#1a1a1a]">
                        {result.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Analysis */}
              <div className="p-5 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-[#1a1a1a] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#16c5d4]" />
                  AI 鉴别分析
                </h4>
                <p className="text-sm text-[#555555] leading-relaxed">
                  {result.analysis}
                </p>
                <p className="text-xs text-[#888888] mt-3">
                  参考来源：{result.sourceRef}
                </p>
              </div>

              {/* Talking Points */}
              <div className="p-5">
                <h4 className="text-sm font-semibold text-[#1a1a1a] mb-3 flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#3898ec]" />
                  与爸妈沟通的建议话术
                </h4>
                <ul className="space-y-2">
                  {result.talkingPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[#f7f7f7] hover:bg-[#16c5d4]/[0.03] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-[#16c5d4] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#555555]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
