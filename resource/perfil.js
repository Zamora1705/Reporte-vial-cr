$(function () {

    $("#nombreBoton").click(function () {

        let campo = $('#Usuario').val();

        $('#DatoActual').attr('value', campo);

        $('#TipoDato').attr('value', 'Nombre')

    });

    $("#correoBoton").click(function () {

        let campo = $('#Correo').val();

        $('#DatoActual').attr('value', campo);

        $('#TipoDato').attr('value', 'Correo')

    });

    $("#cedulaBoton").click(function () {

        let campo = $('#Cedula').val();

        $('#DatoActual').attr('value', campo);

        $('#TipoDato').attr('value', 'Cedula')

    });

    $('#formularioEditarDato').submit(function (e) {
        console.log('Se envio el formulario de editar perfil');
        e.preventDefault();

        let TipoEdit = $('#TipoDato').val();

        $.ajax({

            url: `../../router/rutas.php?action=EditarDatoPerfil&tipo=${TipoEdit}`,
            data: $(this).serialize(),
            dataType: 'json',
            method: 'POST',
            success: function (response) {

                if (response.status == 'success') {

                    Swal.fire('! Cambio de dato exitoso ¡', '', 'success');
                    setTimeout(function () {

                        window.location.reload();

                    }, 1000);
                } else {

                    Swal.fire('! Ocurrio un error ¡', 'el dato no se modifico', 'error');

                }
            }, error: function (xhr) {

                console.log('ERROR:', xhr.responseText);

            }


        })


    });

    $("#formularioEliminarCuenta").submit(function (e) {

        e.preventDefault();

        if ($('#TextoEliminar').val() == 'ACEPTO ELIMINAR MI CUENTA Y CONOZCO LAS CONSECUENCIAS') {


            $.ajax({
                url: '../../router/rutas.php?action=EliminarCuenta',
                method: 'POST',
                dataType: 'json',
                data: $(this).serialize(),
                success: function (response, xhr) {

                    if (response.status == 'success') {

                        Swal.fire('Eliminación de cuenta exitosa', '', 'success');
                        setTimeout(function () {

                            window.location.href = "../panelPerfil/logout.php";

                        }, 1000);
                    } else {

                        Swal.fire('Error en la eliminación de cuenta', xhr.responseText, 'error');

                    }


                }, error: function (xhr) {

                    console.log('ERROR:', xhr.responseText);
                }
            })

        } else {

            Swal.fire('Error', 'Debes escribir de forma correcta el texto indicado', 'error');
        }


    });

    $('#NewContra').attr('disabled', true);
    $('#NewContra2').attr('disabled', true);
    $('#btnCambiarContrasena').attr('disable', true);


    $('#formularioNuevaContrasena').submit(function (e) {

        e.preventDefault();

        let contra1 = $('#NewContra').val();
        let contra2 = $('#NewContra2').val();

        if (contra1 != contra2) {

            Swal.fire('Las contraseñas no coinciden', '', 'error');

        } else {

            
            $.ajax({

                url: '../../router/rutas.php?action=cambiarContrasena',
                method: 'POST',
                datType: 'json',
                data: $(this).serialize(),
            
                success: function (response) {
            
                    if (response.status == 'success') {
            
                        Swal.fire('Cambio de contraseña exitosa', '', 'success');
            
                        setTimeout(function () {
            
                            window.location.reload();
            
                        }, 1000);
            
                    } else {
            
                        Swal.fire('Error en el cambio de contraseña', '', 'error');
                    }
                }, error: function (xhr) {
            
                    console.log('ERROR:', xhr.responseText);
                }
            });


        }









    });

    $('#Contra').blur(function () {

        let valor = $('#Contra').val();


        $.ajax({

            url: `../../router/rutas.php?action=validarContrasenaActual&contra=${valor}`,
            method: 'POST',
            datType: 'json',
            data: $(this).serialize(),

            success: function (response) {

                if (response.status == 'success') {

                    $('#NewContra').attr('disabled', false);
                    $('#NewContra2').attr('disabled', false);
                    $('#btnCambiarContrasena').attr('disable', false);

                } else {

                    Swal.fire('Contraseña incorrecta', '', 'error');
                }
            }, error: function (xhr) {

                console.log('ERROR:', xhr.responseText);
            }
        });


    });


});

