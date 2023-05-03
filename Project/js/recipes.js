class RecipeManager {
  constructor() {
    this.API_ENDPOINT = "https://api.spoonacular.com/recipes/";
    this.API_KEY = "be16d19e48ba4d008409e2fa56e7327d";
    this.container = document.getElementById('recipes-content');
    this.recipes = [];
  }

  fetchRecipes() {
    // Setting number of recipes to 3 for the sake of the API-plan
    const NUM_RECIPES = 2;

    const randomNum = Math.floor(Math.random() * 1000);

    // getting values from the checkbox form
    const filterParams = Object.entries({
      vegetarian: document.querySelector("input[data-filter='vegetarian']").checked,
      vegan: document.querySelector("input[data-filter='vegan']").checked,
      glutenFree: document.querySelector("input[data-filter='glutenFree']").checked,
      dairyFree: document.querySelector("input[data-filter='dairyFree']").checked,
      veryHealthy: document.querySelector("input[data-filter='veryHealthy']").checked,
      cheap: document.querySelector("input[data-filter='cheap']").checked,
      veryPopular: document.querySelector("input[data-filter='veryPopular']").checked,
    })
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
      .join("&");

    const url = `${this.API_ENDPOINT}complexSearch?&type=lunch&${filterParams}&apiKey=${this.API_KEY}&number=${NUM_RECIPES}&random=${randomNum}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.recipes.splice(0, this.recipes.length); // Clear the recipes array
        this.recipes.push(...data.results); // Add the new recipes data to the array
        this.recipes = data.results;
        // Create an array to store promises that will fetch recipe details for each recipe
        const recipePromises = this.recipes.map(recipe => {
          return fetch(`${this.API_ENDPOINT}${recipe.id}/information?includeNutrition=false&apiKey=${this.API_KEY}`)
            .then(response => response.json())
            .then(recipeDetails => {
              recipe.recipeDetails = recipeDetails;
            });
        });
        // Wait for all recipe detail promises to resolve before continuing
        return Promise.all(recipePromises);
      })
      .then(() => {
        // Render the recipes after all recipe details have been fetched
        this.render(this.recipes);
      });
  }

  render(recipes) {
          recipes.forEach(recipe => {
            const recipeDetails = recipe.recipeDetails;
            // Create a new div for the recipe
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            // Create an image element and set its attributes
            const imageElement = document.createElement('img');
            imageElement.src = recipeDetails.image;
            imageElement.classList.add('recipe-img');
            imageElement.setAttribute('alt', recipeDetails.title); // setting alt tag to recipe title

            // Append the image element to the recipe element
            recipeCard.appendChild(imageElement);

            // Create a new h3 element and set its content to the recipes title
            const titleElement = document.createElement('h3');
            titleElement.textContent = recipeDetails.title;

            // Append the title to the recipeElement
            recipeCard.appendChild(titleElement);

            // Create span element for the recipe infos
            const recipeInfos = document.createElement('div');
            recipeInfos.classList.add('recipe-infos');

            const readyInMinutesNum = document.createElement('span');
            const readyInMinutesText = document.createElement('span');
            readyInMinutesText.classList.add('info-label');

            // determine whether or not minutes or hours should be displayed
            if (recipeDetails.readyInMinutes > 60) {
              var readyInMinutes = recipeDetails.readyInMinutes;
              var readyInHours = Math.floor(readyInMinutes / 60); // convert minutes to hours, rounded down
              readyInMinutesNum.textContent = `${readyInHours}`;
              readyInMinutesText.textContent = 'h';
            } else {
              var readyInMinutes = recipeDetails.readyInMinutes;
              readyInMinutesNum.textContent = `${readyInMinutes}`;
              readyInMinutesText.textContent = 'Min';
            }

            // Append according text to number
            readyInMinutesNum.appendChild(readyInMinutesText);

            const servingsNum = document.createElement('span');
            const servingsText = document.createElement('span');
            servingsText.classList.add('info-label');

            servingsNum.textContent = `${recipeDetails.servings}`;
            servingsText.textContent = 'Servings';

            servingsNum.appendChild(servingsText);

            // Append 'label' to container
            recipeInfos.appendChild(readyInMinutesNum);
            recipeInfos.appendChild(servingsNum);

            recipeCard.appendChild(recipeInfos);

            // ADD INGREDIENTS HERE
            // Create button to toggle ingredient list 
            const ingredientsBtn = document.createElement('button');

            ingredientsBtn.classList.add('ingredients-button');
            ingredientsBtn.textContent = 'Show Ingredients ↓';

            recipeCard.appendChild(ingredientsBtn);

            // toggle visibility of ingredient list on click
            ingredientsBtn.addEventListener('click', () => {
              const ingredientList = recipeCard.querySelector('.ingredient-list'); // Get the corresponding ingredientList element
              ingredientList.classList.toggle('ingredients-shown'); // Toggle the class "ingredients-shown"
              if (ingredientList.classList.contains('ingredients-shown')) {
                ingredientsBtn.textContent = 'Hide Ingredients ↑'; // Update text content when ingredients are shown
              } else {
                ingredientsBtn.textContent = 'Show Ingredients ↓'; // Update text content when ingredients are hidden
              }
            });


            // Create an unordered list to append ingredients to
            const ingredientList = document.createElement('ul');
            ingredientList.classList.add('ingredient-list','ingredients-hidden');
            // Loop over each ingredient to get the name and right measurement
            recipeDetails.extendedIngredients.forEach(ingredient => {
              // Create li element to store ingredient information
              const ingredientItem = document.createElement('li');
              ingredientItem.classList.add('ingredient');
              // Store ingredient name in a span
              const ingredientName = document.createElement('span');
              ingredientName.classList.add('ingredient-name');
              ingredientName.innerText = `${ingredient.name} `;
              // Store ingredient quantity in a span
              const ingredientQty = document.createElement('span');
              ingredientQty.classList.add('ingredient-qty');
              ingredientQty.innerText = Math.round(ingredient.measures.metric.amount) + " " + ingredient.measures.metric.unitShort;

              // Append ingredient name and qty to li-element
              ingredientItem.appendChild(ingredientName);
              ingredientItem.appendChild(ingredientQty);

              // Append ingredient Item to ingredientList (ul)
              ingredientList.appendChild(ingredientItem);
            });

            // Append ingredientList to the recipe card
            recipeCard.appendChild(ingredientList);

            // Get the recipes labels and their container and append to the recipe element
            const labelContainer = this.getLabels(recipeDetails);
            recipeCard.appendChild(labelContainer);

            // const buttonContainer = document.createElement('div');
            // buttonContainer.classList.add('button-container');

            // Create buttons
            const addButton = document.createElement('button');
            const addIcon = document.createElement('i');
            addIcon.classList.add('fa-solid', 'fa-plus');
            addButton.appendChild(addIcon);
            addButton.textContent = 'Add to grocery list';
            
            // Add classes to buttons
            addButton.classList.add('add-button');
            
      
            // Append button container to recipe element
            recipeCard.appendChild(addButton);

            // Add ingredients to clipboard on click of add-button
            addButton.addEventListener('click', () => {
              const clipboard = document.getElementById('clipboard');
              const ingredientsList = recipeDetails.extendedIngredients.map(ingredient => `${ingredient.name} ${Math.round(ingredient.measures.metric.amount)} ${ingredient.measures.metric.unitShort}`).join('\n');
              
              if (addButton.classList.contains('remove-button')) {
                // If button has 'remove-button' class, remove ingredients from clipboard
                const clipboardLines = clipboard.value.split('\n');
                const updatedClipboard = clipboardLines.filter(line => !line.includes(recipeDetails.title) && !ingredientsList.includes(line)).join('\n');
                clipboard.value = updatedClipboard;
              } else {
                // If button does not have 'remove-button' class, append recipe title and ingredients to clipboard
                clipboard.value += '\n\n' + recipeDetails.title + '\n' + ingredientsList;
              }
            
              addButton.classList.toggle('remove-button'); // Toggle the class "remove-button"
              if (addButton.classList.contains('remove-button')) {
                addButton.textContent = 'Remove from grocery list'; // Update text content when ingredients are shown
              } else {
                addButton.textContent = 'Add to grocery list'; // Update text content when ingredients are hidden
              }
            });
            
            // Append the recipeElement to the container including all recipe cards
            this.container.appendChild(recipeCard);
          });
  }
  getLabels(recipeDetails) {
    // Create an empty label container
    const labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container');
  
    // Add a vegetarian label to the label container if the recipe is vegetarian
    if (recipeDetails.vegetarian) {
      const vegetarianLabel = document.createElement('div');
      vegetarianLabel.classList.add('label', 'label-v');
      vegetarianLabel.innerHTML = '🥕 Vegetarian';
      labelContainer.appendChild(vegetarianLabel);
    }
  
    // Add a vegan label to the label container if the recipe is vegan
    if (recipeDetails.vegan) {
      const veganLabel = document.createElement('div');
      veganLabel.classList.add('label', 'label-vg');
      veganLabel.innerHTML = '🥦 Vegan';
      labelContainer.appendChild(veganLabel);
    }
  
    // Add a gluten-free label to the label container if the recipe is gluten-free
    if (recipeDetails.glutenFree) {
      const glutenFreeLabel = document.createElement('div');
      glutenFreeLabel.classList.add('label', 'label-gf');
      glutenFreeLabel.innerHTML = '🌾 GF';
      labelContainer.appendChild(glutenFreeLabel);
    }
  
    // Add a dairy-free label to the label container if the recipe is dairy-free
    if (recipeDetails.dairyFree) {
      const dairyFreeLabel = document.createElement('div');
      dairyFreeLabel.classList.add('label', 'label-df');
      dairyFreeLabel.innerHTML = '🥛 DF';
      labelContainer.appendChild(dairyFreeLabel);
    }
  
    // Add a cheap label to the label container if the recipe is cheap
    if (recipeDetails.cheap) {
      const cheapLabel = document.createElement('div');
      cheapLabel.classList.add('label', 'label-cheap');
      cheapLabel.innerHTML = '💰 CHEAP';
      labelContainer.appendChild(cheapLabel);
    }
  
    // Add a healthy label to the label container if the recipe is healthy
    if (recipeDetails.veryHealthy) {
      const veryHealthyLabel = document.createElement('div');
      veryHealthyLabel.classList.add('label', 'label-very-healthy');
      veryHealthyLabel.innerHTML = '💪 VERY HEALTHY';
      labelContainer.appendChild(veryHealthyLabel);
    }
  
    // Add a veryPopular label to the label container if the recipe is veryPopular
    if (recipeDetails.veryPopular) {
      const veryPopularLabel = document.createElement('div');
      veryPopularLabel.classList.add('label', 'label-very-popular');
      veryPopularLabel.innerHTML = '🌟 VERY POPULAR';
      labelContainer.appendChild(veryPopularLabel);
    }
  
    // Return the label container
    return labelContainer;
  }

  // Function to filter recipes
  filterItems() {
    this.fetchRecipes();
  }

}

manageRecipes = new RecipeManager();

const filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', () => {
  manageRecipes.container.innerHTML = '';
  manageRecipes.fetchRecipes();
  manageRecipes.render(manageRecipes.recipes);
})

///////////CLIPBOARD CODE/////////////////
function copyToClipboard() {
  const clipboardText = document.getElementById("clipboard").value;
  navigator.clipboard.writeText(clipboardText)
    .then(() => {
      console.log("Text copied to clipboard");
      const copyButton = document.getElementById("copy-button");
      const clipboardIcon = copyButton.querySelector("i");
      copyButton.style.backgroundColor = 'var(--accent-color-1)';
      clipboardIcon.classList.remove("bi-clipboard");
      clipboardIcon.classList.add("bi-clipboard-check");
      setTimeout(() => {
        clipboardIcon.classList.remove("bi-clipboard-check");
        clipboardIcon.classList.add("bi-clipboard");
        clipboardIcon.style.color = "";
        copyButton.style.color = "";
        copyButton.style.backgroundColor = "";
      }, 3000);
    })
    .catch(err => {
      console.error("Failed to copy text: ", err);
    });
}

const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", copyToClipboard);