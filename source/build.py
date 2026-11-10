#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""build.py — 把 lessons\\Lnn.js 組成一節一個資料夾的課堂簡報＋教案。

用法：python source\\build.py [L01 L02 ...]        只建置指定節（預設全部）
      python source\\build.py --validate L01        建置後跑該課型技能的 validate_deck.py
      python source\\build.py --assemble            合成 docs\\（GitHub Pages 內容）

流程：Lnn.js → node extract.js（執行並驗算 @assert）→ lesson.json → 該課型技能的 new_lesson.py
      → 換上 chN.js 與 lesson-plan.md → 產生粵語語音 → validate_deck.py
"""
import argparse
import concurrent.futures as cf
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SKILL_ROOT = os.path.normpath(os.path.join(ROOT, '..', 'repos'))
SKILLS = {'new': 'math-lesson-new', 'practice': 'math-lesson-practice', 'review': 'math-lesson-review'}
TYPE_NAME = {'new': '新課', 'practice': '練習課', 'review': '複習課'}
BUILD = os.path.join(ROOT, '.build')
AUDIO_CACHE = os.path.join(HERE, 'audio')
TTS_PY = os.path.expanduser(r'~\.claude\tools\speak-runtime\Scripts\python.exe')
PALETTE = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#e11d48', '#0891b2']
GRADE = '高中選修（相當於中五）'

sys.path.insert(0, HERE)
import plan as planmod  # noqa: E402


def phases_of(kind):
    with open(os.path.join(SKILL_ROOT, SKILLS[kind], 'assets', 'phases.json'), encoding='utf-8') as fh:
        return json.load(fh)


def split_source(path):
    with open(path, encoding='utf-8') as fh:
        src = fh.read()
    parts = re.split(r'^//@(\w+)(?: (\d+))?\s*$', src, flags=re.M)
    out = {'chs': {}}
    for i in range(1, len(parts), 3):
        tag, num, body = parts[i], parts[i + 1], parts[i + 2]
        if tag == 'ch':
            out['chs'][int(num)] = body.strip().rstrip(',')
        else:
            out[tag] = body.strip()
    return out


def ch_js(n, ph, color, body, shared, prefix=''):
    head = f"/* ============ 第 {n} 階段　{ph['time']}　{ph['title']}（教案：{ph.get('teacher_title', '')}；螺旋：{ph.get('spiral', '')}） ============ */\n"
    return (prefix + head + 'window.DECK = window.DECK || [];\n(function () {\n'
            f"  const C = {json.dumps(color)};\n"
            "  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;\n"
            + (shared + '\n' if shared else '')
            + f"  window.DECK.push(S.phase({n}, {json.dumps(ph['time'], ensure_ascii=False)}, {json.dumps(ph['title'], ensure_ascii=False)}, C, [\n{body}\n  ]));\n}})();\n")


def build_lesson(lid, audio=True):
    src = split_source(os.path.join(HERE, 'lessons', lid + '.js'))
    r = subprocess.run(['node', os.path.join(HERE, 'extract.js'), lid], capture_output=True, encoding='utf-8')
    if r.returncode:
        raise SystemExit(f'{lid} 抽取失敗：\n{r.stdout}\n{r.stderr}')
    meta = json.loads(r.stdout)
    kind = meta['type']
    preset = phases_of(kind)
    out = os.path.join(BUILD, lid)
    # lesson.json：階段時間、螺旋沿用技能預設；小節名稱與種類用本節實際內容
    phases = []
    for i, ph in enumerate(preset['phases']):
        secs = [{'code': s['sec'], 'name': s['secName'], 'kind': s['_k']} for s in meta['phases'][i]['slides']]
        phases.append({k: ph[k] for k in ('time', 'title', 'teacher_title', 'spiral')} | {'sections': secs})
    cfg = {'title': f"{meta['code']} {meta['topic']}（{TYPE_NAME[kind]}）", 'grade': GRADE, 'topic': meta['topic'], 'goal': meta['goal'],
           'prior': meta['prior'], 'focus': meta['focus'], 'difficulty': meta['difficulty'],
           'eyebrow': f"第一章 空間向量與立體幾何｜工作紙 {meta['code']} 網頁版｜{TYPE_NAME[kind]}",
           # 拆頁產生的後續頁（kind=help）對鷹架工具而言是一般靜態頁
           'phases': [ph | {'sections': [s | {'kind': 'static' if s['kind'] == 'help' else s['kind']} for s in ph['sections']]} for ph in phases]}
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, 'lesson.json'), 'w', encoding='utf-8') as fh:
        json.dump(cfg, fh, ensure_ascii=False, indent=1)
    p = subprocess.run([sys.executable, os.path.join(SKILL_ROOT, SKILLS[kind], 'scripts', 'new_lesson.py'),
                        '--config', os.path.join(out, 'lesson.json'), '--out', out, '--overwrite'], capture_output=True, encoding='utf-8')
    if p.returncode:
        raise SystemExit(f'{lid} new_lesson 失敗：{p.stdout}{p.stderr}')
    # 換上本節內容
    with open(os.path.join(HERE, 'runtime.js'), encoding='utf-8') as fh:
        runtime = fh.read()
    fit_path = os.path.join(HERE, 'fit.json')
    fit = json.load(open(fit_path, encoding='utf-8')).get(lid, {}) if os.path.isfile(fit_path) else {}
    runtime = f'window.FIT = {json.dumps(fit)};\n' + runtime
    for i, ph in enumerate(phases, start=1):
        js = ch_js(i, ph, PALETTE[i - 1], src['chs'][i], src.get('shared', ''), prefix=runtime + '\n' if i == 1 else '')
        with open(os.path.join(out, 'site', f'ch{i}.js'), 'w', encoding='utf-8', newline='\n') as fh:
            fh.write(js)
    with open(os.path.join(out, 'lesson-plan.md'), 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(planmod.lesson_plan(meta, phases, preset['spiral'], GRADE))
    with open(os.path.join(out, 'meta.json'), 'w', encoding='utf-8') as fh:
        json.dump(meta, fh, ensure_ascii=False)
    if audio:
        make_audio(lid, meta, out)
    return meta


def make_audio(lid, meta, out):
    scenes = []
    for ph in meta['phases']:
        for s in ph['slides']:
            if s['_k'] == 'anim':
                scenes = s['_d']['scenes']
    if not scenes:
        return
    items = [{'file': f's{i + 1}.mp3', 'text': sc.get('read') or sc['say']} for i, sc in enumerate(scenes)]
    digest = hashlib.sha256(json.dumps(items, ensure_ascii=False).encode()).hexdigest()[:16]
    cache = os.path.join(AUDIO_CACHE, lid)
    stamp = os.path.join(cache, 'hash.txt')
    if not (os.path.isfile(stamp) and open(stamp).read() == digest):
        os.makedirs(cache, exist_ok=True)
        cfgp = os.path.join(out, 'narration.json')
        with open(cfgp, 'w', encoding='utf-8') as fh:
            json.dump({'voice': 'zh-HK-HiuGaaiNeural', 'rate': '-5%', 'items': items}, fh, ensure_ascii=False, indent=1)
        r = subprocess.run([TTS_PY, os.path.join(SKILL_ROOT, 'math-lesson-new', 'scripts', 'make_audio.py'), '--config', cfgp, '--out', cache], capture_output=True, encoding='utf-8')
        if r.returncode:
            raise SystemExit(f'{lid} 語音失敗：{r.stdout}{r.stderr}')
        with open(stamp, 'w') as fh:
            fh.write(digest)
    dst = os.path.join(out, 'site', 'audio')
    os.makedirs(dst, exist_ok=True)
    for it in items:
        shutil.copy(os.path.join(cache, it['file']), dst)


def validate(lid, window='1310x862'):
    meta = json.load(open(os.path.join(BUILD, lid, 'meta.json'), encoding='utf-8'))
    r = subprocess.run([sys.executable, os.path.join(SKILL_ROOT, SKILLS[meta['type']], 'scripts', 'validate_deck.py'),
                        os.path.join(BUILD, lid, 'site'), '--window', window, '--cap', '200'], capture_output=True, encoding='utf-8', errors='replace')
    return lid, r.returncode, r.stdout + r.stderr


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    ap.add_argument('ids', nargs='*')
    ap.add_argument('--validate', action='store_true')
    ap.add_argument('--only-validate', action='store_true')
    ap.add_argument('--window', default='1310x862')
    ap.add_argument('--no-audio', action='store_true')
    ap.add_argument('--jobs', type=int, default=4)
    ap.add_argument('--assemble', action='store_true')
    a = ap.parse_args()
    ids = a.ids or sorted(f[:-3] for f in os.listdir(os.path.join(HERE, 'lessons')) if f.endswith('.js'))
    if a.assemble:
        import assemble
        assemble.run(ROOT, BUILD, ids)
        return 0
    if not a.only_validate:
        for lid in ids:
            build_lesson(lid, audio=not a.no_audio)
            print(lid, '建置完成')
    if a.validate or a.only_validate:
        bad = 0
        with cf.ThreadPoolExecutor(a.jobs) as ex:
            for lid, code, out in ex.map(lambda x: validate(x, a.window), ids):
                print(f'--- {lid}：{"通過" if code == 0 else f"未通過({code})"}')
                if code:
                    bad += 1
                    print(out[-2500:])
                    rep = os.path.join(BUILD, lid, 'validation-report.json')
                    if os.path.isfile(rep):
                        d = json.load(open(rep, encoding='utf-8'))
                        for pg in (d.get('layout') or {}).get('pages', []):
                            if pg['overflow'] or pg['small'] or pg['merr'] or pg['raw'] or pg['failed']:
                                print('   頁', pg['page'], '超出', pg['overflow'], '小字', pg['small'][:3])
        print('未通過節數：', bad)
        return 1 if bad else 0
    return 0


if __name__ == '__main__':
    sys.exit(main())
