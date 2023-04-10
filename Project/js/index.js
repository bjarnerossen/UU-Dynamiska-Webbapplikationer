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