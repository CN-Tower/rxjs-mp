(Rx) => {
  var _global = typeof global == 'object' && global && global.Object === Object && global
  , _self = typeof self == 'object' && self && self.Object === Object && self
  , _exports = typeof exports == 'object' && exports && !exports.nodeType && exports
  , _module = _exports && typeof module == 'object' && module && !module.nodeType && module
  , root = _global || _self || Function('return this')();
  if (_module) {
    (_module.exports = Rx).Rx = Rx;
    _module.Rx = Rx;
  } else {
    root.Rx = Rx;
  }
}