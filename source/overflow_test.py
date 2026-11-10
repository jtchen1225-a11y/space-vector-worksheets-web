#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""overflow_test.py — 版面硬性檢查：任何視窗、任何互動狀態，都不可出現「內容超出畫面」。

逐節逐頁實際操作：初始畫面 → 懸念每一步 → 每層全開（提示＋答案）→ 三層全開 → 揭曉 → 標錯＋修正
→ 參考答案 → 例題解答 → 步驟器每一步 → 滑桿多個值 → 動畫每一幕。
每個狀態都量：概念欄／視覺欄的高度與寬度是否超出、繪圖有沒有被引擎壓縮、圖中文字是否低於 28pt、公式是否被裁切。

用法：python source\\overflow_test.py [L01 L02 ...] [--vp 1536x730 ...] [--site docs|build]
有問題時回傳非零；完整結果寫入 .build\\overflow-report.json。
"""
import argparse, html, json, os, re, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EDGE = os.path.join(os.environ.get('ProgramFiles(x86)', ''), 'Microsoft/Edge/Application/msedge.exe')
# 720p 投影機、一般筆電、125% 縮放筆電（目錄佔寬，欄最窄）、1080p 桌機瀏覽器
VIEWPORTS = ['1280x720', '1366x657', '1536x730', '1920x937']
JS = r"""
window.addEventListener('load', async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  await sleep(1500);
  // 封面的「開始」按鈕必須完全在畫面內，不用捲動就按得到
  const sbr = document.getElementById('startBtn').getBoundingClientRect();
  const coverBad = sbr.bottom > innerHeight || sbr.top < 0 || sbr.right > innerWidth;
  document.getElementById('startBtn').click();
  await sleep(400);
  const out = [];
  if (coverBad) out.push({ page: 0, title: '封面', state: '開始按鈕在畫面外', sec: '', base: '', role: '', kind: '', vH: Math.round(sbr.bottom - innerHeight), vW: 0, iH: 0, iW: 0, clip: 0, shrunk: '', minSvg: 0, bad: true });
  const T = +document.getElementById('progressText').textContent.split('/')[1];
  const MIN = 37.3;
  const slideEl = document.getElementById('slide');
  const measure = async (page, title, state) => {
    if (window.MathJax && MathJax.typesetPromise) await MathJax.typesetPromise([slideEl]).catch(() => {});
    await sleep(40);
    window.dispatchEvent(new Event('resize'));
    await sleep(40);
    const vis = slideEl.querySelector('.slide-visual'), info = slideEl.querySelector('.slide-info');
    if (!vis) return;
    const o = v => Math.max(0, v);
    const p = {
      vH: o(vis.scrollHeight - vis.clientHeight), vW: o(vis.scrollWidth - vis.clientWidth),
      iH: info ? o(info.scrollHeight - info.clientHeight) : 0, iW: info ? o(info.scrollWidth - info.clientWidth) : 0,
    };
    const host = vis.querySelector('.visual-host');
    const shrunk = host && host.style.getPropertyValue('--mrd-drawing-max');
    let minSvg = 1e9;
    vis.querySelectorAll('.visual-host svg text').forEach(t => {
      if (t.closest('mjx-container') || !t.getClientRects().length) return;
      const c = t.ownerSVGElement && t.ownerSVGElement.getScreenCTM();
      if (c) minSvg = Math.min(minSvg, parseFloat(getComputedStyle(t).fontSize) * Math.hypot(c.a, c.b));
    });
    let clip = 0;
    const vr = vis.getBoundingClientRect();
    vis.querySelectorAll('mjx-container').forEach(c => { const r = c.getBoundingClientRect(); if (r.width && r.right > vr.right + 2) clip = Math.max(clip, Math.round(r.right - vr.right)); });
    const bad = p.vH > 2 || p.vW > 2 || p.iH > 2 || p.iW > 2 || clip > 0 || minSvg < MIN;
    const bm = ((slideEl.querySelector('.badge') || {}).textContent || '').match(/·\s*(\S+)/);
    const sec = bm ? bm[1] : '';
    let meta = {};
    (window.DECK || []).forEach(c => (c.slides || []).forEach(s => { if (s.sec === sec) meta = s; }));
    if (bad || shrunk) out.push({ page, title, state, sec, base: meta._base || sec, role: meta._role || '', kind: meta._k || '', vH: p.vH, vW: p.vW, iH: p.iH, iW: p.iW, clip, shrunk: shrunk || '', minSvg: minSvg < 1e9 ? +minSvg.toFixed(1) : 0, bad });
  };
  let n = 0, states = 0;
  for (let i = 0; i < T; i++) {
    await sleep(100);
    const host = document.querySelector('.slide-visual .visual-host');
    if (host) {
      n++;
      const title = (slideEl.querySelector('.slide-title') || {}).textContent || '';
      const M = async s => { states++; await measure(i + 1, title, s); };
      await M('初始');
      slideEl.querySelectorAll('.ex-toggle').forEach(b => { if (!/放大/.test(b.textContent)) b.click(); });
      if (slideEl.querySelector('.ex-toggle')) await M('例題解答');
      const steps = [...host.querySelectorAll('[data-step]')];
      for (let k = 0; k < steps.length; k++) { steps[k].click(); await M('懸念第 ' + (k + 1) + ' 步'); }
      const cards = [...host.querySelectorAll('.ls-card')];
      const openCard = c => { const h = c.querySelector('[data-act="hint"]'); const nh = c.querySelectorAll('.ls-hints li').length; for (let k = 0; k < nh; k++) h.click(); const a = c.querySelector('[data-act="ans"]'); if (a) a.click(); };
      const closeCard = c => { const h = c.querySelector('[data-act="hint"]'); if (h) h.click(); const a = c.querySelector('[data-act="ans"]'); if (a) a.click(); };
      for (let k = 0; k < cards.length; k++) { openCard(cards[k]); await M('第 ' + (k + 1) + ' 層全開'); closeCard(cards[k]); }
      if (cards.length > 1) { cards.forEach(openCard); await M('所有層全開'); cards.forEach(closeCard); }
      const r = host.querySelector('[data-act="reveal"]'); if (r) { r.click(); await M('揭曉'); r.click(); }
      const f = host.querySelector('[data-act="find"]'), x = host.querySelector('[data-act="fix"]');
      if (f) { f.click(); await M('標出錯誤'); if (x) { x.click(); await M('看修正'); x.click(); } f.click(); }
      else if (x) { x.click(); await M('看修正'); x.click(); }
      const a = !cards.length && host.querySelector('[data-act="ans"]'); if (a) { a.click(); await M('參考答案'); a.click(); }
      for (const sl of host.querySelectorAll('input[type=range]')) {
        const lo = +sl.min, hi = +sl.max, keep = sl.value, anim = sl.classList.contains('ls-anim-r'), st = sl.classList.contains('steps-r');
        const vals = anim ? Array.from({ length: hi - lo }, (_, k) => k + 0.99) : st ? Array.from({ length: hi - lo + 1 }, (_, k) => lo + k) : Array.from({ length: 7 }, (_, k) => lo + (hi - lo) * k / 6);
        for (const v of vals) { sl.value = v; sl.dispatchEvent(new Event('input', { bubbles: true })); if (sl.oninput) sl.oninput(); await M((anim ? '動畫 ' : st ? '步驟 ' : '滑桿 ') + (+v).toFixed(2)); }
        sl.value = keep; sl.dispatchEvent(new Event('input', { bubbles: true })); if (sl.oninput) sl.oninput();
      }
    }
    document.getElementById('nextBtn').click();
  }
  const pre = document.createElement('pre'); pre.id = 'ov-res';
  pre.textContent = JSON.stringify({ vp: [innerWidth, innerHeight], pages: n, total: T, states, issues: out });
  document.body.appendChild(pre);
});
"""


def run(job):
    lid, vp, base = job
    site = Path(base) / lid if base else Path(ROOT) / '.build' / lid / 'site'
    w, h = map(int, vp.split('x'))
    idx = (site / 'index.html').read_text(encoding='utf-8')
    tag = f'_ov{w}'
    p, js = site / f'{tag}.html', site / f'{tag}.js'
    js.write_text(JS, encoding='utf-8')
    p.write_text(idx.replace('</body>', f'<script src="{tag}.js"></script></body>'), encoding='utf-8')
    try:
        with tempfile.TemporaryDirectory() as prof:
            try:
                r = subprocess.run([EDGE, '--headless=new', f'--user-data-dir={prof}', '--no-first-run', '--host-resolver-rules=MAP * ~NOTFOUND',
                                    f'--window-size={w + 30},{h + 142}', '--virtual-time-budget=400000', '--dump-dom', p.as_uri()], capture_output=True, timeout=500)
                dom = r.stdout.decode('utf-8', 'replace')
            except subprocess.TimeoutExpired:
                dom = ''
    finally:
        p.unlink(); js.unlink()
    m = re.search(r'<pre id="ov-res">(.*?)</pre>', dom, re.S)
    return lid, vp, (json.loads(html.unescape(m.group(1))) if m else None)


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    ap.add_argument('ids', nargs='*')
    ap.add_argument('--vp', nargs='*', default=VIEWPORTS)
    ap.add_argument('--docs', action='store_true', help='量合成後的 docs\\lessons（預設量 .build）')
    ap.add_argument('--jobs', type=int, default=6)
    a = ap.parse_args()
    ids = a.ids or sorted(f[:-3] for f in os.listdir(os.path.join(ROOT, 'source', 'lessons')) if f.endswith('.js'))
    base = os.path.join(ROOT, 'docs', 'lessons') if a.docs else None
    jobs = [(i, v, base) for i in ids for v in a.vp]
    report, bad, states, undone = {}, 0, 0, 0
    with ThreadPoolExecutor(a.jobs) as ex:
        for lid, vp, r in ex.map(run, jobs):
            if r is None:
                print(lid, vp, '未完成'); undone += 1; continue
            hard = [q for q in r['issues'] if q['bad']]
            report.setdefault(lid, {})[vp] = r
            states += r['states']; bad += len(hard)
            pgs = sorted({q['page'] for q in hard})
            print(lid, vp, f"實際視窗 {r['vp'][0]}x{r['vp'][1]}", '內容頁', r['pages'], '狀態', r['states'], '問題頁', pgs, flush=True)
    os.makedirs(os.path.join(ROOT, '.build'), exist_ok=True)
    with open(os.path.join(ROOT, '.build', 'overflow-report.json'), 'w', encoding='utf-8') as fh:
        json.dump(report, fh, ensure_ascii=False)
    print('總狀態', states, '問題狀態', bad, '未完成', undone)
    return 1 if bad or undone else 0


if __name__ == '__main__':
    sys.exit(main())
