document.addEventListener("DOMContentLoaded", () => {
    loadRecipes();
    document.getElementById("recipe-form").addEventListener("submit", addRecipe);
    document.getElementById("filter").addEventListener("change", filterRecipes);
    document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
});

function showSection(sectionId) {
    document.querySelectorAll("main section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

function addRecipe(event) {
    event.preventDefault();
    
    const name = document.getElementById("recipe-name").value;
    const ingredients = document.getElementById("ingredients").value;
    const category = document.getElementById("category").value;
    const preparation = document.getElementById("preparation").value;

    if (!name || !ingredients || !preparation) {
        alert("Please fill out all required fields.");
        return;
    }

    const recipe = { name, ingredients, category, preparation };
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    document.getElementById("recipe-form").reset();
    loadRecipes();
}

function loadRecipes() {
    const recipesContainer = document.getElementById("recipes-container");
    recipesContainer.innerHTML = "";
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <table border="1">
                <tr><th>Ingredients</th></tr>
                <tr><td>${recipe.ingredients.replace(/\n/g, "<br>")}</td></tr>
            </table>
            <p>${recipe.preparation}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipesContainer.appendChild(card);
    });
}

function filterRecipes() {
    const category = document.getElementById("filter").value;
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const filteredRecipes = category === "All" ? recipes : recipes.filter(r => r.category === category);

    const recipesContainer = document.getElementById("recipes-container");
    recipesContainer.innerHTML = "";
    filteredRecipes.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <table border="1">
                <tr><th>Ingredients</th></tr>
                <tr><td>${recipe.ingredients.replace(/\n/g, "<br>")}</td></tr>
            </table>
            <p>${recipe.preparation}</p>
        `;
        recipesContainer.appendChild(card);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    loadRecipes();
}
