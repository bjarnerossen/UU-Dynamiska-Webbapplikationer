class RecipeManager {
  constructor() {
    this.API_ENDPOINT = "https://api.spoonacular.com/recipes/";
    this.API_KEY = "be16d19e48ba4d008409e2fa56e7327d";
    this.container = document.getElementById('recipes-content');
    this.recipes = [];
    this.filteredRecipes = [];
    this.filters = {
      vegetarian: document.querySelector("input[data-filter='vegetarian']").checked,
      vegan: document.querySelector("input[data-filter='vegan']").checked,
      glutenFree: document.querySelector("input[data-filter='glutenFree']").checked,
      dairyFree: document.querySelector("input[data-filter='dairyFree']").checked,
      veryHealthy: document.querySelector("input[data-filter='veryHealthy']").checked,
      cheap: document.querySelector("input[data-filter='cheap']").checked,
      veryPopular: document.querySelector("input[data-filter='veryPopular']").checked,
    };
  }

  fetchRecipes() {
    const NUM_RECIPES = 3;

    fetch(`${this.API_ENDPOINT}complexSearch?&type=lunch&apiKey=${this.API_KEY}&number=${NUM_RECIPES}`)
      .then(response => response.json())
      .then(data => {
        this.recipes = data.results;
        // Loop through each recipe
        this.recipes.forEach(recipe => {
          // Make a GET request to the API for the recipe's details
          fetch(`${this.API_ENDPOINT}${recipe.id}/information?includeNutrition=false&apiKey=${this.API_KEY}`)
          .then(response => response.json())
          .then(recipeDetails => {
            recipe.recipeDetails = recipeDetails;
          })
        })
      });
  }

  render(recipeList) {
          recipeList.forEach(recipe => {
            const recipeDetails = recipe.recipeDetails;
            // Create a new div for the recipe
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            // Create an image element and set its attributes
            const imageElement = document.createElement('img');
            imageElement.src = recipeDetails.image;
            imageElement.classList.add('recipe-img');
            imageElement.setAttribute('alt', recipeDetails.tile); // setting alt tag to recipe title

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

            // Get the recipes labels and their container and append to the recipe element
            const labelContainer = this.getLabels(recipeDetails);
            recipeCard.appendChild(labelContainer);

            // const buttonContainer = document.createElement('div');
            // buttonContainer.classList.add('button-container');

            // Create buttons
            const addButton = document.createElement('button');
            addButton.textContent = 'Add';
            const viewButton = document.createElement('button');
            viewButton.textContent = 'View Details';
            
            // Add classes to buttons
            addButton.classList.add('add-button');
            viewButton.classList.add('view-button');
            
            // Append buttons to button container
            // buttonContainer.appendChild(addButton);
            // buttonContainer.appendChild(viewButton);
            
            // Append button container to recipe element
            recipeCard.appendChild(addButton);

            /* on click of the addButton the ingredients for the recipe should be added to the clipboard*/
            addButton.addEventListener('click', () => {
              const clipboard = document.getElementById('clipboard');
              console.log(recipeDetails.extendedIngredients);
              // clipboard.innerText = `${recipeDetails.}`
            })
            // recipeCard.appendChild(viewButton);

            // Appent the recipeElement to the container including all recipe cards
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

  filterItems() {

  }
  

}

manageRecipes = new RecipeManager();
manageRecipes.fetchRecipes();
manageRecipes.render(this.recipes);

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

