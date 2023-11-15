const recipes = [
    { title: 'Pasta Carbonara', ingredients: ['pasta', 'eggs', 'bacon', 'parmesan'] },
    { title: 'Chicken Curry', ingredients: ['chicken', 'curry sauce', 'rice'] },
    { title: 'Vegetarian Pizza', ingredients: ['dough', 'tomato sauce', 'cheese', 'vegetables'] }
];

function searchRecipe() {
    const searchTerm = document.getElementById('recipeTitle').value.toLowerCase();
    const searchResults = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm));

    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (searchResults.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
    } else {
        searchResults.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `<h3>${recipe.title}</h3><p>Ingredients: ${recipe.ingredients.join(', ')}</p>`;
            resultsContainer.appendChild(recipeDiv);
        });
    }
}
