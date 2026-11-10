/* ============ 第 2 階段　6–11 分鐘　解題秘笈大公開（教案：方法回顧與關鍵步驟；螺旋：基礎辨識（方法與檢查）） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#7c3aed";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Pa = G3.para(), miniPa = G3.mini(Pa);
const Cu = G3.cube(2), miniCu = G3.mini(Cu);
const Te = G3.solid({O:[.75,.9,1.7],A:[1.4,0,0],B:[.9,2,0],C:[-.4,.8,0]},[['A','B','C'],['A','B','O'],['B','C','O'],['C','A','O']]), miniTe = G3.mini(Te);
  window.DECK.push(S.phase(2, "6–11 分鐘", "解題秘笈大公開", C, [
S.stepper('2-1','解題秘笈','解題秘笈一：在立體圖中表示向量',[T`$\v{AB}=\b{a}$，$\v{AD}=\b{b}$，$\v{AA1}=\b{c}$。`,T`$M$ 是上底的中心，求 $\v{BM}$。`],(h)=>{const F=G3.frame(Pa,{W:440,H:200,m:34,fs:38});const V=Pa.V,M=G3.mid(V.A1,V.C1);G3.steps(h,440,200,[
 {t:T`沿棱走：$\v{BM}=\v{BB1}+\v{B1M}$`,d:k=>F.base()+F.dot(M,RED)+F.vec('B','B1',VIO,'',k)+F.vec('B1',M,VIO,'',k)},
 {t:T`$\v{B1M}=\f{1}{2}\v{B1D1}=\f{1}{2}(\b{b}-\b{a})$`,d:k=>F.seg('B1','D1',AMB,3,'7 6')},
 {t:T`$\v{BM}=-\f{1}{2}\b{a}+\f{1}{2}\b{b}+\b{c}$`,d:k=>F.vec('B',M,RED,'',k)}
])}),
S.check('2-2','自我檢查','自我檢查：方向對了嗎？',['終點減始點。'],T`同一個圖中，$\v{B1D1}=$？`,[
 [T`$\b{b}-\b{a}$`,T`$\v{A1D1}-\v{A1B1}$：終點減始點`,1],
 [T`$\b{a}-\b{b}$`,'程序錯誤：方向反了'],
 [T`$\b{a}+\b{b}$`,T`概念錯誤：這是 $\v{A1C1}$`]
],{fig:miniPa}),
S.stepper('2-3','秘笈二：求長度','解題秘笈二：長度先平方',[T`$|\b{a}|=2$，$|\b{b}|=3$，夾角 120°。`,T`求 $|\b{a}+2\b{b}|$。`],(h)=>{G3.steps(h,440,210,[
 {t:T`$\b{a}\cdot\b{b}=2\times3\times\cos120°=-3$`,d:k=>G3.txt(220,50,'① 先求數量積',{c:BLU,fs:38})},
 {t:T`$|\b{a}+2\b{b}|^{2}$ $=4+4(-3)+36$ $=28$`,d:k=>G3.txt(220,110,'② 長度先平方',{c:GRN,fs:38})},
 {t:T`$|\b{a}+2\b{b}|=2\r{7}$`,d:k=>G3.txt(220,170,'③ 別忘了開方',{c:RED,fs:38})}
])}),
S.goals('2-4','代入檢驗','檢查三問：答案合理嗎？',['做完每題都問一次。'],{head:'檢查清單',items:['方向：差向量指向被減數的終點嗎？','夾角：兩個向量移到同一始點了嗎？','長度：展開有中間項嗎？有沒有開方？']})
  ]));
})();
