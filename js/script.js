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

    // Closure for AJAX from sending and photo-previews manipulation

    var form = document.querySelector(".feedback-form");
    
    if (!("FormData" in window) || !(form)) return;

    form.addEventListener("submit", function(event) {

      event.preventDefault();
      var data = new FormData(form);

      queue.forEach(function(el){
        data.append("images", el.file);
      });

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

    if ("FileReader" in window) {
      var area = document.querySelector(".previews"),
          template = document.querySelector("#image-template").innerHTML;
          queue = []; 
      
      form.querySelector("#photo").addEventListener("change", function() { 
        var files = this.files; 
        for (var i = 0; i < files.length; i++) { 
          preview(files[i]); 
        } 
        this.value = "";

      }); 

      function preview(file) {
        if (file.type.match(/image.*/)) { 
          var reader = new FileReader(); 

          reader.addEventListener("load", function(event) { 
            var html = Mustache.render(template, { 
              "image": event.target.result, 
              "name": file.name 
              }),

                div = document.createElement('div');
              
              div.classList.add("previews__thumbnail");
              div.innerHTML = html;

            area.appendChild(div);

            div.querySelector(".previews__closer").addEventListener('click', 
              function(event){
                event.preventDefault();
                removePreview(div);
              });

            queue.push({file: file, div: div});
          }); 

          reader.readAsDataURL(file); 

        }
      }

      function removePreview(div) {
        queue = queue.filter(function(el){
          return el.div != div;
        });

        div.parentNode.removeChild(div);

      }

      var defaultThumbs = document.querySelectorAll(".previews__thumbnail");

      for (var i = 0; i < defaultThumbs.length; i++) { 

        var btn = defaultThumbs[i].querySelector(".previews__closer");

        btn.addEventListener("click", 
          function(event) {
            removePreview(event.target.parentNode);
          });
          
        } 



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
    if (!(document.querySelector('#travellers-picker'))) { return;}
    var controll = document.querySelector('#travellers-picker'),
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

    // Google maps closure

    var map,
        canvas = document.getElementById("map-canvas");

    if(!(canvas)) { return; }

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


      map = new google.maps.Map( canvas, mapOptions);


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

  (function(){
    //Closure to format date inputs with moment.js

    var dateInputs = document.querySelectorAll('.input-date');

    if (!(dateInputs[0])) { return; }

    var controll = document.querySelector('#days-picker');

        controll.onclick = function (event) {
            calcDepartureDate();
        };
        controll.onkeyup = function (event) {
            calcDepartureDate();
        };

    function dateConvert(input){

      var curVal = input.value;
      input.value = moment(curVal, ["DD MMMM YY", "DD MM YY", "DD MM YYYY", "DD MMMM YYYY" ]).format("D MMMM YYYY");
      calcDepartureDate();

    }

    function calcDepartureDate(){
      var arrival = document.querySelector('#arrival'),
          stay = document.querySelector('#stay-length'),
          departure = document.querySelector('#departure');

          departureDate = moment(arrival.value, "D MMMM YYYY").add(stay.value, 'days').format("D MMMM YYYY");

          departure.value = departureDate;
  
    }

      for (var i = 0; i < dateInputs.length; i++) {
        dateConvert(dateInputs[i]);
        dateInputs[i].addEventListener('blur', function(event){
          
          event = event || window.event;
          dateConvert(event.target);

        });
    }
  })();

  (function(){
    //Closure to hide popups on click

    var popups = document.querySelectorAll('.popup');

    if (!(popups)) { return }

    function findPopup (el) {
      var counter = 0;
      
        if (el.parentNode.classList.contains('popup')) {
          el.parentNode.style.display = "none";
        }
        else {
            findPopup(el.parentNode);
        }
    }

    function hidePopupListener(event){
      event = event || window.event;
      findPopup(event.target);
    }

    for (var i = 0; i < popups.length; i++) {
        var btn = popups[i].querySelector('.btn');
        btn.addEventListener('click', hidePopupListener);
    }

  })();

  (function(){
    // if (!("FormData" in window)) { 
    //   return; 
    // }

    // var form = document.querySelector(".writing-haircut"); 
    
    // form.addEventListener("submit", function(event) { 

    //   event.preventDefault(); 
    //   var data = new FormData(form); 
    //   request(data, function(response) { 

    //     console.log(response); 

    //   }); 

    // });

    // function request(data, fn) { ... } 

    

  })();

})()