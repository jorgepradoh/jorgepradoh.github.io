import { useState, useEffect, useRef, useCallback } from "react";

const P = {
  bg: "#0D0B1A", bg2: "#12101F",
  cream: "#F4EED5", amber: "#FFB300",
  blue: "#00B6FF", green: "#00FF9F",
  muted: "#6B6880", mutedL: "#9D9AB0",
  border: "rgba(255,255,255,0.07)",
};

const EXP = [
  { role:"Founding AI Data Engineer", company:"AuraChat.Ai", period:"Aug 2025 – Mar 2026", loc:"Remote · Los Angeles",
    bullets:["Built production MCP server integrating conversational voice agents with legacy cinema API serving millions of users","Architected in-memory caching layer across 279 locations — reduced tool-call latency from ~500ms to <20ms","Designed serverless RAG system for automotive chatbot: 300+ daily queries, sub-2s latency","Diagnosed critical LLM tool-use reliability issue by correlating agent outputs with MCP telemetry"] },
  { role:"Artificial Intelligence Engineer", company:"Volkswagen Financial Services México", period:"Mar 2024 – Mar 2025", loc:"Puebla · Hybrid",
    bullets:["Led in-house ChatGPT-style assistant deployed securely within company VPC using AWS","Technical lead for production-grade MVP — coordinated full-stack and DevOps engineers","Proposed and developed OCR pipeline for automated client data extraction and fraud detection"] },
  { role:"QA / Automation Engineer", company:"Volkswagen Financial Services México", period:"Aug 2023 – Mar 2024", loc:"Puebla",
    bullets:["Led QA Automation adoption for end-to-end testing coverage","Performance testing with AWS architecture optimizations","KPI dashboards integrated into cloud platforms for real-time insights"] },
  { role:"Research Assistant", company:"INAOE — National Institute for Astrophysics, Optics & Electronics", period:"Aug 2022 – Aug 2023", loc:"Puebla",
    bullets:["Computer vision research: anomaly detection, object detection, segmentation, tracking using ML/DL","In-depth research and experimentation on Vision Transformer algorithms","Database creation and augmentation with traditional and GAN-based methods"] },
];

const PROJECTS = [
  { title:"Transformer-based Planetary VO", emoji:"🛸", desc:"TSformer-VO + multi-scale Retinex (MSRCP) for monocular 6-DoF pose estimation in unstructured planetary environments. First ViT applied to planetary VO at real-time performance. MSRCP improved ATE ~10.6% over baseline on MADMAX.", tags:["PyTorch","ViT","TimeSformer","MSRCP","ROS2","MADMAX"] },
  { title:"Cinema Voice Agent", emoji:"🎬", desc:"MCP server integrating conversational voice AI with cinema API. 279-location in-memory cache reduced tool-call latency from ~500ms to <20ms in production.", tags:["MCP","LLM","FastAPI","WebSockets"] },
  { title:"OCR Fraud Detection", emoji:"🔍", desc:"Automated client data extraction from scanned financial documents plus fraud detection. OCR + ML anomaly detection — 96% accuracy on validation set.", tags:["TensorFlow","OpenCV","AWS","Python"] },
  { title:"Enterprise LLM in VPC", emoji:"🔐", desc:"AWS-based in-house ChatGPT assistant with VPC isolation, IAM role strategies, TLS termination, and full audit logging for financial services compliance.", tags:["AWS","LangChain","VPC","IAM"] },
];

const TERM = {
  help:`Commands:
  whoami      about jorge
  skills      tech stack
  thesis      MSc research
  results     thesis key results
  datasets    planetary datasets
  contact     links
  invaders    🛸 space invaders
  starwars    ★ opening crawl
  konami      hint...
  clear       clear terminal
  ls          list files
  cat cv.pdf  CV summary`,
  whoami:`jorge alberto prado herrada
AI engineer · researcher · space robotics.
MSc INAOE 2024. Torreón, MX.
Open to research positions: France / EU.`,
  skills:`Languages:    Python · TypeScript · C++ · MATLAB · Go
AI/ML:        PyTorch · TensorFlow · LLMs · ViT · GANs
Infra:        AWS · Docker · Kubernetes · VPC
Robotics:     ROS2 · SLAM · Visual Odometry · Jetson
CV Research:  Transformers · Retinex · Pose Estimation`,
  thesis:`"A Transformer-based Visual Odometry framework
applied to extremely unstructured Planetary Environments"
INAOE 2024 · Supervisor: Ph.D. Leopoldo Altamirano Robles

Framework: TSformer-VO + multi-scale Retinex (MSRCP)
Dataset:   MADMAX — Morocco Sahara Mars-analog site
           36 navigation experiments, 8 analog sites
Hardware:  NVIDIA Tesla V100 (train) · RTX 3050 (inference)

→ MSRCP reduced ATE by ~10.6% over vanilla baseline
→ Competitive RPE vs DSO and ORB-SLAM3
→ First ViT applied to planetary VO at real-time perf.`,
  results:`TRANSFER LEARNING RESULTS (MADMAX):

Method      ATE avg.   RPE avg.
──────────────────────────────────
Original    185.37     0.1932
autoMSRCR   196.29     0.1949  ← worse
MSRCP       165.62     0.1912  ← BEST ✓

State-of-the-art comparison (RPE):
DSO         0.19 avg
ORB-SLAM3   0.20 avg
Ours        0.19 avg  ← competitive`,
  datasets:`Evaluated datasets for planetary suitability:

Devon Island Rover Navigation Dataset
Katwijk Beach Planetary Rover Dataset
MADMAX (selected) ★
  → Morocco Sahara, 8 Mars-analog sites
  → AlliedVision Mako G-319 @ 14Hz 1032x772px
  → 36 sequences, XSENS MTi-10 IMU
Planetary S3LI Dataset (DLR)`,
  contact:`github:   github.com/jorgepradoh
linkedin: linkedin.com/in/jorge-a-prado
location: Torreón, Coahuila, México`,
  konami:"↑ ↑ ↓ ↓ ← → ← → B A\n(try it on the page with your keyboard)",
  ls:`drwxr-xr-x  thesis_2024.pdf
drwxr-xr-x  madmax_results/
drwxr-xr-x  .secrets/
-rw-r--r--  tsformer_vo.py
-rw-r--r--  retinex_msrcp.py
-rw-------  .bash_history`,
  "cat cv.pdf":`jorge alberto prado herrada
───────────────────────────
INAOE MSc Space Sci. 2024
La Salle Laguna BEng 2020
───────────────────────────
AuraChat.Ai       2025-2026
VW Financial Svc. 2023-2025
INAOE Research    2022-2023
→ type 'thesis' or 'skills'`,
  ".secrets":"Permission denied\n(rover access codes. classified.)",
  "cat .bash_history":`python train_tsformer_vo.py --dataset madmax --epochs 400
python retinex_msrcp.py --input madmax/A-0/
ros2 launch rover_nav slam.launch.py
ssh ubuntu@jetson.local
git commit -m "MSRCP improves ATE by 10.6%"
python -c "import antigravity"`,
};

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

