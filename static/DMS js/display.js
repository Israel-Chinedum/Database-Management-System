class Display{

    show(panelName, display){
         panelName.style.display = display;
    }

    remove(panelName){
        panelName.style.display = 'none';
    }

    shortDisplay(panelName, display, data){
        if(data){
            panelName.innerText = data;
        } else{
            panelName.innerText = 'Finished Operation!';
        }
        panelName.style.display = display;

        setTimeout(()=>{
            panelName.style.display = 'none';
        },5000);

    }

} const display = new Display();

export default display;

