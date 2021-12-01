function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const submitBtn = document.querySelectorAll(".btn-submit");
const mail = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const champs = document.querySelectorAll("#first, #last, #email, #birthdate, #quantity");
const locationError = document.querySelector(".advert.location");
const locationForm = document.querySelector(".formData.location");
const agreeInput = document.getElementById("checkbox1");
const agreeAdvert = document.querySelector(".advert.agree");
const finalMessage = document.getElementById("finalmessage");

//RegEX
const oneLetterRegex = new RegExp('^[A-zÀ-ÿ{1}]$')
const nameRegex = new RegExp('^[A-zÀ-ÿ]{2,}$')
const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.forEach((span) => span.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal(){
  modalbg.style.display = "none";
}

// check if all input is valid
let error
function validate(){
  checkIfEmpty();
  checkMatch("first", nameRegex, "prénom");
  checkMatch("last", nameRegex, "nom");
  checkMatch("email", mailRegex, "mail");
  checkDate();
  //if one of the input is false the form don't send
  if(error == false){
    finalMessage.style.display = "flex";
    document.getElementById("content").style.display = "none"
    document.querySelector("form").reset()
  }
}

//error when empty input
function checkIfEmpty(){
error = false
  //event when location is empty
  let localisation = document.querySelectorAll("input[name='location']:checked");
  if(localisation.length == 0){
    locationError.style.display = "block"
    locationError.innerHTML = "Veuillez remplir ce champ"
    locationForm.style.border = "rgb(250, 50, 50) .16rem solid"
    error = true
  }else{
    locationError.style.display = "none"
    locationForm.style.border = "none"
  }

  //event when one of the Input element is empty (except location)
  champs.forEach(element => {
  if(element.value == ""){
    document.querySelector("#" + element.id + "+ .advert").innerHTML = "Veuillez remplir ce champ"
    document.querySelector("#" + element.id + "+ .advert").style.display = "block"
    element.style.border = "rgb(250, 50, 50) .16rem solid"
    error = true
  }else{
    document.querySelector("#" + element.id + "+ .advert").style.display = "none"
    element.style.border = "none"
  }
  });

  //event when agree is not checked
  if(agreeInput.checked){
    agreeAdvert.style.display = "none"
  }else{
    agreeAdvert.innerHTML = "Veuillez accepter"
    agreeAdvert.style.display = "block"
    error = true
  }
}

//check if the input date is correct
function checkDate(){
  let inputDate = new Date(birthdate.value)
  let date = new Date()
  if(inputDate > date){
    document.querySelector("#birthdate + .advert").style.display = "block"
    document.querySelector("#birthdate + .advert").innerHTML = "Vérifiez votre date de naissance"
    birthdate.style.border = "rgb(250, 50, 50) .16em solid"
    error = true
  }
}

//check if first name and last name is okay
function checkMatch(verify, verification, alert){
  if(verification.test(document.getElementById(verify).value) == false && document.getElementById(verify).value != ""){
    document.querySelector("#" + verify + "+ .advert").style.display = "block"
    document.querySelector("#" + verify + "+ .advert").innerHTML = "Votre "+ alert +" est incorrect"
    document.getElementById(verify).style.border = "rgb(250, 50, 50) .16em solid"

    //check if the input includes just 1 letter
    if(verify != "email" && oneLetterRegex.test(document.getElementById(verify).value)){
      document.querySelector("#" + verify + "+ .advert").innerHTML = "Votre nom doit contenir minimum 2 lettres"
    }
    error = true
  }
}

//for close the confirmation message
function closeFinal(){
  location.reload();
}