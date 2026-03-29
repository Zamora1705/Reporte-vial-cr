$(function(){

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            var map = L.map('map').setView([latitude, longitude], 25);

            map.on('click', function(e){

                var lat = e.latlng.lat;
                var lon = e.latlng.lng;

                $('#nuevoReporte').modal('show');


            });
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            var marker = L.marker([latitude, longitude]).addTo(map);

            marker.bindPopup(
                "<h4>Estas aquí</h4>"
            ).openPopup();

        },

        (error) => {

            console.log("Error al obtener la ubicación:", error);
        },

        {

            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge:0
        }



    );

    cargarTipoDanos();

    function cargarTipoDanos(){


        $.ajax({

            url: '../router/rutas?action=obtenerTipoDanos',
            method : 'GET',
            dataType: 'json',
            success: function(data){

                var select = $('#tipodano');
                data.forEach(function(tipoDano){

                    select.append('<option value='+tipoDano.Dano_ID+'>'+tipoDano.Nombre_dano+'</option>');

                });

            }, error: function(xhr){

                console.log('ERROR: ', xhr);
            }


        });
      
            



        };
    });
