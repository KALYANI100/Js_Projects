import View from './View.js';
class PageView extends View{
 _parentElement=document.querySelector('#page');
 addHandlerClick(handler)
 {
    this._parentElement.addEventListener('click',function(e)
    {
        const btn=e.target.closest('.btn');
        if(!btn)
        {
            return;
        }
        console.log(btn);
        
        const goToPage=btn.dataset.goto;
        handler(goToPage);
        console.log(goToPage);
    })
 }
 _generateMarkup=function()
 {
    const page=parseInt(this._data.page);
    const numPages=Math.ceil(this._data.results.length/this._data.resultsperpage);
    console.log(numPages,page);
    //Page 1 and others
    if(this._data.page===1 &&  numPages>1)
    {
        return`
        
        <button data-goto="${page+1}" class='btn 2' id="page2">Page2 >></button>`;
    }
    
    //Last
    if(page===numPages)
    {
        return `<button data-goto="${page-1}" class='btn 1'><< Page${page-1}</button>`;
    }
    //Other page
    if(this._data.page<numPages)
    {
        return `
        <button data-goto="${page-1}" class='btn 1'><< Page${page-1}</button>
        <button data-goto="${page+1}" class='btn 2' id="page2">Page${page+1} >></button>`;
    }
    //Page 1 and there are NO others pages
    return ``;
 }
}
export default new PageView