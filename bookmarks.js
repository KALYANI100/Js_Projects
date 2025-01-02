import View from './View.js';
class BookmarkView extends View{
 _parentElement=document.querySelector('.book_list');
 _error="No bookmarks yet !"
 _generateMarkup()
 {
   
  
    return this._data.map(this._generateMarkupPreview).join('');

 }
 
 _generateMarkupPreview(results){
    //console.log(this._data);
    return `
    <div id="r1">
                <div><img class='im' src="${results.image}" >
                <a href="#${results.id}"></div>
                <div id="r1-right">
                <span>${results.title}</span>
                <h4>${results.publisher}</h4>
                </div>
            </div>`;
 }
}
export default new BookmarkView

{/* <div id="r1">
                <div><img class='im' src="flogo.jpg" ></div>
                <div id="r1-right">
                <span>Pasta</span>
                <h4>Owner</h4>
                </div>
            </div>`; */}