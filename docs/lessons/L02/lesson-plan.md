# L02　1.1.2 空間向量基本定理（練習課）

> 課型：**練習課**｜工作紙 1.1.2 網頁版（共 8 份）｜教材範圍：1.1.2 空間向量基本定理。題目取自同名工作紙（原設計 50 分鐘），這裏依練習課技能編成 40 分鐘：每層每關先做第 1 題，第 2 題放在第 4 階段。學生表現一律為「預期情況」，實際請依課堂證據調整。

## A. 課堂基本資料

- 年級：高中選修（相當於中五）
- 課題：空間向量基本定理
- 課時：40分鐘
- 課型：練習課
- 核心學習目標：能用共面向量定理判斷向量共面、四點共面，選定基底表示空間向量，並用基底計算長度與證明垂直
- 先備知識：1.1.1 線性運算與數量積；1.1.2 新課內容
- 教學重點：共面的判斷（能否寫成另外兩個向量的組合）；先用基底表示，再展開計算
- 學習難點：係數和等於 1 的條件；路線正負號；展開時交叉項的符號
- 本節刻意不教：坐標表示（1.1.3）

## B. 40分鐘教學流程表

| 時間 | 階段 | 教師活動 | 學生活動 | 分層支持 | 學習證據 | 對應投影片 |
|------|------|----------|----------|----------|----------|------------|
| 0–6 分鐘 | 診斷起步題 | 展示目標；用三道快問診斷學生在哪一關。 | 獨立判斷並用手勢作答。 | 快問不計分，用來選層。 | 三道診斷題票數。 | 1-1 今天的目標、1-2 診斷快問、1-3 診斷二：基底、1-4 診斷三：唯一 |
| 6–11 分鐘 | 方法回顧與關鍵步驟 | 回顧方法與關鍵檢查步驟，只補診斷題暴露的缺口。 | 說出每一步的理由，自我檢查。 | 基礎薄弱者把秘笈抄成檢查清單。 | 2-2 自我檢查票數。 | 2-1 解題秘笈、2-2 自我檢查、2-3 秘笈二：求長度、2-4 代入檢驗 |
| 11–25 分鐘 | 分層練習兩輪＋巡視 | 安排兩輪分層練習（基本功→比一比），巡視並記錄錯誤。 | 獨立完成兩輪，比較不同題目的做法異同。 | A／B／C 同頁，可換層。 | 巡視觀察表、3-2／3-4 票數。 | 3-1 第一關：共面向量定理、3-2 比一比：共面與共線、3-3 第二關：基底、3-4 比一比：唯一性 |
| 25–35 分鐘 | 錯誤門診＋綜合解難 | 展示預期錯誤作錯誤門診，再做綜合解難與自編題。 | 找錯、修正、綜合解難、嘗試出題。 | A 層分步；C 層推理或自編題。 | 錯因解釋、綜合題解題過程。 | 4-1 抓錯偵探、4-2 再抓一次、4-3 共面：再闖一題、4-4 基底：再闖一題、4-5 輪到你出題 |
| 35–40 分鐘 | 出口題＋自我評估 | 派發出口題、學生自評；總結關鍵方法。 | 獨立完成出口題、舉手自評。 | 出口題全班同題。 | 出口小紙條、自評票數。 | 5-1 出口挑戰、5-2 我的程度、5-3 核心知識小結 |

### 第 1 階段　0–6 分鐘　診斷起步題（簡報：暖身診斷：你在哪一關？；螺旋：基礎辨識）

