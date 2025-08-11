"use strict";

$("#accordion").accordion();

$(document).ready(function(){
    $('.fade').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});


// $(document).ready(function(){
//     $.get('website-types.json', function(data) {

//     });
function loadSiteTypes() {
    let siteTypesCard = document.getElementById("site-types");
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", function() {
        if (this.status == 200) {
            let siteTypes = this.response;
            let displaySites = "";
            for (let i = 0; i < siteTypes.length; i++) {
                let site = siteTypes[i];
                displaySites += `<h3>${site.title}</h3>`;
                console.log(`TITLE: ${site.title}`);
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



function handleFormSubmit(e){
	//prevent default form submission
	e.preventDefault();
    console.log("Form submitted!"); 
    
	// form inputs
	let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let userEmail = document.getElementById("user-email");
    let phoneNumber = document.getElementById("phone-number");
    let websiteUrl = document.getElementById("website-url");
    let userMessage = document.getElementById("user-message");
    let thankYouMessage = document.getElementById("thank-you-message");
    let duplicateEmailMsg = document.getElementById("duplicate-email-msg");
    let duplicateNumberMsg = document.getElementById("duplicate-email-msg");
    let duplicateSiteMsg = document.getElementById("duplicate-site-msg");
    localStorage.setItem('firstName', firstName.value);
    localStorage.setItem('lastName', lastName.value);
    localStorage.setItem('userEmail', userEmail.value);
    localStorage.setItem('phoneNumber', phoneNumber.value);
    localStorage.setItem('websiteUrl', websiteUrl.value);
    localStorage.setItem('userMessage', userMessage.value);
    thankYouMessage.textContent = `Thank you ${firstName.value}!`;

    // reset the form
    firstName.value = "";
	lastName.value = "";
	userEmail.value = "";
	phoneNumber.value = "";
    websiteUrl.value = "";
    userMessage.value = "";

    // if user email, number or website url is the same:
    duplicateEmailMsg.textContent = `Hi again ${firstName.value}! 
        It looks like we already have the email ${userEmail.value} on file`;
    //
}

document.getElementById("consultation-form").addEventListener("submit", handleFormSubmit);