$(function () {

    var lat;
    var lon;
    navigator.geolocation.getCurrentPosition(

        (position) => {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            var map = L.map('map').setView([latitude, longitude], 25);

            map.on('click', function (e) {

                lat = e.latlng.lat;
                lon = e.latlng.lng;

                $('#nuevoReporte').modal('show');
                $('#Canton').prop('disabled', true);
                $('#Distrito').prop('disabled', true);
                $('#calle').prop('disabled', true);

                console.log(lon);
                console.log(lat);
                $('#Longitud').attr('value', lon);
                $('#Latitud').attr('value', lat);

               });  

                $('#formularioNuevoReporte').submit(function (e){

                    
                     console.log('Se ejecuto el formulario');
                     console.log(lon);
                     console.log(lat);
                    e.preventDefault();

                    $.ajax({

                        url: '../router/rutas.php?action=crearReporte',
                        method: 'POST',
                        dataType: 'json',
                        data: $(this).serialize(),

                        success: function(response){
                          

                            if(response.status == 'success'){
                                console.log('Se ejecuto el formulario y entro en funcion success');
                                Swal.fire('! Reporte perfectamente generado ¡', '', 'success');
                                setTimeout(function (){

                                    window.location.reload();

                                }, 1000);
                            }else{

                                Swal.fire('Error en generar el reporte', '', 'error');
                            }


                        }, error: function(xhr, status){

                            console.log('Error: ', xhr.responseText);
                            console.log('status:', status);
                        }


                    });


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

                    options = ' <option>Seleccione el tipo de daño</option>';
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

        $.ajax({

            url: '../router/rutas.php?action=obtenerCategorias',
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';
                    options = ' <option>Seleccione la categoria del daño</option>';

                    response.data.forEach(item => {

                        options += `<option value="${item.CATEGORIA_ID}">${item.NOMBRE_CATEGORIA} (${item.DESCRIPCION})</option>`;


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

        $.ajax({

            url: '../router/rutas.php?action=obtenerProvincias',
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';
                    options = ' <option>Seleccione la provincia del suceso</option>';
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

    $('#Provincia').change(function(){

        cargarCantones();

    });


    function cargarCantones() {

        let provincia = $('#Provincia').val();

        console.log(provincia);

        $.ajax({

            url: `../router/rutas.php?action=obtenerCantones&provincia=${provincia}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';
                    options = ' <option>Seleccione el cantón del suceso</option>';

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

    $('#Canton').change(function() {

        cargarDistritos();

    });


    

    function cargarDistritos() {

        let canton = $('#Canton').val();
        console.log(canton);

        $.ajax({

            url: `../router/rutas.php?action=obtenerDistritos&canton=${canton}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log('Entro en function la recoleccion de distritos');

                if (response.status == 'success') {
                    console.log('respondio la funcion de distritos success');

                    let options = '';
                    options = ' <option>Seleccione el distrito del suceso</option>';
                    response.data.forEach(item => {

                        options += `<option value="${item.NOMBRE_DISTRITO}">${item.NOMBRE_DISTRITO}</option>`;


                    });

                    $('#Distrito').html(options);





                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }

    $('#Distrito').change(function() {

         cargarCalles();
    });

   

    function cargarCalles() {

        let distrito = $('#Distrito').val();

        $.ajax({

            url: `../router/rutas.php?action=obtenerCalles&distrito=${distrito}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';
                    options = ' <option>Seleccione la calle del suceso</option>';
                    response.data.forEach(item => {

                        options += `<option value="${item.CALLE_ID}">${item.NOMBRE_CALLE}</option>`;


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