- 教師活動：展示目標；用三道快問診斷學生在哪一關。
- 學生活動：獨立判斷並用手勢作答。
- 教學資源：互動簡報 1-1 今天的目標、1-2 診斷快問、1-3 診斷二：基底、1-4 診斷三：唯一；學習單（handout.html）。
- 理解檢查：\(\boldsymbol{c}=2\boldsymbol{a}-3\boldsymbol{b}\)，則 \(\boldsymbol{a},\boldsymbol{b},\boldsymbol{c}\)？；零向量可以作基底中的向量嗎？；\(\{\boldsymbol{a},\boldsymbol{b},\boldsymbol{c}\}\) 是基底，\(x\boldsymbol{a}+y\boldsymbol{b}+z\boldsymbol{c}=\boldsymbol{0}\)，則？
- 可能困難（預期情況）：概念錯誤：共線要 \(\boldsymbol{c}=\lambda\boldsymbol{a}\)；概念錯誤：能用兩個向量表示就一定共面；概念錯誤：基底的三個向量必須不共面
- 應對策略：先提示、後答案（重讀題目→相關概念→部分線索→關鍵步驟→必要時示範後換相近題再試）；票數超過三成選錯時，退回本階段前一頁重講。
- 支援提示：基礎薄弱：診斷結果只作選層依據。

### 第 2 階段　6–11 分鐘　方法回顧與關鍵步驟（簡報：解題秘笈大公開；螺旋：基礎辨識（方法與檢查））

- 教師活動：回顧方法與關鍵檢查步驟，只補診斷題暴露的缺口。
- 學生活動：說出每一步的理由，自我檢查。
- 教學資源：互動簡報 2-1 解題秘笈、2-2 自我檢查、2-3 秘笈二：求長度、2-4 代入檢驗；學習單（handout.html）。
- 理解檢查：\(\overrightarrow{OP}=x\overrightarrow{OA}\) \(+y\overrightarrow{OB}+z\overrightarrow{OC}\)，\(P\) 在平面 \(ABC\) 內的條件是？
- 可能困難（預期情況）：概念錯誤：係數和要等於 1；概念錯誤：這只是其中一個可能
- 應對策略：先提示、後答案（重讀題目→相關概念→部分線索→關鍵步驟→必要時示範後換相近題再試）；票數超過三成選錯時，退回本階段前一頁重講。
- 支援提示：基礎薄弱：把關鍵步驟抄成清單。

### 第 3 階段　11–25 分鐘　分層練習兩輪＋巡視（簡報：兩輪闖關：基本功到變化題；螺旋：獨立應用 → 變式比較）

- 教師活動：安排兩輪分層練習（基本功→比一比），巡視並記錄錯誤。
- 學生活動：獨立完成兩輪，比較不同題目的做法異同。
- 教學資源：互動簡報 3-1 第一關：共面向量定理、3-2 比一比：共面與共線、3-3 第二關：基底、3-4 比一比：唯一性；學習單（handout.html）。
- 理解檢查：\(\overrightarrow{MP}=2\overrightarrow{MA}-\overrightarrow{MB}\)，則 \(M,A,B,P\) 四點？；\(\{\boldsymbol{a},\boldsymbol{b},\boldsymbol{c}\}\) 是基底，\(x\boldsymbol{a}+y\boldsymbol{b}+z\boldsymbol{c}=2\boldsymbol{a}-\boldsymbol{c}\)，則？
- 可能困難（預期情況）：概念錯誤：\(M\) 不一定在直線 \(AB\) 上；概念錯誤：能寫成組合就共面；粗心失誤：把 −1 配錯向量
- 應對策略：先提示、後答案（重讀題目→相關概念→部分線索→關鍵步驟→必要時示範後換相近題再試）；票數超過三成選錯時，退回本階段前一頁重講。
- 支援提示：動機不足：可選層、任務短；能力較高：C 層比較做法。

### 第 4 階段　25–35 分鐘　錯誤門診＋綜合解難（簡報：抓錯偵探＋綜合解難；螺旋：綜合解難）

- 教師活動：展示預期錯誤作錯誤門診，再做綜合解難與自編題。
- 學生活動：找錯、修正、綜合解難、嘗試出題。
- 教學資源：互動簡報 4-1 抓錯偵探、4-2 再抓一次、4-3 共面：再闖一題、4-4 基底：再闖一題、4-5 輪到你出題；學習單（handout.html）。
- 理解檢查：錯因解釋、綜合題解題過程。
- 可能困難（預期情況）：程序錯誤：始點、終點顛倒，應是「終點減始點」。；程序錯誤：含 \(-\boldsymbol{a}\) 的兩個交叉項應是負數。
- 應對策略：先提示、後答案（重讀題目→相關概念→部分線索→關鍵步驟→必要時示範後換相近題再試）；票數超過三成選錯時，退回本階段前一頁重講。
- 支援提示：疲累或注意力不足：找錯分段進行；能力較高：自編題。

