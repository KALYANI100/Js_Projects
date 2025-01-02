import * as model from './model.js';
import recipeView from './recipeview.js'
import searchView from './searchView.js';
import resultsView from './resultsView.js';
import BookmarkView from './bookmarks.js'
import PageView from './pageview.js';
// import 'core-js/stable'
// import 'regenerator-runtime/runtime';

let selected=1;
document.querySelector(".item2").addEventListener("click", function() {
   if(selected){
    BookmarkView.render(model.state.bookmarkrecipe);
    selected=0;}
    else{
        document.querySelector('.book_list').innerHTML='';
        selected=1;
    }
  });



const controlRecipe=async function()
{
    try{
        const id=window.location.hash.slice(1);
        if(!id)return;
        recipeView.renderspinner();
        //Update results view to mark selected search result 
       resultsView.update(model.searchpageresult());
        //loading recipe
        await model.loadRecipe(id);
        
        //rendering recipe
        recipeView.render(model.state.recipe);
        
        
    }
    catch(err)
    {
        console.log(err);
       // recipeView.renderError(`${err}`);
    }
    
}
const controlSearchResults=async function(){
    try{
        console.log(resultsView)
        resultsView.renderspinner();
        //1)Get search query
        const query=searchView.getQuery();
        if(!query) return;
        //2)Load search results
        await model.loadSearchResults(query);
        //3)Render results
        console.log(model.state.search.results);
        resultsView.render(model.searchpageresult(1));
        PageView.render(model.state.search);

    }catch(err){
        console.log(err);
    }
};

const controlPagination=function(goToPage)
{
    //console.log(goToPage);
    resultsView.render(model.searchpageresult(goToPage));
        PageView.render(model.state.search);
}
const controlServings=function(servings)
{
    model.updateServings(servings);
    // recipeView.render(model.state.recipe);
    recipeView.updateview(model.state.recipe);

}
const controlbookmarks=function()
{
    if(!model.state.recipe.bookmarked) model.bookmark(model.state.recipe);
   else model.deleteBookmark(model.state.recipe.id);
   // model.bookmark(model.state.recipe);
 
    recipeView.updateview(model.state.recipe);
    // BookmarkView.render(model.state.bookmarkrecipe);
}
const init=function()
{
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    PageView.addHandlerClick(controlPagination);
    recipeView.addHandlerbookmarks(controlbookmarks);

    
}
init();
// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);