
/**
 * 面试环节
 * cname 面试公司
 * num 面试轮数
 */
function interviewItem (cname, num) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            let _randomNum = Math.ceil(Math.random()*10);

            // console.log(_randomNum)  

            if (_randomNum > 1) {
                resolve(cname + '-' + num + '面 success');
            } else {
                reject( cname + '-' + num + '面 fail');
            }

        }, 50);
    
    });

}


/**
 * 开始面试
 * cname 面试公司
 */
function interview (cname) {

    return interviewItem(cname, 1)
    .then((res) => {
        console.log('res', res);

        return interviewItem(cname ,2);
        
    })
    .then((res) => {
        console.log('res', res);

        return interviewItem(cname ,3);
    })
    .then((res) => {
        console.log('res', res);

        return interviewItem(cname , 'all');
    })
    .catch((res) => {
        console.log(res)

        return Promise.reject(res);
    })

}

// async function f1() {

//     let startTime = new Date().getTime(), endTime;
//     let p1 = await interview('A');
//     let p2 = await interview('B');

//     endTime = new Date().getTime();
    
//     console.log('面试结果', p1, p2);
//     console.log('时间', endTime - startTime);
// }

// f1();

let startTime = new Date().getTime(), endTime;

Promise.all([interview('小米'), interview('阿里')]).then((res) => {

    endTime = new Date().getTime();
    console.log('面试成功: ', res)
    console.log('时间', endTime - startTime);

}).catch((res) => {
    console.log('面试失败: ', res)
}).finally((res) => {
    // console.log('finally: ', res)
})
