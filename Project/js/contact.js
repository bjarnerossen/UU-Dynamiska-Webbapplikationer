function showConfirmationMessage() {
    const messageElement = document.createElement('p');
    messageElement.textContent = 'Thank you! Your message has been sent.';
    messageElement.style.color = 'var(--accent-color-2)';
    const formElement = document.querySelector('form');
    formElement.parentNode.insertBefore(messageElement, formElement);
    
    // Reset the form after displaying the confirmation message
    formElement.reset();
  
    // Hide the confirmation message after a delay
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000); // Change the delay time as needed (in milliseconds)
  }
  
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showConfirmationMessage();
  });