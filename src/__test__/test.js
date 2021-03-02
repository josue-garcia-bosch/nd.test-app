const { makeIdShortly} = require('./../domains/core/service/service') ;


function main(){
    const id = 'AABCDDE';
    const result = makeIdShortly(id);

    if(result == '2ABC2DE'){
        console.log('all good');
    }else {
        console.error('error',result)
    }
}

main();