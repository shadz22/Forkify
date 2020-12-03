import icons from 'url:../img/icons.svg';

const recipeContainer = document.querySelector('.recipe');

const showRecipe = async function() {
  try {
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc5b')
    const data = await res.json();

    if(!res.ok) throw new Error(`${data.message}(${res.status})`);
    
    let {recipe} = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients
    };
    // console.log(recipe);
    console.log(icons);

    const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
    </div>

        `;
    recipeContainer.insertAdjacentHTML('afterbegin', markup);

  } catch(err) {
    alert(err);
  }
}
showRecipe();