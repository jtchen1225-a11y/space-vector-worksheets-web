#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""autofit.py — 依實測逐級拆頁：量 → 把超出的頁加拆一級（寫入 fit.json）→ 重建 → 再量，直到通過。
不會縮字。到上限仍超出、或無法自動拆的頁（一般圖解頁）列入「需人工處理」。"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import overflow_test as ot  # noqa: E402

FIT = os.path.join(HERE, 'fit.json')
CAP = {'tasks': (2, 4), 'drill': (2, 4), 'check': (0, 4), 'mistake': (1, 3), 'exit': (0, 2), 'goals': (2, 0), 'summary': (2, 0)}
VPS = ['1366x657', '1536x730', '1280x720']


def load():
    return json.load(open(FIT, encoding='utf-8')) if os.path.isfile(FIT) else {}


def slide_kinds(lid):
    r = subprocess.run(['node', os.path.join(HERE, 'extract.js'), lid], capture_output=True, encoding='utf-8')
    if r.returncode:
        raise SystemExit(r.stdout + r.stderr)
    return {s.get('_base') or s['sec']: s['_k'] for ph in json.loads(r.stdout)['phases'] for s in ph['slides'] if s['_k'] != 'help'}


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ids = sys.argv[1:] or sorted(f[:-3] for f in os.listdir(os.path.join(HERE, 'lessons')) if f.endswith('.js'))
    dirty = list(ids)
    for rnd in range(1, 9):
        subprocess.run([sys.executable, os.path.join(HERE, 'build.py')] + dirty, check=True, capture_output=True)
        fit = load()
        kinds = {lid: slide_kinds(lid) for lid in dirty}
        jobs = [(l, v, None) for l in dirty for v in VPS]
        manual, changed = [], set()
        with ThreadPoolExecutor(8) as ex:
            results = list(ex.map(ot.run, jobs))
        seen = set()
        for lid, vp, r in results:
            if r is None:
                manual.append((lid, vp, '未完成')); changed.add(lid); continue
            for q in r['issues']:
                if not q['bad']:
                    continue
                base, role = q['base'], q['role']
                k = kinds[lid].get(base, '')
                tag = (lid, base, role)
                if tag in seen:
                    continue
                seen.add(tag)
                cap = CAP.get(k)
                onlyleft = q['vH'] <= 2 and q['iH'] > 2 or q['vW'] > 2 or q['iW'] > 2 or (q['minSvg'] and q['minSvg'] < 37.3)
                if not cap or onlyleft:
                    manual.append((lid, vp, q['page'], q['sec'], q['title'][:18], q['state'], f"vH{q['vH']} iH{q['iH']} iW{q['iW']} svg{q['minSvg']}")); continue
                f = fit.setdefault(lid, {}).setdefault(base, {})
                init = q['state'] == '初始' and role in ('q', '')
                if init and cap[0] and f.get('q', 0) < cap[0]:
                    f['q'] = f.get('q', 0) + 1; changed.add(lid)
                elif not init and f.get('h', 0) < cap[1]:
                    f['h'] = f.get('h', 0) + 1; changed.add(lid)
                else:
                    manual.append((lid, vp, q['page'], q['sec'], q['title'][:18], q['state'], f"已到上限 {f} vH{q['vH']}"))
        with open(FIT, 'w', encoding='utf-8') as fh:
            json.dump(fit, fh, ensure_ascii=False, indent=0, sort_keys=True)
        print(f'第 {rnd} 輪：受測 {len(dirty)} 節，加拆 {len(changed)} 節，需人工 {len(manual)} 項', flush=True)
        if not changed:
            for m in manual:
                print('  人工', m)
            with open(os.path.join(os.path.dirname(HERE), '.build', 'manual.json'), 'w', encoding='utf-8') as fh:
                json.dump(manual, fh, ensure_ascii=False, indent=0)
            return 1 if manual else 0
        dirty = sorted(changed)
    print('達輪數上限')
    return 1


if __name__ == '__main__':
    sys.exit(main())
