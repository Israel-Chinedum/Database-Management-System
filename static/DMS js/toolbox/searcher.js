class SearchEngine{

    engine(searchList, searchInput){
        searchList.forEach(data =>{
            if(data.innerText.toLowerCase().indexOf(searchInput.value.toLowerCase()) < 0){
                data.style.display = 'none';
            } else{
                data.style.display = 'flex';
            }
        });
    }

} export default new SearchEngine();