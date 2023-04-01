function emoji_swapper() {
    const emojis = ['🍅', '🍆', '🥑', '🥕', '🥦', '🌶️', '🥒', '🍠', '🍄', '🥔', '🌽', '🥬', '🥕', '🍆', '🍅', '🍎', '🍇', '🍈', '🍉', '🍊', '🍋', '🍍', '🍌', '🍐', '🍑', '🍓', '🥝', '🫐', '🥭', '🌮', '🍛', '🍚', '🥙', '🧇', '🥞', '🌯', '🍲', '🥘'];
    const food_emoji = document.querySelector(".food-emoji");
  
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      food_emoji.innerHTML = emojis[randomIndex];
    }, 5000);
  }
  
  emoji_swapper();

  const btn = document.querySelector('.index_btn');

  btn.addEventListener('click', () => {
    window.location.href = '../html/recipes.html';
  });

// Phone mockup

const groceryItems = [
    { name: 'Apples', quantity: '3 pcs' },
    { name: 'Bananas', quantity: '2 pcs' },
    { name: 'Oranges', quantity: '4 pcs' },
    { name: 'Milk', quantity: '2L' },
    { name: 'Bread', quantity: '1 loaf' },
    { name: 'Eggs', quantity: '12 pcs' }
  ];
  
  const groceryList = document.querySelector('.grocery-list');
  const listTitle = document.createElement('h3');
  listTitle.innerText = 'Grocery List'

  groceryList.insertBefore(listTitle,null);
  groceryItems.forEach((item) => {
    const listItem = document.createElement('div');
    listItem.classList.add('grocery-item');
    const itemName = document.createElement('span');
    itemName.classList.add('item-name');
    itemName.style.fontWeight = 'bold';
    itemName.textContent = item.name;
    const itemQuantity = document.createElement('span');
    itemQuantity.classList.add('item-quantity');
    itemQuantity.textContent = `- ${item.quantity}`;
    listItem.appendChild(itemName);
    listItem.appendChild(itemQuantity);
    groceryList.appendChild(listItem);
  });
  