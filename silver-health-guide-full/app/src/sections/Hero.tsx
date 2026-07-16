import { useEffect, useRef, useState } from 'react';
import { Search, ArrowDown, Shield, AlertTriangle } from 'lucide-react';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [demoResult, setDemoResult] = useState<string | null>(null);

  // Three.js Glass Cubes
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f7f7);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xf0f5f7);
    const envLight1 = new THREE.DirectionalLight(0xffffff, 2);
    envLight1.position.set(5, 5, 5);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0x16c5d4, 0.5);
    envLight2.position.set(-5, 3, -5);
    envScene.add(envLight2);
    const envLight3 = new THREE.AmbientLight(0xffffff, 0.8);
    envScene.add(envLight3);
    const cubeRenderTarget = pmremGenerator.fromScene(envScene);
    scene.environment = cubeRenderTarget.texture;

    const cubes: {
      mesh: THREE.Mesh;
      innerMesh: THREE.Mesh;
      speed: number;
      amplitude: number;
      offset: number;
      baseY: number;
    }[] = [];

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.15,
      transmission: 0.92,
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.3,
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x16c5d4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const positions = [
      { x: -3.5, y: 1.5, z: -1 },
      { x: -1.2, y: -0.5, z: 0.5 },
      { x: 1.8, y: 2, z: -0.5 },
      { x: 3.5, y: -1, z: 0 },
      { x: 0, y: 0.8, z: -2 },
      { x: -2.5, y: -2, z: 1 },
      { x: 2.5, y: -2.2, z: 1.5 },
    ];

    positions.forEach((pos, i) => {
      const size = 0.8 + Math.random() * 0.5;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const mesh = new THREE.Mesh(geometry, glassMaterial);
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);

      const innerSize = size * 0.4;
      const innerGeometry = new THREE.BoxGeometry(innerSize, innerSize, innerSize);
      const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
      mesh.add(innerMesh);

      cubes.push({
        mesh,
        innerMesh,
        speed: 0.3 + Math.random() * 0.4,
        amplitude: 0.3 + Math.random() * 0.3,
        offset: i * 0.8,
        baseY: pos.y,
      });
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);
    const cyanLight = new THREE.PointLight(0x16c5d4, 0.8, 20);
    cyanLight.position.set(-3, 2, 3);
    scene.add(cyanLight);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      cubes.forEach((cube) => {
        cube.mesh.rotation.x += 0.005;
        cube.mesh.rotation.y += 0.005;
        cube.mesh.position.y =
          cube.baseY +
          Math.sin(time * cube.speed + cube.offset) * cube.amplitude;

        const breathe = 0.8 + Math.sin(time * 2 + cube.offset) * 0.2;
        cube.innerMesh.scale.setScalar(breathe);
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      cubes.forEach((c) => {
        c.mesh.geometry.dispose();
        c.innerMesh.geometry.dispose();
      });
      renderer.dispose();
      glassMaterial.dispose();
      innerMaterial.dispose();
      cubeRenderTarget.dispose();
      pmremGenerator.dispose();
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    if (query.includes('蜂胶') || query.includes('糖尿病')) {
      setDemoResult(
        '蜂胶不能治疗糖尿病。WHO指南指出，糖尿病需要终身规范管理，蜂胶仅为膳食补充，不能替代降糖药物。任何宣称"根治糖尿病"的产品均为虚假宣传。'
      );
    } else if (query.includes('维生素') || query.includes('保健品')) {
      setDemoResult(
        '保健品不能替代药物治疗疾病。根据WHO公开指南和国家卫健委科普文件，保健品仅作为膳食补充，不能预防、诊断或治疗疾病。身体不适请前往正规医院就诊。'
      );
    } else {
      setDemoResult(
        '根据WHO公开医疗指南及国家卫健委科普文件，建议您通过正规渠道获取医疗信息。如有健康问题，请咨询专业医生。银发康鉴为您提供权威、免费的医疗常识参考。'
      );
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 section-padding w-full max-w-4xl mx-auto text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#16c5d4]/20 mb-8">
          <Shield className="w-3.5 h-3.5 text-[#16c5d4]" />
          <span className="text-xs font-medium text-[#555555] tracking-wide">
            公益项目 · 基于 Gonka 去中心化推理网络
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-6 leading-tight">
          银发康鉴
        </h1>
        <p className="text-lg sm:text-xl text-[#555555] mb-3 max-w-2xl mx-auto leading-relaxed">
          身在海外，放心不下爸妈的保健品选购？
        </p>
        <p className="text-sm sm:text-base text-[#888888] mb-12 max-w-xl mx-auto leading-relaxed">
          粘贴爸妈收到的推销话术，AI 鉴别真伪，给出权威科普依据和沟通建议。
          基于 WHO 公开指南与国家卫健委科普文件。
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-6">
          <div className="search-glow rounded-2xl bg-white/70 backdrop-blur-xl transition-shadow duration-300">
            <div className="flex items-center px-2">
              <Search className="w-5 h-5 text-[#888888] ml-4 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='试试输入"蜂胶能治糖尿病吗"'
                className="flex-1 bg-transparent px-4 py-4 text-sm text-[#1a1a1a] placeholder:text-[#888888] outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#16c5d4] to-[#3898ec] text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[#16c5d4]/30 transition-all duration-300 flex-shrink-0"
              >
                查询
              </button>
            </div>
          </div>
        </form>

        {/* Demo Result */}
        {demoResult && (
          <div className="max-w-xl mx-auto glass-card rounded-2xl p-5 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#16c5d4] mb-1.5">银发康鉴 · 权威参考</p>
                <p className="text-sm text-[#555555] leading-relaxed">{demoResult}</p>
                <p className="text-xs text-[#888888] mt-3">
                  参考：WHO Diabetes Guidelines, 2024；国家卫健委科普文件
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div className="max-w-xl mx-auto flex items-start gap-2 text-left p-3 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/10 mb-8">
          <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#555555] leading-relaxed">
            <strong>医疗免责声明：</strong>本工具仅提供公益医疗科普参考，不构成诊疗建议，
            不能替代执业医师医嘱。身体不适请及时前往正规医疗机构就诊。
          </p>
        </div>

        <a
          href="#detection"
          className="inline-flex flex-col items-center gap-2 text-[#888888] hover:text-[#16c5d4] transition-colors group"
        >
          <span className="text-xs tracking-wider">体验 AI 鉴别</span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:animate-none" />
        </a>
      </div>
    </section>
  );
}
