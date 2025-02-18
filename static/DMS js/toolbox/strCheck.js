export const strCheck = (str) => {
    const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
    const standard = alphaNum.split('');
    const strArr = str.split('');

    for(let i of strArr){
        if(!standard.includes(i.toUpperCase())){
            console.log(standard);
            return {char: i, valid: false};
        }
    }

    return {valid: true};
}