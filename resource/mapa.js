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

        $.get("../router/rutas.php?action=obtenerTipoDanos", function(response){
            console.log('Datos obtenidos:', response.data);

            let options = '';
            response.data.forEach(dano => {

                options += ` <option value=${dano.Dano_ID} >${dano.Nombre_dano}</option> `;
                
            });

            $('#tipodano').html(options);



        });



      
            



        };
    });
