//variables
const form = document.getElementById('request-quote');
const html = new HTMLUI();

//Event Listeners

addEventListeners();

function addEventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        //create the option for the years
       
        html.displayYears();
    
    });
    
    //when the form is submitted
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        //read the values from the form
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;

        //read the radio buttons
        const level = document.querySelector('input[name="level"]:checked').value;

        //checked if all the field have something
        if(make === '' || year === '' || level === '') {
            html.displayError('All the Fields are mandatory');
        } else {
            //clear the previous quotes

            const prevResult = document.querySelector('#result div');
            if(prevResult != null) {
                prevResult.remove();
            }
            //make a quotation
            const insurance = new Insurance(make,year, level);
            const price = insurance.calculateQuotation(insurance);

            //print the result
            html.showResults(price, insurance); 

        }
    });

}


