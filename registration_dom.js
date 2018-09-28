// DOM elements
document.addEventListener('DOMContentLoaded', function(){

var input = document.querySelector(".textbox");
var addButton = document.querySelector(".addBtn");
var display = document.querySelector(".displayText");
var resetButton = document.querySelector(".resetBtn")
var select = document.querySelector(".towns")
var message = document.querySelector('.message');


var storage = JSON.parse(localStorage.getItem('key'));
var factory = RegistrationFactory(storage);

function showRegNumbers(numbers) {
  display.innerHTML = "";
  for (var key of numbers) {
    var li = document.createElement('ul');
    li.innerHTML = key;
    display.appendChild(li);
  }
}

showRegNumbers(factory.regMapKeys());

// Add button event listener
addButton.addEventListener("click", function() {
  var inputFeed = input.value;
  var isValid = factory.checkReg(inputFeed)
  if (isValid) {
    localStorage.setItem('key', JSON.stringify(factory.regMap()));
    window.location.reload();
  }
  else{
    message.innerHTML = "Please enter a valid registration number"
    if(inputFeed != isValid) {
    }

  }

});

select.addEventListener('click', function() {
  var city = select.value;
  var regNumbersToDisplay = factory.filter(city);
  showRegNumbers(regNumbersToDisplay);
  if (regNumbersToDisplay) {
    return city;
    window.location.reload();

  }


  // life happily ever after...
});

// Reset button event listener
resetButton.addEventListener("click", function() {
  localStorage.clear();
  window.location.reload();
});

});
