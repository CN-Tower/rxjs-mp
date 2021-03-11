const fn = require('funclib');
const path = require('path');

const root = path.dirname(__dirname);
const indexPath = path.join(root, 'index.js');
const idxDPath = path.join(root, 'index.d.ts');
const umdPath = path.join(root, 'src/umd.min.js');
const rxjsDPath = path.join(root, 'node_modules/rxjs/index.d.ts');

const umdExp = fn.rd(umdPath).replace(/;$/, '');
const rxjs4wx = fn.rd(indexPath)
  .replace(/\(\(\)=>\{/, '(cb=>{')
  .replace(/([\d\w])\(([\d\w]*)\)\}\)\(\);/, `cb($1($2))})(${umdExp});`);
fn.wt(indexPath, rxjs4wx);

const rxjsD = `
export declare const operators: {
  map: (_x: any) => any;
}
`;
fn.wt(idxDPath, fn.rd(rxjsDPath) + rxjsD);

fn.log(`Build Success!, Size: ${fn.size(indexPath)}KB`, 'Rxjs4Wx');