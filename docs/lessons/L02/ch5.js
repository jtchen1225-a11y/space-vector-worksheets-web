/* ============ 第 5 階段　35–40 分鐘　最後一關＋幫自己打分（教案：出口題＋自我評估；螺旋：學習證據） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#e11d48";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Pa = G3.para(), miniPa = G3.mini(Pa);
const Te = G3.solid({O:[.75,.9,1.7],A:[1.4,0,0],B:[.9,2,0],C:[-.4,.8,0]},[['A','B','C'],['A','B','O'],['B','C','O'],['C','A','O']]), miniTe = G3.mini(Te);
  window.DECK.push(S.phase(5, "35–40 分鐘", "最後一關＋幫自己打分", C, [
S.exit('5-1','出口挑戰','最後一關：出口挑戰',null,{
 q:T`四面體 $OABC$ 中 $\v{OA}=\b{a}$，$\v{OB}=\b{b}$，$\v{OC}=\b{c}$，$P$ 在 $BC$ 上，$BP=2PC$。(1) 表示 $\v{OP}$ 和 $\v{AP}$；(2) $\b{a},\b{b},\v{AP}$ 共面嗎？`,
 ans:T`(1) $\v{OP}=\f{1}{3}\b{b}+\f{2}{3}\b{c}$，$\v{AP}=-\b{a}+\f{1}{3}\b{b}+\f{2}{3}\b{c}$；(2) 不共面：$\b{c}$ 的係數不是 0`,
 rubric:{mastered:'全對，並能說出不共面的理由 → 進入 1.1.3 坐標，可做第二關 C 層',partial:'表示正確但共面理由不清，或 AP 漏了 −a → 下一節課首做一題「判斷四點共面」',notyet:'未能用分點表示 OP → 小組在四面體模型上走路線，重做第二關 A 層同型題'},
 delayed:{when:'約一週後',q:T`四面體 $OABC$ 中 $\v{OA}=\b{a}$，$\v{OB}=\b{b}$，$\v{OC}=\b{c}$，$Q$ 在 $AB$ 上，$AQ=3QB$。表示 $\v{OQ}$ 和 $\v{CQ}$，並判斷 $\b{a},\b{b},\v{CQ}$ 是否共面。`,ans:T`$\v{OQ}=\f{1}{4}\b{a}+\f{3}{4}\b{b}$；$\v{CQ}=\f{1}{4}\b{a}+\f{3}{4}\b{b}-\b{c}$；不共面`}
}),
S.tally('5-2','我的程度','幫自己打分','我能判斷共面，並用基底表示向量和求長度'),
S.summary('5-3',null,[T`共面：$\b{c}=x\b{a}+y\b{b}$（$\b{a},\b{b}$ 不共線）`,T`$P$ 在平面 $ABC$ 內：係數和 $x+y+z=1$`,'基底：三個不共面的向量，表示法唯一','用基底求長度：表示 → 平方展開 → 開方'])
  ]));
})();
