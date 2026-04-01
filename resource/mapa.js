$(function () {

    var lat;
    var lon;
    var map;
    var puntero;
    navigator.geolocation.getCurrentPosition(

        (position) => {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            map = L.map('map').setView([latitude, longitude], 25);

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

    
            $.ajax({

                url: '../router/rutas.php?action=obtenerReportes',
                method: 'GET',
                dataType: 'json',
                success: function(response){

                    if(response.status == 'success'){

                        console.log('obtencion satisfactoria de los reportes');
                        console.log('Los datos son:', response.data);
                      

                        

                        response.data.forEach(reporte=> {

                            let image = '';

                            if(reporte.NOMBRE_DANO == 'Hueco' ){

                                image = '../image/hueco.png';

                            }else if(reporte.NOMBRE_DANO == 'Daño en desague'){

                                image = '../image/desague.png';

                            }else if (reporte.NOMBRE_DANO == 'Semaforo dañado'){

                                image = '../image/semaforo.png';

                            }else if (reporte.NOMBRE_DANO == 'Grieta'){

                                image = '../image/Grieta.png';

                            }else if(reporte.NOMBRE_DANO == 'Señal caida'){

                                image = '../image/SenalCaida.png';
                            }

                            if(reporte.NOMBRE_CATEGORIA == 'Leve'){

                                  puntero = L.divIcon({

                                  className: 'custom-marker-leve',
                                  html: '<div class="pin-leve"></div>',
                                  iconSize: [32, 32],
                         
                                 });

                            }else if (reporte.NOMBRE_CATEGORIA == 'Medio'){

                                 puntero = L.divIcon({

                                  className: 'custom-marker-medio',
                                  html: '<div class="pin-medio"></div>',
                                  iconSize: [32, 32],
                         
                                 });
                                
                            }else{

                                 puntero = L.divIcon({

                                  className: 'custom-marker',
                                  html: '<div class="pin"></div>',
                                  iconSize: [32, 32],
                         
                                 });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);

                            if(reporte.USUARIO_FK == sessionUsuario){

                                  puntero = L.divIcon({

                                  className: 'custom-marker-user',
                                  html: '<div class="pin-user"></div>',
                                  iconSize: [32, 32],
                         
                                 });

                            }                          



                           let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], {icon: puntero}).addTo(map);

                           if (reporte.USUARIO_FK == sessionUsuario){


                             marker.bindPopup(

                                `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`
                                
                            ).openPopup();



                           }else{

                            marker.bindPopup(

                                `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button></div></div>`
                                
                            ).openPopup();

                            }


                        });

                        

                    }else{

                        Swal.fire('Error en cargar los reportes', '', 'error');

                    }
                }, error: function(xhr, status){

                    console.log("ERROR:", xhr.responseText);
                    console.log('status:', status);
                }


            });
            




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

    function cargarProvincias(opcion) {

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

                    if(opcion == 1){

                        $('#ProvinciaOld').html(options);

                    }else{

                        $('#Provincia').html(options);

                    }

                   





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


    function cargarCantones(opcion) {

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

                    if(opcion == 1){

                        $('#CantonOld').html(options);

                    }else{

                        $('#Canton').html(options);

                    }

                    





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


    

    function cargarDistritos(opcion) {

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

                    if(opcion == 1){

                        $('#DistritoOld').html(options);

                    }else{

                        $('#Distrito').html(options);

                    }

                    





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

   

    function cargarCalles(opcion) {

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

                    if(opcion == 1){


                        $('#calleOld').html(options);
                    }else{

                        $('#calle').html(options);

                    }

                    





                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }

    function EditarReporte(Reporte_ID){

        $.ajax({

            url: '../router/rutas.php?action=obtenerReporteByID',
            method: 'GET',
            dataType: 'json',
            data: {reporte_id : Reporte_ID},
            success: function(response){

                if(response.status == 'success'){

                    let reporte = response.data;

                    let tipodano = reporte.NOMBRE_DANO;
                    let categoria = reporte.NOMBRE_CATEGORIA;
                    let provincia = reporte.NOMBRE_PROVINCIA;
                    let canton = reporte.NOMBRE_CANTON;
                    let distrito = reporte.NOMBRE_DISTRITO;
                    let calle = reporte.NOMBRE_CALLE;

                    cargarProvincias(1);
                    cargarCantones(1);
                    cargarDistritos(1);
                    cargarCalles(1);







                    $('#EditarReporte').modal('show');



                }else{

                    Swal.fire('Error en editar reporte', '', 'error');
                }


            }, error: function(xhr, status){

                console.log('ERROR:', xhr.responseText);
                console.log('Status:', status);
            }




        });

    }

    

    

   



});
