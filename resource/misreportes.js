$(function(){

    listadoMisReportes();

    function listadoMisReportes(){

        let usuario = $('#Identidad').val();

        $.ajax({

            url: '../../router/rutas.php?action=listadoMisReportes',
            method: 'POST',
            dataType: 'json',
            data: {usuario : usuario},
            success: function(response){

                if(response.status == 'success'){

                    let td = '';

                    let image;
                    response.data.forEach(item =>{

                         if (item.TIPODANO == 'Hueco') {

                                image = '../../image/hueco.png';

                            } else if (item.TIPODANO == 'Daño en desague') {

                                image = '../../image/desague.png';

                            } else if (item.TIPODANO == 'Semaforo dañado') {

                                image = '../../image/semaforo.png';

                            } else if (item.TIPODANO == 'Grieta') {

                                image = '../../image/Grieta.png';

                            } else if (item.TIPODANO == 'Señal caida') {

                                image = '../../image/SenalCaida.png';
                            }


                        td += `<tr>
                        <th><img src="${image}" alt=""></th>
                        <th>${item.TIPODANO}</th>
                        <th class="categoriadano" >${item.CATEGORIA}</th>
                        <th>${item.PROVINCIA_NOM}</th>
                        <th>${item.CANTON_NOM}</th>
                        <th>${item.DISTRITO_NOM}</th>
                        <th>${item.CALLE_NOM}</th>
                        <th>${item.FECHA}</th>
                        <th></th>
                    </tr>`;

                    });

                    $('#tablaMisReportes').html(td);


                }else{

                    Swal.fire('Error en obtener historial', '', 'error');
                }


            }, error: function(xhr, status){

                console.log('ERROR:', xhr.responseText);
                console.log('STATUS:', status);
            }


        });
    }

    var categoria = document.querySelectorAll('.categoriadano');


    categoria.forEach(categoria => {

        let texto = categoria.textContent;

    if(texto == 'Alto'){

        categoria.style.color ='red';

    }else if(texto == 'Medio'){

        categoria.style.color='yellow';
    }else{

        categoria.style.color='green';
    }

})





});