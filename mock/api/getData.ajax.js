var
  ajaxMake = require('./ajax.make')
;

module.exports = ajaxMake({
  apiName: 'getData',
  data: {
    data: 'test a message'
  },
  timeout: 500,
});
