var app = {
    // Application Constructor

    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        //app.receivedEvent('deviceready');
        app.runGeolocation();
    },

    runGeolocation: function () {
        var options = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true
        };

        var Type = localStorage.Type;
        var Latitude = localStorage.Latitude;
        var Longitude = localStorage.Longitude;
        var updatedLatitude;
        var updatedLongitude;
        var interval;

        var onMapSuccess = function (position) {
            if (Type == 0) {
                startInterval();
                Latitude = position.coords.latitude;
                Longitude = position.coords.longitude;
            }
            else {
                Type = 0;
                stopInterval();
            }
            getMap(Latitude, Longitude, "map");
        }

        function getMap(latitude, longitude, id) {
            var mapOptions = {
                center: new google.maps.LatLng(0, 0),
                zoom: 1,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById(id), mapOptions);

            var latLong = new google.maps.LatLng(latitude, longitude);

            var marker = new google.maps.Marker({ position: latLong });

            marker.setMap(map);
            map.setZoom(15);
            map.setCenter(marker.getPosition());
        }

        var onMapWatchSuccess = function (position) {
            updatedLatitude = position.coords.latitude;
            updatedLongitude = position.coords.longitude;

            if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
               db = window.openDatabase("Parking", "1.0", "Cordova", 200000);
               db.transaction(queryDB, errorCB);
            }
        }

        function watchMapPosition() {
            return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
        }

        function onMapError(error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }


        function startInterval() {
            interval = window.setInterval(function () {
                watchMapPosition();
                alert('triger');
            }, 10000)
        }

        function stopInterval() {
            clearInterval(interval);
        }

        function populateDB(tx) {
            //tx.executeSql('DROP TABLE Spots');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Spots (id INTEGER PRIMARY KEY AUTOINCREMENT, name, lati, lon, date, occupied)');
        }

        function errorCB(err) {
            alert("Error processing SQL: " + err.code);
        }

        function queryDB(tx) {
            tx.executeSql('SELECT * FROM Spots', [], querySuccess, errorCB);
        }

        function querySuccess(tx, results) {
            var len = results.rows.length;
            var mini = 0;
            var minlen = Number.MAX_SAFE_INTEGER;
            for (var i = 0; i < len; i++) {
                var current = Math.sqrt(Math.pow(results.rows.item(i).lati - updatedLatitude, 2)
                            + Math.pow(results.rows.item(i).lon - updatedLongitude, 2));
                if (current < minlen) {
                    minlen = current;
                    mini = i;
                }
            }
            alert('Closest parking is '+results.rows.item(mini).name)
        }

        var db = window.openDatabase("Parking", "1.0", "Cordova", 200000);
        db.transaction(populateDB, errorCB);
        
        navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, options);
    }
};

app.initialize();