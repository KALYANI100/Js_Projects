//import Fraction from 'fractional';
import View from './View.js';
class RecipeView extends View
{
    _parentElement=document.querySelector('#result');
    _data;
    
addHandlerRender(handler)
{
    ['hashchange','load'].forEach(ev=>window.addEventListener(ev,handler));
}
addHandlerbookmarks(handler)
{
    this._parentElement.addEventListener('click',function(e)
{
    const btn=e.target.closest('.book');
    if(!btn) return;
    //console.log(btn);
    handler();
})
}
addHandlerUpdateServings(handler)
{
    this._parentElement.addEventListener('click',function(e)
{
    const btn=e.target.closest('.tiny');
    if(!btn) return;
    
    const updateTo=+btn.dataset.updateTo;
  
    if(updateTo>0)handler(updateTo);
})
}
    _generateMarkup(){
        console.log(this._data);
        return `<div id="image">
        <img src='${this._data.image}' alt="img">
    </div>
    
    <div id="info">
        <div id="time">
            <i class="ri-time-line"></i>
            <span>${this._data.cookingTime} MINUTES</span>
        </div>
        <div id="serving">
            <i class="ri-group-line"></i>
            <span>${this._data.servings} SERVINGS</span>
        </div>
        <div class="tiny">
        <button class="tiny add" data-update-to="${this._data.servings+1}">
            <i class="ri-add-fill"></i>
        </button>
        <button class="tiny minus" data-update-to="${this._data.servings-1}">
            <i class="ri-subtract-line"></i>
        </button>
        </div>
        <div class="book bookmark">
          <i class= ${this._data.bookmarked?"ri-bookmark-fill":"ri-bookmark-line"}></i>
        </div>
    </div>
    <div id="recipe-ingredients">
        <center><h3 style="color: orange;">Recipe Ingredients</h3></center>
        <ul class="list">
            ${this._data.ingredints.map(this._generateMarkupIngredient).join(' ')}
            
        </ul>
    </div>
    <div id="finish">
        <center><h3 style="color:orange">HOW TO COOK IT</h3>
        <p style="font-size: 17px;">This recipe was carefully designed and tested by ${this._data.publisher}. 
            Please check out directions at their website.</p>
            <button>
                
                <a href=${this._data.sourceUrl}>Direction</a>
                <i class="ri-arrow-right-line"></i>
            </button></center>
    </div>`;
    
    }
    updateview(data)
    {
        if(!data||Array.isArray(data) && data.length===0)
            {
                
                return this.rendererror();
               
            }
            console.log(data);
            this._data=data;
            //const markup=this._generateMarkup();
           const newMarkup=this._generateMarkup();
           const newDOM=document.createRange().createContextualFragment(newMarkup);
           const newElements=Array.from(newDOM.querySelectorAll('*'));
           const curElements=Array.from(this._parentElement.querySelectorAll('*'));
           newElements.forEach((newEl,i)=>
        {
            const curEl=curElements[i];
            //console.log(curEl,newEl.isEqualNode(curEl));
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim()!=='')
            {
                curEl.textContent=newEl.textContent; //Copying value
            }
            if(!newEl.isEqualNode(curEl))
            {
                console.log(Array.from(newEl.attributes));
                Array.from(newEl.attributes).forEach(attr=>
                    curEl.setAttribute(attr.name,attr.value)
                );
            }
        })
    }
    _generateMarkupIngredient(ing){
        return`<li>
        <i class="ri-check-line"></i>
        <span>${ing.quantity}</span>
        <span> ${ing.unit}</span>
        <span> ${ing.description}</span>
    </li>`
    ;}
}

export default new RecipeView();