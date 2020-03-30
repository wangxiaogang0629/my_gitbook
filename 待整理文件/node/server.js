function interview (type) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            // reject(type + '-1面 fail');
            resolve(type + '-1面 success');

        }, 50);
    
    }).then((res) => {
    
        console.log('res', res)

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                // reject(type + '-2面 fail');
                resolve(type + '-2面 success');

            }, 50);
        })
        
    })
    .then((res) => {
    
        console.log('res', res)

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                // reject(type + '-3面 fail');
                resolve(type + '-3面 success');

            }, 50);
        })
        
    }).then((res) => {
    
        console.log('res', res)

        return new Promise((resolve, reject) => {
            resolve(type + '-all success');
        })
        // return Promise.resolve(type + '-all success');
        
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

Promise.all([interview('A'), interview('B')]).then((res) => {

    endTime = new Date().getTime();
    console.log('面试成功: ', res)
    console.log('时间', endTime - startTime);

}).catch((res) => {
    console.log('面试失败: ', res)
}).finally((res) => {
    // console.log('finally: ', res)
})
