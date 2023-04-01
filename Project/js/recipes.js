const API_ENDPOINT = "https://api.spoonacular.com/recipes/";
const API_KEY = "be16d19e48ba4d008409e2fa56e7327d";
const NUM_RECIPES = 5;

function getVegetarianLunchMeals() {
  const container = document.getElementById('recipe-list');
  const ingredients = {}; // create an empty object to store ingredients and their quantities

  fetch(`${API_ENDPOINT}complexSearch?diet=vegetarian&type=lunch&apiKey=${API_KEY}&number=${NUM_RECIPES}`)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(recipe => {
        fetch(`${API_ENDPOINT}${recipe.id}/information?includeNutrition=false&apiKey=${API_KEY}`)
          .then(response => response.json())
          .then(recipeDetails => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');

            const imageElement = document.createElement('img');
            imageElement.src = recipeDetails.image;
            imageElement.classList.add('recipe-img');
            imageElement.setAttribute('alt', recipeDetails.title);
            imageElement.style.filter = 'brightness(70%)';
            recipeElement.appendChild(imageElement);

            const labelContainer = document.createElement('div');
            labelContainer.classList.add('label-container');

            if (recipeDetails.vegetarian) {
              const vegetarianLabel = document.createElement('div');
              vegetarianLabel.classList.add('label', 'label-v');
              vegetarianLabel.innerHTML = '<i class="fas fa-leaf"></i> Vegetarian';
              labelContainer.appendChild(vegetarianLabel);
            }
            
            if (recipeDetails.vegan) {
              const veganLabel = document.createElement('div');
              veganLabel.classList.add('label', 'label-vg');
              veganLabel.innerHTML = '<i class="fas fa-seedling"></i> Vegan';
              labelContainer.appendChild(veganLabel);
            }
            
            if (recipeDetails.glutenFree) {
              const glutenFreeLabel = document.createElement('div');
              glutenFreeLabel.classList.add('label', 'label-gf');
              glutenFreeLabel.innerHTML = '<i class="fas fa-bread-slice"></i> GF';
              labelContainer.appendChild(glutenFreeLabel);
            }
            

            recipeElement.appendChild(labelContainer);

            const titleElement = document.createElement('h3');
            titleElement.textContent = recipeDetails.title;
            recipeElement.appendChild(titleElement);

            const ingredientsElement = document.createElement('ul');
            ingredientsElement.classList.add('ingredients');

            recipeDetails.extendedIngredients.forEach(ingredient => {
              const ingredientObject = {
                name: ingredient.name,
                quantity: ingredient.amount
              };
              
              const ingredientElement = document.createElement('li');
              ingredientElement.textContent = `${ingredientObject.quantity} ${ingredient.unit} ${ingredient.name}`;
              ingredientsElement.appendChild(ingredientElement);
            });

            recipeElement.appendChild(ingredientsElement);

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const addButton = document.createElement('button');
            addButton.classList.add('add-button');
            addButton.textContent = 'Add to Grocery List';
            addButton.addEventListener('click', () => {
              recipeDetails.extendedIngredients.forEach(ingredient => {
                if (ingredients.hasOwnProperty(ingredient.name)) {
                  ingredients[ingredient.name] += ingredient.amount;
                } else {
                  ingredients[ingredient.name] = ingredient.amount;
                }
              });
            
              const textarea = document.getElementById('clipboard');
              textarea.value = Object.entries(ingredients).map(([name, quantity]) => `${quantity} ${name}`).join('\n');
            });

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'Remove from Grocery List';
            removeButton.addEventListener('click', () => {
              recipeDetails.extendedIngredients.forEach(ingredient => {
                if (ingredients.hasOwnProperty(ingredient.name)) {
                  ingredients[ingredient.name] -= ingredient.amount;
                  if (ingredients[ingredient.name] <= 0) {
                    delete ingredients[ingredient.name];
                  }
                }
              });
            
              const textarea = document.getElementById('clipboard');
              textarea.value = Object.entries(ingredients).map(([name, quantity]) => `${quantity} ${name}`).join('\n');
            });
            
            
            buttonContainer.appendChild(addButton);
            buttonContainer.appendChild(removeButton);
            
            recipeElement.appendChild(buttonContainer);
            
            container.appendChild(recipeElement);
            });
        });
      })
      .catch(error => console.error(error));
    }
          
document.addEventListener('DOMContentLoaded', () => {
  getVegetarianLunchMeals();
});



// function getVegetarianLunchMeals() {
//   const container = document.getElementById('recipe-list');

//   fetch(`${API_ENDPOINT}complexSearch?diet=vegetarian&type=lunch&apiKey=${API_KEY}&number=${NUM_RECIPES}`)
//     .then(response => response.json())
//     .then(data => {
//       data.results.forEach(recipe => {
//         fetch(`${API_ENDPOINT}${recipe.id}/information?includeNutrition=false&apiKey=${API_KEY}`)
//           .then(response => response.json())
//           .then(recipeDetails => {
//             const recipeElement = document.createElement('div');
//             recipeElement.classList.add('recipe');

//             const imageElement = document.createElement('img');
//             imageElement.src = recipeDetails.image;
//             imageElement.classList.add('recipe-img');
//             imageElement.setAttribute('alt', recipeDetails.title);
//             imageElement.style.filter = 'brightness(70%)';
//             recipeElement.appendChild(imageElement);

//             const labelContainer = document.createElement('div');
//             labelContainer.classList.add('label-container');

