/* ============ 第 2 階段　6–11 分鐘　解題秘笈大公開（教案：方法回顧與關鍵步驟；螺旋：基礎辨識（方法與檢查）） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#7c3aed";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Bx = G3.box(2,2,1), miniBx = G3.mini(Bx);
const Cu = G3.cube(2), miniCu = G3.mini(Cu);
const Py = G3.solid({A:[0,0,0],B:[2,0,0],C:[2,2,0],D:[0,2,0],P:[0,0,2]},[['A','B','C','D'],['P','A','B'],['P','B','C'],['P','C','D'],['P','D','A']]);
const miniPy = G3.mini(Py,null,{az:-55,el:20});
  window.DECK.push(S.phase(2, "6–11 分鐘", "解題秘笈大公開", C, [
S.stepper('2-1','解題秘笈','解題秘笈一：作二面角的平面角',[T`長方體：$DA=DC=2$，$DD_{1}=1$。`,T`求二面角 $C_{1}$-$BD$-$C$ 的正切。`],(h)=>{const F=G3.frame(Bx,{W:440,H:200,m:34,fs:38});const V=Bx.V,O=G3.mid(V.B,V.D);G3.steps(h,440,200,[
 {t:T`$O$ 是 $BD$ 中點：$CO\perp BD$`,d:k=>F.base()+F.seg('B','D',BLU,4)+F.seg('C',O,GRN,4)+F.dot(O,RED)},
 {t:T`三垂線定理：$C_{1}O\perp BD$，平面角是 $\angle C_{1}OC$`,d:k=>F.seg('C1',O,RED,4)},
 {t:T`$CO=\r{2}$，$CC_{1}=1$，正切是 $\f{\r{2}}{2}$`,d:k=>''}
])}),
S.check('2-2','自我檢查','自我檢查：平面角',['頂點在棱上。'],'二面角的平面角，兩條射線要滿足甚麼？',[
 ['都垂直棱','並且分別在兩個半平面內',1],
 ['只要一條垂直棱','概念錯誤：兩條都要垂直棱'],
 ['互相垂直','概念錯誤：那是直二面角']
]),
S.stepper('2-3','秘笈二：法向量','解題秘笈二：用法向量再求一次',[T`同一個長方體，$D$ 為原點。`,T`求平面 $C_{1}BD$ 與底面所成角的餘弦。`],(h)=>{const F=G3.frame(Bx,{W:440,H:200,m:34,fs:38});G3.steps(h,440,200,[
 {t:T`底面：$\b{n}_{1}=(0,0,1)$`,d:k=>F.base()+F.fill(['D','B','C1'])},
 {t:T`$\v{DB}=(2,2,0)$，$\v{DC1}=(0,2,1)$，得 $\b{n}_{2}=(-1,1,-2)$`,d:k=>F.vec('D','B',BLU,'',k)+F.vec('D','C1',GRN,'',k)},
 {t:T`$\cos\theta=\f{2}{\r{6}}=\f{\r{6}}{3}$，與上一頁的正切一致`,d:k=>''}
])}),
S.goals('2-4','代入檢驗','檢查三問：答案合理嗎？',['做完每題都問一次。'],{head:'檢查清單',items:['平面角：兩條射線都垂直棱嗎？','所成的角：餘弦取絕對值了嗎？','二面角：看圖判斷銳角還是鈍角了嗎？']})
  ]));
})();
