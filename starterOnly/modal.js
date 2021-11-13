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
const birthdate = document.getElementById("birthdate")
const champs = document.querySelectorAll("#first, #last, #email, #birthdate, #quantity");
const locationError = document.querySelector(".advert.location");
const locationForm = document.querySelector(".formData.location");
const agreeInput = document.getElementById("checkbox1");
const agreeAdvert = document.querySelector(".advert.agree")

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

let error
// check if all input is valid
function validate(){
  error = 0
  checkIfEmpty();
  checkDate();
  //if one of the input is false the form don't send
  if(error == true){
    return false
  }
}

function checkIfEmpty(){

  //event when location is empty
  let localisation = document.querySelectorAll("input[name='location']:checked");
  if(localisation.length == 0){
    locationError.style.display = "block"
    locationError.innerHTML = "Veuillez remplir ce champ"
    locationForm.style.border = "red .16rem solid"
    error = true
  }else{
    locationError.style.display = "none"
    locationForm.style.border = "none"
  }

  //event when one of the Input element is empty
  champs.forEach(element => {
  if(element.value == ""){
    document.querySelector("#" + element.id + "+ .advert").innerHTML = "Veuillez remplir ce champ"
    document.querySelector("#" + element.id + "+ .advert").style.display = "block"
    element.style.border = "red .16rem solid"
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

function checkDate(){
  let inputDate = new Date(birthdate.value)
  let date = new Date()
  if(inputDate > date){
    document.querySelector("#birthdate + .advert").style.display = "block"
    document.querySelector("#birthdate + .advert").innerHTML = "Vérifiez votre date de naissance"
    birthdate.style.border = "red .16em solid"
    error = true
  }else{
    document.querySelector("#birthdate + .advert").style.display = "none"
    birthdate.style.border = "none"
  }
}