window.FIT = {"1-2": {"h": 1}, "1-3": {"h": 2}, "1-4": {"h": 1}, "2-2": {"h": 2}, "3-1": {"h": 3, "q": 1}, "3-2": {"h": 2}, "3-3": {"h": 4, "q": 2}, "3-4": {"h": 1}, "4-1": {"h": 2}, "4-2": {"h": 1}, "4-3": {"h": 3}, "4-4": {"h": 3, "q": 1}, "4-5": {"h": 3}, "5-1": {"h": 2}};
/* ============================================================
   runtime.js — 全章共用：3D 繪圖（G3）與投影片簡寫（S）。
   建置時內嵌在每節 ch1.js 最前面，所以驗證工具與紙本都能直接使用。
   ============================================================ */
window.G3 = window.G3 || (function () {
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706', INK = '#172033', GRY = '#94a3b8';
  const deg = Math.PI / 180;
  const sub = n => String(n).replace(/1$/, '₁').replace(/2$/, '₂').replace(/'/g, '′');
  const wrap = (W, H, inner) => `<div style="width:100%;text-align:center"><svg viewBox="0 0 ${W} ${H}" style="max-width:100%">${inner}</svg></div>`;
  const f1 = v => +v.toFixed(1);

  /* ---------- 向量運算 ---------- */
  const add = (a, b) => a.map((v, i) => v + b[i]);
  const sbt = (a, b) => a.map((v, i) => v - b[i]);
  const mul = (a, k) => a.map(v => v * k);
  const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
  const len = a => Math.sqrt(dot(a, a));
  const crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const mid = (a, b) => mul(add(a, b), 0.5);
  const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

  /* ---------- 立體 ---------- */
  // 長方體：D 為原點，DA 為 x、DC 為 y、DD1 為 z（與課本建系習慣一致）
  function box(a, b, c, o = {}) {
    const t = o.prime ? (n => n + "'") : (n => n + '1');
    const V = { D: [0, 0, 0], A: [a, 0, 0], B: [a, b, 0], C: [0, b, 0] };
    V[t('D')] = [0, 0, c]; V[t('A')] = [a, 0, c]; V[t('B')] = [a, b, c]; V[t('C')] = [0, b, c];
    const F = [['A', 'B', 'C', 'D'], [t('A'), t('B'), t('C'), t('D')], ['A', 'B', t('B'), t('A')], ['B', 'C', t('C'), t('B')], ['C', 'D', t('D'), t('C')], ['D', 'A', t('A'), t('D')]];
    return { V, F };
  }
  const cube = (s = 1, o = {}) => box(s, s, s, o);
  // 平行六面體：AB 沿 y、AD 沿 -x（略斜）、AA′ 傾斜
  function para(o = {}) {
    const t = o.prime ? (n => n + "'") : (n => n + '1');
    const A = [1.6, 0, 0], ab = o.ab || [0, 2, 0], ad = o.ad || [-1.6, 0.5, 0], aa = o.aa || [0.25, 0.45, 1.5];
    const V = { A, B: add(A, ab), D: add(A, ad), C: add(add(A, ab), ad) };
    V[t('A')] = add(V.A, aa); V[t('B')] = add(V.B, aa); V[t('C')] = add(V.C, aa); V[t('D')] = add(V.D, aa);
    const F = [['A', 'B', 'C', 'D'], [t('A'), t('B'), t('C'), t('D')], ['A', 'B', t('B'), t('A')], ['B', 'C', t('C'), t('B')], ['C', 'D', t('D'), t('C')], ['D', 'A', t('A'), t('D')]];
    return { V, F };
  }
  // 一般多面體；open:true 時為單一平面或開放圖形，不判斷隱藏線
  const solid = (V, F, open) => ({ V, F, open: !!open });
  // 平面 α：以 z=h 的平行四邊形代表
  const plane = (n = 'α', o = {}) => {
    const w = o.w || 2, d = o.d || 1.4, z = o.z || 0;
    return { V: { P1: [d, -w, z], P2: [d, w, z], P3: [-d, w, z], P4: [-d, -w, z] }, F: [['P1', 'P2', 'P3', 'P4']], open: true, flat: true, nm: n };
  };

  /* ---------- 投影框架 ---------- */
  function frame(sc, o = {}) {
    const W = o.W || 440, H = o.H || 280, m = o.m === undefined ? 34 : o.m, FS = o.fs || 30;
    const az = (o.az === undefined ? 28 : o.az) * deg, el = (o.el === undefined ? 18 : o.el) * deg;
    const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
    const raw = q => [-q[0] * sa + q[1] * ca, -(-q[0] * ca * se - q[1] * sa * se + q[2] * ce)];
    const view = [ca * ce, sa * ce, se];
    const all = Object.values(sc.V).concat(o.extra || []);
    const rs = all.map(raw);
    const xs = rs.map(r => r[0]), ys = rs.map(r => r[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const LW = o.figW || W;
    const s = o.scale || Math.min((LW - 2 * m) / Math.max(x1 - x0, 1e-6), (H - 2 * m) / Math.max(y1 - y0, 1e-6));
    const ox = (o.figX || 0) + (LW - s * (x1 - x0)) / 2 - s * x0, oy = (H - s * (y1 - y0)) / 2 - s * y0;
    const pr3 = q => { const r = raw(q); return [f1(ox + s * r[0]), f1(oy + s * r[1])]; };
    const coord = q => (typeof q === 'string' ? sc.V[q] : q);
    const P = q => pr3(coord(q));
    const cen = (() => { const k = Object.values(sc.V); return mul(k.reduce(add, [0, 0, 0]), 1 / k.length); })();
    const cs = pr3(cen);

    const seg = (a, b, c = INK, w = 3, dash = '', k = 1) => {
      const A = coord(a), B = lerp(A, coord(b), k), p = pr3(A), q = pr3(B);
      return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
    };
    const head = (p, q, c, L = 15, D = 6.5) => {
      const dx = q[0] - p[0], dy = q[1] - p[1], n = Math.hypot(dx, dy) || 1, ux = dx / n, uy = dy / n;
      const b = [q[0] - ux * L, q[1] - uy * L];
      return `<polygon points="${f1(q[0])},${f1(q[1])} ${f1(b[0] - uy * D)},${f1(b[1] + ux * D)} ${f1(b[0] + uy * D)},${f1(b[1] - ux * D)}" fill="${c}"/>`;
    };
    const text = (x, y, t, a = {}) => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a.anchor || 'middle'}" font-size="${a.fs || FS}" font-weight="${a.fw || 800}" fill="${a.c || INK}">${t}</text>`;
    const vec = (a, b, c = RED, lab = '', k = 1, off = [10, -8], w = 4.5) => {
      const A = coord(a), B = lerp(A, coord(b), Math.max(k, 0.02)), p = pr3(A), q = pr3(B);
      const n = Math.hypot(q[0] - p[0], q[1] - p[1]);
      const e = n > 14 ? [q[0] - (q[0] - p[0]) / n * 8, q[1] - (q[1] - p[1]) / n * 8] : q;
      let s2 = `<line x1="${p[0]}" y1="${p[1]}" x2="${f1(e[0])}" y2="${f1(e[1])}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>` + head(p, q, c);
      if (lab && k > 0.6) s2 += text((p[0] + q[0]) / 2 + off[0], (p[1] + q[1]) / 2 + off[1], lab, { c });
      return s2;
    };
    const fill = (ns, c = 'rgba(37,99,235,.14)', st = 'none') => `<polygon points="${ns.map(n => P(n).join(',')).join(' ')}" fill="${c}" stroke="${st}"/>`;
    const dotp = (q, c = RED, r = 6) => { const p = P(q); return `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${c}"/>`; };
    const lab = (q, t, c = INK, off = null) => {
      const p = P(q); let dx, dy;
      if (off) { dx = off[0]; dy = off[1]; } else { const vx = p[0] - cs[0], vy = p[1] - cs[1], n = Math.hypot(vx, vy) || 1; dx = vx / n * 21; dy = vy / n * 21; }
      // 夾在畫布內，避免貼邊的頂點標籤被切掉
      const lx = Math.max(FS * 0.75, Math.min(W - FS * 0.75, p[0] + dx)), ly = Math.max(FS * 0.85, Math.min(H - 5, p[1] + dy + 10));
      return text(lx, ly, sub(t), { c });
    };
    // 3D 角弧（O 為頂點，往 A、B 方向），弧上點用球面內插
    const arc = (O, A, B, c = RED, t = '', r = null, k = 1) => {
      const o3 = coord(O), a = sbt(coord(A), o3), b = sbt(coord(B), o3), ua = mul(a, 1 / len(a)), ub = mul(b, 1 / len(b));
      const om = Math.acos(Math.max(-1, Math.min(1, dot(ua, ub)))), R = r || Math.min(len(a), len(b)) * 0.3;
      const pts = [];
      for (let i = 0; i <= 24; i++) {
        const u = i / 24 * k;
        const d = om < 1e-6 ? ua : add(mul(ua, Math.sin((1 - u) * om) / Math.sin(om)), mul(ub, Math.sin(u * om) / Math.sin(om)));
        pts.push(pr3(add(o3, mul(d, R))));
      }
      let s2 = `<polyline points="${pts.map(q => q.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="3.5"/>`;
      if (t && k > 0.6) { const q = pts[12], n0 = pr3(o3), vx = q[0] - n0[0], vy = q[1] - n0[1], n = Math.hypot(vx, vy) || 1; s2 += text(q[0] + vx / n * 22, q[1] + vy / n * 22 + 10, t, { c }); }
      return s2;
    };
    // 3D 直角記號
    const ra = (O, A, B, c = INK, z = 0.14) => {
      const o3 = coord(O), a = sbt(coord(A), o3), b = sbt(coord(B), o3), ua = mul(a, z / len(a)), ub = mul(b, z / len(b));
      const pts = [add(o3, ua), add(add(o3, ua), ub), add(o3, ub)].map(pr3);
      return `<polyline points="${pts.map(q => q.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="2.5"/>`;
    };
    // 底圖：判斷隱藏線，前面實線、後面虛線
    const base = (a = {}) => {
      const fv = sc.F.map(f => {
        const q = f.map(n => sc.V[n]); let nv = [0, 0, 0];
        for (let i = 0; i < q.length; i++) { const u = q[i], w = q[(i + 1) % q.length]; nv = add(nv, crs(u, w)); }
        const fc = mul(q.reduce(add, [0, 0, 0]), 1 / q.length);
        if (dot(nv, sbt(fc, cen)) < 0) nv = mul(nv, -1);
        return sc.open ? true : dot(nv, view) > 1e-9;
      });
      const edges = {};
      sc.F.forEach((f, i) => f.forEach((n, j) => {
        const m2 = f[(j + 1) % f.length], key = [n, m2].sort().join('|');
        (edges[key] = edges[key] || { a: n, b: m2, vis: false }).vis = edges[key].vis || fv[i];
      }));
      let s2 = '';
      if (sc.flat) s2 += fill(sc.F[0], a.pfill || 'rgba(148,163,184,.18)');
      Object.values(edges).forEach(e => { s2 += e.vis ? seg(e.a, e.b, a.c || INK, a.w || 3) : seg(e.a, e.b, a.hc || GRY, 2.5, '7 6'); });
      if (sc.flat) { const p = P('P1'); s2 += text(p[0] - 4, p[1] - 12, sc.nm, { c: '#64748b' }); }
      if (a.labels !== false && !sc.flat) Object.keys(sc.V).forEach(n => { if (!a.only || a.only.includes(n)) s2 += lab(n, n); });
      return s2;
    };
    // 坐標軸（由原點 O 伸出）
    const axes = (L = 1.3, o2 = [0, 0, 0]) => {
      const ax = [[[L, 0, 0], 'x'], [[0, L, 0], 'y'], [[0, 0, L], 'z']];
      return ax.map(([d, n]) => vec(o2, add(o2, d), '#475569', '', 1, [0, 0], 2.5) + (() => { const q = pr3(add(o2, d)); return text(q[0] + (n === 'x' ? -14 : n === 'y' ? 16 : 16), q[1] + (n === 'x' ? 18 : n === 'y' ? 8 : 4), n, { c: '#475569', fw: 700 }); })()).join('');
    };
    const show = (...parts) => wrap(W, H, parts.join(''));
    return { P, seg, vec, fill, dot: dotp, lab, arc, ra, base, text, axes, show, W, H, s };
  }

  /* ---------- 互動：滑桿探索、旋轉 ---------- */
  function explore(h, { sl, draw, fx }) {
    h.innerHTML = `<div style="width:100%"><div class="fig"></div>${fx ? '<div class="fx" style="font-size:var(--mrd-body);text-align:center;line-height:1.3"></div>' : ''}<div class="ictrl">${sl.map(s => `<label>${s.label} <span class="ival v-${s.id}">${s.fmt ? s.fmt(s.value) : s.value}</span></label><input type="range" id="${s.id}" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.value}">`).join('')}</div></div>`;
    const go = () => {
      const v = {};
      sl.forEach(s => { v[s.id] = +h.querySelector('#' + s.id).value; h.querySelector('.v-' + s.id).textContent = s.fmt ? s.fmt(v[s.id]) : v[s.id]; });
      h.querySelector('.fig').innerHTML = draw(v);
      if (fx) { const e = h.querySelector('.fx'); e.innerHTML = fx(v); if (typeof MJ === 'function') MJ(e); }
    };
    sl.forEach(s => { h.querySelector('#' + s.id).oninput = go; });
    go();
  }
  const steps = (h, W, H, list, opt) => {
    SV.stepper(h, `0 0 ${W} ${H}`, list, opt);
    // 步驟文字可含公式：每次重繪後排版
    const sl = h.querySelector('.steps-r'), txt = h.querySelector('.step-txt'), o = sl && sl.oninput;
    if (sl && txt && typeof MJ === 'function') { sl.oninput = () => { if (o) o(); MJ(txt); }; MJ(txt); }
  };
  const card = (h, rows) => { h.innerHTML = SV.fbox(rows.map(r => Object.assign({ color: BLU, fill: '#eef4ff', border: BLU, size: 21 }, r))); };

  // 2D 文字與箭頭（平面示意圖用）
  const txt = (x, y, t, a = {}) => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a.anchor || 'middle'}" font-size="${a.fs || 30}" font-weight="${a.fw || 800}" fill="${a.c || INK}">${t}</text>`;
  const arw = (x1, y1, x2, y2, c = RED, w = 4.5) => { const n = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / n, uy = (y2 - y1) / n, bx = x2 - ux * 15, by = y2 - uy * 15; return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2 - ux * 8)}" y2="${f1(y2 - uy * 8)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${f1(x2)},${f1(y2)} ${f1(bx - uy * 6.5)},${f1(by + ux * 6.5)} ${f1(bx + uy * 6.5)},${f1(by - ux * 6.5)}" fill="${c}"/>`; };
  // 左欄小圖：mini(立體, F=>額外圖層, 選項)
  const mini = (sc, ex, o = {}) => { const F = frame(sc, Object.assign({ W: 420, H: 190, m: 38 }, o)); return F.show(F.base(o.b || {}), ex ? ex(F) : ''); };
  // 行內數學簡寫：vv('AC1') → 向量 AC₁；bb('a') → 粗體向量 a
  const vv = n => `\\(\\overrightarrow{${String(n).replace(/(\d)/g, '_$1')}}\\)`;
  const bb = n => `\\(\\boldsymbol{${n}}\\)`;
  // 工作紙寫法轉成 MathJax：T`文字 $\v{AC1}\cdot\b{n}=\f{1}{2}$`
  //   $…$ 行內公式；\v{AC1} 向量；\b{a} 粗體；\f 分數；\r 根號；〈〉夾角括號；| 轉成 \vert（教案表格才不會被切開）
  const T = (s, ...v) => (typeof s === 'string' ? s : String.raw(s, ...v)).replace(/\$([^$]+)\$/g, (_, m) => '\\(' + m
    .replace(/\\v\{([^}]*)\}/g, (_2, n) => `\\overrightarrow{${n.replace(/(\d)/g, '_$1')}}`)
    .replace(/\\b\{([^}]*)\}/g, '\\boldsymbol{$1}')
    .replace(/\\f\{/g, '\\frac{').replace(/\\r\{/g, '\\sqrt{')
    .replace(/〈/g, '\\langle ').replace(/〉/g, '\\rangle ')
    .replace(/△/g, '\\triangle ').replace(/°/g, '^\\circ ')
    .replace(/\|/g, '\\vert ') + '\\)');
  return { T, vv, bb, mini, txt, arw, RED, GRN, BLU, VIO, AMB, INK, GRY, box, cube, para, solid, plane, frame, explore, steps, card, wrap, add, sbt, mul, dot, len, crs, mid, lerp, sub };
})();