### 第 5 階段　35–40 分鐘　出口題＋自我評估（簡報：最後一關＋幫自己打分；螺旋：學習證據）

- 教師活動：派發出口題、學生自評；總結關鍵方法。
- 學生活動：獨立完成出口題、舉手自評。
- 教學資源：互動簡報 5-1 出口挑戰、5-2 我的程度、5-3 核心知識小結；學習單（handout.html）。
- 理解檢查：出口小紙條、自評票數。
- 可能困難（預期情況）：起步較慢、未能用手勢表態。
- 應對策略：先提示、後答案（重讀題目→相關概念→部分線索→關鍵步驟→必要時示範後換相近題再試）；票數超過三成選錯時，退回本階段前一頁重講。
- 支援提示：三類學生同題。

## C. 課堂練習

### 3-1 第一關：共面向量定理（專注 6 分鐘）

| 層次 | 題目 | 答案 | 提示階梯 |
|------|------|------|----------|
| A層 基礎支持 | \(\boldsymbol{a},\boldsymbol{b}\) 不共線，\(\boldsymbol{c}=3\boldsymbol{a}-\boldsymbol{b}\)。\(\boldsymbol{a},\boldsymbol{b},\boldsymbol{c}\) 共面嗎？為甚麼？ | 共面：\(\boldsymbol{c}\) 是 \(\boldsymbol{a},\boldsymbol{b}\) 的組合 | 能寫成 \(x\boldsymbol{a}+y\boldsymbol{b}\) 的向量，與 \(\boldsymbol{a},\boldsymbol{b}\) 共面。 |
| B層 核心達標 | \(O\) 不在平面 \(ABC\) 內。\(P\) 在平面內嗎？(1) \(\overrightarrow{OP}=2\overrightarrow{OA}+\overrightarrow{OB}-2\overrightarrow{OC}\)；(2) \(\overrightarrow{OP}=\overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}\) | (1) 在：\(\overrightarrow{AP}=\overrightarrow{AB}-2\overrightarrow{AC}\)；(2) 不在：係數和是 3 | 看係數和是否等於 1，或計算 \(\overrightarrow{AP}\)。 |
| C層 延伸挑戰 | \(\boldsymbol{a},\boldsymbol{b},\boldsymbol{c}\) 不共面。這三個向量共面嗎？(1) \(\boldsymbol{a}+\boldsymbol{b}\)，\(\boldsymbol{b}+\boldsymbol{c}\)，\(\boldsymbol{c}+\boldsymbol{a}\)；(2) \(\boldsymbol{a}+\boldsymbol{b}\)，\(\boldsymbol{b}-\boldsymbol{c}\)，\(\boldsymbol{a}+\boldsymbol{c}\) | (1) 不共面；(2) 共面：\(\boldsymbol{a}+\boldsymbol{c}\) \(=(\boldsymbol{a}+\boldsymbol{b})-(\boldsymbol{b}-\boldsymbol{c})\) | 不設提示，鼓勵先自行解釋 |

### 3-3 第二關：基底（專注 7 分鐘）

