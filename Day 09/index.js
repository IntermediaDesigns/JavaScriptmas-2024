// Guest and her preferences
const guest = {
  name: "Alice",
  loves: ["🥑avocado", "🍚quinoa", "🥬kale"],
  dislikes: [
    "pork",
    "chicken",
    "turkey",
    "beef",
    "dairy",
    "butter",
    "eggs",
    "gluten",
    "nuts",
    "soy",
    "flour",
  ],
};

// List of Christmas-themed recipes with their ingredients
const recipes = [
  {
    name: "Honey-Glazed Ham",
    ingredients: ["pork", "honey", "brown sugar", "cloves", "butter"],
    image: null,
  },
  {
    name: "Roast Turkey with Stuffing",
    ingredients: [
      "turkey",
      "bread crumbs",
      "gluten",
      "celery",
      "onions",
      "tomatoes",
      "butter",
    ],
    image: null,
  },
  {
    name: "Classic Beef Wellington",
    ingredients: ["beef", "mushrooms", "puff pastry", "eggs"],
    image: null,
  },
  {
    name: "Gingerbread Cookies",
    ingredients: ["flour", "molasses", "ginger", "cinnamon", "butter", "eggs"],
    image: null,
  },
  {
    name: "Vegan Stuffed Peppers",
    ingredients: [
      "bell peppers",
      "🍚quinoa",
      "black beans",
      "corn",
      "tomato sauce",
      "🥬kale",
    ],
    image: "./images/stuffedpeppers.png",
  },
  {
    name: "Roasted Brussels Sprouts",
    ingredients: ["brussels sprouts", "olive oil", "garlic"],
    image: null,
  },
  {
    name: "Vegan Avocado Chocolate Mousse",
    ingredients: ["🥑avocado", "cocoa powder", "maple syrup", "flour"],
    image: null,
  },
  {
    name: "Vegan Christmas Cookies",
    ingredients: ["oats", "maple syrup", "vanilla extract"],
    image: null,
  },
  {
    name: "Quinoa Salad",
    ingredients: ["🥬kale", "🍚quinoa", "cranberries", "lemon juice"],
    image: "./images/quinoasalad.png",
  },
  {
    name: "Vegan Lentil Loaf",
    ingredients: ["lentils", "carrots", "celery", "onions", "tomato paste"],
    image: null,
  },
];

// Requirements for a suitable recipe
// 1: Contains at least one ingredient Alice likes
// 2: Contains zero ingredients that Alice dislikes

// Step 1: Filter recipes based on Alice's preferences
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loves").textContent = guest.loves.join(", ");
  document.getElementById("dislikes").textContent = guest.dislikes.join(", ");
});

function filterRecipes() {
  const suitableRecipes = recipes.filter((recipe) => {
    const hasLoved = recipe.ingredients.some((ingredient) =>
      guest.loves.includes(ingredient)
    );

    const hasDisliked = recipe.ingredients.some((ingredient) =>
      guest.dislikes.includes(ingredient)
    );

    return hasLoved && !hasDisliked;
  });

  displayRecipes(suitableRecipes);
}

// Step 2: Output the suitable recipes
function displayRecipes(recipes) {
  const container = document.getElementById("recipesContainer");
  container.innerHTML = "";

  if (recipes.length === 0) {
    container.innerHTML = "<p>No suitable recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";

    const imageHtml = recipe.image
      ? `<img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">`
      : "";

    recipeCard.innerHTML = `
      <h3 class="recipe-name">${recipe.name}</h3>
      <div class="recipe-content">
        ${imageHtml}
        <div class="recipe-details">
          <p class="recipe-ingredients"><strong>Ingredients:</strong><br> ${recipe.ingredients.join(', ')}</p>
        </div>
      </div>
    `;
    container.appendChild(recipeCard);
  });
}

// Add event listener
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("filterButton")
    .addEventListener("click", filterRecipes);
});
