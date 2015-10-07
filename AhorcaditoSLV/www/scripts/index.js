// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var lugar = "main";
var posX = 0;
var posY = 0;
var category = "";
var systemsWords = ["microsoft", "cordova", "cloud", "visual studio", "xbox", "azure"];
var systemsHelp = ["Empresa que surge y revoluciona las computadoras personales",
                    "framework de desarrollo híbrido", "las empresas ahora optan por _______ computing",
                    "El mejor y más completo IDE", "Consola para divertirte solo o con amigos", "´Servicios empresariales en la nube que responde a todo"
                    ];
var systemsWordsCount = systemsWords.length;
var chosenWord = "";

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        document.getElementById("btMainPlay").addEventListener("click", showCategories, false);
        document.getElementById("systemsOption").addEventListener("click", playSystems, false);
        document.getElementById("btBackCategories").addEventListener("click", showMain, false);
        document.getElementById("btBackScreenPlay").addEventListener("click", showConfirm, false);
        
        document.addEventListener("backbutton", function (e) {
            if (lugar == "main") {
                e.preventDefault();
                navigator.app.exitApp();
            }
            else if (lugar == "pantallaJugar") {
                e.preventDefault();
                $("#pantallaJugar").addClass('hidden');
                $("#categories").removeClass('hidden');
                lugar = "categories";
            } else if (lugar == "categories") {
                $("#categories").addClass('hidden');
                $("#main").removeClass('hidden');
                lugar = "main";
            }else {
                e.preventDefault();
                navigator.app.exitApp();
            }
        }, false);
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
        console.log("Suspended");
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
    
    

})();

function playSystems() {
    playGame("systems");
}
function playGame(choosen) {
    switch (choosen) {
        case "systems":
            category = "systems";
            var wordIndex = Math.floor(Math.random() * (systemsWordsCount - 1));
            chosenWord = systemsWords[wordIndex];
            break;
    };
    lugar = "pantallaJugar";
    $('#categories').addClass('hidden');
    $('#pantallaJugar').removeClass('hidden');
    drawSpace();
}

function showCategories() {
    lugar = "categories";
    $('#main').addClass('hidden');
    $('#categories').removeClass('hidden');
}
function showMain() {
    lugar = "main";
    $('#main').removeClass('hidden');
    $('#categories').addClass('hidden');
}

function backCategories() {

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    lugar = "categories";
    $('#categories').removeClass('hidden');
    $('#pantallaJugar').addClass('hidden');
}

function showConfirm() {
    navigator.notification.confirm(
        '¿Seguro deseas salir?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Salir',           // title
        'Si,No'         // buttonLabels
    );
}
function onConfirm(buttonIndex) {
    if(buttonIndex == 1){
        backCategories();
        posX = 0;
        posY = 0;
    }
}

function drawSpace() {
    var canvas = document.getElementById("myCanvas");
    var cWidth = canvas.width/2;
    var cHeight = canvas.height/2;
    var ctx = canvas.getContext("2d");
    ctx.font = "10px Arial";
    ctx.beginPath();
    for (var i = 0; i < chosenWord.length; i++) {
        if(cWidth+(i*10) >= canvas.width){
            cWidth = canvas.width / 2;
            cHeight += 20;
        }
        if(chosenWord.charAt(i) == ' '){
            ctx.fillText(" ", cWidth + (i * 10), cHeight);
        }else{
            ctx.fillText("_", cWidth+(i*10), cHeight);
        }
    }
    ctx.stroke();
}

function drawWrong(time) {
    var canvas = document.getElementById("myCanvas");
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    switch (time) {
        case 1:
            ctx.strokeStyle = 'black';
            ctx.moveTo(cWidth/8,cWidth);
            ctx.lineTo(cWidth/8, cWidth - 100);
            posX = cWidth/8;
            posY =  cWidth - 100
            break;
        case 2:
            ctx.strokeStyle = 'black';
            ctx.moveTo(posX, posY-2);
            ctx.lineTo(posX, posY - 102);
            posY = posY - 102;
            break;
        case 3:
            ctx.strokeStyle = 'black';
            ctx.moveTo(posX+2, posY);
            ctx.lineTo(posX+52, posY);
            posX = posX + 52;
            break;
        case 4:
            ctx.strokeStyle = 'black';
            ctx.moveTo(posX, posY + 2);
            ctx.lineTo(posX, posY + 52);
            posY = posY + 52;
            break;
        case 5:
            var img = document.getElementById("deathImage");
            ctx.drawImage(img, posX - 24, posY + 2, 48, 108);
            navigator.notification.alert("No eras tan bueno como creias",null,"Te hemos colgado!","Lo sé :(");
            break;
    };
    ctx.stroke();
}