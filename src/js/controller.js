import * as model from './model.js'
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

  } catch(err) {
    alert(err);
  }
}
controlRecipes();

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
