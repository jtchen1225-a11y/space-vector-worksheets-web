/* ============ 第 2 階段　6–11 分鐘　解題秘笈大公開（教案：方法回顧與關鍵步驟；螺旋：基礎辨識（方法與檢查）） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#7c3aed";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Pa = G3.para(), miniPa = G3.mini(Pa);
const Te = G3.solid({O:[.75,.9,1.7],A:[1.4,0,0],B:[.9,2,0],C:[-.4,.8,0]},[['A','B','C'],['A','B','O'],['B','C','O'],['C','A','O']]), miniTe = G3.mini(Te);
  window.DECK.push(S.phase(2, "6–11 分鐘", "解題秘笈大公開", C, [
S.stepper('2-1','解題秘笈','解題秘笈一：點在不在平面內？',[T`$3\v{OP}$ $=\v{OA}+\v{OB}+\v{OC}$。`,T`$P$ 在平面 $ABC$ 內嗎？`],(h)=>{const F=G3.frame(Te,{W:440,H:200,m:34,fs:38});const V=Te.V,P=G3.mul(G3.add(G3.add(V.A,V.B),V.C),1/3);G3.steps(h,440,200,[
 {t:T`由 $A$ 出發：$\v{AP}=\v{OP}-\v{OA}$`,d:k=>F.base()+F.dot(P,RED)+F.vec('A',P,RED,'',k)},
 {t:T`$\v{AP}=\f{1}{3}\v{AB}+\f{1}{3}\v{AC}$`,d:k=>F.vec('A','B',BLU,'',k)+F.vec('A','C',GRN,'',k)},
 {t:T`三個向量共面，$P$ 在平面 $ABC$ 內`,d:k=>F.fill(['A','B','C'])}
])}),
S.check('2-2','自我檢查','自我檢查：係數和',[T`$O$ 不在平面 $ABC$ 內。`],T`$\v{OP}=x\v{OA}$ $+y\v{OB}+z\v{OC}$，$P$ 在平面 $ABC$ 內的條件是？`,[
 [T`$x+y+z=1$`,T`移項得 $\v{AP}=y\v{AB}+z\v{AC}$`,1],
 [T`$x+y+z=0$`,'概念錯誤：係數和要等於 1'],
 [T`$x=y=z$`,'概念錯誤：這只是其中一個可能']
]),
S.stepper('2-3','秘笈二：求長度','解題秘笈二：用基底求長度',[T`$\b{a},\b{b},\b{c}$ 長度都是 2，兩兩成 60°。`,T`$M,N$ 是 $OA,BC$ 中點，求 $|\v{MN}|$。`],(h)=>{const F=G3.frame(Te,{W:440,H:200,m:34,fs:38});const V=Te.V,M=G3.mid(V.O,V.A),N=G3.mid(V.B,V.C);G3.steps(h,440,200,[
 {t:T`$\v{MN}=\v{ON}-\v{OM}$ $=\f{1}{2}(\b{b}+\b{c}-\b{a})$`,d:k=>F.base()+F.dot(M,RED)+F.dot(N,RED)+F.vec(M,N,RED,'',k)},
 {t:T`每兩個向量的數量積 $=2\times2\times\cos60°=2$`,d:k=>F.vec('O','A',BLU,'',k)+F.vec('O','B',GRN,'',k)+F.vec('O','C',AMB,'',k)},
 {t:T`$|\v{MN}|^{2}$ $=\f{1}{4}(12+4-4-4)$ $=2$`,d:k=>''},
 {t:T`開方：$|\v{MN}|=\r{2}$`,d:k=>''}
])}),
S.goals('2-4','代入檢驗','檢查三問：答案合理嗎？',['做完每題都問一次。'],{head:'檢查清單',items:['路線：每一段都是「終點減始點」嗎？','展開：交叉項有 2 倍嗎？符號對嗎？','長度：有沒有開方？']})
  ]));
})();
