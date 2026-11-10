/* ============ 第 5 階段　35–40 分鐘　最後一關＋幫自己打分（教案：出口題＋自我評估；螺旋：學習證據） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#e11d48";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Pa = G3.para(), miniPa = G3.mini(Pa);
const Cu = G3.cube(2), miniCu = G3.mini(Cu);
const Te = G3.solid({O:[.75,.9,1.7],A:[1.4,0,0],B:[.9,2,0],C:[-.4,.8,0]},[['A','B','C'],['A','B','O'],['B','C','O'],['C','A','O']]), miniTe = G3.mini(Te);
  window.DECK.push(S.phase(5, "35–40 分鐘", "最後一關＋幫自己打分", C, [
S.exit('5-1','出口挑戰','最後一關：出口挑戰',null,{
 q:T`長方體中 $AB=2$，$AD=1$，$AA_{1}=2$，$E$ 是 $CC_{1}$ 中點。(1) 用 $\v{AB},\v{AD},\v{AA1}$ 表示 $\v{AE}$；(2) 求 $\v{AE}\cdot\v{AB}$ 和 $|\v{AE}|$。`,
 ans:T`(1) $\v{AB}+\v{AD}+\f{1}{2}\v{AA1}$；(2) 4，$\r{6}$`,
 rubric:{mastered:'三小題全對，過程看得出中點與模的關係 → 直接進入 1.1.2，可做第二關 C 層',partial:'(1) 對，(2) 或 (3) 有錯（常見：忘開方、漏中間項）→ 下一節課首做一題「長度先平方」',notyet:'(1) 未能用三條棱表示向量 → 小組用實物長方體重做首尾相接，再做第一關 A 層同型題'},
 delayed:{when:'約一週後',q:T`長方體中 $AB=1$，$AD=2$，$AA_{1}=2$，$F$ 是 $BB_{1}$ 中點。求 $|\v{DF}|$ 和 $\v{DF}\cdot\v{AA1}$。`,ans:T`$\r{6}$；2`}
}),
S.tally('5-2','我的程度','幫自己打分','我能在立體圖中表示向量，並用數量積求長度'),
S.summary('5-3',null,['差向量：同始點相減，指向被減數的終點','夾角：先平移到同一始點，留意鈍角',T`數量積：$\b{a}\cdot\b{b}=|\b{a}||\b{b}|\cos〈\b{a},\b{b}〉$`,'求長度：先平方、展開，最後開方'])
  ]));
})();
