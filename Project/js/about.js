function addIndexToOL() {
    const ol = document.querySelector('ol');
    const lis = ol.getElementsByTagName('li');
    for (let i = 0; i < lis.length; i++) {
      const index = document.createElement('span');
      index.textContent = (i + 1) + '. ';
      index.style.fontSize = '5rem';
      lis[i].insertBefore(index, lis[i].firstChild);
    }
  }
  
addIndexToOL();

window.addEventListener('scroll', function() {
    var heroHeight = document.querySelector('.hero').offsetHeight;
    var scrollTop = document.documentElement.scrollTop;
    var divider = document.querySelector('.divider');
    
    if (scrollTop > heroHeight) {
      divider.style.display = 'block';
    } else {
      divider.style.display = 'none';
    }
  });

  
  const content = document.querySelector('.content');

  function handleScroll() {
    const hero = document.querySelector('.hero');
    const divider = document.querySelector('.divider');
  
    if (window.pageYOffset > hero.offsetHeight) {
      content.style.marginLeft = '18rem';
      content.style.transition = 'margin-left 0.3s ease-in-out';
      divider.style.display = 'block';
    } else {
      content.style.marginLeft = '0';
      content.style.transition = 'margin-left 0.3s ease-in-out';
      divider.style.display = 'none';
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  