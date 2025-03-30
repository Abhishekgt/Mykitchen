document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("recipe-form");
    const recipeContainer = document.getElementById("recipes-container");
    const filter = document.getElementById("filter");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    
    function saveRecipes(recipes) {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }
    
    function getRecipes() {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    }
    
    function displayRecipes(category = "All") {
        const recipes = getRecipes();
        recipeContainer.innerHTML = "";

        recipes.filter(recipe => category === "All" || recipe.category === category)
            .forEach(recipe => {
                const card = document.createElement("div");
                card.classList.add("recipe-card");
                card.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <p><strong>Category:</strong> ${recipe.category}</p>
                    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                    <p><strong>Preparation:</strong> ${recipe.preparation}</p>
                `;
                recipeContainer.appendChild(card);
            });
    }

    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("recipe-name").value;
        const ingredients = document.getElementById("ingredients").value;
        const category = document.getElementById("category").value;
        const preparation = document.getElementById("preparation").value;

        const newRecipe = { name, ingredients, category, preparation };
        const recipes = getRecipes();
        recipes.push(newRecipe);
        saveRecipes(recipes);
        displayRecipes();
        recipeForm.reset();
        showSection('view-recipes');
    });

    filter.addEventListener("change", (e) => {
        displayRecipes(e.target.value);
    });

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    displayRecipes();
});

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}
