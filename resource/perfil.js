$(function () {

    $("#nombreBoton").click(function (){

        let campo = $('#Usuario').val();

        $('#DatoActual').attr('value', campo);

        $('#TipoDato').attr('value', 'Nombre')

    });

    $("#correoBoton").click(function (){

        let campo = $('#Correo').val();

        $('#DatoActual').attr('value', campo);

        $('#TipoDato').attr('value', 'Correo')

    });

    $("#cedulaBoton").click(function (){

        let campo = $('#Cedula').val();

        $('#DatoActual').attr('value', campo);

        $('#TipoDato').attr('value', 'Cedula')

    });

    $('#formularioEditarDato').submit(function (e){

        e.preventDefault();

        let TipoEdit = $('#TipoDato').val();

        $.ajax({

            url: `../../router/rutas.php?action=EditarDatoPerfil&tipo=${TipoEdit}`,
            data: $(this).serialize(),
            dataType: 'json',
            method: 'POST',
            success: function (response){

                if(response.status == 'success'){

                    Swal.fire('! Cambio de dato exitoso ¡', '', 'success');
                    setTimeout(function (){

                        window.location.reload();

                    }, 1000);
                }else{

                    Swal.fire('! Ocurrio un error ¡', 'el dato no se modifico', 'error');

                }
            }, error: function(xhr){

                console.log('ERROR:', xhr.responseText);

            }


        })


    });



});


