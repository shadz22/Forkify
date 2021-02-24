import { async } from 'regenerator-runtime';
import { API_URL, REC_PER_PAGE } from './config.js'
import { getJSON } from './helpers.js'

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    resultsPerPage: REC_PER_PAGE,
    results: []
  },
  bookmarks: []
};

export const loadRecipe = async function(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    
    const {recipe} = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients
    };
  
    if(state.bookmarks.some(bookmark => bookmark.id === id)) 
      state.recipe.bookmarked = true;
    else
      state.recipe.bookmarked = false;

  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query;
    
    const data = await getJSON(`${API_URL}?search=${query}`);
    
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url
      }
    })
    state.search.page = 1;

  } catch (err) {
    console.log(err)
    throw err;
  }
}

export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  })
  state.recipe.servings = newServings;
}

const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmarks = function(recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark recipe as bookmarked
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
}

export const deleteBookmarks = function(id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id)
  state.bookmarks.splice(index, 1);

  // Mark recipe as not-bookmarked
  if(state.recipe.id === id) state.recipe.bookmarked = false;
  persistBookmarks();
}

export const uploadRecipe = async function(newRecipe) {
  const ingredients = Object.entries(newRecipe)
  .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
  .map(ing => {
    const [quantity, unit, description] = ing[1]
      .replaceAll(' ', '')
      .split(',');

      return {quantity: quantity ? +quantity : null, unit, description};
  })
  console.log(ingredients);
}

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if(storage) state.bookmarks = JSON.parse(storage);
};
init();

