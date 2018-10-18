// DOM elements
document.addEventListener('DOMContentLoaded', function () {
  // get a reference to the template script tag
  var templateSource = document.querySelector(".userTemplate").innerHTML;
  // compile the template
  var userTemplate = Handlebars.compile(templateSource);
  var insertData = document.querySelector('.displayText')

  var input = document.querySelector(".textbox");
  var addButton = document.querySelector(".addBtn");
  var display = document.querySelector(".displayText");
  var resetButton = document.querySelector(".resetBtn")
  var select = document.querySelector(".towns")
  var message = document.querySelector('.message');


  var storage = JSON.parse(localStorage.getItem('key'));
  var factory = RegistrationFactory(storage);

  let reg = {
    number:factory.regMapKeys()
  }

  insertData.innerHTML = userTemplate(reg)

  // showRegNumbers(factory.regMapKeys());

  // Add button event listener
  addButton.addEventListener("click", function () {
    
    var inputFeed = input.value;
    var isValid = factory.checkReg(inputFeed)
    if (isValid) {
      localStorage.setItem('key', JSON.stringify(factory.regMap()));
      window.location.reload();
     var regList = {
        list: factory.regMap()
      }
      userTemplate(regList)        
    }
    
    else {


      message.innerHTML = "Please enter a valid registration number"
      if (inputFeed != isValid) {
      }

    }

  });

  select.addEventListener('click', function () {
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
  resetButton.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
  });

});
