/* ===== Theme ===== */
var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;
Template7.global = {
    android: isAndroid,
    ios: isIos
};
var $$ = Dom7;
/* ===== Index Event ===== */
var indexEvent = function () {
        $$('.open_map_pickup_index').on('click', function () {
            mainView.router.loadPage('map.html');
        });
        $$('.open_map_delivery_index').on('click', function () {
            mainView.router.loadPage('map.html');
        });
    }
    /* ===== Init App ===== */
var myApp = new Framework7({
    hideNavbarOnPageScroll: true,
    hideToolbarOnPageScroll: true,
    hideTabbarOnPageScroll: true,
    showBarsOnPageScrollEnd: true,
    // Enable Material theme for Android device only
    material: true,
    // Enable Template7 pages
    template7Pages: true,
    domCache: true,
    onPageInit: function (app, page) { // Index Page
            if (page.name === 'index') {
                indexEvent();
            }
        } //enable inline pages
});

/* ===== Init View ===== */
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});
//indexEvent();
/* ===== Index Page ===== */
// Need to re-create object's event when backing from another pages ???
//myApp.onPageInit('index', function (page) {
//    indexEvent();
//})
/* ===== Map Page ===== */
myApp.onPageInit('map', function (page) {
    $("#map").parent().css('height', $(window).height() - 100);

    var map = new GMaps({
        el: '#map',
        lat: 10.801906,
        lng: 106.6767421,
        zoom: 16,
        drag: function (e) {
            var lat = e.center.lat(1);
            var lng = e.center.lng(1);
            
            //Get Address
            var latlng = new google.maps.LatLng(lat, lng);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'latLng': latlng
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var address = results[1].formatted_address;
                        console.log(address);
                        $$('.address').val(address);
                    }
                }
            });
        }
    });

    GMaps.geolocate({
        success: function (position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
            
            //Get Address
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'latLng': latlng
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var address = results[1].formatted_address;
                        console.log(address);
                        $$('.address').val(address);
                    }
                }
            });
        },
        error: function (error) {
            //alert('Geolocation failed: ' + error.message);
        },
        not_supported: function () {
            alert("Your browser does not support geolocation");
        },
        always: function () {
            console.log("Done!");
        }
    });
    
    $$('#mapCancelButton').on('click', function () {
       alert("Quay Lai");
    });
    $$('#mapAcceptButton').on('click', function () {
       alert("Chap Nhan");
    });
})

/* ===== Purchase Order Page ===== */
myApp.onPageInit('purchase-order', function (page) {
    $$('.open_map_pickup').on('click', function () {
        mainView.router.loadPage('map.html');
    });
    $$('.open_map_delivery').on('click', function () {
        mainView.router.loadPage('map.html');
    });
})