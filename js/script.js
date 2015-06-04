window.onload = (function(){
  (function(){
    var numPickers = document.querySelectorAll('.num-picker'),
      minVal = 1,
      maxVal = 100,
      step = 1,
      pattern = /^\d*((\.|,)\d*)?$/;


    function addChangeValueHandler(elem) {
        var input = elem.querySelector('.form-group__input'),
            btns = elem.querySelectorAll('.num-picker__btn'),
            curVal = input.value;

        btns[0].onclick = function (event) {
            changeValue(false);
        };


        btns[1].onclick = function (event) {
            changeValue(true);
        };

        
        input.onkeyup = validateInput;

        function changeValue(increase) {
            event.preventDefault();
            var newVal = 0;
            if (increase) {
              newVal = +input.value + step;
            }
            else {
              newVal = +input.value - step;
            }

            checkMinMax(newVal);
        };


        function checkMinMax(num) {
            if (num < minVal || num > maxVal) {
                input.value = curVal;
            } else {
                curVal = num;
                input.value = num;
            }
        }

        
        function validateInput(event) {
            event = event || window.event;
            var newVal = event.target.value || '';

            if (newVal.match(pattern) && newVal >= minVal && newVal <= maxVal) {
                // Valid input; update curVal:
                curVal = newVal;
            } else {
                // Invalid input; reset field value:
                event.target.value = curVal;
            }
        }

    }


    for (var i = 0; i < numPickers.length; i++) {
        addChangeValueHandler(numPickers[i]);
    }
  
  })();

  (function(){

    var form = document.querySelector(".feedback-form");
    
    if (!("FormData" in window) || !(form)) return;

    form.addEventListener("submit", function(event) {

      event.preventDefault();
      var data = new FormData(form);

      request(data, function(response) { 
        console.log(response); 
      });

    });

    function request(data, fn) {

       var xhr = new XMLHttpRequest(); 

       xhr.open("post", "http://simonenko.su/academy/echo?" + (new Date()).getTime()); 

       xhr.addEventListener("readystatechange", function() { 

         if (xhr.readyState == 4) { 

           fn(xhr.responseText); 

         } 

       }); 

       xhr.send(data); 

    }

  })();

  (function(){
    if (window.matchMedia("(max-width: 767px)").matches) { 

      var body = document.querySelector('body'),
      burger = document.querySelector('.main-menu__i-burger-wrapper'),
      cross = document.querySelector('.main-menu__i-cross-wrapper'),
      menuHeight = 252,
      menuFolded = true;

      body.style.top =  "-" + menuHeight + "px";
      burger.onclick = function(){
        toggleMenu(menuFolded)
      };
      cross.onclick = function(){
        toggleMenu(menuFolded)
      };



      function toggleMenu(folded){
        if (folded) {
          body.style.top = 0;
          menuFolded = false;
        }

        else {
          body.style.top =  "-" + menuHeight + "px";
          menuFolded = true;
        }

      }

    }
  })();

  (function(){
    if (!(document.querySelector('.travellers-picker'))) { return;}
    var controll = document.querySelector('.travellers-picker'),
        input = controll.querySelector('input');

        controll.onclick = function (event) {
            toggleInputFields();
        };
        controll.onkeyup = function (event) {
            toggleInputFields();
        };

    function toggleInputFields(){
      var val = input.value,
      inputArea = document.querySelector('.travellers'),
      curFieldsNum = inputArea.children.length;
      
      if (val >= curFieldsNum) {
        var numToAdd = val - curFieldsNum;

        for (var i = 0; i < numToAdd; i++) {
          var num = curFieldsNum + i + 1;
          template = '<div class="traveller-info"><div class="traveller-info__num-wrapper"><p class="form-group__label form-group__label--centered">&numero;</p><p class="traveller-info__num">' + num + '</p></div><div class="traveller-info__details"><div class="traveller-info__column-3"><label class="form-group__label" for="">Фамилия: <span class="important">*</span></label><input class="form-group__input" type="text" id="travSurname' + num + '" name="trav-surname-' + num + '" value="Иванов" required></div><div class="traveller-info__column-3"><label class="form-group__label" for="">Имя:<span class="important">*</span></label><input class="form-group__input" type="text" id="travName' + num + '" name="trav-name-' + num + '" value="Пётр" required></div><div class="traveller-info__column-3"><label class="form-group__label" for="">Отчество:</label><input class="form-group__input" type="text" id="travMidname' + num + '" name="trav-midname-' + num + '" value="Александрович"></div></div></div>';
          inputArea.innerHTML += template;
        }
      }

      else {
        var numToRemove = curFieldsNum - val;

        for (var i = 0; i < numToRemove; i++) {
          inputArea.removeChild(inputArea.lastElementChild);
        }

      }
          

    }

  })();

  (function(){
    var map;

    function initialize(){

      var address = new google.maps.LatLng(34.8543784,-111.7951384,13),
          mapOptions = {
            center: address,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: false,
            scrollwheel: false,
            panControl: false
          };


      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


      var marker = new google.maps.Marker({
            position: address,
            map: map,
            title:"Sedona",
            icon: 'img/map-marker.svg'
          });

      
    }

    initialize();

    google.maps.event.addDomListener(window, "resize", function() {
     var center = map.getCenter();
     google.maps.event.trigger(map, "resize");
     map.setCenter(center); 
    });


  })();

})()