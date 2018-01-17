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
  // add as many li with links as necessary (n)
  for (let i = 0; i < n ; i++){
    // create li element
    const li = document.createElement('li');
    // create a element
    const a = document.createElement('a');
    // set the href attribute of a
    a.setAttribute('href', '#');
    // set the class attribute of the first a to active
    if (i === 0) a.setAttribute('class', 'active');
    // set the inner text of a to display the page number
    a.innerText = i + 1;
    // append a to li
    li.appendChild(a);
    // append li to ul
    ulLinks.appendChild(li);
  }
  // add the ul to the pagination div
  paginationDiv.appendChild(ulLinks);
  // set the pagination div's class
  paginationDiv.setAttribute('class', 'pagination');
  // append the pagination div to the page
  page.appendChild(paginationDiv);
}
// Set the css display property of the elements in the list to none if not in the range, '' otherwise
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
