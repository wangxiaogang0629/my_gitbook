
/**
 * 面试环节
 * cname 面试公司
 * num 面试轮数
 */
function interviewItem (cname, num) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            let _randomNum = Math.ceil(Math.random()*10);

            if (_randomNum > 1) {
                console.log(cname + '-' + num + '面 success'); // 打印面试成功
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
async function interview (cname) {


     // 用于捕获 promise 返回的 reject
     // 返回 reject 之后 后面的内容将不执行
    try {
        let one = await interviewItem(cname, 1);
        let two = await interviewItem(cname, 2);
        let three = await interviewItem(cname, 3);
    
        // 面试通过返回结果
        return Promise.resolve(cname + '面试通过');

    }
    catch (res) {
        console.log(res)
        return Promise.reject(res);
    }

}



async function f1() {

    try{
        let startTime = new Date().getTime(), endTime;
        let p1 = await interview('A');
        let p2 = await interview('B');
        endTime = new Date().getTime();
        console.log('面试结果', p1, p2);
        console.log('时间', endTime - startTime);
    } catch(err) {
        console.log('面试失败: ', err)
    }
    
}

f1();

// let startTime = new Date().getTime(), endTime; // 开始面试时间

// Promise.all([interview('小米'), interview('阿里')]).then((res) => {

//     endTime = new Date().getTime();
//     console.log('面试成功: ', res)
//     console.log('面试时间', endTime - startTime);

// }).catch((res) => {
//     console.log('面试失败: ', res)
// }).finally((res) => {
//     // console.log('finally: ', res)
// })
