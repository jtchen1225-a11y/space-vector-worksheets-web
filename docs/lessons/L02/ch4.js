/* ============ 第 4 階段　25–35 分鐘　抓錯偵探＋綜合解難（教案：錯誤門診＋綜合解難；螺旋：綜合解難） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#d97706";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Pa = G3.para(), miniPa = G3.mini(Pa);
const Te = G3.solid({O:[.75,.9,1.7],A:[1.4,0,0],B:[.9,2,0],C:[-.4,.8,0]},[['A','B','C'],['A','B','O'],['B','C','O'],['C','A','O']]), miniTe = G3.mini(Te);
  window.DECK.push(S.phase(4, "25–35 分鐘", "抓錯偵探＋綜合解難", C, [
S.mistake('4-1','抓錯偵探','抓錯偵探：誰減誰？',null,{q:T`四面體 $OABC$ 中，$M$ 是 $BC$ 中點，用 $\b{a},\b{b},\b{c}$ 表示 $\v{AM}$。`,steps:[T`$\v{OM}=\f{1}{2}(\b{b}+\b{c})$`,T`$\v{AM}=\v{OA}-\v{OM}$ $=\b{a}-\f{1}{2}\b{b}-\f{1}{2}\b{c}$`],wrong:1,why:'程序錯誤：始點、終點顛倒，應是「終點減始點」。',fix:T`$\v{AM}=\v{OM}-\v{OA}$ $=-\b{a}+\f{1}{2}\b{b}+\f{1}{2}\b{c}$`}),
S.mistake('4-2','再抓一次','再抓一次：交叉項的符號',null,{q:T`$\b{a},\b{b},\b{c}$ 長度都是 2，兩兩成 60°，求 $|\b{b}+\b{c}-\b{a}|$。`,steps:[T`平方 $=12+2(2)$ $+2(2)+2(2)$ $=24$`,T`長度是 $2\r{6}$`],wrong:0,why:T`程序錯誤：含 $-\b{a}$ 的兩個交叉項應是負數。`,fix:T`平方 $=12+4-4-4=8$，長度 $2\r{2}$`}),
S.tasks('4-3','共面：再闖一題','共面：再闖一題',null,[
 [T`平行六面體中，$\v{AB},\v{AD},\v{AC1}$ 共面嗎？`,[T`$\v{AC1}=\v{AB}+\v{AD}+\v{AA1}$，而 $\v{AA1}$ 不在底面內。`],'不共面'],
 [T`四面體 $ABCD$ 中，$E,F,G,H$ 是 $AB,BC,CD,DA$ 的中點。證明四點共面`,[T`$\v{EH}$ 與 $\v{FG}$ 都等於 $\f{1}{2}\v{BD}$。`],T`$\v{EG}=\v{EF}+\v{FG}=\v{EF}+\v{EH}$，所以共面`],
 [T`$\v{OP}=x\v{OA}+y\v{OB}+z\v{OC}$ 且 $x+y+z=1$。證明 $P$ 在平面 $ABC$ 內`,null,T`代入 $x=1-y-z$，得 $\v{AP}=y\v{AB}+z\v{AC}$`]
],{fig:miniPa}),
S.tasks('4-4','基底：再闖一題','基底：再闖一題',null,[
 [T`$\{\b{a},\b{b},\b{c}\}$ 是基底，$x\b{a}+(y-1)\b{b}+z\b{c}=3\b{b}$，求 $x,y,z$`,['兩邊對應係數相等。'],T`$x=0,y=4,z=0$`],
 [T`平行六面體中 $AB=AD=1$，$AA_{1}=2$，$\angle BAD=90°$，$\angle BAA_{1}=\angle DAA_{1}=60°$。求 $|\v{AC1}|$`,[T`$\v{AC1}=\b{a}+\b{b}+\b{c}$，先平方。`,T`$\b{a}\cdot\b{b}=0$，$\b{a}\cdot\b{c}=\b{b}\cdot\b{c}=1$。`],T`$\r{10}$`],
 [T`正四面體 $ABCD$ 棱長 1，以 $\{\v{AB},\v{AC},\v{AD}\}$ 為基底，證明 $AB\perp CD$`,null,T`$\v{AB}\cdot\v{CD}$ $=\v{AB}\cdot\v{AD}-\v{AB}\cdot\v{AC}$ $=\f{1}{2}-\f{1}{2}=0$`]
]),
S.tasks('4-5','輪到你出題','輪到你出題：改一個條件',['改一個條件，再做一次。'],[
 [T`把 2-3 的長度都改成 1（夾角仍是 60°），求 $|\v{MN}|$`,[T`每個數量積變成 $\f{1}{2}$。`],T`$\f{\r{2}}{2}$`],
 [T`4-4 B 層若 $\angle BAA_{1}=\angle DAA_{1}=90°$，$|\v{AC1}|$ 是多少？`,['交叉項全部是 0。'],T`$\r{6}$`],
 ['自編一題「判斷四點共面」的題目，並寫出理由',null,'答案因題而異；檢查能否寫成另外兩個向量的組合']
])
  ]));
})();
