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

function handleScroll() {
  const howItWorksSection = document.querySelector('.content h2:nth-of-type(2)');
  const listItems = document.querySelectorAll('.content ol li');
  const ol = document.querySelector('.content ol');
  const viewportHeight = window.innerHeight;

  if (window.scrollY >= howItWorksSection.offsetTop - 200) {
    document.body.style.backgroundColor = 'var(--accent-color-2)';
    document.querySelector('.content').style.color = 'black';
  } else {
    document.body.style.backgroundColor = '';
    document.querySelector('.content').style.color = 'white';
    ol.style.backgroundColor = '';
    ol.style.borderRadius = '';
    ol.style.padding = '';
    listItems.forEach((item) => {
      item.style.color = '';
      item.style.fontSize = '';
      item.style.transition = '';
    });
  }

  listItems.forEach((item, index) => {
    const itemHeight = item.offsetHeight;
    const itemOffsetTop = item.offsetTop;
    const itemMiddle = itemOffsetTop + itemHeight / 2 - viewportHeight / 2;

    if (window.scrollY >= itemMiddle) {
      const nextItem = listItems[index + 1];
      const prevItem = listItems[index - 1];

      item.style.color = 'white';
      item.style.fontSize = '24px';
      item.style.transition = 'color 0.5s ease-in-out, font-size 0.5s 0.2s ease-in-out';
      
      if (nextItem) {
        nextItem.style.color = 'rgba(0,0,0,0.5)';
        nextItem.style.fontSize = '16px';
        nextItem.style.transition = 'color 0.5s 0.2s ease-in-out, font-size 0.5s 0.4s ease-in-out';
      }
      
      if (prevItem) {
        prevItem.style.color = 'rgba(0,0,0,0.5)';
        prevItem.style.fontSize = '16px';
        prevItem.style.transition = 'color 0.5s 0.2s ease-in-out, font-size 0.5s 0.4s ease-in-out';
      }
    } else {
      item.style.color = '';
      item.style.fontSize = '';
      item.style.transition = '';
    }
  });

  if (window.scrollY >= listItems[0].offsetTop - viewportHeight * 0.8) {
    ol.style.backgroundColor = 'darkslateblue';
    ol.style.borderRadius = '10px';
    ol.style.padding = '20px';
    ol.style.transition = 'background-color 0.5s ease-in-out';
  } else {
    ol.style.backgroundColor = '';
    ol.style.borderRadius = '';
    ol.style.padding = '';
    ol.style.transition = 'background-color 0.5s ease-in-out';
  }
}

window.addEventListener('scroll', handleScroll);