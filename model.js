//import {async} from 'regenerator-runtime';
//import search from "core-js/fn/symbol/search";
import { API_URL ,Results_per_page} from "./config.js";
import { getJSON } from "./helpers.js";
import resultsView from "./resultsView.js";

export const state={
    recipe:{},
    search:{
        query:'',
        results:[],
        resultsperpage:Results_per_page,
        page:1,
    },
    bookmarkrecipe:[]
};
export const loadRecipe=async function(id)
{
    try{
        const data=await getJSON(`${API_URL}${id}`);
   
    const {recipe}=data.data;
    state.recipe={
        
        id:recipe.id,
        cookingTime:recipe.cooking_time,
        image:recipe.image_url,
        title:recipe.title,
        publisher:recipe.publisher,
        sourceUrl:recipe.source_url,
        servings:recipe.servings,
        ingredints:recipe.ingredients
    }
    if(state.bookmarkrecipe.some(bookmark=>bookmark.id===id))
    {
        state.recipe.bookmarked=true;
    }
    else{
        state.recipe.bookmarked=false;
    }
    console.log(recipe);
    state.search.page=1;
}
catch(err)
{
    console.error(err);
    throw err;
}
}
export const loadSearchResults=async function(query){
    try{
        state.search.query=query;
        const data=await getJSON(`${API_URL}?search=${query}`);
        console.log(data);
        state.search.results=data.data.recipes.map(rec=>
        {
            return{
        id:rec.id,
        
        image:rec.image_url,
        title:rec.title,
        publisher:rec.publisher,
        sourceUrl:rec.source_url,
        
            };
        }
        );
        
    }
    catch(err){
        console.log(`${err}`);
        throw err;
    }
}
export const searchpageresult=function(page)
{
    state.search.page=page;
    const n=state.search.resultsperpage;
    const start=(page-1)*n;
    const end=page*n;
    return state.search.results.slice(start,end);
}
export const updateServings=function(newServings)
{
    state.recipe.ingredints.forEach(ing=> {
        ing.quantity=(ing.quantity*newServings)/state.recipe.servings;
        
    });
    state.recipe.servings=newServings;
}
export const bookmark=function(recipe)
{
    
    state.bookmarkrecipe.push(recipe);
    if(recipe.id===state.recipe.id) state.recipe.bookmarked=true;}
//loadSearchResults('pizza');
export const deleteBookmark=function(id)
{
    const index=state.bookmarkrecipe.findIndex(el=>el.id===id);
    state.bookmarkrecipe.splice(index,1);
    if(id===state.recipe.id) state.recipe.bookmarked=false;}
