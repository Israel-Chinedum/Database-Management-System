class Print{

    text({element, text='Please provide text!', tpl=100, delay=1000, cursorHeight='30px', cursorWidth='1px'}){
        return new Promise((resolve, reject) => {

            if(!element){
                return reject('Please provide an element!');
            }
    
            element.innerText = '';
    
            const textArr = text.split('');
            let i = 0;
            console.log(textArr);
        
            element.style.width = 'max-content';
            element.style.height = cursorHeight;
            element.style.borderRight = `${cursorWidth} solid grey`;
    
            const cursor = (typing) => {
    
                if(typing){
                    element.style.borderColor = 'grey';
                    return;
                }
    
                if(element.style.borderColor == 'grey'){
                    element.style.borderColor = 'transparent';
                } else{
                    element.style.borderColor = 'grey';
                }
            }
        
            const blink = setInterval(cursor, 500);
        
            setTimeout(() => {
                clearInterval(blink);
                cursor(true);
                const print = setInterval(() => {
                    if(i == textArr.length){
                        clearInterval(print);
                        const blink = setInterval(cursor, 500);
                        return resolve();
                    }
                    element.textContent += textArr[i];
                    i++;
                },tpl);
            }, delay);

        })
        
    }

}

export const print = new Print();
