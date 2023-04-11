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
        this.render();
      });
  }

  render() {
    // Loop through each recipe
    this.recipes.forEach(recipe => {
      // Make a GET request to the API for the recipe's details
      fetch(`${this.API_ENDPOINT}${recipe.id}/information?includeNutrition=false&apiKey=${this.API_KEY}`)
        .then(response => response.json())
        .then(recipeDetails => {
          
          // Create a new div for the recipe
          const recipeCard = document.createElement('div');
          recipeCard.classList.add('recipe-card');

          // Create a div for the min label
          // const readyInMinutesContainer = document.createElement('div');
          // readyInMinutesContainer.classList.add('ready-in-minutes-container');

          // const readyInMinutesSubContainer = document.createElement('div');
          // readyInMinutesSubContainer.classList.add('ready-in-minutes-sub-container');

          // const minNumber = document.createElement('h3');
          // minNumber.classList.add('min-number');
          // minNumber.textContent = `${recipeDetails.readyInMinutes}`;

          // const min = document.createElement('span');
          // min.classList.add('min');
          // min.textContent = 'MINS'

          // readyInMinutesSubContainer.appendChild(minNumber);
          // readyInMinutesSubContainer.appendChild(min);

          // readyInMinutesContainer.appendChild(readyInMinutesSubContainer);
          // recipeCard.appendChild(readyInMinutesContainer);
          

          // Create an image element and set its attributes
          const imageElement = document.createElement('img');
          imageElement.src = recipeDetails.image;
          imageElement.classList.add('recipe-img');
          imageElement.setAttribute('alt', recipeDetails.tile); // setting alt tag to recipe title

          // Append the image element to the recipe element
          recipeCard.appendChild(imageElement);


          // Get the recipes labels and their container and append to the recipe element
          const labelContainer = this.getLabels(recipeDetails);
          recipeCard.appendChild(labelContainer);

          // Create a new h3 element and set its content to the recipes title
          const titleElement = document.createElement('h3');
          titleElement.textContent = recipeDetails.title;

          // Append the title to the recipeElement
          recipeCard.appendChild(titleElement);

          const buttonContainer = document.createElement('div');
          buttonContainer.classList.add('button-container');

          // Create buttons
          const addButton = document.createElement('button');
          const viewButton = document.createElement('button');
          
          // Add classes to buttons
          addButton.classList.add('add-button');
          viewButton.classList.add('view-button');
          
          // Append buttons to button container
          buttonContainer.appendChild(addButton);
          buttonContainer.appendChild(viewButton);
          
          // Append button container to recipe element
          recipeCard.appendChild(buttonContainer);

          // Appent the recipeElement to the container including all recipe cards
          this.container.appendChild(recipeCard);
        });
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


// Recipe-card zoom in effect
// const recipeCard = document.querySelector('.recipe-card');
// recipeCard.addEventListener('click', () => {
//   recipeCard.classList.toggle('open');
// })