$(function (){

    listadoNotificaciones();

     function listadoNotificaciones(){

        let Identidad = $('#Identidad').val();

        $.ajax({

            url: '../../router/rutas.php?action=listadoNotificaciones',
            method: 'POST',
            dataType: 'json',
            data: {usuario : Identidad},
            success: function(response){

                if(response.status == 'success'){

                    let fila = '';

                    response.data.forEach(item => {

                        let image = '';

                        if(item.ENTIDAD_RESPONSABLE_FK == 2){

                            image = '../../image/mopt.jpeg';

                        }else if(item.ENTIDAD_RESPONSABLE_FK == 4){

                            image = '../../image/conavi.png';
                        }

                       fila += ` <tr>
                    <th><img src="${image}" alt=""></th>
                    <th>${item.FECHA}</th>
                    <th>${item.COMENTARIO}</th>
                    <th><button onclick='eliminarNotificacion(${item.NOTIFICACION_ID})' class="btn btn-danger" ><i class="fa-solid fa-trash"></i></button></th>
                    </tr>`;
                        
                    });

                    $('#tablaNotificacion').html(fila);

                }else{

                    Swal.fire('No hay notificaciones', '', 'warning');
                }


            }, error: function(xhr, status){

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);
            }

        });

    }

    window.eliminarNotificacion = function (idnotificacion){


        Swal.fire({

            title: '¿ Seguro que deseas eliminar esta notificación ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
        }).then((result)=>{

            if(result.isConfirmed){

                
        $.ajax({

            url: '../../router/rutas.php?action=eliminarNotificacion',
            method: 'POST',
            dataType: 'json',
            data: {idnotificacion : idnotificacion},
            success: function(response){

                if(response.status == 'success'){

                    Swal.fire('Notificación eliminada', '', 'success');

                    setTimeout(function(){

                        window.location.reload();

                    }, 2000)

                }else{

                    Swal.fire('Error en eliminar notificación', '', 'Error');
                }


            }, error: function(xhr, status){

                console.log('ERROR:', xhr.responseText);
                console.log('status:', status);

            }


        });


            }

        });





    }






});