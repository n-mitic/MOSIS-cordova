// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        
        var cam = document.getElementById('camera');
        
        if (cam) {
            cam.addEventListener('click', function (event) {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI
                });
            });
        }
       
        console.log("navigator.geolocation works well");
        
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function init()
    {
        var canvas = document.getElementById("canvas");
        if (canvas != null) {

            var ctx = canvas.getContext("2d");

            ctx.fillStyle = "#1F75FE";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#FFFFFF";

            ctx.beginPath();
            ctx.moveTo(0, 180);     ctx.lineTo(225, 180);

            ctx.translate(0, 225);  ctx.rotate(Math.PI / 4);    ctx.translate(0, -225);
            ctx.moveTo(0, 225);     ctx.lineTo(0, 120);

            ctx.setTransform(1, 0, 0, 1, 0.5, 0.5); ctx.translate(225, 225);    ctx.rotate(-Math.PI / 4);    ctx.translate(-225, -225);
            ctx.moveTo(225, 225);   ctx.lineTo(225, 120);            
            ctx.closePath();
            ctx.stroke();

            ctx.lineWidth = 10;
            //ctx.setTransform(1, 0, 0, 1, 0.5, 0.5);
            //ctx.fillStyle = "#FFFFFF";
            //ctx.fillRect(73, 90, 80, 80);
            ctx.beginPath();

            ctx.setTransform(1, 0, 0, 1, 0.5, 0.5);
            ctx.moveTo(63, 120);    ctx.lineTo(63, 20); ctx.lineTo(163, 20);    ctx.lineTo(163, 120);   ctx.lineTo(113, 150);
            ctx.closePath();
            ctx.stroke();

            ctx.font = "bold 70px Arial";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.textAlign = "center";
            ctx.strokeText("Ph", 113, 100);
        }
        localStorage.setItem("Latitude", 0);
        localStorage.setItem("Longitude", 0);
        localStorage.setItem("Type", 0);
    }


    window.onload = init;


    /*document.getElementById("backPage").onclick =
        function (event) {
            history.back();
        }*/

    
    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }


    

    

    

})();
