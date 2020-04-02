const studentDiv = document.querySelector('.student-list');
const students = studentDiv.querySelectorAll('.student-item');
const itemsPerPage = 10;

// create div and add pagination as class – global variables so search function can access
const paginationDiv  = document.createElement('div');

const pageDiv = document.querySelector('.page');

//search error message 

  //create search error message div
const errorMessageDiv = document.createElement('div');
errorMessageDiv.style.padding = "20px 0px 40px 0px";
errorMessageDiv.textContent = "Sorry! We cannot find any student with that name.";
  //insert error message div after page header, before student-list
pageDiv.insertBefore(errorMessageDiv, studentDiv);

const displayErrorMessage = () => {errorMessageDiv.style.display = "block";}
const hideErrorMessage = () => {errorMessageDiv.style.display = "none";}

//pagination 
paginationDiv.classList.add('pagination');  

  //adding pagionation div as a child of page div
pageDiv.insertBefore(paginationDiv, studentDiv.nextSibling);

  //creating ul and adding it as a child of pagination div
const ul = document.createElement('ul');
paginationDiv.insertBefore(ul, paginationDiv.firstChild);

//search
const pageHeaderDiv = document.querySelector('.page-header');
const header = pageHeaderDiv.firstChild;

const searchDiv  = document.createElement("div");
searchDiv.classList.add("student-search");

const searchInput = document.createElement("input");
searchInput.placeholder = "Search for students...";

const submitButton = document.createElement("button");
submitButton.textContent = "Search";

  //get all students' names in an array for search
const studentNameArray = studentDiv.querySelectorAll('h3');


const showPage = (list, page) => {

  hideErrorMessage();

  let startingIndex;
  let endingIndex;

  for (let i = 0; i < list.length ; i++ ){
      list[i].style.display = "none";
  }

  startingIndex = (page * itemsPerPage ) - itemsPerPage;
  endingIndex = page * itemsPerPage;

  for (let i = startingIndex; i < endingIndex ; i++ ){
    if(list[i]){
      list[i].style.display = "block";
    }
  }
}

showPage(students,1);


//generate, append, and add functionality to pagination buttons
const appendPageLinks = (list) => {

  const pagesNeeded = Math.ceil(list.length / itemsPerPage);

  for ( let i = 0 ; i < pagesNeeded ; i++){

    //create li
    const li = document.createElement('li');
    //create a
    const paginationLink = document.createElement('a');
    //adding li as a child of ul
    ul.insertBefore(li, ul.nextSibling);
    //adding a as a child of li
    li.insertBefore(paginationLink, li.firstChild);

    paginationLink.href = "#";
    paginationLink.text = i + 1; 

    const firstLink = paginationDiv.querySelector('a');
    firstLink.classList.add("active");

    //click event listener for each a element
    paginationLink.addEventListener('click', (e) =>{
      const allLinks = paginationDiv.querySelectorAll('a');
      for ( let i = 0 ; i < allLinks.length ; i++){
        allLinks[i].classList.remove("active");
      }
      e.target.classList.add("active");
      const pagetoshow = e.target.textContent;
      showPage(list, pagetoshow);
      });  

   } // close for loop

} //close appendPageLinks function

appendPageLinks(students);

//function to add search DOM elements
const appendSearch = () => {

  //adding searchDiv as a child of pageHeaderDiv !! need to fix this so that search div is after h2!!
  pageHeaderDiv.insertBefore(searchDiv, header.nextSibling);

  //adding input as child of searchDiv
  searchDiv.insertBefore(searchInput, searchDiv.firstChild);

  //adding submit as another child of searchDiv
  searchDiv.insertBefore(submitButton, searchInput.nextSibling);

}

appendSearch();

const removeOldPagination = () => {

  let currentNumofPagination = ul.childElementCount;
  
  //getting all current pagniation list items 
  const paginationList = paginationDiv.querySelectorAll('li');

  for ( let i = 0 ; i < currentNumofPagination ; i++){
    
    paginationList[i].parentNode.removeChild(paginationList[i]);
  }

}

const searchFunctionality = (input, studentNameArray) => {

  //setting this false initially always, if true at the end, run the block of codes for when search matches is found
  let ifFoundMatch = false;

  //loop over students' names
  for (let i = 0 ; i < studentNameArray.length ; i++){
    students[i].classList.remove("matched");

    // const students = studentDiv.querySelectorAll('.student-item');
    students[i].style.display = "none"; 
    //checks two conditions:
    if(input.value.length !== 0 && studentNameArray[i].textContent.toLowerCase().includes(input.value.toLowerCase())){ 
      students[i].style.display = "block";
      students[i].classList.add("matched");
      
      ifFoundMatch = true;
    }
    else{
      displayErrorMessage();
      
    }
  }  

  if(ifFoundMatch){
    // Clear original pagination 
    removeOldPagination();

    const searchResults = document.querySelectorAll('.matched');
    showPage(searchResults,1);
    appendPageLinks(searchResults);

    hideErrorMessage();
  }

}

//click search button to search
submitButton.addEventListener('click', (e) =>{
  
  searchFunctionality(searchInput, studentNameArray);
});

//press enter to search
searchInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
  
   searchFunctionality(searchInput, studentNameArray);
  }
});