| 層次 | 題目 | 答案 | 提示階梯 |
|------|------|------|----------|
| A層 基礎支持 | \(M\) 是 \(BC\) 中點。表示：(1) \(\overrightarrow{AB}\)；(2) \(\overrightarrow{OM}\)；(3) \(\overrightarrow{AM}\) | (1) \(\boldsymbol{b}-\boldsymbol{a}\)；(2) \(\frac{1}{2}(\boldsymbol{b}+\boldsymbol{c})\)；(3) \(-\boldsymbol{a}+\frac{1}{2}\boldsymbol{b}+\frac{1}{2}\boldsymbol{c}\) | (1) 終點減始點；(2) 中點公式。；(3) \(\overrightarrow{AM}=\overrightarrow{OM}-\overrightarrow{OA}\)。 |
| B層 核心達標 | 平行六面體中 \(\overrightarrow{AB}=\boldsymbol{a}\)，\(\overrightarrow{AD}=\boldsymbol{b}\)，\(\overrightarrow{AA_1}=\boldsymbol{c}\)，\(M\)、\(N\) 是 \(CC_{1}\)、\(A_{1}D_{1}\) 中點。表示 \(\overrightarrow{AM}\)、\(\overrightarrow{BN}\) | \(\overrightarrow{AM}=\boldsymbol{a}+\boldsymbol{b}+\frac{1}{2}\boldsymbol{c}\)；\(\overrightarrow{BN}=-\boldsymbol{a}+\frac{1}{2}\boldsymbol{b}+\boldsymbol{c}\) | \(\overrightarrow{AM}=\overrightarrow{AC}+\overrightarrow{CM}\)。；\(\overrightarrow{BN}=\overrightarrow{BA}+\overrightarrow{AA_1}+\overrightarrow{A_1N}\)。 |
| C層 延伸挑戰 | \(G\) 是 \(\triangle ABC\) 的重心，\(P\) 是 \(OG\) 中點。表示 \(\overrightarrow{AP}\) | \(-\frac{5}{6}\boldsymbol{a}+\frac{1}{6}\boldsymbol{b}+\frac{1}{6}\boldsymbol{c}\) | 不設提示，鼓勵先自行解釋 |

### 4-3 共面：再闖一題

| 層次 | 題目 | 答案 | 提示階梯 |
|------|------|------|----------|
| A層 基礎支持 | 平行六面體中，\(\overrightarrow{AB},\overrightarrow{AD},\overrightarrow{AC_1}\) 共面嗎？ | 不共面 | \(\overrightarrow{AC_1}=\overrightarrow{AB}+\overrightarrow{AD}+\overrightarrow{AA_1}\)，而 \(\overrightarrow{AA_1}\) 不在底面內。 |
| B層 核心達標 | 四面體 \(ABCD\) 中，\(E,F,G,H\) 是 \(AB,BC,CD,DA\) 的中點。證明四點共面 | \(\overrightarrow{EG}=\overrightarrow{EF}+\overrightarrow{FG}=\overrightarrow{EF}+\overrightarrow{EH}\)，所以共面 | \(\overrightarrow{EH}\) 與 \(\overrightarrow{FG}\) 都等於 \(\frac{1}{2}\overrightarrow{BD}\)。 |
| C層 延伸挑戰 | \(\overrightarrow{OP}=x\overrightarrow{OA}+y\overrightarrow{OB}+z\overrightarrow{OC}\) 且 \(x+y+z=1\)。證明 \(P\) 在平面 \(ABC\) 內 | 代入 \(x=1-y-z\)，得 \(\overrightarrow{AP}=y\overrightarrow{AB}+z\overrightarrow{AC}\) | 不設提示，鼓勵先自行解釋 |

### 4-4 基底：再闖一題

| 層次 | 題目 | 答案 | 提示階梯 |
|------|------|------|----------|
| A層 基礎支持 | \(\{\boldsymbol{a},\boldsymbol{b},\boldsymbol{c}\}\) 是基底，\(x\boldsymbol{a}+(y-1)\boldsymbol{b}+z\boldsymbol{c}=3\boldsymbol{b}\)，求 \(x,y,z\) | \(x=0,y=4,z=0\) | 兩邊對應係數相等。 |
| B層 核心達標 | 平行六面體中 \(AB=AD=1\)，\(AA_{1}=2\)，\(\angle BAD=90^\circ \)，\(\angle BAA_{1}=\angle DAA_{1}=60^\circ \)。求 \(\vert \overrightarrow{AC_1}\vert \) | \(\sqrt{10}\) | \(\overrightarrow{AC_1}=\boldsymbol{a}+\boldsymbol{b}+\boldsymbol{c}\)，先平方。；\(\boldsymbol{a}\cdot\boldsymbol{b}=0\)，\(\boldsymbol{a}\cdot\boldsymbol{c}=\boldsymbol{b}\cdot\boldsymbol{c}=1\)。 |
| C層 延伸挑戰 | 正四面體 \(ABCD\) 棱長 1，以 \(\{\overrightarrow{AB},\overrightarrow{AC},\overrightarrow{AD}\}\) 為基底，證明 \(AB\perp CD\) | \(\overrightarrow{AB}\cdot\overrightarrow{CD}\) \(=\overrightarrow{AB}\cdot\overrightarrow{AD}-\overrightarrow{AB}\cdot\overrightarrow{AC}\) \(=\frac{1}{2}-\frac{1}{2}=0\) | 不設提示，鼓勵先自行解釋 |