window.S = window.S || (function () {
  const PTS = {
    check: ['想好再比手勢，全班一起出。', '說說看：其他選項錯在哪裏？'],
    tasks: ['三層都看一遍，選一層開始。', '卡住先按「提示」，做完往上挑戰。'],
    drill: ['按「開始」計時，選一層開始。', '卡住先按「提示」，做完往上挑戰。'],
    mistake: ['這個解法哪一步開始出問題？', '怎樣檢查答案是否合理？'],
    exit: ['獨立完成，約 2～3 分鐘。', '寫出關鍵步驟。'],
    tally: ['舉手表示自己的程度。', '誠實回答，下一節更適合你。'],
    summary: ['一起讀一次，抄進筆記。'],
    hook: ['先看情境，猜一猜。', '猜錯沒關係，學完就知道。'],
    anim: ['按 ▶ 播放，邊看邊想。', '看完說說你發現了甚麼。'],
  };
  const mk = (kind, sec, secName, title, points, visual, data, more) =>
    (() => {
      const m = Object.assign({}, more || {}); const pts = (points || (m.fig ? (PTS[kind] || []).slice(0, 1) : PTS[kind]) || []).slice();
      // m.fig：左欄小圖（題目需要看圖時用），放在重點文字之後
      const figHtml = m.fig ? `<div style="margin:6px 0 0 -34px">${m.fig}</div>` : '';
      if (m.fig) { pts[pts.length - 1] += figHtml; delete m.fig; }
      return Object.assign({ sec, secName, title, points: pts, visual, _k: kind, _d: data, _fig: figHtml }, m);
    })();

  /* ---------- 拆頁：內容放不下時拆成多頁，絕不縮字 ----------
     window.FIT（來自 source/fit.json，由 autofit.py 依實測產生）：{ 節碼: { q: 題目頁拆分級, h: 解說頁拆分級 } }
     h=0 表示不拆（提示、答案、揭曉都留在同一頁）；h≥1 時，題目頁只放題目，提示／答案／解說移到後面的頁。
     後續頁的 _k 是 'help'：教案與學習單只讀第一頁（資料完整），不會重複。 */
  const live = () => !!(window.LS && window.LS.report);   // 紙本（handout.js）的 LS 沒有 report
  const strip = (h, sel) => h.querySelectorAll(sel).forEach(e => e.remove());
  const chunk = (a, n) => { const r = [], k = Math.ceil(a.length / n); for (let i = 0; i < a.length; i += k) r.push(a.slice(i, i + k)); return r; };
  const flipHint = p => (p || []).map(t => String(t).replace(/卡住先按「提示」/, '卡住翻下一頁看提示'));

  function expand(s) {
    const f = (window.FIT || {})[s.sec] || {};
    const q = f.q || 0; let hl = f.h || 0;
    const out = [];
    const page = (o) => { const n = out.length; out.push(Object.assign({}, s, { sec: n ? `${s.sec}-${n + 1}` : s.sec, _base: s.sec, _role: n ? 'h' : 'q' }, n ? { _k: 'help', _d: {} } : {}, o)); };
    const helpPts = t => { const p = [t]; if (s._fig) p[0] += s._fig; return p; };
    const k = s._k, d = s._d || {};
    if (k === 'tasks' || k === 'drill') {
      const T = d.tiers, opt = { timer: d.timer, watch: d.watch };
      if (q > 0 && !hl) hl = 1;
      if (!hl) out.push(s);
      else {
        chunk(T, q + 1).forEach((grp, i) => page({
          title: q ? `${s.title}（${i + 1}）` : s.title, points: flipHint(s.points),
          visual: (h) => {
            if (!live()) { if (i === 0) LS.tasks(h, T, opt); return; }
            LS.tasks(h, grp, i === 0 ? opt : {}); strip(h, '.ls-card .ls-actions, .ls-hints, .ls-ans');
          },
        }));
        let groups;
        if (hl === 1) groups = [T];
        else if (hl === 2) groups = [T.slice(0, 2), T.slice(2)];
        else if (hl === 3) groups = T.map(t => [t]);
        else { groups = []; T.forEach(t => { if ((t.hints || []).length) groups.push([Object.assign({}, t, { ans: null })]); if (t.ans) groups.push([Object.assign({}, t, { hints: null })]); }); }
        groups.forEach(grp => page({
          title: `${grp.some(t => (t.hints || []).length) ? '提示與答案' : '答案'}（${grp.map(t => t.tier).join('、')} 層）`,
          points: helpPts(grp.some(t => (t.hints || []).length) ? '先自己試，卡住才開提示。' : '先自己試，再對答案。'),
          visual: (h) => { if (live()) LS.tasks(h, grp, {}); },
        }));
      }
    } else if (k === 'check' && hl) {
      const o = d.options;
      page({ visual: (h) => LS.check(h, { q: d.q, options: o.map(x => ({ t: x.t, ok: x.ok })) }) });
      const idx = o.map((_, i) => i);
      const groups = hl <= 2 ? [idx] : hl === 3 ? chunk(idx, 2) : idx.map(i => [i]);
      groups.forEach(g => page({
        title: `${s.title}（解說）`, points: [hl >= 2 ? d.q : '每個選項對或錯的原因。'],   // 右欄不放題目時，題目移到左欄
        visual: (h) => {
          if (!live()) return;
          LS.check(h, { q: d.q, options: o, tally: false });
          h.querySelector('.ls-check').classList.add('revealed');
          h.querySelectorAll('.ls-opt').forEach((el, i) => { el.classList.toggle('ok', !!o[i].ok); if (!g.includes(i)) el.remove(); });
          strip(h, '.ls-actions'); if (hl >= 2) strip(h, '.ls-q');
        },
      }));
    } else if (k === 'mistake' && (hl || q)) {
      if (q) {
        page({ visual: (h) => { LS.mistake(h, live() ? { who: d.who, q: d.q } : d); strip(h, '.ls-actions'); } });
        page({ title: `${s.title}（解法）`, points: ['這個解法哪一步開始出問題？'], visual: (h) => { if (live()) LS.mistake(h, { who: d.who, steps: d.steps, wrong: d.wrong }); } });
      } else page({ visual: (h) => { LS.mistake(h, live() ? { who: d.who, q: d.q, steps: d.steps, wrong: d.wrong } : d); } });
      const show = (h, o2, wrongOn) => {
        LS.mistake(h, o2);
        const root = h.querySelector('.ls-mistake');
        root.classList.add('found', 'fixed');
        if (wrongOn) h.querySelectorAll('.ls-steps li').forEach((li, i) => li.classList.toggle('bad', i === d.wrong));
        strip(h, '.ls-actions');
      };
      const ST = { who: d.who, steps: d.steps, wrong: d.wrong };
      const pages = hl <= 1 ? [Object.assign({}, ST, { why: d.why, fix: d.fix })]
        : hl === 2 ? [Object.assign({}, ST, { why: d.why }), { who: '修正', fix: d.fix }]
          : [{ who: '錯在哪裏', why: d.why }, { who: '修正', fix: d.fix }];
      pages.forEach(o2 => page({ title: `${s.title}（解析）`, points: [d.q || '想一想：下次怎樣避免？'], visual: (h) => { if (live()) show(h, o2, !!o2.steps); } }));
    } else if (k === 'exit' && hl) {
      page({ visual: (h) => { LS.exit(h, d); if (live()) strip(h, '.ls-ans, .ls-actions'); } });
      page({
        title: '出口題：參考答案', points: [hl >= 2 ? d.q : '對照自己的答案。'],
        visual: (h) => {
          if (!live()) return;
          LS.exit(h, d); h.querySelector('.ls-ans').classList.add('show'); strip(h, '.ls-actions');
          if (hl >= 2) strip(h, '.ls-q, .ls-tag');
        },
      });
    } else if ((k === 'goals' || k === 'summary') && q) {
      chunk(d.items, q + 1).forEach((items, i, all) => page(Object.assign({
        title: `${s.title}（${i + 1}／${all.length}）`,
        visual: (h) => {
          if (k === 'goals') { LS.goals(h, Object.assign({}, d, { items, note: i === all.length - 1 ? d.note : '' })); return; }
          LS.summary(h, { items });
        },
      }, i ? { _k: k, _d: { items } } : {})));
    } else out.push(s);
    // 「跟著做」頁的例題獨立成一頁，解答展開時不會擠爆概念欄
    const first = out[0];
    if (first.example) {
      const ex = first.example; delete first.example;
      const n = out.length;
      out.push(Object.assign({}, s, {
        sec: `${s.sec}-${n + 1}`, title: '再試一題', points: ['獨立做，再對答案。'], _k: 'help', _d: {}, _base: s.sec, _role: 'x', example: undefined,
        visual: (h) => {
          h.innerHTML = `<div class="ls ls-exit"><div class="ls-q">${ex.q}</div><ol class="ls-steps ls-sol" style="display:none">${(ex.steps || []).map(t => `<li>${t}</li>`).join('')}</ol><div class="ls-ans">答：${ex.ans}</div><div class="ls-actions ls-ui"><button class="ls-btn ls-ui" data-act="ans">看解答</button></div></div>`;
          const b = h.querySelector('[data-act="ans"]'), a = h.querySelector('.ls-ans'), so = h.querySelector('.ls-sol');
          b.onclick = () => { const on = !a.classList.contains('show'); a.classList.toggle('show', on); so.style.display = on ? '' : 'none'; b.textContent = on ? '收起解答' : '看解答'; if (window.MJ) MJ(h); };
        },
      }));
    }
    return out;
  }

  // 矮螢幕：只收邊距、按鈕與說明小字，教學文字維持 28pt
  if (typeof document !== 'undefined' && document.head && document.head.appendChild) {
    const st = document.createElement('style');
    st.textContent = `.cover-card .cc-list { display: none; }
    @media (max-height: 800px) { #coverChapters { display: none; } }
    @media (max-height: 760px) and (min-width: 1081px) {
      .topbar { height: 40px; }
      .stage { padding-top: 4px; }
      .slide { padding: 6px 16px; }
      .slide-visual { padding: 4px 10px; }
      .slide-visual .visual-host > .ls { padding-top: 22px; }
      .badge { margin-bottom: 2px; padding: 1px 10px; }
      .step-hint { display: none; }
      .ictrl { margin-top: 2px; }
      .ictrl input[type="range"] { height: 22px; }
      .controlbar { padding: 2px 2px 3px; }
      .nav-btn { padding: 3px 14px; }
      .ls-sub { min-height: 0; }
      .vis-zoom { top: 2px; right: 6px; padding: 1px 10px; }
    }`;
    document.head.appendChild(st);
  }
  return {
    expand,
    goals: (s, n, t, p, d, m) => mk('goals', s, n, t, p, (h) => LS.goals(h, d), d, m),
    summary: (s, n, items) => mk('summary', s, n || '核心知識小結', '本節核心知識小結', null, (h) => LS.summary(h, { items }), { items }),
    tasks: (s, n, t, p, q, m) => { const T = q.map((x, i) => ({ tier: 'ABC'[i], q: x[0], hints: x[1], ans: x[2] })); return mk('tasks', s, n, t, p, (h) => LS.tasks(h, T), { tiers: T }, m); },
    drill: (s, n, t, p, min, watch, q, m) => { const T = q.map((x, i) => ({ tier: 'ABC'[i], q: x[0], hints: x[1], ans: x[2] })); return mk('drill', s, n, t, p, (h) => LS.tasks(h, T, { timer: min, watch }), { tiers: T, timer: min, watch }, m); },
    check: (s, n, t, p, q, o, m) => { const options = o.map(x => ({ t: x[0], why: x[1], ok: !!x[2] })); return mk('check', s, n, t, p, (h) => LS.check(h, { q, options }), { q, options }, m); },
    mistake: (s, n, t, p, d, m) => mk('mistake', s, n, t, p, (h) => LS.mistake(h, d), d, m),
    hook: (s, n, t, p, d, m) => mk('hook', s, n, t, p, (h) => LS.hook(h, d), d, m),
    anim: (s, n, t, p, vb, scenes, m) => { const sc = scenes.map((x, i) => Object.assign({ audio: `audio/s${i + 1}.mp3`, dur: 5 }, x)); return mk('anim', s, n, t, p, (h) => LS.anim(h, { vb, scenes: sc }), { scenes: sc.map(x => ({ say: x.say, read: x.read })) }, m); },
    exit: (s, n, t, p, d, m) => mk('exit', s, n, t, p, (h) => LS.exit(h, d), d, m),
    tally: (s, n, t, q, m) => mk('tally', s, n, t, null, (h) => LS.tally(h, { q, levels: ['已掌握', '部分掌握', '尚未掌握'] }), { q }, m),
    slider: (s, n, t, p, visual, m) => mk('slider', s, n, t, p, visual, {}, m),
    stepper: (s, n, t, p, visual, m) => mk('stepper', s, n, t, p, visual, {}, m),
    stat: (s, n, t, p, visual, m) => mk('static', s, n, t, p, visual, {}, m),
    phase: (ch, time, title, color, slides0) => { const slides = slides0.flatMap(expand); return { ch, time, title, color, sections: slides.map(x => `${x.sec} ${x.secName}`), slides }; },
  };
})();

