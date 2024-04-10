class FormDisplay{

    show(panelName){

         panelName.style.display = 'flex';

    }

    remove(panelName){
        panelName.style.display = 'none';
    }

} const display = new FormDisplay();

export default display;