### 4-5 輪到你出題

| 層次 | 題目 | 答案 | 提示階梯 |
|------|------|------|----------|
| A層 基礎支持 | 把 2-3 的長度都改成 1（夾角仍是 60°），求 \(\vert \overrightarrow{MN}\vert \) | \(\frac{\sqrt{2}}{2}\) | 每個數量積變成 \(\frac{1}{2}\)。 |
| B層 核心達標 | 4-4 B 層若 \(\angle BAA_{1}=\angle DAA_{1}=90^\circ \)，\(\vert \overrightarrow{AC_1}\vert \) 是多少？ | \(\sqrt{6}\) | 交叉項全部是 0。 |
| C層 延伸挑戰 | 自編一題「判斷四點共面」的題目，並寫出理由 | 答案因題而異；檢查能否寫成另外兩個向量的組合 | 不設提示，鼓勵先自行解釋 |

### 巡視觀察表（也印在 handout.html 的教師版）

| 觀察重點（錯誤類型） | 人數 | 用於錯誤分析 |
|------|------|------|
| 忽略「不共線」的前提（概念） |  | ☐ |
| 係數和等於 1 用錯（概念） |  | ☐ |
| 比較係數時算錯（程序） |  | ☐ |
| 始點、終點顛倒（程序） |  | ☐ |
| 中點漏了 ½（粗心） |  | ☐ |
| 重心的係數寫錯（程序） |  | ☐ |
| 其他： |  | ☐ |

### 不同學生的支援

| 學生情況 | 本節做法 |
|------|------|
| 基礎薄弱 | 從 A 層與提示階梯開始，先確認先備知識地圖中的舊知識；成功後逐步減少提示，不長期只做低層次題。 |
| 動機不足 | 任務短而明確、可自選層次、先猜後驗，讓學生看到可達成的進步；不等同懶惰。 |
| 疲累或注意力不足 | 每段都有短回應（手勢、拖滑桿）；任務分段；個別關心，持續異常疲倦依校方程序跟進，不當成紀律問題。 |
| 能力較高 | 做 C 層的解釋、比較、推理與遷移；不固定安排為其他學生的助手。 |

## D. 典型錯誤分析

以下均為「預期錯誤」（未取自真實學生作答），教師可換成當堂收集、去識別化的例子。

### 4-1 抓錯偵探：誰減誰？

- 題目：四面體 \(OABC\) 中，\(M\) 是 \(BC\) 中點，用 \(\boldsymbol{a},\boldsymbol{b},\boldsymbol{c}\) 表示 \(\overrightarrow{AM}\)。
- 錯誤示例：\(\overrightarrow{OM}=\frac{1}{2}(\boldsymbol{b}+\boldsymbol{c})\) → \(\overrightarrow{AM}=\overrightarrow{OA}-\overrightarrow{OM}\) \(=\boldsymbol{a}-\frac{1}{2}\boldsymbol{b}-\frac{1}{2}\boldsymbol{c}\)（錯在第 2 步）
- 可能原因：程序錯誤：始點、終點顛倒，應是「終點減始點」。
- 診斷問題：這個解法哪一步開始出現問題？為甚麼這樣計算不正確？怎樣檢查答案是否合理？
- 教師引導方式：不公開學生身份；先讓學生指出步驟，再追問成因，最後由學生修正。
- 正確做法：\(\overrightarrow{AM}=\overrightarrow{OM}-\overrightarrow{OA}\) \(=-\boldsymbol{a}+\frac{1}{2}\boldsymbol{b}+\frac{1}{2}\boldsymbol{c}\)
- 修正後練習：4-4 B 層若 \(\angle BAA_{1}=\angle DAA_{1}=90^\circ \)，\(\vert \overrightarrow{AC_1}\vert \) 是多少？

