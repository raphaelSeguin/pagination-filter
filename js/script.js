// GLOBAL VARIABLE
const maxStudentsPerPage = 10;

// **********************
// Querys
// **********************

const pageHeader = document.getElementsByClassName('page-header')[0];
const studentList = document.querySelector('.student-list').children;
const page = document.querySelector('.page');

// **********************
// functions
// **********************

// append a search box to en element
const appendSearchBox = (el) => {
  // create the div
  const div = document.createElement('div');
  // fill it with html
  div.innerHTML = `<input placeholder="Search for students...">
    <button>Search</button>`;
  // set the class
  div.className = "student-search";
  // append it to el (argument)
  el.appendChild(div);
};
// append a pagination div to an element
const appendPaginationDiv = (el) => {
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  el.appendChild(paginationDiv);
};
// take a list and test that item match the string, add or remove class accordingly
const markUnmatchedItems = (list, string) => {
  const testExp = new RegExp(string);
  // for each list item, retrieve h3 and span textContent
  for (let i = 0; i < list.length; i++) {
    const studentName = list[i].getElementsByTagName('h3')[0].textContent;
    const studentMail = list[i].getElementsByClassName('email')[0].textContent;
    // test for presence of match-not class
    const hasMatchNotClass = list[i].classList.contains('match-not');
    // if the item doesn't match the search string
    if ( ! testExp.test(studentName + " " + studentMail) ) {
      list[i].classList.add('match-not');
    } else {
      list[i].classList.remove('match-not');
    }
  }
};
// set class property of the list active at the index, empty anywhere else
const setOneActive = (list, index) => {
  for (let i = 0; i < list.length; i++) {
    list[i].firstChild.className = (i === index) ? 'active' : '';
  }
};
// set the css display property of the students list according to the search and the page selected
const displayPage = (list, page) => {
  // counts the elements to be displayed
  let counter = 0;
  // set range to be displayed
  let min = (page - 1) * maxStudentsPerPage;
  let max = page * maxStudentsPerPage;
  for (let i = 0; i < list.length; i++) {
    // does this item match the search ?
    let match = ! list[i].classList.contains('match-not');
    // increment the counter if not-match not present
    counter += match ? 1 : 0;
    // set display '' if in the range && matches the search
    list[i].style.display = match && counter > min && counter <= max ? '' : 'none';
  }
}
//
const paginate = () => {
  // count the items to be displayed (has not class match-not)
  let elementsNumber = 0;
  for (let i = 0; i < studentList.length; i++) {
    elementsNumber += studentList[i].classList.contains('match-not') ? 0 : 1;
  }
  // suppress sorry message if any
  const sorry = document.getElementsByClassName('sorry-message')[0];
  if (sorry) page.removeChild(sorry);
  // replace the content of the pagination paginationDiv
  paginationDiv.innerHTML = '';
  // if more elements than maxStudentsPerPage
  if ( elementsNumber > maxStudentsPerPage ) {
    // add as many li with links as necessary numberOfPages
    let numberOfPages = Math.ceil( elementsNumber/maxStudentsPerPage);
    // create an unordered list
    const ulLinks = document.createElement('ul');
    // add as many links as the number of pages
    for (let i = 0; i < numberOfPages ; i++){
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
    // query the links
    const links = document.querySelectorAll('.pagination li');
    // set a event handler to the ul
    ulLinks.addEventListener('click', (e) => {
      // display the item supposed to be on the page
      let pageNumber = parseInt(e.target.textContent);
      // display the page indicated by the link
      displayPage(studentList, pageNumber);
      // set this link active and deactivate the others
      setOneActive(links, pageNumber - 1);
    });
    // else if there's no match for the search, display a message
  } else if (elementsNumber === 0) {
    const message = document.createElement('p');
    message.className = "sorry-message";
    message.innerText = 'Sorry, no match were found.';
    page.appendChild(message);
  }
  displayPage(studentList, 1);
}

// ************************
// Add elements to the page
// ************************

// if javascript works append a search box and an empty pagination div
appendSearchBox(pageHeader);
appendPaginationDiv(page);

// query new elements created dynamically
const searchBox = document.querySelector('input');
const searchButton = document.querySelector('button');
const paginationDiv = document.querySelector('.pagination');

// ***************************
// Search button event handler
// ***************************

searchButton.addEventListener('click', () => {
  // change classes of list items if they match or not
  markUnmatchedItems(studentList, searchBox.value);
  // refresh the pagination
  paginate();
});

// **********************
// paginate !
// **********************

paginate();