function useIsMobile() {
  const [mob, setMob] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mob;
}

// ── GRAVITY GRID (flat mesh + sphere-shaped well at cursor) ───
function GravityGrid() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    let W, H;
    const COLS = 40, ROWS = 28;

    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e) => { const r = cv.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    window.addEventListener("mousemove", onMove);

    const pt = (i, j, t) => {
      const bx = (i / COLS) * W;
      const by = (j / ROWS) * H;
      const mx = mouse.current.x, my = mouse.current.y;
      const dx = bx - mx, dy = by - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Sphere-shaped well: z-depth of a sphere surface at this (dx,dy)
      const R = 180;                                   // well radius
      const r2 = Math.min(1, dist / R);                // normalised 0..1
      // profile: sphere cap — deepest at centre, zero at rim
      const depth = r2 < 1 ? Math.sqrt(1 - r2 * r2) : 0;
      const well = depth * R * 0.55;                   // max displacement in px

      // Project the 3-D displacement back onto the screen plane
      // (perspective from above: closer-to-viewer = pulled UP/inward)
      const PERSP = 500;
      const scale = PERSP / (PERSP + well);
      const px = mx + dx * scale;
      const py = my + dy * scale;

      // Gentle ambient wave — only outside the well
      const waveFade = Math.max(0, r2 - 0.05);
      const wave = Math.sin(t * 0.00065 + i * 0.38 + j * 0.31) * 4 * waveFade;

      return { x: px + wave, y: py + wave * 0.5, depth };
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i <= COLS; i++) {
        for (let j = 0; j <= ROWS; j++) {
          const p = pt(i, j, t);
          // depth 0 = rim (faint blue), depth 1 = centre (bright cyan)
          const brightness = p.depth;
          const rC = Math.round(20 + brightness * 10);
          const gC = Math.round(brightness * 80);
          const bC = Math.round(160 + brightness * 95);
          const alpha = 0.18 + brightness * 0.65;
          const lw = 0.3 + brightness * 1.0;

          if (i < COLS) {
            const n = pt(i + 1, j, t);
            const g = Math.max(p.depth, n.depth);
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(${rC},${gC},${bC},${0.18 + g * 0.65})`;
            ctx.lineWidth = 0.3 + g * 1.0;
            ctx.stroke();
          }
          if (j < ROWS) {
            const e = pt(i, j + 1, t);
            const g = Math.max(p.depth, e.depth);
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(e.x, e.y);
            ctx.strokeStyle = `rgba(${rC},${gC},${bC},${0.18 + g * 0.65})`;
            ctx.lineWidth = 0.3 + g * 1.0;
            ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ── TERMINAL ──────────────────────────────────────────────────
function Terminal({ onClose, onInvaders, onStarWars }) {
  const [lines, setLines] = useState([
    { t:"sys", v:"jorge-prado terminal v2.0" },
    { t:"sys", v:'type "help" · try "invaders" or "starwars"' },
    { t:"sys", v:"────────────────────────────────────" },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const endRef = useRef(null);
  const inpRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [lines]);
  useEffect(() => { inpRef.current?.focus(); }, []);

  const submit = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const nl = [...lines, { t:"in", v:"$ " + input }];
    if (cmd === "clear") { setLines([{ t:"sys", v:'type "help" for commands' }]); }
    else if (cmd === "invaders") { nl.push({ t:"out", v:"[launching space invaders...]" }); setLines(nl); setTimeout(() => { onClose(); onInvaders(); }, 500); setHist(h=>[input,...h]); setHIdx(-1); setInput(""); return; }
    else if (cmd === "starwars") { nl.push({ t:"out", v:"[opening crawl initiated...]" }); setLines(nl); setTimeout(() => { onClose(); onStarWars(); }, 500); setHist(h=>[input,...h]); setHIdx(-1); setInput(""); return; }
    else { const r = TERM[cmd] || `command not found: ${cmd}\ntry 'help'`; r.split("\n").forEach(l => nl.push({ t:"out", v:l })); setLines(nl); }
    setHist(h => [input, ...h]); setHIdx(-1); setInput("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") { const i = Math.min(hIdx+1, hist.length-1); setHIdx(i); setInput(hist[i]||""); }
    else if (e.key === "ArrowDown") { const i = Math.max(hIdx-1, -1); setHIdx(i); setInput(i===-1?"":hist[i]); }
    else if (e.key === "Escape") onClose();
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ width:"min(640px,95vw)", background:"#0A0915", border:`1px solid ${P.blue}40`, borderRadius:8, fontFamily:"monospace", overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", padding:"8px 12px", borderBottom:`1px solid ${P.border}`, gap:6 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map((c,i)=><div key={i} onClick={i===0?onClose:null} style={{ width:12, height:12, borderRadius:"50%", background:c, cursor:i===0?"pointer":"default" }}/>)}
          <span style={{ marginLeft:"auto", fontSize:11, color:P.muted }}>jorge@portfolio:~</span>
        </div>
        <div style={{ height:320, overflowY:"auto", padding:"14px 16px", fontSize:13, lineHeight:1.75 }}>
          {lines.map((l,i)=><div key={i} style={{ color:l.t==="sys"?P.blue:l.t==="in"?P.amber:P.cream, whiteSpace:"pre-wrap" }}>{l.v}</div>)}
          <div ref={endRef}/>
        </div>
        <div style={{ display:"flex", alignItems:"center", borderTop:`1px solid ${P.border}`, padding:"8px 16px" }}>
          <span style={{ color:P.amber, fontSize:13, marginRight:8 }}>$</span>
          <input ref={inpRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} style={{ flex:1, background:"transparent", border:"none", outline:"none", color:P.cream, fontFamily:"monospace", fontSize:13, caretColor:P.amber }} placeholder="type a command..." autoComplete="off" spellCheck={false}/>
          <span style={{ fontSize:11, color:P.muted }}>ESC</span>
        </div>
      </div>
    </div>
  );
}

// ── SPACE INVADERS ────────────────────────────────────────────
function SpaceInvaders({ onClose }) {
  const cvRef = useRef(null);
  const keys = useRef({});
  const raf = useRef(null);
  const mob = useIsMobile();
  const scale = mob ? Math.min(1, (window.innerWidth - 16) / 560) : 1;

  useEffect(() => {
    const cv = cvRef.current;
    const ctx = cv.getContext("2d");
    const W=560, H=400, IW=36, IH=26, IPADX=12, IPADY=10;
    const S = { invaders:[], player:{x:W/2}, bullets:[], bombs:[], score:0, lives:3, dx:1, moveTimer:0, moveInterval:42, gameOver:false, won:false, shootCD:0, bombTimer:50 };
    for (let r=0; r<4; r++) for (let c=0; c<9; c++) S.invaders.push({ x:40+c*(IW+IPADX), y:55+r*(IH+IPADY), alive:true, type:Math.floor(r*2.5/4) });

    const drawInv = (cx,cy,type,ph) => {
      ctx.save(); ctx.translate(cx,cy+(ph?2:-2));
      if (type===0) { ctx.fillStyle=P.amber; ctx.fillRect(-14,-10,4,20); ctx.fillRect(10,-10,4,20); ctx.fillRect(-10,-12,20,6); ctx.fillRect(-12,-6,24,12); ctx.fillRect(-6,6,12,6); ctx.fillStyle="#0A0915"; ctx.fillRect(-8,-8,5,5); ctx.fillRect(3,-8,5,5); }
      else if (type===1) { ctx.fillStyle=P.blue; ctx.fillRect(-12,-10,24,20); ctx.fillRect(-16,-2,4,8); ctx.fillRect(12,-2,4,8); ctx.fillStyle="#0A0915"; ctx.fillRect(-8,-6,5,5); ctx.fillRect(3,-6,5,5); ctx.fillRect(-4,4,3,4); ctx.fillRect(1,4,3,4); }
      else { ctx.fillStyle=P.green; ctx.fillRect(-10,-10,20,20); ctx.fillRect(-14,-4,4,8); ctx.fillRect(10,-4,4,8); ctx.fillStyle="#0A0915"; ctx.fillRect(-7,-6,4,4); ctx.fillRect(3,-6,4,4); }
      ctx.restore();
    };

    const loop = () => {
      if (!S.gameOver && !S.won) {
        if (keys.current["ArrowLeft"]) S.player.x=Math.max(22,S.player.x-5.5);
        if (keys.current["ArrowRight"]) S.player.x=Math.min(W-22,S.player.x+5.5);
        S.shootCD--;
        if (keys.current[" "]&&S.shootCD<=0) { S.bullets.push({x:S.player.x,y:H-42}); S.shootCD=18; }
        S.bullets=S.bullets.filter(b=>{b.y-=9;return b.y>0});
        S.moveTimer++;
        if (S.moveTimer>=S.moveInterval) {
          S.moveTimer=0;
          const alive=S.invaders.filter(i=>i.alive);
          const rx=Math.max(...alive.map(i=>i.x)),lx=Math.min(...alive.map(i=>i.x));
          if (rx>=W-26||lx<=8) { S.dx*=-1; S.invaders.forEach(i=>i.y+=18); } else S.invaders.forEach(i=>i.x+=S.dx*16);
          S.moveInterval=Math.max(7,42-(36-alive.length)*1.4);
        }
        S.bombTimer--;
        if (S.bombTimer<=0) { const alive=S.invaders.filter(i=>i.alive); if(alive.length){const b=alive[Math.floor(Math.random()*alive.length)];S.bombs.push({x:b.x+IW/2,y:b.y+IH});} S.bombTimer=25+Math.random()*35; }
        S.bombs=S.bombs.filter(b=>{b.y+=4;return b.y<H});
        for(const bul of S.bullets) for(const inv of S.invaders) { if(!inv.alive)continue; if(Math.abs(bul.x-(inv.x+IW/2))<IW/2&&Math.abs(bul.y-(inv.y+IH/2))<IH/2){inv.alive=false;bul.dead=true;S.score+=(3-inv.type)*10;} }
        S.bullets=S.bullets.filter(b=>!b.dead);
        for(const b of S.bombs) if(Math.abs(b.x-S.player.x)<22&&Math.abs(b.y-(H-30))<18){b.dead=true;S.lives--;if(S.lives<=0)S.gameOver=true;}
        S.bombs=S.bombs.filter(b=>!b.dead);
        if(S.invaders.some(i=>i.alive&&i.y>H-65))S.gameOver=true;
        if(S.invaders.every(i=>!i.alive))S.won=true;
      }
      ctx.fillStyle="#050410"; ctx.fillRect(0,0,W,H);
      ctx.fillStyle="rgba(0,182,255,0.1)"; ctx.fillRect(0,0,W,32);
      ctx.fillStyle=P.mutedL; ctx.font="12px monospace";
      ctx.fillText("SCORE: "+S.score,10,20); ctx.fillText("LIVES: "+"★".repeat(Math.max(0,S.lives))+"☆".repeat(Math.max(0,3-S.lives)),W-120,20);
      ctx.fillStyle=P.muted; ctx.fillText("ESC exit",W/2-26,20);
      const ph=S.moveTimer%10<5;
      for(const inv of S.invaders) if(inv.alive) drawInv(inv.x+IW/2,inv.y+IH/2,inv.type,ph);
      ctx.fillStyle=P.amber; for(const b of S.bullets) ctx.fillRect(b.x-2,b.y-10,4,18);
      ctx.fillStyle="#FF5566"; for(const b of S.bombs) ctx.fillRect(b.x-2,b.y-5,4,10);
      const py=H-30; ctx.fillStyle=P.cream; ctx.beginPath(); ctx.moveTo(S.player.x,py-18); ctx.lineTo(S.player.x-22,py+8); ctx.lineTo(S.player.x+22,py+8); ctx.closePath(); ctx.fill();
      ctx.fillStyle=P.amber; ctx.fillRect(S.player.x-6,py+8,12,5);
      ctx.strokeStyle=P.muted; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,H-18); ctx.lineTo(W,H-18); ctx.stroke();
      if(S.gameOver){ctx.fillStyle="rgba(5,4,16,0.88)";ctx.fillRect(0,0,W,H);ctx.fillStyle="#FF5566";ctx.font="bold 36px monospace";ctx.textAlign="center";ctx.fillText("GAME OVER",W/2,H/2-20);ctx.fillStyle=P.mutedL;ctx.font="16px monospace";ctx.fillText("Score: "+S.score,W/2,H/2+18);ctx.fillText("Press ESC",W/2,H/2+46);ctx.textAlign="left";}
      if(S.won){ctx.fillStyle="rgba(5,4,16,0.88)";ctx.fillRect(0,0,W,H);ctx.fillStyle=P.amber;ctx.font="bold 30px monospace";ctx.textAlign="center";ctx.fillText("YOU WIN! 🛸",W/2,H/2-24);ctx.fillStyle=P.green;ctx.font="14px monospace";ctx.fillText("Score: "+S.score,W/2,H/2+10);ctx.fillStyle=P.muted;ctx.fillText('"per aspera ad astra"',W/2,H/2+36);ctx.fillText("ESC to exit",W/2,H/2+62);ctx.textAlign="left";}
      raf.current=requestAnimationFrame(loop);
    };
    raf.current=requestAnimationFrame(loop);
    const kd=e=>{keys.current[e.key]=true;if(e.key===" ")e.preventDefault();if(e.key==="Escape")onClose();};
    const ku=e=>{keys.current[e.key]=false;};
    window.addEventListener("keydown",kd); window.addEventListener("keyup",ku);
    return ()=>{cancelAnimationFrame(raf.current);window.removeEventListener("keydown",kd);window.removeEventListener("keyup",ku);};
  },[onClose]);

  return (
    <div style={{ position:"fixed", inset:0, background:"#000", zIndex:1000, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
      <div style={{ transform:`scale(${scale})`, transformOrigin:"top center" }}>
        <canvas ref={cvRef} width={560} height={400}/>
      </div>
      <div style={{ color:P.muted, fontFamily:"monospace", fontSize:12, marginTop: mob ? `${400*(scale-1)+8}px` : 0 }}>
        {mob
          ? <div style={{ display:"flex", gap:12, marginTop:8 }}>
              {[["←","ArrowLeft"],["→","ArrowRight"],["🔥","Space"],["✕","Escape"]].map(([label,k])=>(
                <button key={k}
                  onTouchStart={e=>{e.preventDefault();if(k==="Escape")onClose();else keys.current[k==="Space"?" ":k]=true;}}
                  onTouchEnd={e=>{e.preventDefault();keys.current[k==="Space"?" ":k]=false;}}
                  style={{ background:`rgba(255,255,255,0.08)`, border:`1px solid ${P.border}`, color:P.cream, fontFamily:"monospace", fontSize:20, cursor:"pointer", padding:"14px 20px", borderRadius:8, userSelect:"none", WebkitUserSelect:"none" }}>{label}</button>
              ))}
            </div>
          : <span>← → move · SPACE shoot · ESC quit</span>
        }
      </div>
    </div>
  );
}

// ── STAR WARS CRAWL ───────────────────────────────────────────
function StarWarsCrawl({ onClose }) {
  useEffect(() => { const k=e=>{if(e.key==="Escape")onClose();}; window.addEventListener("keydown",k); return ()=>window.removeEventListener("keydown",k); },[onClose]);
  const lines = [
    {text:"A LONG TIME AGO IN A GRAD SCHOOL FAR, FAR AWAY...", style:{color:P.amber,fontSize:"clamp(1.3rem,4vw,2.2rem)",fontWeight:700,letterSpacing:4}},
    {text:"★ JORGE PRADO ★", style:{color:P.amber,fontSize:"clamp(1.8rem,5vw,3rem)",fontWeight:700,letterSpacing:4}},
    {text:"EPISODE MSc — A NEW FRAMEWORK", style:{color:P.amber,fontSize:"clamp(.7rem,2vw,.9rem)",letterSpacing:3}},
    {text:"It is a period of unstructured terrain. Rebel researchers, striking from a hidden lab in Puebla, have won their first victory against the Feature-based Empire.", style:{color:"#FFD700"}},
    {text:"During the battle, JORGE PRADO developed secret plans for a new framework — a Vision Transformer architecture with enough attention to estimate 6-DoF pose from a single camera in conditions that make traditional methods completely fail.", style:{color:"#FFD700"}},
    {text:"Pursued by scale ambiguity and monocular drift, Jorge races to the INAOE supercomputing cluster, custodian of the stolen MADMAX dataset from the Moroccan Sahara — a Mars-analog environment that holds the key to planetary rover autonomy...", style:{color:"#FFD700"}},
    {text:"★ TSformer-VO + MSRCP preprocessing ★", style:{color:P.amber}},
    {text:"★ ATE improved ~10.6% over baseline ★", style:{color:P.amber}},
    {text:"★ First ViT applied to planetary VO ★", style:{color:P.amber}},
    {text:"The Force is attention mechanisms.", style:{color:"#FFD700"}},
    {text:"PER ASPERA AD ASTRA", style:{color:P.green,letterSpacing:4}},
  ];
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"#000", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", cursor:"pointer" }}>
      <style>{`@keyframes swS{from{transform:translateY(0) rotateX(25deg)}to{transform:translateY(-4200px) rotateX(25deg)}}`}</style>
      <div style={{ position:"fixed", top:16, right:20, color:P.muted, fontFamily:"monospace", fontSize:12, zIndex:10 }}>[ click / ESC to exit ]</div>
      <div style={{ width:"min(540px,88vw)", height:"100vh", overflow:"hidden", display:"flex", alignItems:"flex-end", justifyContent:"center", perspective:"280px" }}>
        <div style={{ transformOrigin:"50% 100%", animation:"swS 52s linear forwards", width:"100%" }}>
          <div style={{ height:"55vh" }}/>
          {lines.map((l,i)=><p key={i} style={{ textAlign:"center", padding:"0 20px", marginBottom: i<2||l.style.letterSpacing?6:16, lineHeight:1.9, fontSize:"clamp(.85rem,2vw,1rem)", ...l.style }}>{l.text}</p>)}
          <div style={{ height:"80vh" }}/>
        </div>
      </div>
    </div>
  );
}

// ── EDGE DETECTION DEMO ───────────────────────────────────────
// Placeholder Mars-ish terrain URLs (public domain NASA/ESA imagery via Wikimedia)
const MARS_SAMPLES = [
  { label: "Jezero crater floor", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/PIA23239-MarsInSight-FirstSelfie-20181209.jpg/320px-PIA23239-MarsInSight-FirstSelfie-20181209.jpg" },
  { label: "Gale crater gravel", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/PIA16453-Mars_Curiosity_Rover-LinkRock-20121130.jpg/320px-PIA16453-Mars_Curiosity_Rover-LinkRock-20121130.jpg" },
  { label: "Spirit rover panorama", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mars_Spirit_Rover.jpg/320px-Mars_Spirit_Rover.jpg" },
];

function EdgeDemo() {
  const origRef = useRef(null);
  const edgeRef = useRef(null);
  const terrainRef = useRef(null);
  const [thresh, setThresh] = useState(45);
  const [overlay, setOverlay] = useState(false);
  const [seed, setSeed] = useState(137);
  const [mode, setMode] = useState("proc"); // "proc" | "upload" | "sample"
  const [sampleIdx, setSampleIdx] = useState(0);
  const [imgLabel, setImgLabel] = useState("");
  const [loadError, setLoadError] = useState("");
  const fileRef = useRef(null);

  const W = 280, H = 196;

  const captureCanvas = useCallback(() => {
    const oc = origRef.current; if (!oc) return;
    const ctx = oc.getContext("2d");
    const img = ctx.getImageData(0, 0, W, H);
    terrainRef.current = img;
  }, []);

  const gen = useCallback((s) => {
    const cv = origRef.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const img = ctx.createImageData(W, H); const sv = s * 7.13;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let v = 128;
      v += Math.sin(x*.042+y*.031+sv)*38; v += Math.sin(x*.11+y*.083+sv*2)*22;
      v += Math.sin(x*.23+y*.17+sv*.5)*12; v += Math.sin(x*.47+y*.37+sv*3)*7;
      v += Math.sin(x*.89+y*.71+sv*1.3)*4; v += Math.sin(x*1.7+y*1.4+sv*.7)*2;
      v = Math.max(0, Math.min(255, v));
      const idx = (y*W+x)*4;
      img.data[idx] = Math.min(255, v*1.25+20); img.data[idx+1] = Math.floor(v*.55+10);
      img.data[idx+2] = Math.floor(v*.35+5); img.data[idx+3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    terrainRef.current = img;
    setImgLabel("procedural terrain");
    setLoadError("");
  }, []);

  const loadImage = useCallback((src, label) => {
    const cv = origRef.current; if (!cv) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const ctx = cv.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      // Draw cover-fit
      const scale = Math.max(W / img.width, H / img.height);
      const dw = img.width * scale, dh = img.height * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      terrainRef.current = ctx.getImageData(0, 0, W, H);
      setImgLabel(label);
      setLoadError("");
    };
    img.onerror = () => {
      setLoadError("Couldn't load image (CORS). Try uploading directly.");
      gen(seed);
    };
    img.src = src;
  }, [gen, seed]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setMode("upload");
      loadImage(ev.target.result, file.name.replace(/\.[^.]+$/, ""));
    };
    reader.readAsDataURL(file);
  };

  const applyEdges = useCallback((t, ov) => {
    const terrain = terrainRef.current; const ec = edgeRef.current; if (!terrain || !ec) return;
    const { data } = terrain;
    const ectx = ec.getContext("2d");
    const out = new Uint8ClampedArray(W * H * 4);
    const gray = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) gray[i] = 0.299*data[i*4] + 0.587*data[i*4+1] + 0.114*data[i*4+2];
    for (let y = 1; y < H-1; y++) for (let x = 1; x < W-1; x++) {
      const tl=gray[(y-1)*W+(x-1)],tm=gray[(y-1)*W+x],tr=gray[(y-1)*W+(x+1)];
      const ml=gray[y*W+(x-1)],mr=gray[y*W+(x+1)];
      const bl=gray[(y+1)*W+(x-1)],bm=gray[(y+1)*W+x],br=gray[(y+1)*W+(x+1)];
      const gx=-tl-2*ml-bl+tr+2*mr+br, gy=-tl-2*tm-tr+bl+2*bm+br;
      const mag = Math.sqrt(gx*gx + gy*gy); const idx=(y*W+x)*4;
      if (mag > t) { const s=Math.min(1,mag/255); out[idx]=Math.round(s*30); out[idx+1]=Math.round(80+s*175); out[idx+2]=Math.round(200+s*55); out[idx+3]=255; }
      else if (ov) { out[idx]=data[idx]*0.28; out[idx+1]=data[idx+1]*0.28; out[idx+2]=data[idx+2]*0.28; out[idx+3]=255; }
      else { out[idx+3]=255; }
    }
    ectx.putImageData(new ImageData(out, W, H), 0, 0);
  }, []);

  // Init
  useEffect(() => { gen(seed); }, []);
  useEffect(() => { applyEdges(thresh, overlay); }, [thresh, overlay, applyEdges, seed, mode, sampleIdx, imgLabel]);

  const loadSample = (idx) => {
    setSampleIdx(idx); setMode("sample");
    loadImage(MARS_SAMPLES[idx].url, MARS_SAMPLES[idx].label);
  };

  return (
    <div style={{ border:`1px solid ${P.blue}25`, borderRadius:8, padding:24, background:`${P.blue}04` }}>
      <p style={{ fontFamily:"monospace", fontSize:11, color:P.blue, letterSpacing:3, marginBottom:8 }}>LIVE DEMO · SOBEL EDGE DETECTION</p>
      <h3 style={{ color:P.cream, fontSize:15, fontWeight:500, marginBottom:8 }}>Terrain feature extraction</h3>
      <p style={{ color:P.mutedL, fontSize:13, lineHeight:1.7, marginBottom:16 }}>Procedurally generated or real Mars terrain processed with a Sobel kernel — the preprocessing class used in the thesis. Adjust threshold to control feature density.</p>

      {/* Source selector */}
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <button onClick={() => { setMode("proc"); gen(Math.random()*1000); }} style={{ background:"none", border:`1px solid ${mode==="proc"?P.blue:P.border}`, color:mode==="proc"?P.blue:P.mutedL, fontFamily:"monospace", fontSize:11, cursor:"pointer", padding:"4px 12px", borderRadius:4 }}>procedural</button>
        {MARS_SAMPLES.map((s,i) => (
          <button key={i} onClick={() => loadSample(i)} style={{ background:"none", border:`1px solid ${mode==="sample"&&sampleIdx===i?P.green:P.border}`, color:mode==="sample"&&sampleIdx===i?P.green:P.mutedL, fontFamily:"monospace", fontSize:11, cursor:"pointer", padding:"4px 12px", borderRadius:4 }}>{s.label}</button>
        ))}
        <button onClick={() => fileRef.current?.click()} style={{ background:"none", border:`1px solid ${mode==="upload"?P.amber:P.border}`, color:mode==="upload"?P.amber:P.mutedL, fontFamily:"monospace", fontSize:11, cursor:"pointer", padding:"4px 12px", borderRadius:4 }}>↑ upload image</button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display:"none" }} />
      </div>

      {loadError && <p style={{ color:"#FF5566", fontFamily:"monospace", fontSize:11, marginBottom:10 }}>{loadError}</p>}
      {imgLabel && <p style={{ color:P.muted, fontFamily:"monospace", fontSize:11, marginBottom:10 }}>source: {imgLabel}</p>}

      <div style={{ display:"flex", gap:14, marginBottom:14, flexWrap:"wrap" }}>
        {[["ORIGINAL",origRef],["SOBEL EDGES",edgeRef]].map(([label,ref]) => (
          <div key={label} style={{ flex:1, minWidth:200 }}>
            <div style={{ fontFamily:"monospace", fontSize:11, color:P.muted, marginBottom:6, letterSpacing:1 }}>{label}</div>
            <canvas ref={ref} width={W} height={H} style={{ border:`1px solid ${label==="SOBEL EDGES"?P.blue+"40":P.border}`, borderRadius:4, display:"block", maxWidth:"100%" }} />
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, minWidth:180 }}>
          <span style={{ color:P.mutedL, fontSize:12, fontFamily:"monospace", whiteSpace:"nowrap" }}>Threshold: {thresh}</span>
          <input type="range" min={10} max={140} value={thresh} onChange={e => setThresh(Number(e.target.value))} style={{ flex:1 }} />
        </div>
        {mode === "proc" && <button onClick={() => { const s=Math.random()*1000; setSeed(s); gen(s); }} style={{ background:"none", border:`1px solid ${P.border}`, color:P.mutedL, fontFamily:"monospace", fontSize:12, cursor:"pointer", padding:"5px 14px", borderRadius:4 }}>↺ regenerate</button>}
        <button onClick={() => setOverlay(v => !v)} style={{ background:"none", border:`1px solid ${P.border}`, color:P.mutedL, fontFamily:"monospace", fontSize:12, cursor:"pointer", padding:"5px 14px", borderRadius:4 }}>{overlay ? "⊕ edges only" : "⊕ overlay"}</button>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────
const SL = ({label,color})=><p style={{ fontFamily:"monospace", fontSize:11, color:color||P.blue, letterSpacing:3, marginBottom:12, textTransform:"uppercase" }}>./{label}</p>;

export default function Portfolio() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [term, setTerm] = useState(false);
  const [inv, setInv] = useState(false);
  const [sw, setSw] = useState(false);
  const [kon, setKon] = useState(false);
  const [kSeq, setKSeq] = useState([]);
  const [expOpen, setExpOpen] = useState(0);

  const sRefs = { about:useRef(null), experience:useRef(null), projects:useRef(null), lab:useRef(null), contact:useRef(null) };

  const scrollTo = useCallback((id)=>{ setActive(id); setMenuOpen(false); sRefs[id]?.current?.scrollIntoView({behavior:"smooth",block:"start"}); },[]);

  const [typed, setTyped] = useState("");
  useEffect(()=>{ let i=0; const t=setInterval(()=>{ setTyped("AI Engineer · Space Robotics · Computer Vision".slice(0,++i)); if(i>=46)clearInterval(t); },40); return ()=>clearInterval(t); },[]);

  useEffect(()=>{
    const onKey=e=>{
      if(inv) return;
      if(e.key==="`"||e.key==="~"){setTerm(t=>!t);return;}
      if(term) return;
      setKSeq(seq=>{ const next=[...seq,e.key].slice(-10); if(next.join(",")===KONAMI.join(",")){ setKon(true); return []; } return next; });
    };
    window.addEventListener("keydown",onKey); return ()=>window.removeEventListener("keydown",onKey);
  },[inv,term]);

  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.dataset.section);});},{threshold:.2});
    Object.entries(sRefs).forEach(([k,r])=>{ if(r.current){r.current.dataset.section=k;obs.observe(r.current);} });
    return ()=>obs.disconnect();
  },[]);

  const navItems=[{id:"about"},{id:"experience"},{id:"projects"},{id:"lab",accent:P.green},{id:"contact"}];
  const Btn=({label,primary,onClick})=><button onClick={onClick} style={{ padding:"10px 22px", border:`1px solid ${primary?P.amber:P.border}`, background:primary?`${P.amber}15`:"transparent", color:primary?P.amber:P.mutedL, fontFamily:"monospace", fontSize:13, borderRadius:4, cursor:"pointer" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=P.amber;e.currentTarget.style.color=P.amber;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=primary?P.amber:P.border;e.currentTarget.style.color=primary?P.amber:P.mutedL;}}>{label}</button>;

  return (
    <div style={{ background:P.bg, minHeight:"100vh", color:P.cream, fontFamily:"'Inter','Helvetica Neue',sans-serif" }}>
      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${P.bg}}
        ::-webkit-scrollbar-thumb{background:${P.muted};border-radius:2px}
        button{-webkit-tap-highlight-color:transparent;touch-action:manipulation}
        input[type=range]{-webkit-tap-highlight-color:transparent}
        @media(max-width:640px){
          canvas{max-width:100%}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:`${P.bg}F0`, borderBottom:`1px solid ${P.border}`, backdropFilter:"blur(12px)" }}>
        <div style={{ display:"flex", alignItems:"center", padding:"0 clamp(1rem,4vw,3rem)", height:56 }}>
          <div onClick={()=>{scrollTo("about");setMenuOpen(false);}} style={{ fontSize:15, fontWeight:500, color:P.cream, letterSpacing:.5, cursor:"pointer", fontFamily:"monospace" }}><span style={{ color:P.blue }}>~/</span>jorge-prado</div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:12 }}>
            {/* Desktop links */}
            {!isMobile && <>
              <div style={{ display:"flex", gap:"clamp(10px,2vw,22px)", alignItems:"center" }}>
                {navItems.map(item=><button key={item.id} onClick={()=>scrollTo(item.id)} style={{ background:"none", border:"none", color:active===item.id?(item.accent||P.amber):P.mutedL, fontFamily:"monospace", fontSize:13, cursor:"pointer", padding:"4px 0", borderBottom:active===item.id?`1px solid ${item.accent||P.amber}`:"1px solid transparent" }}>{item.id}</button>)}
              </div>
              <button onClick={()=>setTerm(true)} style={{ background:"none", border:`1px solid ${P.border}`, color:P.muted, fontFamily:"monospace", fontSize:11, cursor:"pointer", padding:"3px 10px", borderRadius:4 }} onMouseEnter={e=>{e.currentTarget.style.borderColor=P.blue;e.currentTarget.style.color=P.blue;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.color=P.muted;}}>~/_</button>
            </>}
            {/* Hamburger */}
            {isMobile && <button onClick={()=>setMenuOpen(o=>!o)} style={{ background:"none", border:"none", cursor:"pointer", padding:"8px", display:"flex", flexDirection:"column", gap:5, alignItems:"center", justifyContent:"center" }} aria-label="menu">
              <span style={{ display:"block", width:22, height:2, background: menuOpen ? P.amber : P.mutedL, transition:"all .2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }}/>
              <span style={{ display:"block", width:22, height:2, background: menuOpen ? "transparent" : P.mutedL, transition:"all .2s" }}/>
              <span style={{ display:"block", width:22, height:2, background: menuOpen ? P.amber : P.mutedL, transition:"all .2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }}/>
            </button>}
          </div>
        </div>
        {/* Mobile drawer */}
        {isMobile && menuOpen && <div style={{ borderTop:`1px solid ${P.border}`, padding:"16px 24px 20px", display:"flex", flexDirection:"column", gap:0 }}>
          {navItems.map(item=><button key={item.id} onClick={()=>{scrollTo(item.id);setMenuOpen(false);}} style={{ background:"none", border:"none", color:active===item.id?(item.accent||P.amber):P.mutedL, fontFamily:"monospace", fontSize:15, cursor:"pointer", padding:"12px 0", textAlign:"left", borderBottom:`1px solid ${P.border}` }}>{item.id}</button>)}
          <button onClick={()=>{setTerm(true);setMenuOpen(false);}} style={{ background:"none", border:"none", color:P.blue, fontFamily:"monospace", fontSize:15, cursor:"pointer", padding:"12px 0", textAlign:"left" }}>~/_  terminal</button>
        </div>}
      </nav>

      {/* HERO */}
      <div ref={sRefs.about}>
        <section style={{ position:"relative", minHeight: isMobile ? "100svh" : "100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:`${isMobile?"96px":"80px"} clamp(1.5rem,6vw,5rem) 3rem`, overflow:"hidden" }}>
          <GravityGrid/>
          <div style={{ position:"relative", zIndex:1, maxWidth:640 }}>
            <p style={{ fontFamily:"monospace", fontSize:12, color:P.blue, marginBottom:16, letterSpacing:2 }}>AI ENGINEER · SPACE ROBOTICS · INAOE 2024</p>
            <h1 style={{ fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:700, color:P.cream, margin:"0 0 8px", letterSpacing:-1 }}>Jorge Prado</h1>
            <div style={{ fontSize:"clamp(.9rem,2vw,1.15rem)", color:P.amber, fontFamily:"monospace", height:"1.8em", marginBottom:24 }}>
              {typed}<span style={{ display:"inline-block", width:2, height:"1em", background:P.amber, marginLeft:2, animation:"blink 1s step-end infinite", verticalAlign:"text-bottom" }}/>
            </div>
            <p style={{ color:P.mutedL, lineHeight:1.85, fontSize:14.5, maxWidth:500, marginBottom:32 }}>I build production AI systems and study planetary rover navigation. My MSc thesis at INAOE proposed the first Vision Transformer framework for monocular visual odometry in unstructured planetary environments — combining TSformer-VO with multi-scale Retinex preprocessing. Currently co-founding a startup while watching for research positions in France/EU.</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:36 }}>
              <Btn label="Experience" primary onClick={()=>scrollTo("experience")}/>
              <Btn label="Research lab" onClick={()=>scrollTo("lab")}/>
              <Btn label="GitHub" onClick={()=>window.open("https://github.com/jorgepradoh","_blank")}/>
            </div>
            <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
              {[["⚡","AI Systems"],["👁","Computer Vision"],["🛸","Space Robotics"],["🧠","LLMs / RAG"]].map(([icon,label])=><div key={label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:P.muted, fontFamily:"monospace" }}><span>{icon}</span><span>{label}</span></div>)}
            </div>
          </div>
        </section>
      </div>

      {/* EXPERIENCE */}
      <div ref={sRefs.experience}>
        <section style={{ padding:"80px clamp(1.5rem,6vw,5rem)" }}>
          <SL label="experience"/>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.3rem)", fontWeight:600, color:P.cream, marginBottom:44 }}>Work &amp; Research</h2>
          <div>
            {EXP.map((e,i)=>(
              <div key={i} onClick={()=>setExpOpen(expOpen===i?-1:i)} style={{ borderLeft:`2px solid ${expOpen===i?P.blue:P.border}`, paddingLeft:24, paddingBottom:28, cursor:"pointer" }}>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:expOpen===i?P.blue:P.muted, marginLeft:-30, marginTop:4, flexShrink:0, border:`2px solid ${P.bg}` }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", justifyContent:"space-between", gap: isMobile ? 2 : 4, flexWrap:"wrap" }}>
                      <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 2 : 0, flexWrap:"wrap" }}>
                        <span style={{ color:P.cream, fontSize:15, fontWeight:500 }}>{e.role}</span>
                        <span style={{ color:P.blue, fontSize:14, marginLeft: isMobile ? 0 : 8 }}>{e.company}</span>
                      </div>
                      <span style={{ color:P.muted, fontSize:12, fontFamily:"monospace" }}>{e.period}</span>
                    </div>
                    <div style={{ color:P.muted, fontSize:12, marginTop:2 }}>{e.loc}</div>
                    {expOpen===i&&<ul style={{ marginTop:14, listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:8 }}>
                      {e.bullets.map((b,j)=><li key={j} style={{ color:P.mutedL, fontSize:13.5, lineHeight:1.7, display:"flex", gap:10, alignItems:"flex-start" }}><span style={{ color:P.amber, flexShrink:0 }}>▸</span>{b}</li>)}
                    </ul>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:40 }}>
            <SL label="education"/>
            {[{deg:"MSc — Science and Technology of Space",school:"INAOE — National Institute for Astrophysics, Optics & Electronics",period:"2021–2024",note:"Thesis: A Transformer-based Visual Odometry framework applied to extremely unstructured Planetary Environments. Supervisor: Ph.D. Leopoldo Altamirano Robles"},{deg:"BEng — Mechatronics & Control Systems Engineering",school:"Universidad La Salle Laguna",period:"2016–2020"}].map((ed,i)=>(
              <div key={i} style={{ border:`1px solid ${P.border}`, borderRadius:8, padding:"16px 20px", marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap" }}><span style={{ color:P.cream, fontWeight:500, fontSize:14 }}>{ed.deg}</span><span style={{ color:P.muted, fontSize:12, fontFamily:"monospace" }}>{ed.period}</span></div>
                <div style={{ color:P.blue, fontSize:13, marginTop:2 }}>{ed.school}</div>
                {ed.note&&<div style={{ color:P.muted, fontSize:12, marginTop:8, fontStyle:"italic", lineHeight:1.6 }}>{ed.note}</div>}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PROJECTS */}
      <div ref={sRefs.projects}>
        <section style={{ padding:"80px clamp(1.5rem,6vw,5rem)", background:P.bg2 }}>
          <SL label="projects"/>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.3rem)", fontWeight:600, color:P.cream, marginBottom:44 }}>Selected work</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(255px,100%),1fr))", gap:18 }}>
            {PROJECTS.map((p,i)=>(
              <div key={i} style={{ border:`1px solid ${P.border}`, borderRadius:8, padding:22, background:P.bg }} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,179,0,.3)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.transform="none";}}>
                <div style={{ fontSize:30, marginBottom:12 }}>{p.emoji}</div>
                <div style={{ color:P.cream, fontSize:14.5, fontWeight:500, marginBottom:9 }}>{p.title}</div>
                <div style={{ color:P.mutedL, fontSize:13, lineHeight:1.7, marginBottom:12 }}>{p.desc}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{p.tags.map(t=><span key={t} style={{ fontSize:11, fontFamily:"monospace", color:P.blue, background:`${P.blue}12`, border:`1px solid ${P.blue}28`, padding:"2px 8px", borderRadius:3 }}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* LAB */}
      <div ref={sRefs.lab}>
        <section style={{ padding:"80px clamp(1.5rem,6vw,5rem)" }}>
          <SL label="lab" color={P.green}/>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.3rem)", fontWeight:600, color:P.cream, marginBottom:44 }}>Research &amp; Experiments</h2>
          <div style={{ border:`1px solid ${P.green}25`, borderRadius:8, padding:28, marginBottom:32, background:`${P.green}04` }}>
            <div style={{ fontFamily:"monospace", fontSize:11, color:P.green, letterSpacing:1, marginBottom:8, textTransform:"uppercase" }}>MSc Thesis — INAOE 2024</div>
            <h3 style={{ color:P.cream, fontSize:17, fontWeight:500, marginBottom:14, lineHeight:1.5 }}>A Transformer-based Visual Odometry framework applied to extremely unstructured Planetary Environments</h3>
            <p style={{ color:P.mutedL, fontSize:13.5, lineHeight:1.8, marginBottom:20 }}>Proposed a framework combining TSformer-VO (a TimeSformer-based monocular VO model) with a multi-scale Retinex image preprocessing module. Applied transfer learning and fine-tuning on the MADMAX dataset — 36 navigation experiments across 8 Mars-analog sites in the Moroccan Sahara. The MSRCP preprocessing improved Absolute Trajectory Error by ~10.6% over vanilla input. First Vision Transformer applied to planetary VO while maintaining real-time performance on NVIDIA hardware. Competitive RPE against DSO and ORB-SLAM3.</p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["Vision Transformers","Visual Odometry","SLAM","Retinex / MSRCP","MADMAX Dataset","Transfer Learning","TimeSformer","PyTorch"].map(t=><span key={t} style={{ fontSize:11, fontFamily:"monospace", color:P.green, background:`${P.green}10`, border:`1px solid ${P.green}28`, padding:"2px 8px", borderRadius:3 }}>{t}</span>)}
            </div>
          </div>
          <EdgeDemo/>
        </section>
      </div>

      {/* CONTACT */}
      <div ref={sRefs.contact}>
        <section style={{ padding:"80px clamp(1.5rem,6vw,5rem)", background:P.bg2 }}>
          <SL label="contact"/>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.3rem)", fontWeight:600, color:P.cream, marginBottom:16 }}>Get in touch</h2>
          <p style={{ color:P.mutedL, fontSize:14.5, lineHeight:1.85, maxWidth:460, marginBottom:36 }}>Open to research positions, collaborations, and interesting conversations — especially computer vision, robotics, or space. Based in Torreón, available remote or relocation to France/EU.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:14, maxWidth:400, marginBottom:48 }}>
            {[{label:"GitHub",value:"github.com/jorgepradoh",url:"https://github.com/jorgepradoh"},{label:"LinkedIn",value:"linkedin.com/in/jorge-a-prado",url:"https://linkedin.com/in/jorge-a-prado"},{label:"Location",value:"Torreón, Coahuila, México"}].map(item=>(
              <div key={item.label} style={{ display:"flex", gap:14, alignItems:"center" }}>
                <span style={{ fontSize:12, color:P.muted, fontFamily:"monospace", width:72, flexShrink:0 }}>{item.label}</span>
                {item.url?<a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color:P.blue, fontSize:14, textDecoration:"none", borderBottom:`1px solid ${P.blue}40` }}>{item.value}</a>:<span style={{ color:P.mutedL, fontSize:14 }}>{item.value}</span>}
              </div>
            ))}
          </div>
          <div style={{ paddingTop:28, borderTop:`1px solid ${P.border}` }}>
            <p style={{ color:P.muted, fontSize:12, fontFamily:"monospace", lineHeight:2 }}>
              <span style={{ color:P.amber }}>hint:</span> ~ opens terminal · type <span style={{ color:P.amber }}>invaders</span> or <span style={{ color:P.amber }}>starwars</span> · ↑↑↓↓←→←→BA · visit <span style={{ color:P.green }}>./lab</span>
            </p>
          </div>
        </section>
      </div>

      {term&&<Terminal onClose={()=>setTerm(false)} onInvaders={()=>setInv(true)} onStarWars={()=>setSw(true)}/>}
      {inv&&<SpaceInvaders onClose={()=>setInv(false)}/>}
      {sw&&<StarWarsCrawl onClose={()=>setSw(false)}/>}
      {kon&&<div onClick={()=>setKon(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }}><div style={{ textAlign:"center", maxWidth:440, padding:40 }}><div style={{ fontSize:60, marginBottom:18 }}>🛸</div><div style={{ color:P.amber, fontSize:18, fontWeight:500, marginBottom:12, letterSpacing:2 }}>+30 LIVES GRANTED</div><p style={{ color:P.mutedL, lineHeight:1.8, fontSize:14 }}>The Konami Code was entered on the Mars Orbital Relay Station.<br/>Mission control is confused but supportive.</p><p style={{ color:P.muted, fontSize:12, marginTop:18, fontFamily:"monospace" }}>"per aspera ad astra" — click to continue</p></div></div>}
    </div>
  );
}
