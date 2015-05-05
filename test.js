/**
 * Created by filip on 5.5.15..
 */

var box = require('./Sandbox');

box.evaluate("1 + 2", {} , {}).then(function (nesto) {
    console.log('inside');
    console.log(nesto);
}, function (err) {
    console.log(err);
});
