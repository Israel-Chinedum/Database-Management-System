class VirtualRouter{
    route(elements, container, exeption){
        
        if(!document.querySelector('#VirtualRouterElement001')){
            const vrElement = document.createElement('div');
            vrElement.id = 'VirtualRouterElement001';
            vrElement.style.display = 'none';
            document.head.appendChild(vrElement);
        }
        
 
        while(container.firstChild){
                document.querySelector('#VirtualRouterElement001').appendChild(container.firstChild);
        }


        for(let element of elements){
            container.appendChild(element);
        }

    }
}
                    
export default new VirtualRouter();