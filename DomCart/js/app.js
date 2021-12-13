//variables
const courses = document.querySelector('#courses-list');
shoppingCartContent = document.querySelector('#cart-content tbody'),
clearCartBtn = document.querySelector('#clear-cart');

//eventlisteners

loadEventListeners();

function loadEventListeners() {
    //adding course
    courses.addEventListener('click', buyCourse);
    //when the remove button click
    shoppingCartContent.addEventListener('click', removeCourse);
     //clear cart Btn
     clearCartBtn.addEventListener('click', clearCart);
     //document ready
     document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}


//functions

function buyCourse(e) {
    e.preventDefault();

    //use delegation to find the course added

    if(e.target.classList.contains('add-to-cart')) {
        //read the course value
        const course = e.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);
    }
}

function getCourseInfo(course) {
    //Create an Object with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    //Add into cart
    addIntoCart(courseInfo);

}
//Display the course into the Shopping Cart

function addIntoCart(course) {
     //create a <tr>
     const row = document.createElement('tr');

     //Build the Template
     row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100> 
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id=${course.id}">X</a>
            </td>
        </tr>
     
     `;
    //add into the shopping cart
    shoppingCartContent.appendChild(row);

    //Add Course into Storage
    saveIntoStorage(course);
}

function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    //add course into the array
    courses.push(course);

    //convert JSON into String
    localStorage.setItem('courses', JSON.stringify(courses));

}
//Get the content ito storage
function getCoursesFromStorage() {
    let courses;

    //if somthing exist into the storage
    if(localStorage.getItem('courses') === null) {
        courses = [];
    }else{
        courses = JSON.parse(localStorage.getItem('courses'));

    }
    return courses;
}
//remove course from the shopping cart
function removeCourse(e) {
   let course, courseId;

    //remove from the dom
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement; 
        courseId = course.querySelector('a').getAttribute('data-id'); 
    }
    console.log(courseId);
    //remove from the local Storage
    removeCourseLocalStorage(courseId);

}
//remove from local storage 
function removeCourseLocalStorage(id) {
    //get the local storage data
    let coursesLS = getCoursesFromStorage();

    //loop through the array and index to remove
    coursesLS.forEach(function(courseLS, index) {
         if(courseLS.id === id) {
             coursesLS.splice(index, 1);
         }
    });
    
     //add the rest of the array
     localStorage.setItem('courses', JSON.stringify(coursesLS));

}
//clear the shopping cart
function clearCart() {
    //shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //clear local storage
    clearLocalStorage();

}

function clearLocalStorage() {
    localStorage.clear();
}

//load when document is ready
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    //loop through the courses and print into the carts
    coursesLS.forEach(function(course) {
        //create the <tr>
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100> 
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id=${course.id}">X</a>
            </td>
        </tr>
        
        
        `;
        shoppingCartContent.appendChild(row);
    });
}