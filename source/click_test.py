#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""click_test.py — 實際點開每節每頁的課堂元件按鈕（提示、答案、揭曉、標出錯誤），檢查公式有沒有排版錯誤或殘留內容。"""
import html, json, os, re, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EDGE = os.path.join(os.environ.get('ProgramFiles(x86)', ''), 'Microsoft/Edge/Application/msedge.exe')
JS = r"""
window.addEventListener('load', async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  await sleep(1500);
  document.getElementById('startBtn').click();
  await sleep(400);
  const res = []; let n = 0, clicks = 0;
  const T = +document.getElementById('progressText').textContent.split('/')[1];
  for (let i = 0; i < T; i++) {
    await sleep(120);
    const host = document.querySelector('.visual-host');
    if (host) {
      for (let g = 0; g < 8; g++) {
        const btns = [...host.querySelectorAll('button')].filter(b => !/開始|暫停|重設|🔔|🔕|歸零|▶|⏸/.test(b.textContent) && !/^\s*\d+\s*$/.test(b.textContent));
        if (!btns.length) break;
        let any = false;
        btns.forEach(b => { const key = b.textContent.trim(); const m = key.match(/(\d+)\s*\/\s*(\d+)/); if (m && m[1] === m[2]) return; if (!m && b.dataset.ct) return; b.dataset.ct = 1; b.click(); clicks++; any = true; });
        await sleep(40);
        if (!any) break;
      }
      if (window.MathJax && MathJax.typesetPromise) await MathJax.typesetPromise([host]).catch(e => res.push({ p: i + 1, e: String(e) }));
      await sleep(60);
      // 公式超出欄寬（會被裁切）
      const clip = (tag) => { const hr = host.getBoundingClientRect(); host.querySelectorAll('mjx-container').forEach(c => { const r = c.getBoundingClientRect(); if (r.width > 0 && (r.right > hr.right + 2 || r.left < hr.left - 2)) res.push({ p: i + 1, clip: tag, w: Math.round(r.width), hw: Math.round(hr.width), tex: (c.getAttribute('aria-label') || '').slice(0, 40) }); }); };
      clip('初次');
      const ranges = [...host.querySelectorAll('input[type=range]')].filter(x => !x.classList.contains('ls-ui') && !/ls-anim/.test(x.className));
      for (const sl of ranges) {
        const lo = +sl.min, hi = +sl.max, isStep = sl.classList.contains('steps-r');
        const vals = isStep ? Array.from({ length: hi - lo }, (_, k) => k + 0.5) : [lo, hi];
        const keep = sl.value;
        for (const v of vals) {
          sl.value = v; sl.dispatchEvent(new Event('input')); if (sl.oninput) sl.oninput();
          await MathJax.typesetPromise([host]).catch(() => {}); await sleep(30);
          clip((isStep ? '步驟 ' : '滑桿 ') + v);
        }
        sl.value = keep; if (sl.oninput) sl.oninput();
      }
      const merr = host.querySelectorAll('mjx-merror,[data-mjx-error]').length;
      const c = host.cloneNode(true);
      c.querySelectorAll('mjx-container,script').forEach(x => x.remove());
      const raw = c.textContent.match(/\\\(|\\\)|\\frac|\\sqrt|undefined|NaN/g) || [];
      if (merr || raw.length) res.push({ p: i + 1, merr, raw: raw.slice(0, 3), txt: c.textContent.slice(0, 80) });
      n++;
    }
    document.getElementById('nextBtn').click();
  }
  const pre = document.createElement('pre'); pre.id = 'ct-res'; pre.textContent = JSON.stringify({ pages: n, clicks, problems: res }); document.body.appendChild(pre);
});
"""


def run(lid):
    site = Path(ROOT) / '.build' / lid / 'site'
    idx = (site / 'index.html').read_text(encoding='utf-8')
    p, js = site / '_ct.html', site / '_ct.js'
    js.write_text(JS, encoding='utf-8')
    p.write_text(idx.replace('</body>', '<script src="_ct.js"></script></body>'), encoding='utf-8')
    try:
        with tempfile.TemporaryDirectory() as prof:
            r = subprocess.run([EDGE, '--headless=new', f'--user-data-dir={prof}', '--no-first-run', '--host-resolver-rules=MAP * ~NOTFOUND',
                                '--window-size=1310,862', '--virtual-time-budget=120000', '--dump-dom', p.as_uri()], capture_output=True, timeout=280)
    finally:
        p.unlink(); js.unlink()
    m = re.search(r'<pre id="ct-res">(.*?)</pre>', r.stdout.decode('utf-8', 'replace'), re.S)
    return lid, (json.loads(html.unescape(m.group(1))) if m else None)


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ids = sys.argv[1:] or sorted(f[:-3] for f in os.listdir(os.path.join(ROOT, 'source', 'lessons')))
    bad, tot = 0, 0
    with ThreadPoolExecutor(5) as ex:
        for lid, r in ex.map(run, ids):
            if r is None:
                print(lid, '未完成'); bad += 1; continue
            tot += r['clicks']
            print(lid, '頁', r['pages'], '點擊', r['clicks'], '問題', len(r['problems']))
            for q in r['problems'][:6]:
                print('   ', q)
            bad += len(r['problems'])
    print('總點擊', tot, '問題', bad)
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
