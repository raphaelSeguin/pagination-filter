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
const removeClass = (el, classToRemove) => {
  let classString = el.className;
  const classIndex = classString.indexOf(classToRemove);
  if ( classIndex !== -1 ) {
    // removes the space before the class name if not in 1st position
    if (classIndex !== 0) {
      classToRemove = ' ' + classToRemove;
    }
    classString = classString.replace(classToRemove, '');
  }
  el.className = classString;
}
const appendSearchBox = (el) => {
  const div = document.createElement('div');
  div.innerHTML = `<input placeholder="Search for students...">
    <button>Search</button>`;
  div.className = "student-search";
  el.appendChild(div);
}
const appendPaginationDiv = (el) => {
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  el.appendChild(paginationDiv);
}
const markUnmatchedItems = (list, string) => {
  const testExp = new RegExp(string);
  // for each list item, retrieve h3 and span textContent and concatenate it with a space
  for (let i = 0; i < list.length; i++) {
    const studentName = list[i].getElementsByTagName('h3')[0].textContent;
    const studentMail = list[i].getElementsByClassName('email')[0].textContent;
    // test for presence of match-not class
    const hasMatchNotClass = /match-not/.test(list[i].className);
    if ( ! testExp.test(studentName + " " + studentMail) ) {
      // if matchNot is present leave it there or add it
      if (! hasMatchNotClass) {
        list[i].className += ' match-not';
      }
    } else if (hasMatchNotClass) {
      removeClass(list[i], 'match-not');
    }
  }
}
const setOneActive = (list, index) => {
  for (let i = 0; i < list.length; i++) {
    list[i].firstChild.className = (i === index) ? 'active' : '';
  }
}
const displayPage = (list, page) => {
  // set the css display prop of elements in the list
  // counts the elements to be displayed
  let counter = 0;
  // set range to be displayed
  let min = (page - 1) * maxStudentsPerPage;
  let max = page * maxStudentsPerPage;
  for (let i = 0; i < list.length; i++) {
    // does this item match the search ?
    let match = ! list[i].className.includes('match-not');
    // increment the counter if not-match not present
    counter += match ? 1 : 0;
    // set display '' if in the range && matches the search
    list[i].style.display = match && counter > min && counter <= max ? '' : 'none';
  }
}
const paginate = () => {
  // count the items to be displayed (has not class match-not)
  let elementsNumber = 0;
  for (let i = 0; i < studentList.length; i++) {
    elementsNumber += studentList[i].className.includes("match-not") ? 0 : 1;
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
    const ulLinks = document.createElement('ul');
    // add as many links as number of pages
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
    const links = document.querySelectorAll('.pagination li');
    // set a event handler
    ulLinks.addEventListener('click', (e) => {
      // display the item supposed to be on the page
      let pageNumber = parseInt(e.target.textContent);
      displayPage(studentList, pageNumber);
      setOneActive(links, pageNumber - 1);
    });
  } else {
    if (elementsNumber === 0) {
      const message = document.createElement('p');
      message.className = "sorry-message";
      message.innerText = 'Sorry, no match were found.';
      page.appendChild(message);
    }
  }
  displayPage(studentList, 1);
}

// ************************
// Add elements to the page
// ************************

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
  // change classes of list items acco
  markUnmatchedItems(studentList, searchBox.value);
  // refresh the pagination
  paginate();
});

// **********************
// paginate !
// **********************
paginate();
