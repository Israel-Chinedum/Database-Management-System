class Scroll {

    height(myContainer){
        const containerHeight = document.querySelector('.main');
     
        if(myContainer.scrollHeight > containerHeight.clientHeight){
            myContainer.style.overflowY = 'scroll';
        } else{
            myContainer.style.overflowY = 'hidden';
        }

    }

}

export default new Scroll();