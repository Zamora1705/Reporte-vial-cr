$(function () {

    var lat;
    var lon;
    var map;
    var puntero;
    var markersLayer;
    navigator.geolocation.getCurrentPosition(

        (position) => {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            map = L.map('map').setView([latitude, longitude], 25);



            map.on('click', function (e) {

                let identidad = $('#Identidad').val();

                if(identidad != null){


                

                lat = e.latlng.lat;
                lon = e.latlng.lng;

                $('#nuevoReporte').modal('show');
                $('#Canton').prop('disabled', true);
                $('#Distrito').prop('disabled', true);
                $('#calle').prop('disabled', true);
                $('.alert').fadeOut(1000);

                console.log(lon);
                console.log(lat);
                $('#Longitud').attr('value', lon);
                $('#Latitud').attr('value', lat);

                }else{

                    Swal.fire({

                        title: 'Debes iniciar sesión para crear un reporte',
                        icon: 'warning',
                        showCancelButton:true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: 'green',
                        confirmButtonText: 'Iniciar sesión'


                    }).then((result)=>{

                        if(result.isConfirmed){

                            window.location.href = 'managementuser/login.php';
                        }


                    });
                }

            });

            $('#formularioNuevoReporte').submit(function (e) {


                console.log('Se ejecuto el formulario');
                console.log(lon);
                console.log(lat);
                e.preventDefault();

                $.ajax({

                    url: '../router/rutas.php?action=crearReporte',
                    method: 'POST',
                    dataType: 'json',
                    data: $(this).serialize(),

                    success: function (response) {


                        if (response.status == 'success') {
                            console.log('Se ejecuto el formulario y entro en funcion success');
                            Swal.fire('! Reporte perfectamente generado ¡', '', 'success');
                            setTimeout(function () {

                                window.location.reload();

                            }, 1000);
                        } else {

                            Swal.fire('Error en generar el reporte', '', 'error');
                        }


                    }, error: function (xhr, status) {

                        console.log('Error: ', xhr.responseText);
                        console.log('status:', status);
                    }


                });


            });




            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            var markerUser = L.marker([latitude, longitude]).addTo(map);

            markerUser.bindPopup(
                "<h4>Estas aquí</h4>"
            ).openPopup();


            $.ajax({

                url: '../router/rutas.php?action=obtenerReportes',
                method: 'GET',
                dataType: 'json',
                success: function (response) {

                    if (response.status == 'success') {

                        console.log('obtencion satisfactoria de los reportes');
                        console.log('Los datos son:', response.data);


                        markersLayer = L.layerGroup().addTo(map);


                        response.data.forEach(reporte => {

                            let image = '';

                            if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../image/SenalCaida.png';
                            }

                            if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-leve',
                                    html: '<div class="pin-leve"></div>',
                                    iconSize: [32, 32],

                                });

                            } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-medio',
                                    html: '<div class="pin-medio"></div>',
                                    iconSize: [32, 32],

                                });

                            } else {

                                puntero = L.divIcon({

                                    className: 'custom-marker',
                                    html: '<div class="pin"></div>',
                                    iconSize: [32, 32],

                                });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            let rol = $('#Rol').val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);
                            console.log('El id del rol del usuario es:', rol);



                            if (reporte.USUARIO_FK == sessionUsuario) {

                                puntero = L.divIcon({

                                    className: 'custom-marker-user',
                                    html: '<div class="pin-user"></div>',
                                    iconSize: [32, 32],

                                });

                            }



                            let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                            markersLayer.addLayer(marker);

                            if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }


                        });





                    } else {

                        Swal.fire('Error en cargar los reportes', '', 'error');

                    }
                }, error: function (xhr, status) {

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

                    options = " <option value='97' >Seleccione el tipo de daño</option>";
                    response.data.forEach(data => {

                        options += `<option value="${data.DANO_ID}">${data.NOMBRE_DANO}</option>`;

                    });


                    $('#tipodano').html(options);
                    $('#tipodanoFiltro').html(options);

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
                    options = " <option value='98' >Seleccione la categoria del daño</option>";

                    response.data.forEach(item => {

                        options += `<option value="${item.CATEGORIA_ID}">${item.NOMBRE_CATEGORIA} (${item.DESCRIPCION})</option>`;


                    });

                    $('#Categoria').html(options);
                    $('#CategoriaFiltro').html(options);





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
                    options = " <option value='99' >Seleccione la provincia del suceso</option>";
                    response.data.forEach(item => {

                        options += `<option value="${item.NOMBRE_PROVINCIA}">${item.NOMBRE_PROVINCIA}</option>`;


                    });



                    $('#Provincia').html(options);
                    $('#ProvinciaFiltro').html(options);









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

    $('#Provincia').change(function () {

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



                    $('#Canton').html(options);









                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }

    $('#Canton').change(function () {

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


                    $('#Distrito').html(options);









                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }

    $('#Distrito').change(function () {

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



                    $('#calle').html(options);









                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    }

    window.EditarReporte = function (Reporte_ID) {

        $.ajax({

            url: '../router/rutas.php?action=obtenerReporteByID',
            method: 'GET',
            dataType: 'json',
            data: { reporte_id: Reporte_ID },
            success: function (response) {

                if (response.status == 'success') {

                    console.log('Datos del reporte:', response.data);

                    let reporte = response.data;

                    let tipodano = reporte.NOMBRE_DANO;
                    let categoria = reporte.NOMBRE_CATEGORIA;
                    let provincia = reporte.PROVINCIA_NOM;
                    let canton = reporte.CANTON_NOM;
                    let distrito = reporte.DISTRITO_NOM;
                    let calle = reporte.NOMBRE_CALLE;
                    let tipodano_id = reporte.DANO_ID;
                    let categoriaId = reporte.CATEGORIA_ID;
                    let reporteid = reporte.REPORTE_ID;
                    let calleid = reporte.CALLE_FK;

                    $('#idreporte').attr('value', reporteid);




                    $('#EditarReporte').appendTo('body').modal('show');

                    $.ajax({
                        url: '../router/rutas.php?action=obtenerTipoDanos',
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {

                            if (response.status == 'success') {

                                let options = '';

                                options = `<option value='${tipodano_id}' >${tipodano}</option> `;
                                response.data.forEach(data => {

                                    if (tipodano_id !== data.DANO_ID) {

                                        options += `<option value="${data.DANO_ID}">${data.NOMBRE_DANO}</option>`;

                                    }

                                });


                                $('#tipodanoOld').html(options);

                            } else {

                                console.log('ocurrio un error en la obtencion de los datos');


                            }
                        }, error: function (xhr, status, error) {

                            console.log('error:', xhr);
                            console.log('error como tal:', xhr.responseText);
                            console.log('status', status);


                        }


                    });

                    $.ajax({

                        url: '../router/rutas.php?action=obtenerCategorias',
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {

                            if (response.status == 'success') {

                                let options = '';
                                options = `<option value='${categoriaId}'>${categoria}</option>`;

                                response.data.forEach(item => {

                                    if (categoriaId !== item.CATEGORIA_ID) {


                                        options += `<option value="${item.CATEGORIA_ID}">${item.NOMBRE_CATEGORIA} (${item.DESCRIPCION})</option>`;

                                    }

                                });

                                $('#CategoriaOld').html(options);





                            }
                        }, error: function (xhr, status, error) {

                            console.log('ERROR:', xhr.responseText);
                            console.log('status:', status);

                        }


                    });

                    $.ajax({

                        url: '../router/rutas.php?action=obtenerProvincias',
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {

                            console.log('Se ejecuta la funcion obtener provincias en editar reporte');
                            if (response.status == 'success') {

                                console.log('exitoso la obtencion de provincias en editar reporte y el resultado fue:', response.data, 'y la provincia del reporte es:', provincia)
                                let options = '';
                                options = `<option value='${provincia}' >${provincia}</option>`;
                                response.data.forEach(item => {

                                    if (provincia !== item.NOMBRE_PROVINCIA) {

                                        options += `<option value="${item.NOMBRE_PROVINCIA}">${item.NOMBRE_PROVINCIA}</option>`;

                                    }

                                });



                                $('#ProvinciaOld').html(options);

                            }
                        }, error: function (xhr, status, error) {

                            console.log('ERROR:', xhr.responseText);
                            console.log('status:', status);

                        }


                    });

                    $.ajax({

                        url: `../router/rutas.php?action=obtenerCantones&provincia=${provincia}`,
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {

                            if (response.status == 'success') {

                                let options = '';
                                options = `<option value='${canton}' >${canton}</option>`;

                                response.data.forEach(item => {

                                    if (canton !== item.NOMBRE_CANTON) {

                                        options += `<option value="${item.NOMBRE_CANTON}">${item.NOMBRE_CANTON}</option>`;

                                    }

                                });



                                $('#CantonOld').html(options);

                            }
                        }, error: function (xhr, status, error) {

                            console.log('ERROR:', xhr.responseText);
                            console.log('status:', status);

                        }


                    });

                    $.ajax({

                        url: `../router/rutas.php?action=obtenerDistritos&canton=${canton}`,
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {
                            console.log('Entro en function la recoleccion de distritos');

                            if (response.status == 'success') {
                                console.log('respondio la funcion de distritos success');

                                let options = '';
                                options = `<option value='${distrito}' >${distrito}</option>`;
                                response.data.forEach(item => {


                                    if (distrito !== item.NOMBRE_DISTRITO) {

                                        options += `<option value="${item.NOMBRE_DISTRITO}">${item.NOMBRE_DISTRITO}</option>`;

                                    }

                                });


                                $('#DistritoOld').html(options);

                            }
                        }, error: function (xhr, status, error) {

                            console.log('ERROR:', xhr.responseText);
                            console.log('status:', status);

                        }


                    });

                    $.ajax({

                        url: `../router/rutas.php?action=obtenerCalles&distrito=${distrito}`,
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {

                            if (response.status == 'success') {

                                console.log('Los valores de las calles obtenidas son:', response.data);
                                let options = '';
                                options = `<option value='${calleid}' >${calle}</option>`;
                                response.data.forEach(item => {

                                    if (calle !== item.NOMBRE_CALLE)

                                        options += `<option value="${item.CALLE_ID}">${item.NOMBRE_CALLE}</option>`;


                                });



                                $('#calleOld').html(options);

                            }
                        }, error: function (xhr, status, error) {

                            console.log('ERROR:', xhr.responseText);
                            console.log('status:', status);

                        }


                    });

                } else {

                    Swal.fire('Error en editar reporte', '', 'error');
                }


            }, error: function (xhr, status) {

                console.log('ERROR:', xhr.responseText);
                console.log('Status:', status);
            }




        });

    }



    $('#formularioEditarReporte').submit(function (e) {

        e.preventDefault();

        console.log('Los datos enviados en editar reporte son:', $(this).serialize());
        $.ajax({

            url: '../router/rutas.php?action=editarReporte',
            method: 'POST',
            dataType: 'json',
            data: $(this).serialize(),


            success: function (response) {


                console.log('status de editar reporte:', response.status)
                if (response.status == 'success') {

                    Swal.fire('! Reporte perfectamente editado ¡', '', 'success');
                    setTimeout(function () {

                        window.location.reload();

                    }, 1000);

                } else {

                    Swal.fire('Error en editar el reporte', '', 'error');
                }
            }, error: function (xhr, status) {

                console.log('ERROR:', xhr.responseText);
                console.log('STATUS:', status)
            }

        });


    });

    window.EliminarReporte = function (idreporte) {

        Swal.fire({

            title: '¿ Seguro que quieres eliminar este reporte ?',
            text: 'Una vez que se elimine no se puede recuperar el reporte',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
        }).then((result) => {

            if (result.isConfirmed) {

                $.ajax({

                    url: '../router/rutas.php?action=eliminarReporte',
                    method: 'POST',
                    dataType: 'json',
                    data: { idreporte: idreporte },

                    success: function (response) {

                        if (response.status == 'success') {

                            Swal.fire('Reporte perfetamente eliminado', '', 'success');
                            setTimeout(function () {

                                window.location.reload();

                            }, 1000);


                        } else {

                            Swal.fire('Error en eliminar el reporte', '', 'error');
                        }
                    }, error: function (xhr, status) {

                        console.log('ERROR:', xhr.responseText);
                        console.log('status del error:', status)
                    }


                });


            }


        });


    }

    $("#ProvinciaOld").change(function () {

        let provincia = $("#ProvinciaOld").val();

        $.ajax({

            url: `../router/rutas.php?action=obtenerCantones&provincia=${provincia}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';


                    response.data.forEach(item => {

                        options += `<option value="${item.NOMBRE_CANTON}">${item.NOMBRE_CANTON}</option>`;


                    });



                    $('#CantonOld').html(options);









                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });



    });

    $("#CantonOld").change(function () {

        let canton = $("#CantonOld").val();

        $.ajax({

            url: `../router/rutas.php?action=obtenerDistritos&canton=${canton}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log('Entro en function la recoleccion de distritos');

                if (response.status == 'success') {
                    console.log('respondio la funcion de distritos success');

                    let options = '';

                    response.data.forEach(item => {

                        options += `<option value="${item.NOMBRE_DISTRITO}">${item.NOMBRE_DISTRITO}</option>`;


                    });


                    $('#DistritoOld').html(options);









                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });





    });

    $('#DistritoOld').change(function () {

        let distrito = $('#DistritoOld').val();

        $.ajax({

            url: `../router/rutas.php?action=obtenerCalles&distrito=${distrito}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    let options = '';

                    response.data.forEach(item => {

                        options += `<option value="${item.CALLE_ID}">${item.NOMBRE_CALLE}</option>`;


                    });



                    $('#calleOld').html(options);









                }
            }, error: function (xhr, status, error) {

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });


    });

    $('#botonFiltro').click(function () {

        markersLayer.clearLayers();

        let tipodano = $('#tipodanoFiltro').val();
        let categoria = $('#CategoriaFiltro').val();
        let provincia = $('#ProvinciaFiltro').val();
        let rol = $('#Rol').val();

        if (tipodano != 97 && categoria == 98 && provincia == 99) {

            console.log('se ejecuto el filtro por tipo dano y el id del tipod ano es:', tipodano);


            $.ajax({

                url: '../router/rutas.php?action=filtrarReporte',
                method: 'POST',
                dataType: 'json',
                data: { tipodano: tipodano },
                success: function (response) {

                    if (response.status == 'success') {
                        console.log('Funcion de filtro perfecta. los datos son:', response.data);

                        markersLayer = L.layerGroup().addTo(map);
                        

                        response.data.forEach(reporte => {

                            let image = '';

                            if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../image/SenalCaida.png';
                            }

                            if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-leve',
                                    html: '<div class="pin-leve"></div>',
                                    iconSize: [32, 32],

                                });

                            } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-medio',
                                    html: '<div class="pin-medio"></div>',
                                    iconSize: [32, 32],

                                });

                            } else {

                                puntero = L.divIcon({

                                    className: 'custom-marker',
                                    html: '<div class="pin"></div>',
                                    iconSize: [32, 32],

                                });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            rol = $('#Rol').val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);
                            console.log('El id del rol del usuario es:', rol);



                            if (reporte.USUARIO_FK == sessionUsuario) {

                                puntero = L.divIcon({

                                    className: 'custom-marker-user',
                                    html: '<div class="pin-user"></div>',
                                    iconSize: [32, 32],

                                });

                            }



                            let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                            markersLayer.addLayer(marker);

                            if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }

                        });


                    } else {

                        Swal.fire('No existen reportes según tu busqueda', '', 'warning');
                        listadoReportes();
                    }
                }, error: function (xhr, status) {

                    console.log('ERROR:', xhr.responseText);
                    console.log('STATUS:', status)
                }


            });

        } else if (tipodano == 97 && categoria != 98 && provincia == 99) {

            $.ajax({

                url: '../router/rutas.php?action=filtrarReporteCategoria',
                method: 'POST',
                dataType: 'json',
                data: { categoria: categoria },
                success: function (response) {

                    if (response.status == 'success') {

                        markersLayer = L.layerGroup().addTo(map);

                        response.data.forEach(reporte => {

                            let image = '';

                            if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../image/SenalCaida.png';
                            }

                            if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-leve',
                                    html: '<div class="pin-leve"></div>',
                                    iconSize: [32, 32],

                                });

                            } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-medio',
                                    html: '<div class="pin-medio"></div>',
                                    iconSize: [32, 32],

                                });

                            } else {

                                puntero = L.divIcon({

                                    className: 'custom-marker',
                                    html: '<div class="pin"></div>',
                                    iconSize: [32, 32],

                                });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);




                            if (reporte.USUARIO_FK == sessionUsuario) {

                                puntero = L.divIcon({

                                    className: 'custom-marker-user',
                                    html: '<div class="pin-user"></div>',
                                    iconSize: [32, 32],

                                });

                            }



                            let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                            markersLayer.addLayer(marker);

                            if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }


                        });


                    } else {

                        Swal.fire('No existen reportes según tu busqueda', '', 'warning');
                        listadoReportes();
                    }
                }, error: function (xhr, status) {

                    console.log('ERROR:', xhr.responseText);
                    console.log('STATUS:', status)
                }


            });


        } else if (tipodano == 97 && categoria == 98 && provincia != 99) {

            $.ajax({

                url: '../router/rutas.php?action=filtrarReporteProvincia',
                method: 'POST',
                dataType: 'json',
                data: { provincia: provincia },
                success: function (response) {

                    if (response.status == 'success') {

                        markersLayer = L.layerGroup().addTo(map);

                        response.data.forEach(reporte => {

                            let image = '';

                            if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../image/SenalCaida.png';
                            }

                            if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-leve',
                                    html: '<div class="pin-leve"></div>',
                                    iconSize: [32, 32],

                                });

                            } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-medio',
                                    html: '<div class="pin-medio"></div>',
                                    iconSize: [32, 32],

                                });

                            } else {

                                puntero = L.divIcon({

                                    className: 'custom-marker',
                                    html: '<div class="pin"></div>',
                                    iconSize: [32, 32],

                                });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);




                            if (reporte.USUARIO_FK == sessionUsuario) {

                                puntero = L.divIcon({

                                    className: 'custom-marker-user',
                                    html: '<div class="pin-user"></div>',
                                    iconSize: [32, 32],

                                });

                            }



                            let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                            markersLayer.addLayer(marker);

                            if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }

                        });


                    } else {

                        Swal.fire('No existen reportes según tu busqueda', '', 'warning');
                        listadoReportes();
                    }
                }, error: function (xhr, status) {

                    console.log('ERROR:', xhr.responseText);
                    console.log('STATUS:', status)
                }


            });


        } else if (tipodano != 97 && categoria != 98 && provincia == 99) {

            $.ajax({

                url: '../router/rutas.php?action=filtrarReporteTipoDanoXCategoria',
                method: 'POST',
                dataType: 'json',
                data: { tipodano: tipodano, categoria: categoria },
                success: function (response) {

                    if (response.status == 'success') {

                        markersLayer = L.layerGroup().addTo(map);

                        response.data.forEach(reporte => {

                            let image = '';

                            if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../image/SenalCaida.png';
                            }

                            if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-leve',
                                    html: '<div class="pin-leve"></div>',
                                    iconSize: [32, 32],

                                });

                            } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-medio',
                                    html: '<div class="pin-medio"></div>',
                                    iconSize: [32, 32],

                                });

                            } else {

                                puntero = L.divIcon({

                                    className: 'custom-marker',
                                    html: '<div class="pin"></div>',
                                    iconSize: [32, 32],

                                });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);




                            if (reporte.USUARIO_FK == sessionUsuario) {

                                puntero = L.divIcon({

                                    className: 'custom-marker-user',
                                    html: '<div class="pin-user"></div>',
                                    iconSize: [32, 32],

                                });

                            }



                            let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                            markersLayer.addLayer(marker);

                             if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }


                        });


                    } else {

                        Swal.fire('No existen reportes según tu busqueda', '', 'warning');
                        listadoReportes();
                    }
                }, error: function (xhr, status) {

                    console.log('ERROR:', xhr.responseText);
                    console.log('STATUS:', status)
                }


            });

        } else if (tipodano != 97 && categoria == 98 && provincia != 99) {

            $.ajax({

                url: '../router/rutas.php?action=filtrarReporteTipoDanoXprovincia',
                method: 'POST',
                dataType: 'json',
                data: { tipodano: tipodano, provincia: provincia },
                success: function (response) {

                    if (response.status == 'success') {

                        markersLayer = L.layerGroup().addTo(map);

                        response.data.forEach(reporte => {

                            let image = '';

                            if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../image/SenalCaida.png';
                            }

                            if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-leve',
                                    html: '<div class="pin-leve"></div>',
                                    iconSize: [32, 32],

                                });

                            } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-medio',
                                    html: '<div class="pin-medio"></div>',
                                    iconSize: [32, 32],

                                });

                            } else {

                                puntero = L.divIcon({

                                    className: 'custom-marker',
                                    html: '<div class="pin"></div>',
                                    iconSize: [32, 32],

                                });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);




                            if (reporte.USUARIO_FK == sessionUsuario) {

                                puntero = L.divIcon({

                                    className: 'custom-marker-user',
                                    html: '<div class="pin-user"></div>',
                                    iconSize: [32, 32],

                                });

                            }



                            let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                            markersLayer.addLayer(marker);

                            if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }


                        });


                    } else {

                        Swal.fire('No existen reportes según tu busqueda', '', 'warning');
                        listadoReportes();
                    }
                }, error: function (xhr, status) {

                    console.log('ERROR:', xhr.responseText);
                    console.log('STATUS:', status)
                }


            });



        } else if (tipodano == 97 && categoria != 98 && provincia != 99) {


            $.ajax({

                url: '../router/rutas.php?action=filtrarReporteCategoriaXprovincia',
                method: 'POST',
                dataType: 'json',
                data: { categoria: categoria, provincia: provincia },
                success: function (response) {

                    if (response.status == 'success') {

                        markersLayer = L.layerGroup().addTo(map);

                        response.data.forEach(reporte => {

                            let image = '';

                            if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../image/SenalCaida.png';
                            }

                            if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-leve',
                                    html: '<div class="pin-leve"></div>',
                                    iconSize: [32, 32],

                                });

                            } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-medio',
                                    html: '<div class="pin-medio"></div>',
                                    iconSize: [32, 32],

                                });

                            } else {

                                puntero = L.divIcon({

                                    className: 'custom-marker',
                                    html: '<div class="pin"></div>',
                                    iconSize: [32, 32],

                                });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);




                            if (reporte.USUARIO_FK == sessionUsuario) {

                                puntero = L.divIcon({

                                    className: 'custom-marker-user',
                                    html: '<div class="pin-user"></div>',
                                    iconSize: [32, 32],

                                });

                            }



                            let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                            markersLayer.addLayer(marker);

                            if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }


                        });


                    } else {

                        Swal.fire('No existen reportes según tu busqueda', '', 'warning');
                        listadoReportes();
                    }
                }, error: function (xhr, status) {

                    console.log('ERROR:', xhr.responseText);
                    console.log('STATUS:', status)
                }


            });


        } else if (tipodano != 97 && categoria != 98 && provincia != 99) {

            $.ajax({

                url: '../router/rutas.php?action=filtrarReporteCategoriaXprovinciaXtipodano',
                method: 'POST',
                dataType: 'json',
                data: { tipodano: tipodano, categoria: categoria, provincia: provincia },
                success: function (response) {

                    if (response.status == 'success') {

                        markersLayer = L.layerGroup().addTo(map);

                        response.data.forEach(reporte => {

                            let image = '';

                            if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../image/SenalCaida.png';
                            }

                            if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-leve',
                                    html: '<div class="pin-leve"></div>',
                                    iconSize: [32, 32],

                                });

                            } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                                puntero = L.divIcon({

                                    className: 'custom-marker-medio',
                                    html: '<div class="pin-medio"></div>',
                                    iconSize: [32, 32],

                                });

                            } else {

                                puntero = L.divIcon({

                                    className: 'custom-marker',
                                    html: '<div class="pin"></div>',
                                    iconSize: [32, 32],

                                });


                            }

                            let sessionUsuario = $("#Identidad").val();
                            console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);




                            if (reporte.USUARIO_FK == sessionUsuario) {

                                puntero = L.divIcon({

                                    className: 'custom-marker-user',
                                    html: '<div class="pin-user"></div>',
                                    iconSize: [32, 32],

                                });

                            }



                            let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                            markersLayer.addLayer(marker);

                            if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }


                        });


                    } else {

                        Swal.fire('No existen reportes según su busqueda', '', 'warning');
                        listadoReportes();
                    }
                }, error: function (xhr, status) {

                    console.log('ERROR:', xhr.responseText);
                    console.log('STATUS:', status)
                }


            });

        } else {

            Swal.fire('No existen reportes según tu busqueda', '', 'warning');
            listadoReportes();
        }

    });

    $('#botonFiltroMisReportes').click(function () {

        markersLayer.clearLayers();

        let usuario = $('#Identidad').val();
        let rol = $('#Rol').val();

        $.ajax({

            url: '../router/rutas.php?action=filtrarReporteUsuario',
            method: 'POST',
            dataType: 'json',
            data: { usuario: usuario },
            success: function (response) {

                if (response.status == 'success') {

                    markersLayer = L.layerGroup().addTo(map);

                    response.data.forEach(reporte => {

                        let image = '';

                        if (reporte.NOMBRE_DANO == 'Hueco') {

                            image = '../image/hueco.png';

                        } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                            image = '../image/desague.png';

                        } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                            image = '../image/semaforo.png';

                        } else if (reporte.NOMBRE_DANO == 'Grieta') {

                            image = '../image/Grieta.png';

                        } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                            image = '../image/SenalCaida.png';
                        }

                        if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                            puntero = L.divIcon({

                                className: 'custom-marker-leve',
                                html: '<div class="pin-leve"></div>',
                                iconSize: [32, 32],

                            });

                        } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                            puntero = L.divIcon({

                                className: 'custom-marker-medio',
                                html: '<div class="pin-medio"></div>',
                                iconSize: [32, 32],

                            });

                        } else {

                            puntero = L.divIcon({

                                className: 'custom-marker',
                                html: '<div class="pin"></div>',
                                iconSize: [32, 32],

                            });


                        }

                        let sessionUsuario = $("#Identidad").val();
                        console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);




                        if (reporte.USUARIO_FK == sessionUsuario) {

                            puntero = L.divIcon({

                                className: 'custom-marker-user',
                                html: '<div class="pin-user"></div>',
                                iconSize: [32, 32],

                            });

                        }



                        let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                        markersLayer.addLayer(marker);

                         if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }

                    });


                } else {

                    Swal.fire('No existen reportes según tu busqueda', '', 'warning');
                    listadoReportes();
                }
            }, error: function (xhr, status) {

                console.log('ERROR:', xhr.responseText);
                console.log('STATUS:', status)
            }


        });



    });

    $('#botonFiltroAll').click(function () {


        listadoReportes();

    });


    function listadoReportes() {

        markersLayer.clearLayers();


        $.ajax({

            url: '../router/rutas.php?action=obtenerReportes',
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                if (response.status == 'success') {

                    markersLayer = L.layerGroup().addTo(map);
                    let rol = $('#Rol').val();
                    response.data.forEach(reporte => {

                        let image = '';

                        if (reporte.NOMBRE_DANO == 'Hueco') {

                            image = '../image/hueco.png';

                        } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                            image = '../image/desague.png';

                        } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                            image = '../image/semaforo.png';

                        } else if (reporte.NOMBRE_DANO == 'Grieta') {

                            image = '../image/Grieta.png';

                        } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                            image = '../image/SenalCaida.png';
                        }

                        if (reporte.NOMBRE_CATEGORIA == 'Leve') {

                            puntero = L.divIcon({

                                className: 'custom-marker-leve',
                                html: '<div class="pin-leve"></div>',
                                iconSize: [32, 32],

                            });

                        } else if (reporte.NOMBRE_CATEGORIA == 'Medio') {

                            puntero = L.divIcon({

                                className: 'custom-marker-medio',
                                html: '<div class="pin-medio"></div>',
                                iconSize: [32, 32],

                            });

                        } else {

                            puntero = L.divIcon({

                                className: 'custom-marker',
                                html: '<div class="pin"></div>',
                                iconSize: [32, 32],

                            });


                        }

                        let sessionUsuario = $("#Identidad").val();
                        console.log('La cedula de session es:', sessionUsuario, 'y el id del usuario recojido del listado es:', reporte.USUARIO_FK);




                        if (reporte.USUARIO_FK == sessionUsuario) {

                            puntero = L.divIcon({

                                className: 'custom-marker-user',
                                html: '<div class="pin-user"></div>',
                                iconSize: [32, 32],

                            });

                        }



                        let marker = L.marker([(reporte.LATITUD), (reporte.LONGITUD)], { icon: puntero });
                        markersLayer.addLayer(marker);

                        if (reporte.USUARIO_FK == sessionUsuario) {

                                if(rol == 1){

                                    if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }

                                }else{


                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }
                                
                            
                            }else if(rol == 1){

                                  if(reporte.REPORTE_FK == null){

                                 marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button onclick='asignarResponsable(${reporte.REPORTE_ID})' class='btn btn-success w-100' >Asignar responsable <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();

                                }else{

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p><button readonly class='btn btn-primary w-100' >Reporte en reparación <i class="fa-solid fa-hammer"></i></button><div style='display:flex;gap:10px;padding-top:10px;' ><button onclick='EditarReporte(${reporte.REPORTE_ID})' class='btn btn-primary w-100' >Editar Reporte</button><button onclick='EliminarReporte(${reporte.REPORTE_ID})' class='btn btn-danger w-100' >Eliminar Reporte</button></div></div></div>`

                                ).openPopup();


                                }
                            
                            }else {

                                marker.bindPopup(

                                    `<div style='border:3px solid #2E6DA4;height:auto;witdh:400px;background-color:#1A3A5C;color:#F4F6F8' ><img style='width:100%;height:100%;object-fit:contain;' src='${image}' ><div style='padding:20px;' ><p>Daño: ${reporte.NOMBRE_DANO}</p><p class='categoriaDano' >Categoria: ${reporte.NOMBRE_CATEGORIA}</p><p>Provincia: ${reporte.PROVINCIA_NOM}</p><p>Cantó: ${reporte.CANTON_NOM}</p><p>Distrito: ${reporte.DISTRITO_NOM}</p><p>Fecha: ${reporte.FECHA}</p></div></div>`

                                ).openPopup();

                            }


                    });


                } else {

                    Swal.fire('No existen reportes según tu busqueda', '', 'warning');
                }
            }, error: function (xhr, status) {

                console.log('ERROR:', xhr.responseText);
                console.log('STATUS:', status)
            }


        });



    };

    $('.botonAgregar').click(function(){

        let identidad = $('#Identidad').val();

        if(identidad != null){

            

            document.body.style.cursor = 'poninter';
            $('.alert').show();
            



        }else{

            Swal.fire({ 
            title:'Para crear un reporte debes de iniciar sesión', 
            icon: 'warning', 
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: 'green',
            confirmButtonText: 'Iniciar sesión'}).then((result)=>{

                if(result.isConfirmed){

                    window.location.href = 'managementuser/login.php';
                }


            });
        }


    });

    $('.alertaReporte').appendTo('body');

    $('#btnCerrarAlert').click(function(){

        $('.alert').fadeOut(1000);

    });

    window.asignarResponsable = function(reporteid){

        $('#asignarResponsable').appendTo('body');
        $('#asignarResponsable').modal('show');
        $('#idreporteAsignar').attr('value', reporteid);

        $.ajax({

            url: '../router/rutas.php?action=listadoResponsables',
            method: 'GET',
            dataType: 'json',
            success: function (response){

                if(response.status == 'success'){

                    console.log('Las entidades son:', response.data);
                    let options = '';
                    options = '<option>Entidad responsable</option>';

                    response.data.forEach(item => {

                        options += `<option value='${item.ER_ID}' >${item.NOMBRE_ENTIDAD}</option>`;


                    });

                    $('#entidadSelect').html(options);

                }else {

                    Swal.fire('Error en obtener entidades responsables', '', 'error');
                }
            }, error: function(xhr, status){

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status)
            }


        });

    }

    $('#formularioAsignarResponsable').submit(function(e){

        console.log('el reporte es:', $('#idreporteAsignar').val());
        console.log('La entidad es:', $('#entidadSelect').val());

        e.preventDefault();

        $.ajax({

            url: '../router/rutas.php?action=asigarResponsable',
            method : 'POST',
            dataType: 'json',
            data: $(this).serialize(),

            success: function(response){

                if(response.status == 'success'){

                    Swal.fire('! Reporte perfectamente asigando ¡', '', 'success');
                    setTimeout(function(){

                        window.location.reload();

                    }, 2000)
                }else{

                    Swal.fire('Error en asignar el reporte', '', 'error');

                }
            }, error: function(xhr, status){

                console.log('error:', xhr.responseText);
                console.log('status:', status);
            }


        });



    });







});