//             if (recipeDetails.vegetarian) {
//               const vegetarianLabel = document.createElement('div');
//               vegetarianLabel.classList.add('label', 'label-v');
//               vegetarianLabel.innerHTML = '<i class="fas fa-leaf"></i> Vegetarian';
//               labelContainer.appendChild(vegetarianLabel);
//             }
            
//             if (recipeDetails.vegan) {
//               const veganLabel = document.createElement('div');
//               veganLabel.classList.add('label', 'label-vg');
//               veganLabel.innerHTML = '<i class="fas fa-seedling"></i> Vegan';
//               labelContainer.appendChild(veganLabel);
//             }
            
//             if (recipeDetails.glutenFree) {
//               const glutenFreeLabel = document.createElement('div');
//               glutenFreeLabel.classList.add('label', 'label-gf');
//               glutenFreeLabel.innerHTML = '<i class="fas fa-bread-slice"></i> GF';
//               labelContainer.appendChild(glutenFreeLabel);
//             }
            

//             recipeElement.appendChild(labelContainer);

//             const titleElement = document.createElement('h3');
//             titleElement.textContent = recipeDetails.title;
//             recipeElement.appendChild(titleElement);

//             const ingredientsElement = document.createElement('ul');
//             ingredientsElement.classList.add('ingredients');

//             recipeDetails.extendedIngredients.forEach(ingredient => {
//               const ingredientElement = document.createElement('li');
//               ingredientElement.textContent = ingredient.original;
//               ingredientsElement.appendChild(ingredientElement);
//             });

//             recipeElement.appendChild(ingredientsElement);

//             const buttonContainer = document.createElement('div');
//             buttonContainer.classList.add('button-container');

//             const addButton = document.createElement('button');
//             addButton.classList.add('add-button');
//             addButton.textContent = 'Add to Grocery List';
//             addButton.addEventListener('click', () => {
//               // Add recipe ingredients to grocery list
//             });

//             buttonContainer.appendChild(addButton);
//             recipeElement.appendChild(buttonContainer);

//             container.appendChild(recipeElement);
//           })
//           .catch(error => console.error(error));
//       });
//     })
//     .catch(error => console.error(error));
// }



// document.addEventListener('DOMContentLoaded', () => {
//   getVegetarianLunchMeals();
// });

// Fetch recipes from API and display them on the page
document.getElementById("recipe-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const foodType = document.getElementById("food-type").value;
  const mealType = document.getElementById("meal-type").value;
  const dairyFree = document.getElementById("dairy-free").value;
  const sustainable = document.getElementById("sustainable").value;
  const glutenFree = document.getElementById("gluten-free").value;

  const url = `${API_ENDPOINT}?number=${NUM_RECIPES}&apiKey=${API_KEY}&tags=${foodType}:${mealType}&diet=${dairyFree}&sustainable=${sustainable}&intolerances=gluten${glutenFree}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const recipeList = document.getElementById("recipe-list");
      recipeList.innerHTML = "";
      for (const recipe of data.recipes) {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        const title = document.createElement("h2");
        title.textContent = recipe.title;
        card.appendChild(title);

        const button = document.createElement("button");
        button.textContent = "Select";
        card.appendChild(button);

        recipeList.appendChild(card);
      }
      console.log(data);
    })
    .catch(error => console.log(error));
});


///////////CLIPBOARD CODE/////////////////
function copyToClipboard() {
  const clipboardText = document.getElementById("clipboard").value;
  navigator.clipboard.writeText(clipboardText)
    .then(() => {
      console.log("Text copied to clipboard");
      const clipboardIcon = document.querySelector("#copy-button i");
      const copyButton = document.getElementById("copy-button");
      const borderColor = "var(--accent-color-2)";
      copyButton.style.color = borderColor;
      copyButton.style.borderColor = borderColor;
      clipboardIcon.classList.remove("bi-clipboard");
      clipboardIcon.classList.add("bi-clipboard-check");
      clipboardIcon.style.color = borderColor;
      clipboardIcon.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.3)" },
        { transform: "scale(1)" }
      ], {
        duration: 500
      });
      setTimeout(() => {
        clipboardIcon.classList.remove("bi-clipboard-check");
        clipboardIcon.classList.add("bi-clipboard");
        clipboardIcon.style.color = "";
        copyButton.style.color = "";
        copyButton.style.borderColor = "";
      }, 3000);
    })
    .catch(err => {
      console.error("Failed to copy text: ", err);
    });
}

const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", copyToClipboard);

/////// Toggle function for filter form ////////
const toggleFormBtn = document.getElementById('toggle-form-btn');
const recipeForm = document.getElementById('recipe-form');

toggleFormBtn.addEventListener('click', () => {
  recipeForm.classList.toggle('hidden');
  recipeForm.classList.toggle('fade-in'); // add or remove the .fade-in class
  if (recipeForm.classList.contains('hidden')) {
    recipeForm.querySelector('.close-icon').remove(); // remove the close icon
  } else {
    toggleFormBtn.style.display = "none";
    const closeIconDiv = document.createElement('button');
    closeIconDiv.classList.add('close-icon');
    closeIconDiv.innerHTML = '<i class="bi bi-filter-circle-fill"></i>';

    closeIconDiv.addEventListener('click', () => {
      toggleFormBtn.style.display = "";
      recipeForm.classList.add('hidden');
      recipeForm.classList.remove('fade-in');
      closeIconDiv.remove();
    });
    recipeForm.appendChild(closeIconDiv); // append the close icon to the form element
  }
});
