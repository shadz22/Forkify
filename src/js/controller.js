const recipeContainer = document.querySelector('.recipe');

const showRecipe = async function() {
  try {
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc5b')
    const data = await res.json();
    console.log(res, data);
    if(!res.ok) {
      throw new Error(`${data.message}(${res.status})`);
    }
  } catch(err) {
    alert(err);
  }
}
showRecipe();