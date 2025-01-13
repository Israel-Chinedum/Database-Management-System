class Height {

    scroll(){
        const containerHeight = document.querySelector('.main');
        const dbContainerHeight = document.querySelector('.database_container');
        const tbContainerHeight = document.querySelector('.table_container');

        console.log(containerHeight.clientHeight)
        console.log(containerHeight.scrollHeight)
        console.log(dbContainerHeight.scrollHeight)
        console.log(dbContainerHeight.offsetHeight)
     
        if(dbContainerHeight.scrollHeight > containerHeight.clientHeight){
            document.querySelector('.database_container').style.overflowY = 'scroll';
        } else{
            document.querySelector('.database_container').style.overflowY = 'hidden';
        }

        if(tbContainerHeight.scrollHeight > containerHeight.clientHeight){
            document.querySelector('.table_container').style.overflowY = 'scroll';
        } else{
            document.querySelector('.table_container').style.overflowY = 'hidden';
        }
      
    }

}

export default new Height();