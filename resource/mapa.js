$(function () {

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            var map = L.map('map').setView([latitude, longitude], 25);

            map.on('click', function (e) {

                var lat = e.latlng.lat;
                var lon = e.latlng.lng;

                $('#nuevoReporte').modal('show');
                $('#Canton').prop('disabled', true);
                $('#Distrito').prop('disabled', true);
                $('#calle').prop('disabled', true);


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
            maximumAge: 0
        }



    );

    cargarTipoDanos();

    function cargarTipoDanos() {
        console.log('Se ejecuto la funcion');

        $.ajax({
            url: '../router/rutas.php?action=obtenerTipoDanos',
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {
                    console.log('datos obtenidos !');
                    let options = '';

                    response.data.forEach(data => {

                        options += `<option value="${data.DANO_ID}">${data.NOMBRE_DANO}</option>`;

                    });


                    $('#tipodano').html(options);

                } else {

                    console.log('ocurrio un error en la obtencion de los datos');


                }
            }, error: function (xhr, status, error) {

                console.log('error:', xhr);
                console.log('error como tal:', xhr.responseText);
                console.log('status', status);


            }


        });

    }

    cargarCategorias();

    function cargarCategorias() {

        ajax({

            url: '../router/rutas.php?action=obtenerCategorias',
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';

                    response.data.forEach(item => {

                        options += `<option value="${item.CATEGORIA_ID}">${item.NOMBRE_CATEGORIA} ${item.DESCRIPCION}</option>`;


                    });

                    $('#Categoria').html(options);





                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }

    cargarProvincias();

    function cargarProvincias() {

        ajax({

            url: '../router/rutas.php?action=obtenerProvincias',
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';

                    response.data.forEach(item => {

                        options += `<option value="${item.NOMBRE_PROVINCIA}">${item.NOMBRE_PROVINCIA}</option>`;


                    });

                    $('#Provincia').html(options);





                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }



    $('#Provincia').change(function () {

        if ($('#Provincia').val() != '') {

            $('#Canton').prop('disabled', false);
        }

    });

    $('#Canton').change(function () {

        if ($('#Canton').val() != '') {

            $('#Distrito').prop('disabled', false);
        }

    });

    $('#Distrito').change(function () {

        if ($('#Distrito').val() != '') {

            $('#calle').prop('disabled', false);
        }

    });





    cargarCantones();

    function cargarCantones() {

        let provincia = $('#Provincia').val();

        ajax({

            url: `../router/rutas.php?action=obtenerCantones&provincia=${provincia}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';

                    response.data.forEach(item => {

                        options += `<option value="${item.NOMBRE_CANTON}">${item.NOMBRE_CANTON}</option>`;


                    });

                    $('#Canton').html(options);





                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }


    cargarDistritos();

    function cargarDistritos() {

        let canton = $('#Canton').val();

        ajax({

            url: `../router/rutas.php?action=obtenerDistritos&canton=${canton}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';

                    response.data.forEach(item => {

                        options += `<option value="${item.NOMBRE_DISTRITO}">${item.NOMBRE_DISTRITO}</option>`;


                    });

                    $('#Distritos').html(options);





                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }

    cargarCalles();

    function cargarCalles() {

        let distrito = $('#Distrito').val();

        ajax({

            url: `../router/rutas.php?action=obtenerCalles&distrito=${distrito}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';

                    response.data.forEach(item => {

                        options += `<option value="${item.NOMBRE_CALLE}">${item.NOMBRE_CALLE}</option>`;


                    });

                    $('#calle').html(options);





                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }




});
