export default class View{
    render(data){
        if(!data||Array.isArray(data) && data.length===0)
        {
            
            return this.rendererror();
           
        }
        console.log(data);
        this._data=data;
        //const markup=this._generateMarkup();
       this._markup=this._generateMarkup();
        this._clear();
        //result.innerHTML=markup;
    }
    _clear()
    {
        this._parentElement.innerHTML="";
        this._parentElement.innerHTML=this._markup;
        console.log(this._parentElement);
    }
    renderspinner=function()
{
    const markup=`<div id="spinner">
    <i class="ri-loader-line"></i>
</div>`;
this._parentElement.innerHTML=" ";
this._parentElement.insertAdjacentHTML('afterbegin',markup);
}
rendererror=function()
{
    const markup=`<center><h3>⚠️No recipe found for your query!</h3>
    <h3>Please try again.</h3></center>`;
    console.log('hi');
this._parentElement.innerHTML=" ";
this._parentElement.insertAdjacentHTML('afterbegin',markup);
}
update(data)
    {
            console.log('Hi');
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
}