const fn = require('funclib');
const path = require('path');

const root = path.dirname(__dirname);

const rxjsPath = path.join(root, 'bundle.js');
const indexPath = path.join(root, 'index.js');
const indexDPath = path.join(root, 'index.d.ts');

const rxjsSrcPath = path.join(root, 'node_modules/rxjs/bundles/rxjs.umd.js');
const rxjsSrcMinPath = path.join(root, 'node_modules/rxjs/bundles/rxjs.umd.min.js');
const rxjsDtsPath = path.join(root, 'node_modules/rxjs/index.d.ts');
const rxjsOpsDtsPath = path.join(root, 'node_modules/rxjs/operators/index.d.ts');

fn.cp(rxjsSrcPath, rxjsPath);
fn.cp(rxjsSrcMinPath, indexPath);

const operatorsTpl = fn.rd(rxjsOpsDtsPath);
const operators = operatorsTpl.match(/\{\s?\w*\s?\}/mg).map(op => op.replace(/[\{\s\}]/mg, ''));

fn.wt(indexDPath, `${fn.rd(rxjsDtsPath).replace(/\.\//mg, 'rxjs/')}
${operatorsTpl.replace(/export\s{/mg, 'import {').replace(/\.\.\//mg, 'rxjs/')}
export declare const operators: {
  ${operators.map(op => `${op}: typeof ${op};`).join('\r\n  ')}
}`);

fn.timeout(800, () => {
  fn.log(`Build Success:
rxjs.js : ${fn.size(rxjsPath)}KB
index.js: ${fn.size(indexPath)}KB`, 'rxjs-mp');
});