### 4-2 再抓一次：交叉項的符號

- 題目：\(\boldsymbol{a},\boldsymbol{b},\boldsymbol{c}\) 長度都是 2，兩兩成 60°，求 \(\vert \boldsymbol{b}+\boldsymbol{c}-\boldsymbol{a}\vert \)。
- 錯誤示例：平方 \(=12+2(2)\) \(+2(2)+2(2)\) \(=24\) → 長度是 \(2\sqrt{6}\)（錯在第 1 步）
- 可能原因：程序錯誤：含 \(-\boldsymbol{a}\) 的兩個交叉項應是負數。
- 診斷問題：這個解法哪一步開始出現問題？為甚麼這樣計算不正確？怎樣檢查答案是否合理？
- 教師引導方式：不公開學生身份；先讓學生指出步驟，再追問成因，最後由學生修正。
- 正確做法：平方 \(=12+4-4-4=8\)，長度 \(2\sqrt{2}\)
- 修正後練習：4-4 B 層若 \(\angle BAA_{1}=\angle DAA_{1}=90^\circ \)，\(\vert \overrightarrow{AC_1}\vert \) 是多少？

## E. 出口題及評估

- 出口題：四面體 \(OABC\) 中 \(\overrightarrow{OA}=\boldsymbol{a}\)，\(\overrightarrow{OB}=\boldsymbol{b}\)，\(\overrightarrow{OC}=\boldsymbol{c}\)，\(P\) 在 \(BC\) 上，\(BP=2PC\)。(1) 表示 \(\overrightarrow{OP}\) 和 \(\overrightarrow{AP}\)；(2) \(\boldsymbol{a},\boldsymbol{b},\overrightarrow{AP}\) 共面嗎？
- 參考答案：(1) \(\overrightarrow{OP}=\frac{1}{3}\boldsymbol{b}+\frac{2}{3}\boldsymbol{c}\)，\(\overrightarrow{AP}=-\boldsymbol{a}+\frac{1}{3}\boldsymbol{b}+\frac{2}{3}\boldsymbol{c}\)；(2) 不共面：\(\boldsymbol{c}\) 的係數不是 0
- 時間：2～3 分鐘，獨立完成。

| 結果 | 判準及下一節安排 |
|------|------|
| 已掌握 | 全對，並能說出不共面的理由 → 進入 1.1.3 坐標，可做第二關 C 層 |
| 部分掌握 | 表示正確但共面理由不清，或 AP 漏了 −a → 下一節課首做一題「判斷四點共面」 |
| 尚未掌握 | 未能用分點表示 OP → 小組在四面體模型上走路線，重做第二關 A 層同型題 |

## F. 課後反思（上課後由教師依真實證據填寫）

- 本節課最有效的設計：
- 學生最常見的困難：
- 需要個別跟進的學生：
- 下一節課的調整：

## G. 螺旋設計與學習追蹤

**本課型路徑**：能力提升螺旋：基礎辨識 → 獨立應用 → 變式比較 → 綜合解難

| 時間 | 階段 | 螺旋位置 |
|------|------|------|
| 0–6 分鐘 | 診斷起步題 | 基礎辨識 |
| 6–11 分鐘 | 方法回顧與關鍵步驟 | 基礎辨識（方法與檢查） |
| 11–25 分鐘 | 分層練習兩輪＋巡視 | 獨立應用 → 變式比較 |
| 25–35 分鐘 | 錯誤門診＋綜合解難 | 綜合解難 |
| 35–40 分鐘 | 出口題＋自我評估 | 學習證據 |

### 1. 先備知識地圖

