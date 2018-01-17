// query the ul element
const ul = document.querySelector('.student-list');
// query all li
const lis = document.querySelectorAll('.student-list li');
// query the page div
const page = document.querySelector('.page');

// create a div for pagination links
const paginate = (n) => {
  // create the pagination div
  const paginationDiv = document.createElement('div');
  // ... and the ul for links
  const ulLinks = document.createElement('ul');
  // add as many li with links as necessary
  for (let i = 0; i < n ; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    if (i === 0) a.setAttribute('class', 'active');
    a.innerText = i + 1;
    li.appendChild(a);
    ulLinks.appendChild(li);
  }
  paginationDiv.appendChild(ulLinks);
  paginationDiv.setAttribute('class', 'pagination');
  page.appendChild(paginationDiv);
}
//
const displayRange = (list, min, max) => {
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = (i >= min && i < max) ? '' : 'none';
  }
}

// set the first childs of the listed elements active at the index
const setOneActive = (list, index) => {
  for (let i = 0; i < list.length; i++) {
    list[i].firstChild.className = (i === index) ? 'active' : '';
  }
}

// if the ul has more than 10 items, create a pagination
if (lis.length > 10) {
  paginate( Math.floor(lis.length/10 + 1) );
  //create a variable for the ul of links
  const paginationUl = document.querySelector('.pagination');
  // an array of pagination links
  const links = document.querySelectorAll('.pagination li');

  // at first display the 10 first li
  displayRange(lis, 0, 10);
  // eventListener on pagination to add and remove css display property
  paginationUl.addEventListener('click', (e) => {
    // display the item supposed to be on the page
    let pageNumber = parseInt(e.target.textContent);
    let min = (pageNumber - 1) * 10;
    let max = min + 10;
    displayRange(lis, min, max);
    // change the attribute on the links
    setOneActive(links, pageNumber - 1);
  });
}
