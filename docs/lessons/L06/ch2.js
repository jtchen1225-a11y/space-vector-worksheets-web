/* ============ 第 2 階段　6–11 分鐘　解題秘笈大公開（教案：方法回顧與關鍵步驟；螺旋：基礎辨識（方法與檢查）） ============ */
window.DECK = window.DECK || [];
(function () {
  const C = "#7c3aed";
  const {RED, GRN, BLU, VIO, AMB, INK, GRY, vv, bb, T} = window.G3; const G3 = window.G3, S = window.S;
const Cu = G3.cube(2), miniCu = G3.mini(Cu);
const Py = G3.solid({A:[0,0,0],B:[2,0,0],C:[2,2,0],D:[0,2,0],P:[0,0,2]},[['A','B','C','D'],['P','A','B'],['P','B','C'],['P','C','D'],['P','D','A']]);
const miniPy = G3.mini(Py,null,{az:-55,el:20});
  window.DECK.push(S.phase(2, "6–11 分鐘", "解題秘笈大公開", C, [
S.stepper('2-1','解題秘笈','解題秘笈一：用射影求線面角',['棱長 2 的正方體。',T`求 $A_{1}C$ 與底面所成角的正弦。`],(h)=>{const F=G3.frame(Cu,{W:440,H:200,m:34,fs:38});G3.steps(h,440,200,[
 {t:T`$A_{1}A\perp$ 底面，$A_{1}C$ 的射影是 $AC$`,d:k=>F.base()+F.seg('A1','C',RED,4)+F.seg('A','C',AMB,4,'7 6')},
 {t:T`線面角 $\theta=\angle A_{1}CA$`,d:k=>F.arc('C','A','A1',RED,'',.5,k)},
 {t:T`$AA_{1}=2$，$A_{1}C=2\r{3}$，$\sin\theta=\f{\r{3}}{3}$`,d:k=>F.seg('A','A1',BLU,4)}
])}),
S.check('2-2','自我檢查','自我檢查：為甚麼用正弦？',['向量法的公式用正弦。'],'用法向量求線面角，為甚麼用正弦？',[
 ['兩個角互餘','法向量垂直平面，v 與 n 的夾角和線面角互餘',1],
 ['正弦比較容易算','概念錯誤：與計算難易無關'],
 ['線面角一定大於 45°','概念錯誤：線面角可以是任何銳角']
]),
S.stepper('2-3','秘笈二：法向量','解題秘笈二：用法向量求線面角',[T`$PA\perp$ 底面，$PA=AB=2$，$A$ 為原點。`,T`求 $PA$ 與平面 $PBD$ 所成角的正弦。`],(h)=>{const F=G3.frame(Py,{W:440,H:200,m:34,fs:38,az:-55,el:20});G3.steps(h,440,200,[
 {t:T`平面 $PBD$ 的法向量 $\b{n}=(1,1,1)$`,d:k=>F.base()+F.fill(['P','B','D'])},
 {t:T`$\v{AP}=(0,0,2)$，$\v{AP}\cdot\b{n}=2$`,d:k=>F.vec('A','P',RED,'',k)},
 {t:T`$\sin\theta=\f{2}{2\times\r{3}}=\f{\r{3}}{3}$`,d:k=>''}
])}),
S.goals('2-4','代入檢驗','檢查三問：答案合理嗎？',['做完每題都問一次。'],{head:'檢查清單',items:['幾何法：垂足和射影找對了嗎？','向量法：用正弦了嗎？取絕對值了嗎？','分母：兩個長度都乘了嗎？']})
  ]));
})();