| 舊知識 | 本課怎樣用 | 怎樣確認（哪一頁或哪一題） | 不足時的補救 |
|------|------|------|------|
| 共面向量定理 | 判斷三個向量、四點是否共面 | 1-2 診斷一 | 畫三支箭說明「能用兩個表示第三個」 |
| 基底的條件 | 選基底 | 1-3 診斷二 | 舉零向量、共面三向量的反例 |
| 表示法唯一 | 比較係數求未知數 | 1-4 診斷三 | 回到 3-4 再做一次 |

### 2. 螺旋深化路徑

- 學生已經理解：已學過共面向量定理和基本定理的內容。
- 本次新增的理解：把定理變成操作：判斷共面看「能否寫成組合」，計算長度、垂直先用基底表示再展開。
- 之後會延伸到：1.1.3 取單位正交基底，展開後的交叉項全部消失，得到坐標公式。

### 3. 分層學習任務

| 學生 | 任務層 | 支持方式 | 完成後 |
|------|------|------|------|
| 基礎薄弱 | A 層 | 提示階梯、附圖與第一步線索 | 嘗試 B 層 |
| 一般 | B 層 | 必要時看提示 | 嘗試 C 層 |
| 能力較高 | C 層 | 少提示，要求解釋或比較 | 自編變式題 |

分層指任務與支持不同，不是固定學生標籤；學生可依表現隨時換層。

### 4. 間隔重現計劃

| 概念 | 何時再出現 | 形式（改變題目或情境） |
|------|------|------|
| 用基底表示向量 | 下一節（1.1.3） | 改成寫坐標 |
| 分點與共面 | 約一週後 | 延遲檢測：換分點比例 |
| 用基底證垂直 | 約一個月後（1.2.1） | 改用方向向量 |

### 5. 學習證據追蹤

- 出口題（當堂）：見 E 節。
- 延遲檢測（約一週後，不提前通知、不先複習、不計分）：四面體 \(OABC\) 中 \(\overrightarrow{OA}=\boldsymbol{a}\)，\(\overrightarrow{OB}=\boldsymbol{b}\)，\(\overrightarrow{OC}=\boldsymbol{c}\)，\(Q\) 在 \(AB\) 上，\(AQ=3QB\)。表示 \(\overrightarrow{OQ}\) 和 \(\overrightarrow{CQ}\)，並判斷 \(\boldsymbol{a},\boldsymbol{b},\overrightarrow{CQ}\) 是否共面。　答案：\(\overrightarrow{OQ}=\frac{1}{4}\boldsymbol{a}+\frac{3}{4}\boldsymbol{b}\)；\(\overrightarrow{CQ}=\frac{1}{4}\boldsymbol{a}+\frac{3}{4}\boldsymbol{b}-\boldsymbol{c}\)；不共面

| 出口題 | 延遲檢測 | 判斷 | 跟進 |
|------|------|------|------|
| 已掌握 | 已掌握 | 真正掌握 | 進入更高層次任務 |
| 已掌握 | 未掌握 | 短暫學會 | 增加間隔重現，改變情境再練 |
| 未掌握 | 已掌握 | 延後學會 | 了解後續哪些安排有效 |
| 未掌握 | 未掌握 | 尚未掌握 | 找出成因，小組或個別重建概念 |

## 教案品質檢查

- [x] 是否具有明確、可觀察的學習目標？
- [x] 各教學階段的總時間是否為40分鐘？
- [x] 是否讓不同程度學生都有明確任務？
- [x] 是否設計至少兩個理解檢查點？
- [x] 是否安排學生獨立思考及解題？
- [x] 是否預測典型數學錯誤？
- [x] 是否提供分層支持？
- [x] 是否包含有效的出口題？
- [x] 是否說明如何利用學習證據調整教學？
- [x] 是否考慮教師實際工作量及課堂可行性？
- [x] 簡報是否至少 25 頁（含階段頁），最後一頁是否為本節核心知識小結？
- [x] 是否標明各階段在螺旋路徑的位置？
- [x] 是否有先備知識地圖？
- [x] 是否說明本次比過去增加了哪些新理解？
- [x] 是否規劃間隔重現？
- [x] 是否設計延遲檢測，能分辨短暫學會與真正掌握？
