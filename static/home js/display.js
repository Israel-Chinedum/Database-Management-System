class Display{

    show(panelName, show){
         panelName.style.display = show;
    }

    remove(panelName){
        panelName.style.display = 'none';
    }

    shortDisplay(panelName, display){
        
        panelName.style.display = display;

            setTimeout(()=>{
                panelName.style.display = 'none';
            },5000);

    }

} const display = new Display();

export default display;

