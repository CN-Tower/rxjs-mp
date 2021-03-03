const fn = require('funclib');
const path = require('path');

const indexPath = path.join(__dirname, '../', 'index.js');
const umdPath = path.join(__dirname, '../', 'src/umd.min.js');

const umdExp = fn.rd(umdPath).replace(/;$/, '');
const rxjs4wx = fn.rd(indexPath)
  .replace(/\(\(\)=>\{/, '(cb=>{')
  .replace(/([\d\w])\(([\d\w]*)\)\}\)\(\);/, `cb($1($2))})(${umdExp});`);

fn.wt(indexPath, rxjs4wx);