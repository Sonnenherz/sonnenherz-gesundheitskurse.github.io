/* global $, google */
(function ($, google) {
    'use strict';
    $(document).ready(function () {
        /* Hide menu after click
        ----------------------------------------------*/
        $('.navbar-nav li a').click(function () {
            $('.in').collapse('hide');
        });

        /* Smooth scroll to section
        ----------------------------------------------*/
        var SweetScroll = require("sweet-scroll");
        new SweetScroll({
            offset: "-70"
        });


        /* Google map
        ----------------------------------------------*/
        $("#google-map").each(function () {

            var img = $(this).attr("data-address-details");
            var address = $(this).attr("data-address");

            $(this)
                .gmap3({
                    address: address,
                    zoom: 15,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                })
                .marker({
                    address: address,
                    draggable: false
                })
                .infowindow({
                    content: '<img src=' + img + ' class="map-img" />'
                })
                .then(function (infowindow) {
                    var map = this.get(0);
                    var marker = this.get(1);
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });
                    infowindow.open(map, marker);
                });
        });
    });
})($, google);

