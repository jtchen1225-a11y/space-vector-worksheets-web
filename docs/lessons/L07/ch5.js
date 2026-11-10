/* ============ 第 5 階段　35–40 分鐘　最後一關＋幫自己打分（教案：出口題＋自我評估；螺旋：學習證據） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#e11d48";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Bx = G3.box(2,2,1), miniBx = G3.mini(Bx);
const Cu = G3.cube(2), miniCu = G3.mini(Cu);
const Py = G3.solid({A:[0,0,0],B:[2,0,0],C:[2,2,0],D:[0,2,0],P:[0,0,2]},[['A','B','C','D'],['P','A','B'],['P','B','C'],['P','C','D'],['P','D','A']]);
const miniPy = G3.mini(Py,null,{az:-55,el:20});
  window.DECK.push(S.phase(5, "35–40 分鐘", "最後一關＋幫自己打分", C, [
S.exit('5-1','出口挑戰','最後一關：出口挑戰',null,{
 q:T`長方體 $DA=DC=2$，$DD_{1}=1$（$D$ 為原點）。(1) 求平面 $AB_{1}C$ 的一個法向量；(2) 求平面 $AB_{1}C$ 與平面 $ABCD$ 所成角的餘弦。`,
 ans:T`(1) $(1,1,-2)$；(2) $\f{\r{6}}{3}$`,
 rubric:{mastered:'法向量正確，餘弦取正值並化簡 → 進入 1.2.5 距離，可做第二關 C 層',partial:'法向量正確，但餘弦取負值或化簡錯 → 下一節課首做一題「兩平面所成角取絕對值」',notyet:'寫不出法向量 → 小組重做 1.2.2 法向量，再做第一關 A 層'},
 delayed:{when:'約一週後',q:T`棱長 2 的正方體（$D$ 為原點），求平面 $ACD_{1}$ 與平面 $ABCD$ 所成角的餘弦。`,ans:T`$\f{\r{3}}{3}$`}
},{fig:miniBx}),
S.tally('5-2','我的程度','幫自己打分','我能作平面角，並用法向量求兩平面所成的角'),
S.summary('5-3',null,['平面角：頂點在棱上，兩條射線分別在兩個面內並垂直棱','二面角 0° 至 180°；兩平面所成的角 0° 至 90°',T`所成的角：$\cos\theta=|\cos〈\b{n}_{1},\b{n}_{2}〉|$`,'求二面角：算完再看圖，取相等或互補的一個'])
  ]));
})();
