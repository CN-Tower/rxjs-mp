const Rx = require('../index');

const obs = new Rx.Observable(ob => {
  setTimeout(() => {
    ob.next('next()');
    ob.complete();
    // ob.error('error');
  }, 2000);
  return () => {
    console.log('disposed');
  }
});

const sb = obs.pipe(
  Rx.operators.map(x => x)
).subscribe(
  res => console.log(res),
  e => console.log(e),
  () => console.log('complete')
);

setTimeout(() => {
  sb.unsubscribe();
}, 1000);