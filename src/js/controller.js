import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;

    // 1) Update results view to highlight the selected search result
    resultsView.update(model.getSearchResultsPage());

    // 2) Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 3) Loading recipe
    await model.loadRecipe(id);

    // 4) Rendering recipe
    recipeView.render(model.state.recipe);

  } catch(err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render search results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination
    paginationView.render(model.state.search);

  } catch(err) {
    console.log(err)
  }
}

const controlPagination = function(goToPage) {
  // 1) Render New search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render New  pagination
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  // Update the recipe servings in state
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(recipe) {

  // 1) Add/delete bookmarks
  if(!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else
  model.deleteBookmarks(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  
  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