/* ============ 第 1 階段　0–6 分鐘　暖身診斷：你在哪一關？（教案：診斷起步題；螺旋：基礎辨識） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#2563eb";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Pa = G3.para(), miniPa = G3.mini(Pa);
const Te = G3.solid({O:[.75,.9,1.7],A:[1.4,0,0],B:[.9,2,0],C:[-.4,.8,0]},[['A','B','C'],['A','B','O'],['B','C','O'],['C','A','O']]), miniTe = G3.mini(Te);
  window.DECK.push(S.phase(1, "0–6 分鐘", "暖身診斷：你在哪一關？", C, [
S.goals('1-1','今天的目標','今天練：判斷共面，再用基底表示和計算',['看看今天要闖哪幾關。'],{head:'本節練到',items:['判斷向量共面、四點共面','選定基底表示空間向量','用基底計算長度','用基底證明垂直']}),
S.check('1-2','診斷快問','診斷一：共面',['這三題幫你選今天的起點。'],T`$\b{c}=2\b{a}-3\b{b}$，則 $\b{a},\b{b},\b{c}$？`,[
 ['共面',T`$\b{c}$ 能寫成 $\b{a},\b{b}$ 的組合`,1],
 ['共線',T`概念錯誤：共線要 $\b{c}=\lambda\b{a}$`],
 ['不共面','概念錯誤：能用兩個向量表示就一定共面']
]),
S.check('1-3','診斷二：基底','診斷二：基底',null,'零向量可以作基底中的向量嗎？',[
 ['不可以','零向量與任何向量共線，三個向量必定共面',1],
 ['可以','概念錯誤：基底的三個向量必須不共面'],
 ['要看另外兩個','概念錯誤：有零向量就一定共面']
]),
S.check('1-4','診斷三：唯一','診斷三：表示法唯一',null,T`$\{\b{a},\b{b},\b{c}\}$ 是基底，$x\b{a}+y\b{b}+z\b{c}=\b{0}$，則？`,[
 [T`$x=y=z=0$`,'基底的表示法唯一',1],
 [T`$x+y+z=0$`,'概念錯誤：每個係數都要是 0'],
 ['不能確定','概念錯誤：基底的表示法唯一']
])
  ]));
})();
