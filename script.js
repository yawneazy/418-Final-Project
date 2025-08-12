"use strict";

// For JQuery accordion widget
$("#accordion").accordion();

// For Slick carousel slides
$(document).ready(function(){
    $('.fade').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});

// Loads the site type data from added JSON file site-types.json
function loadSiteTypes() {
    // attempt to add cards 
    let siteTypesCard = document.getElementById("site-types");
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    // When the request finishes loading
    xhr.addEventListener("load", function() {
        if (this.status == 200) {
            let siteTypes = this.response;
            let displaySites = "";
            // Loops through each slide type
            for (let i = 0; i < siteTypes.length; i++) {
                let site = siteTypes[i];
                displaySites += 
                `<div class="card">
                <img src="${site.image}" alt="${site.title}" class="card-image">
                <h3>${site.title}</h3>
                <p>${site.description}</p>
                </div>`;
            }
            siteTypesCard.innerHTML = displaySites;
        } else {
            siteTypesCard.innerHTML = "Site Types didn't load.";
        }
    });
    xhr.open("GET", "site-types.json");
    xhr.send();
}

$(document).ready(function() {
    loadSiteTypes();
});


// Handles form submission, uses local storage
function handleFormSubmit(e){
	//prevent default form submission
	e.preventDefault();
    
	// form inputs
	let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let userEmail = document.getElementById("user-email");
    let phoneNumber = document.getElementById("phone-number");
    let websiteUrl = document.getElementById("website-url");
    let userMessage = document.getElementById("user-message");
    let thankYouMessage = document.getElementById("thank-you-message");

    // Sets items for local storage
    localStorage.setItem('firstName', firstName.value);
    localStorage.setItem('lastName', lastName.value);
    localStorage.setItem('userEmail', userEmail.value);
    localStorage.setItem('phoneNumber', phoneNumber.value);
    localStorage.setItem('websiteUrl', websiteUrl.value);
    localStorage.setItem('userMessage', userMessage.value);

    // For thank you message that will display users name after
    // they fill out the form
    thankYouMessage.textContent = `Thank you ${firstName.value}! You will hear from me within 24 hours!:)`;

    // reset the form
    firstName.value = "";
	lastName.value = "";
	userEmail.value = "";
	phoneNumber.value = "";
    websiteUrl.value = "";
    userMessage.value = "";
}

// Calls handleFormSubmit after form is submitted
document.getElementById("consultation-form").addEventListener("submit", handleFormSubmit);