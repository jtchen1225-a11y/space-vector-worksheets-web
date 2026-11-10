#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""assemble.py — 合成 docs\\（GitHub Pages）：全章入口、全章教案、各節簡報／紙本／教案，共用一份 MathJax。"""
import html
import json
import os
import re
import shutil

SITE = '空間向量工作紙：練習課網頁版'
UNITS = [('1.1 空間向量及其運算', 1, 3), ('1.2 空間向量在立體幾何中的應用', 4, 8)]


def md_to_html(md):
    """最小 Markdown 轉換：標題、清單、表格、引言、粗體、核取方塊。公式留給 MathJax。"""
    out, lines, i = [], md.split('\n'), 0
    inline = lambda s: re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    in_ul = False

    def close_ul():
        nonlocal in_ul
        if in_ul:
            out.append('</ul>')
            in_ul = False
    while i < len(lines):
        ln = lines[i]
        m = re.match(r'^(#{1,4}) (.*)$', ln)
        if m:
            close_ul()
            level = len(m.group(1))
            text = inline(m.group(2))
            anchor = ''
            am = re.match(r'^L(\d\d)　', m.group(2))
            if level == 1 and am:
                anchor = f' id="L{am.group(1)}"'
            out.append(f'<h{level}{anchor}>{text}</h{level}>')
        elif ln.startswith('|') and i + 1 < len(lines) and re.match(r'^\|[-| ]+\|$', lines[i + 1]):
            close_ul()
            head = [c.strip() for c in ln.strip('|').split('|')]
            out.append('<div class="tw"><table><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in head) + '</tr></thead><tbody>')
            i += 2
            while i < len(lines) and lines[i].startswith('|'):
                out.append('<tr>' + ''.join(f'<td>{inline(c.strip())}</td>' for c in lines[i].strip('|').split('|')) + '</tr>')
                i += 1
            out.append('</tbody></table></div>')
            continue
        elif ln.startswith('- '):
            if not in_ul:
                out.append('<ul>')
                in_ul = True
            item = ln[2:].replace('[x] ', '☑ ').replace('[ ] ', '☐ ')
            out.append(f'<li>{inline(item)}</li>')
        elif ln.startswith('> '):
            close_ul()
            out.append(f'<blockquote>{inline(ln[2:])}</blockquote>')
        elif ln.strip() == '':
            close_ul()
        elif ln.startswith('<'):
            close_ul()
            out.append(ln)
        else:
            close_ul()
            out.append(f'<p>{inline(ln)}</p>')
        i += 1
    close_ul()
    return '\n'.join(out)


DOC_CSS = """:root{--ink:#172033;--mut:#5b6476;--line:#dfe4ee;--bg:#f6f7fb;--card:#fff;--acc:#2563eb}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.7 "Noto Sans TC","Microsoft JhengHei","PingFang TC",sans-serif}
main{max-width:1000px;margin:0 auto;padding:24px 16px 80px}h1{font-size:28px;line-height:1.3;margin:40px 0 12px;padding-top:12px;border-top:3px solid var(--acc)}main>h1:first-child{border:0;margin-top:0}
h2{font-size:22px;margin:30px 0 10px}h3{font-size:18px;margin:22px 0 8px}blockquote{margin:12px 0;padding:10px 14px;background:#eef4ff;border-left:4px solid var(--acc);border-radius:6px}
.tw{overflow-x:auto;margin:10px 0}table{border-collapse:collapse;background:var(--card);min-width:560px;width:100%;font-size:15.5px}th,td{border:1px solid var(--line);padding:7px 9px;vertical-align:top;text-align:left}th{background:#f0f2f8}
a{color:var(--acc)}.bar{position:sticky;top:0;background:#fff;border-bottom:1px solid var(--line);padding:9px 16px;font-size:15px;z-index:3;display:flex;gap:14px;flex-wrap:wrap}
mjx-container{overflow-x:auto;overflow-y:hidden;max-width:100%}@media print{.bar{display:none}body{background:#fff}h1{page-break-before:always}}"""


def doc_page(title, body, back, mj, links=''):
    return f"""<!DOCTYPE html>
<html lang="zh-Hant"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title><style>{DOC_CSS}</style>
<script>window.MathJax={{loader:{{paths:{{mathjax:'{mj}/es5'}}}},tex:{{inlineMath:[['\\\\(','\\\\)']],displayMath:[['$$','$$']]}},svg:{{fontCache:'global'}},options:{{enableMenu:false}}}};</script>
<script src="{mj}/es5/tex-svg-full.js" id="MathJax-script" async></script></head>
<body><div class="bar"><a href="{back}">← 工作紙目錄</a>{links}</div><main>{body}</main></body></html>
"""


def overview_md(metas):
    n = len(metas)
    L = ['# 空間向量工作紙 1.1.1–1.2.5：練習課教案總覽', '',
         f'> 共 **{n} 節**練習課，每節 40 分鐘，對應 {n} 份工作紙（1.1.1–1.2.5）。題目、答案、常見錯誤與出口題取自工作紙及其教師答案，'
         '答案經程式驗算；診斷快問、比一比、抓錯偵探、「輪到你出題」與延遲檢測題是為網頁版新增的。學生表現一律為「預期情況」。', '',
         '## 一、工作紙與網頁版的對應', '',
         '| 工作紙部分 | 網頁版位置 | 階段（螺旋位置） |', '|------|------|------|',
         '| 甲 熱身 | 1-2 至 1-4 診斷快問（改成選擇題，錯誤選項對應典型錯誤） | 第 1 階段（基礎辨識） |',
         '| 乙 跟著做一、丁 跟著做二 | 2-1、2-3 解題秘笈（逐步顯示） | 第 2 階段（方法與檢查） |',
         '| 丙 第一關、戊 第二關（各層第 1 題） | 3-1、3-3 計時闖關（A／B／C 同頁） | 第 3 階段（獨立應用 → 變式比較） |',
         '| 丙、戊（各層第 2 題） | 4-3、4-4 再闖一題 | 第 4 階段（綜合解難） |',
         '| 教師答案的常見錯誤 | 4-1、4-2 抓錯偵探 | 第 4 階段 |',
         '| 己 出口挑戰與自評 | 5-1 出口題、5-2 自評 | 第 5 階段（學習證據） |', '',
         '工作紙原設計 50 分鐘；練習課技能以 40 分鐘為準，所以每層每關先做第 1 題，第 2 題移到第 4 階段。時間不足時，第 4 階段的 4-5 可留作功課。', '',
         '## 二、各節一覽', '', '| 節次 | 工作紙 | 課題 | 核心學習目標 |', '|------|------|------|------|']
    for m in metas:
        L.append(f"| L{m['id']:02d} | {m['code']} | {m['topic']} | {m['goal']} |")
    L += ['', '## 三、學習證據追蹤', '',
          '每節出口題當堂分三類（已掌握／部分掌握／尚未掌握）；約一週後派發延遲檢測小紙條（不提前通知、不先複習、不計分），'
          '用來分辨真正掌握、短暫學會、延後學會與尚未掌握。題目見各節教案 E、G 節，也印在各節的列印紙本。', '',
          '## 四、需要教師確認的假設', '',
          '- 年級：工作紙標示為假設的「高中選修（相當於中五）」，這裏沿用。',
          '- 用語：依工作紙（數量積、法向量、二面角等），輔以香港常用表達。',
          '- 課時：如學校每節 50 分鐘，可把 3-1、3-3 的計時各加長 3 至 4 分鐘，並在課內完成 4-5。', '']
    return '\n'.join(L)


def index_html(metas):
    cards = []
    for name, a, b in UNITS:
        rows = []
        for m in metas:
            if not (a <= m['id'] <= b):
                continue
            lid = f"L{m['id']:02d}"
            rows.append(f"""<article class="card"><div class="no">{m['code']}</div><div class="main"><span class="tag">練習課</span>
<h3>{html.escape(m['topic'])}</h3><p>{m['goal'].replace('<', '&lt;')}</p>
<div class="act"><a class="go" href="lessons/{lid}/index.html#present">開始上課</a><a href="lessons/{lid}/handout.html">列印紙本</a><a href="lessons/{lid}/lesson-plan.html">教案</a><a href="worksheets/ws-{m['code']}.pdf">原工作紙 PDF</a></div></div></article>""")
        cards.append(f'<section><h2>{name}</h2><div class="grid">{"".join(rows)}</div></section>')
    return f"""<!DOCTYPE html>
<html lang="zh-Hant"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{SITE}</title><meta name="description" content="空間向量與立體幾何工作紙 1.1.1–1.2.5 的練習課網頁版：{len(metas)} 節 40 分鐘課，含互動簡報、列印紙本與教案。">
<style>:root{{--ink:#172033;--mut:#5b6476;--line:#dfe4ee;--bg:#f4f6fb;--card:#fff;--acc:#b45309}}*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 "Noto Sans TC","Microsoft JhengHei","PingFang TC",sans-serif}}
header{{background:#141c2f;color:#fff;padding:44px 16px 36px}}.wrap{{max-width:1120px;margin:0 auto}}header p{{margin:0;color:#b9c3d8}}h1{{margin:8px 0 14px;font-size:clamp(28px,5vw,44px);line-height:1.2}}
.stats{{display:flex;flex-wrap:wrap;gap:10px 26px;margin:20px 0 6px}}.stats b{{font-size:30px;display:block;line-height:1.1}}.stats span{{font-size:15px;color:#b9c3d8}}
.top{{margin-top:20px;display:flex;flex-wrap:wrap;gap:10px}}.top a{{background:#fff;color:#141c2f;font-weight:700;padding:10px 16px;border-radius:9px;text-decoration:none}}.top a.alt{{background:transparent;color:#fff;border:1px solid #55617c}}
main{{padding:12px 16px 80px}}h2{{font-size:24px;margin:34px 0 14px}}
.how{{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin-top:22px}}.how ol{{margin:6px 0 0;padding-left:22px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:14px}}.card{{display:flex;gap:14px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px;min-width:0}}
.no{{font-weight:800;color:#8a94a8;font-size:17px}}.main{{min-width:0;flex:1}}.tag{{display:inline-block;background:var(--acc);color:#fff;font-size:14px;font-weight:700;padding:2px 9px;border-radius:999px}}
h3{{margin:7px 0 5px;font-size:19px;line-height:1.35}}.card p{{margin:0 0 11px;color:var(--mut);font-size:15.5px}}.act{{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center}}.act a{{color:#2563eb;font-size:15.5px}}.act a.go{{background:#2563eb;color:#fff;font-weight:700;padding:6px 13px;border-radius:8px;text-decoration:none}}
footer{{color:var(--mut);font-size:14.5px;border-top:1px solid var(--line);padding-top:16px;margin-top:40px}}@media(max-width:400px){{.grid{{grid-template-columns:1fr}}}}</style></head>
<body><header><div class="wrap"><p>高中選修｜第一章 空間向量與立體幾何</p><h1>工作紙 1.1.1–1.2.5<br>練習課網頁版</h1>
<div class="stats"><div><b>{len(metas)}</b><span>節練習課，每節 40 分鐘</span></div><div><b>A／B／C</b><span>三層任務同頁，可以換層</span></div><div><b>5</b><span>個階段：診斷 → 秘笈 → 兩關 → 抓錯 → 出口</span></div></div>
<div class="top"><a href="chapter-plan.html">教案總覽</a><a class="alt" href="lessons/L01/index.html#present">由 1.1.1 開始</a></div></div></header>
<main><div class="wrap"><div class="how"><b>怎樣用</b><ol><li>按「開始上課」投影，用 ← → 翻頁；題目頁可按「提示」「答案」。</li><li>學生可用原工作紙 PDF 或「列印紙本」的學習單作答。</li><li>課末用出口小紙條收集證據；約一週後派發延遲檢測小紙條。</li></ol></div>
{"".join(cards)}
<footer>題目取自同名工作紙及教師答案，答案經程式驗算；學生表現皆為「預期情況」。教師版與教案請勿派發給學生。可整個資料夾下載後離線開啟。簡報引擎改自 math-review-deck（MIT）；公式排版 MathJax 3.2.2（Apache-2.0）。</footer></div></main></body></html>
"""


def run(root, build, ids):
    docs = os.path.join(root, 'docs')
    if os.path.isdir(docs):
        shutil.rmtree(docs)
    os.makedirs(os.path.join(docs, 'lessons'))
    metas = [json.load(open(os.path.join(build, i, 'meta.json'), encoding='utf-8')) for i in ids]
    metas.sort(key=lambda m: m['id'])
    shutil.copytree(os.path.join(build, ids[0], 'site', 'mathjax'), os.path.join(docs, 'mathjax'))
    all_md = []
    for k, m in enumerate(metas):
        lid = f"L{m['id']:02d}"
        src, dst = os.path.join(build, lid, 'site'), os.path.join(docs, 'lessons', lid)
        shutil.copytree(src, dst, ignore=shutil.ignore_patterns('mathjax'))
        prev_l = f'../L{m["id"] - 1:02d}/index.html' if k else None
        next_l = f'../L{m["id"] + 1:02d}/index.html' if k < len(metas) - 1 else None
        nav = '<a href="../../index.html">工作紙目錄</a>　<a href="lesson-plan.html">本節教案</a>' + (f'　<a href="{prev_l}">上一節</a>' if prev_l else '') + (f'　<a href="{next_l}">下一節</a>' if next_l else '')
        for f in ('index.html', 'handout.html'):
            p = os.path.join(dst, f)
            s = open(p, encoding='utf-8').read()
            s = s.replace("mathjax: 'mathjax/es5'", "mathjax: '../../mathjax/es5'").replace('src="mathjax/es5/', 'src="../../mathjax/es5/')
            if f == 'index.html':
                s = s.replace('<a href="handout.html">', nav + '　<a href="handout.html">', 1)
            open(p, 'w', encoding='utf-8', newline='\n').write(s)
        md = open(os.path.join(build, lid, 'lesson-plan.md'), encoding='utf-8').read()
        all_md.append(md)
        open(os.path.join(dst, 'lesson-plan.md'), 'w', encoding='utf-8', newline='\n').write(md)
        links = f'<a href="index.html#present">開始上課</a><a href="handout.html">列印紙本</a>'
        open(os.path.join(dst, 'lesson-plan.html'), 'w', encoding='utf-8', newline='\n').write(doc_page(f'{lid} 教案', md_to_html(md), '../../index.html', '../../mathjax', links))
    ov = overview_md(metas)
    toc = '## 五、各節教案目錄\n\n' + '\n'.join(f"- <a href=\"#L{m['id']:02d}\">L{m['id']:02d} {m['code']} {m['topic']}</a>" for m in metas) + '\n'
    full = ov + '\n' + toc + '\n' + '\n'.join(all_md)
    open(os.path.join(docs, 'chapter-plan.md'), 'w', encoding='utf-8', newline='\n').write(full)
    open(os.path.join(docs, 'chapter-plan.html'), 'w', encoding='utf-8', newline='\n').write(doc_page('教案總覽', md_to_html(full), 'index.html', 'mathjax'))
    open(os.path.join(docs, 'index.html'), 'w', encoding='utf-8', newline='\n').write(index_html(metas))
    ws_src = os.path.normpath(os.path.join(root, '..', 'vector-worksheets'))
    os.makedirs(os.path.join(docs, 'worksheets'))
    for m in metas:
        hit = [f for f in os.listdir(ws_src) if f.startswith(m['code']) and f.endswith('-工作紙.pdf')]
        if len(hit) != 1:
            raise SystemExit(f"找不到 {m['code']} 的學生版工作紙 PDF：{hit}")
        shutil.copy(os.path.join(ws_src, hit[0]), os.path.join(docs, 'worksheets', f"ws-{m['code']}.pdf"))
    open(os.path.join(docs, '.nojekyll'), 'w').close()
    print('docs 合成完成：', len(metas), '節')
