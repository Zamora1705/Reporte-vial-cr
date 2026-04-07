$(function(){

    listadoReportesAsignados();

    function listadoReportesAsignados(){

        let rol = $('#Rol').val();

        $.ajax({

            url: `../../router/rutas.php?action=listadoReportesAsignados&rol=${rol}`,
            method: 'GET',
            dataType: 'json',
            success: function(response){

                if(response.status == 'success'){

                    let th = '';
                    let image = '';
                    response.data.forEach(reporte => {

                        if (reporte.NOMBRE_DANO == 'Hueco') {

                                image = '../../image/hueco.png';

                            } else if (reporte.NOMBRE_DANO == 'Daño en desague') {

                                image = '../../image/desague.png';

                            } else if (reporte.NOMBRE_DANO == 'Semaforo dañado') {

                                image = '../../image/semaforo.png';

                            } else if (reporte.NOMBRE_DANO == 'Grieta') {

                                image = '../../image/Grieta.png';

                            } else if (reporte.NOMBRE_DANO == 'Señal caida') {

                                image = '../../image/SenalCaida.png';
                            }


                        th +=  `<tr><th><img src='${image}' alt=''></th><th>${reporte.NOMBRE_DANO}</th><th>${reporte.NOMBRE_CATEGORIA}</th><th>${reporte.PROVINCIA_NOM}</th><th>${reporte.CANTON_NOM}</th><th><button onclick='finalizarReporte(${reporte.REPORTE_ID})' class='btn btn-success' >Reporte Finalizado <i class="fa-solid fa-paper-plane"></i></button></th><th><button class="btn btn-primary btnWaze"><a href="https://waze.com/ul?ll=${reporte.LATITUD},${reporte.LONGITUD}&navigate=yes" >Ir a waze <i class="fa-brands fa-waze"></i></a></button></th></tr>`;       
                    });

                    $('#tableReporte').html(th);


                }else{

                    Swal.fire('Error en obtener los reportes', '', 'error');
                }


            }, error: function(xhr, status){

                console.log('ERROR:', xhr,responseText);
                console.log('status:', status);
            }


        });
    }

    window.finalizarReporte = function (idreporte){

         console.log('El id del reporte es:', idreporte);
        $.ajax({

           
            url:  `../../router/rutas.php?action=finalizarReporte&idreporte=${idreporte} `,
            method: 'GET',
            dataType: 'json',
            success: function(response){

                if(response.status == 'success'){

                    let report = response.data[0];

                    let usuario = report.NOMBRE;
                    let correo = report.CORREO;
                    let fecha = report.FECHA;
                    let tipodano = report.NOMBRE_DANO;
                    let categoria = report.NOMBRE_CATEGORIA;
                    let provincia = report.PROVINCIA_NOM;
                    let canton = report.CANTON_NOM;
                    let distrito = report.DISTRITO_NOM;
                    let calle = report.NOMBRE_CALLE;
                    let Usuario_FK = report.USUARIO_FK;
                    let entidad = report.ENTIDAD_RESPONSABLE;


                    console.log('el correo que se quiere enviar es:', correo, 'el nombre es:', usuario);

                    $.ajax({

                        url: '../../mail/finalizarreporte.php',
                        method: 'POST',
                        dataType: 'json',
                        data: { usuario : usuario, correo : correo, fecha : fecha },
                        success: function(response){

                            if(response.status == 'success'){
                                 console.log('Ejecutando crear historial_reporte');
                                $.ajax({

                                    url: '../../router/rutas.php?action=HistorialReporte',
                                    method: 'POST',
                                    dataType: 'json',
                                    data: {idreporte : idreporte, tipodano : tipodano, categoria : categoria, provincia : provincia, 
                                    canton : canton, distrito : distrito, calle : calle, fecha : fecha, Usuario_FK : Usuario_FK},
                                    success:function(response){

                                        if(response.status == 'success'){

                                            
                                            $.ajax({

                                                url: '../../router/rutas.php?action=crearNotificacion',
                                                method: 'POST',
                                                dataType: 'json',
                                                data: {Usuario_FK : Usuario_FK, entidad : entidad},
                                                success: function(response){

                                                    if(response.status == 'success'){

                                                        $.ajax({

                                    url: '../../router/rutas.php?action=eliminarReporte',
                                    method: 'POST',
                                    dataType: 'json',
                                    data: {idreporte : idreporte},
                                    success:function(response){

                                        if(response.status == 'success'){

                                            Swal.fire(' ! Reporte finalizado exitosamente ¡', '', 'success');
                                            setTimeout(function(){

                                                window.location.reload();

                                            });

                                           
                                        }else{

                                            Swal.fire('Error en historial reporte', '', 'error');
                                        }
                                    }, error: function(xhr, status){

                                        console.log('ERROR:', xhr.responseText);
                                        console.log('STATUS:', status);
                                    }



                                });


                                                    }else{

                                                        Swal.fire('Error en crear notificacion', '', 'error');
                                                    }


                                                }, error: function (xhr, status){

                                                    console.log('ERROR:', xhr.responseText);
                                                    console.log('status:', status);
                                                }



                                            });

                                         

                                           
                                        }else{

                                            Swal.fire('Error en finalizar reporte', '', 'error');
                                        }
                                    }, error: function(xhr, status){

                                        console.log('ERROR:', xhr.responseText);
                                        console.log('STATUS:', status);
                                    }



                                });

                            }else{

                                Swal.fire('Error en enviar correo de finalizar reporte', '', 'error');
                            }


                        }, error: function(xhr, status){

                            console.log('ERROR:', xhr.responseText);
                            console.log('status:', status)
                        }

                    });

                    

                }else{

                    Swal.fire('Error en finalizar reporte 1', '', 'error');
                }


            }, error: function(xhr, status){

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);
            }


        });
    }



});

    