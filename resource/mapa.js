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
        console.log('Se ejecuto la funcion');

        $.ajax({
            url: '../router/rutas.php?action=obtenerTipoDanos',
            method: 'GET',
            dataType: 'json',
            success: function(response){

                if(response.status == 'success'){
                   console.log('datos obtenidos !');
                    let options = '';

                       response.data.forEach(data => {

                        options += `<option value="${data.DANO_ID}">${data.NOMBRE_DANO}</option>`;

                       });
                        

                    $('#tipodano').html(options);

                }else{

                    console.log('ocurrio un error en la obtencion de los datos');


                }
            }, error: function(xhr, status, error){

                console.log('error:', xhr);
                console.log('error como tal:', xhr.responseText);
                console.log('status', status);

                
            }


        });

    }
        

    });
