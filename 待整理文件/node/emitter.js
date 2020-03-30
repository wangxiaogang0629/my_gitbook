let EventEmitter = require("events");

let emitter = new EventEmitter();
let successA = false;
let successB = false;

function f1(num) {

    setTimeout(() => {
        emitter.emit('success', num + '-success');
    }, 50)
}

emitter.on('success', (res) => {
    console.log('res', res)

   switch(res) {
        case 'A-1-success': f1('A-2'); break;
        case 'A-2-success': f1('A-3'); break;
        case 'A-3-success': successA = true; break;
        case 'B-1-success': f1('B-2'); break;
        case 'B-2-success': f1('B-3'); break;
        case 'B-3-success': successB = true; break;
   }

   if (successA && successB) {
    console.log('面试成功')
   } else {
    console.log('面试暂未通过')
   }
});

f1('A-1');
f1('B-1');


