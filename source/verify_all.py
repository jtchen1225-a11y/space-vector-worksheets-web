#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""verify_all.py — 發布前必跑的總檢查（全部通過才可以提交、推送）。

1. 重建全部節並合成 docs
2. validate_deck.py 五層驗證（1280×720）
3. click_test.py：點開所有按鈕，查公式錯誤與裁切
4. overflow_test.py --docs：對 docs（實際發布的檔案），4 種視窗 × 每頁 × 所有互動狀態，不可超框、不可低於 28pt

有內容超框時先跑 autofit.py 加拆頁，不可縮字、不可略過這項檢查。
"""
import os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
PY = sys.executable


def run(title, *args):
    print(f'=== {title}', flush=True)
    r = subprocess.run([PY, *args], cwd=os.path.dirname(HERE))
    print(f'=== {title}：{"通過" if r.returncode == 0 else "未通過"}', flush=True)
    return r.returncode == 0


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    b = os.path.join(HERE, 'build.py')
    ok = run('重建', b)
    ok = ok and run('合成 docs', b, '--assemble')
    ok = ok and run('五層驗證', b, '--only-validate', '--window', '1310x862', '--jobs', '6')
    ok = run('點擊測試', os.path.join(HERE, 'click_test.py')) and ok
    ok = run('全狀態超框檢查（docs）', os.path.join(HERE, 'overflow_test.py'), '--docs', '--jobs', '8') and ok
    print('總檢查：', '全部通過，可以發布' if ok else '未通過，不可發布')
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
