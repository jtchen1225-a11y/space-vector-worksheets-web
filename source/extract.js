#!/usr/bin/env node
/* extract.js — 載入一節的 Lnn.js，執行 @assert 驗算，輸出 meta＋各階段投影片資料（JSON）給 build.py／plan.py。 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const lid = process.argv[2];
const here = __dirname;
const src = fs.readFileSync(path.join(here, 'lessons', lid + '.js'), 'utf8');
const parts = src.split(/^\/\/@(\w+)(?: (\d+))?\s*$/m);
const blk = { chs: {} };
for (let i = 1; i < parts.length; i += 3) {
  if (parts[i] === 'ch') blk.chs[+parts[i + 1]] = parts[i + 2].trim();
  else blk[parts[i]] = parts[i + 2].trim();
}
const stubEl = () => new Proxy({}, { get: () => () => stubEl(), set: () => true });
const fitPath = path.join(here, 'fit.json');
const sb = { window: { FIT: (fs.existsSync(fitPath) ? JSON.parse(fs.readFileSync(fitPath, 'utf8')) : {})[lid] || {} }, console, Math, JSON, LS: {}, SV: new Proxy({}, { get: () => () => '' }), MJ: () => {} };
sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(here, 'runtime.js'), 'utf8'), sb);

// 驗算：@assert 區塊中用 eq(值, 預期) 與 ok(條件)；任何不符都令建置失敗
if (!blk.assert) { console.error(`${lid}：缺少 @assert 驗算區塊`); process.exit(1); }
const fails = [];
let count = 0;
const G = sb.window.G3;
const eq = (a, b, note) => {
  count++;
  const A = Array.isArray(a) ? a : [a], B = Array.isArray(b) ? b : [b];
  const same = A.length === B.length && A.every((v, i) => Math.abs(v - B[i]) < 1e-9);
  if (!same) fails.push(`${note || ''} 計算得 ${JSON.stringify(a)}，內容寫 ${JSON.stringify(b)}`);
};
const ok = (c, note) => { count++; if (!c) fails.push(`條件不成立：${note || ''}`); };
const cosv = (a, b) => G.dot(a, b) / G.len(a) / G.len(b);
const angd = (a, b) => Math.acos(Math.max(-1, Math.min(1, cosv(a, b)))) * 180 / Math.PI;
const dis = (a, b) => G.len(G.sbt(a, b));
new Function('eq', 'ok', 'G', 'add', 'sub', 'mul', 'dot', 'len', 'cross', 'mid', 'cosv', 'angd', 'dis', 'sqrt', blk.assert)(
  eq, ok, G, G.add, G.sbt, G.mul, G.dot, G.len, G.crs, G.mid, cosv, angd, dis, Math.sqrt);
if (fails.length) { console.error(`${lid} 數學驗算失敗：\n` + fails.join('\n')); process.exit(1); }

const meta = vm.runInContext('(' + blk.meta + ')', sb);
const shared = blk.shared || '';
const pre = 'const C="#2563eb";const {RED,GRN,BLU,VIO,AMB,INK,GRY,vv,bb,T}=window.G3;const G3=window.G3,S=window.S;\n' + shared + '\n';
meta.phases = Object.keys(blk.chs).sort((a, b) => a - b).map(n => {
  const slides = vm.runInContext(`(function(){${pre}return [${blk.chs[n].replace(/,\s*$/, '')}].flatMap(S.expand);})()`, sb);
  return { slides: slides.map(s => ({ sec: s.sec, secName: s.secName, title: s.title, points: s.points, _k: s._k, _d: s._d, _base: s._base })) };
});
meta.assertCount = count;
process.stdout.write(JSON.stringify(meta));
