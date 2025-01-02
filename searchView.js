class SearchView{
    _parentEL=document.querySelector('.search');
    getQuery(){
        const query=this._parentEL.querySelector('.search_field').value;
        this._clearInput();
        return query;
    }
    _clearInput(){
        this._parentEL.querySelector('.search_field').value='';
    }
    addHandlerSearch(handler)
    {
        this._parentEL.querySelector('#search').addEventListener('click',function(e){
            e.preventDefault();
            handler();
        })
       
    }
}
export default new SearchView();