class SearchEngine{

    search(searchList, searchInput){
        searchList.forEach(data =>{
            if(data.innerText.toLowerCase().indexOf(searchInput.value.toLowerCase()) < 0){
                data.parentElement.style.display = 'none'
            } else{
                data.parentElement.style.display = 'flex'
                
            }
        })
    }

} export default new SearchEngine();