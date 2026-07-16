import { useState } from 'react';
import {
  Shield,
  Heart,
  Globe,
  Mail,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer id="donate" className="relative w-full">
      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d3a] py-24 lg:py-28">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16c5d4]/10 mb-6 border border-[#16c5d4]/20">
              <Heart className="w-3.5 h-3.5 text-[#16c5d4]" />
              <span className="text-xs font-medium text-[#16c5d4]">纯公益项目</span>
            </div>

            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              纯公益，无广告，全免费
            </h2>
            <p className="text-base lg:text-lg text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
              银发康鉴是一个纯公益项目，所有推理基于公开权威数据源（WHO、国家卫健委），
              不显示任何商业广告，不收集用户隐私数据。
              您的每一份支持都将帮助我们覆盖更多海外华人家庭。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href="#"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#16c5d4] to-[#3898ec] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#16c5d4]/30 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                支持我们
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                成为合作伙伴
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/25">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs">纯公益无商业广告</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs">基于公开权威数据源</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs">不收集用户隐私数据</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#111114] py-14">
        <div className="section-padding">
          <div className="max-w-7xl mx-auto">
            {/* Medical Disclaimer - Prominent */}
            <div className="p-5 rounded-xl bg-[#f59e0b]/5 border border-[#f59e0b]/15 mb-10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white/80 mb-2">医疗免责声明</p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    本工具仅提供公益医疗科普参考，不构成诊疗建议，不能替代执业医师医嘱。
                    身体不适请及时前往正规医疗机构就诊。本平台信息来源于 WHO 公开医疗指南、
                    国家卫健委科普文件等权威公开数据源，持续更新中。如有健康问题，请咨询专业医生。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white">银发康鉴</span>
                </div>
                <p className="text-sm text-white/35 leading-relaxed mb-6">
                  基于 Gonka 去中心化推理网络的公益医疗常识助手，为海外华人家庭提供可信的医疗科普参考。
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="订阅项目进展"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#16c5d4]/50 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#16c5d4]/10 border border-[#16c5d4]/30 text-[#16c5d4] text-sm rounded-lg hover:bg-[#16c5d4]/20 transition-colors"
                  >
                    {subscribed ? <CheckCircle className="w-4 h-4" /> : '订阅'}
                  </button>
                </form>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">产品功能</h4>
                <ul className="space-y-3">
                  {['AI 话术鉴别', '权威科普依据', '双语对照', '沟通建议生成'].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-sm text-white/30 hover:text-[#16c5d4] transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-4">技术架构</h4>
                <ul className="space-y-3">
                  {['双模型交叉核验', '去中心化推理溯源', 'Truth Score 评分', '全链路上链存证'].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-sm text-white/30 hover:text-[#16c5d4] transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-4">联系方式</h4>
                <ul className="space-y-3">
                  <li className="text-sm text-white/30">
                    <span className="text-white/50">邮箱：</span>
                    contact@silverhealth.org
                  </li>
                  <li className="text-sm text-white/30">
                    <span className="text-white/50">合作：</span>
                    partner@silverhealth.org
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/5 pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/15">
                  © 2024 银发康鉴 Silver Health Guide. 纯公益项目，所有推理基于公开权威数据源。
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-xs text-white/15 hover:text-white/30 transition-colors">
                    隐私政策
                  </a>
                  <a href="#" className="text-xs text-white/15 hover:text-white/30 transition-colors">
                    使用条款
                  </a>
                  <a href="#" className="text-xs text-white/15 hover:text-white/30 transition-colors">
                    免责声明
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
