# 空間向量工作紙 1.1.1–1.2.5：練習課網頁版

把 8 份工作紙（1.1.1 空間向量及其運算 至 1.2.5 空間中的距離）的練習，依「練習課」技能（math-lesson-practice）編成 8 節 40 分鐘的互動課堂。每節包含互動簡報、列印紙本與教案。

- 入口：`docs/index.html`（GitHub Pages 網址見 Repo 右側 About）
- 教案總覽：`docs/chapter-plan.html`
- 各節：`docs/lessons/Lnn/`（`index.html` 簡報、`handout.html` 紙本、`lesson-plan.html` 教案）
- 原工作紙（學生版 PDF）：`docs/worksheets/`

整個 `docs` 資料夾下載後可以離線開啟（雙擊 `index.html`），不連網、不用 CDN。

## 工作紙與網頁版的對應

| 工作紙部分 | 網頁版位置 |
|------|------|
| 甲 熱身 | 1-2 至 1-4 診斷快問 |
| 乙、丁 跟著做 | 2-1、2-3 解題秘笈（逐步顯示） |
| 丙、戊 兩關（各層第 1 題） | 3-1、3-3 計時闖關（A／B／C 同頁） |
| 丙、戊（各層第 2 題） | 4-3、4-4 再闖一題 |
| 教師答案的常見錯誤 | 4-1、4-2 抓錯偵探 |
| 己 出口挑戰與自評 | 5-1 出口題、5-2 自評 |

診斷快問的選項、比一比、抓錯偵探、「輪到你出題」和延遲檢測題是為網頁版新增的。工作紙原設計 50 分鐘，這裏依技能編成 40 分鐘。

## 製作方式

內容來源是 `source/lessons/Lnn.js`，教案由同一份資料產生，所以題目與簡報一致。每節的 `@assert` 區塊會驗算答案，算錯時建置失敗。

```powershell
python source\autofit.py        # 建置並依實測拆頁（放不下就拆頁，不縮字）
python source\verify_all.py     # 發布前總檢查：重建、合成 docs、五層驗證、點擊測試、全狀態版面檢查
```

建置需要同層的 `..\repos\math-lesson-practice`（練習課技能）和 `..\vector-worksheets`（工作紙 PDF）。

## 未驗證的項目

- 學生表現皆為「預期情況」，尚未經真實課堂驗證。
- 列印效果、投影機實機效果尚未人工確認。
- 數學內容已由程式驗算主要答案，仍建議教師上課前再看一次。

## 授權與來源

簡報引擎改自 math-review-deck（MIT，見 `LICENSE`）；公式排版 MathJax 3.2.2（Apache-2.0，見 `docs/mathjax/LICENSE`）。
