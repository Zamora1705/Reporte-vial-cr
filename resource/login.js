$(function () {

    $('#formularioIniciarSesion1').submit(function (e) {

        e.preventDefault();

        $.ajax({

            url: '../../router/rutas.php?action=buscarUsuario',
            method: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (response) {

                if (response.status == 'success') {

                    setTimeout(function () {

                        let usuario = $('#Usuario').val();
                        console.log('El usuario:', usuario);
                        window.location.href = `login2.php?Usuario=${usuario}`;

                    }, 1000);
                } else {

                    Swal.fire('Este Usuario no esta registrado', '', 'error');
                }
            }, error: function (xhr, status, error) {

                console.log("STATUS:", status);
                console.log("ERROR:", error);
                console.log("ERROR COMO TAL:", xhr.responseText);
            }


        });

    });

    $("#formularioIniciarSesion2").submit(function (e) {


        e.preventDefault();

        $.ajax({

            url: '../../router/rutas.php?action=IniciarSesion',
            method: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (response) {

                if (response.status == 'success') {

                    setTimeout(function () {

                        Swal.fire('! Inicio de sesión exitoso ¡', '', 'success');
                        window.location.href = '../index.php';

                    }, 1000);
                } else {

                    Swal.fire('Contraseña incorrecta', '', 'error');
                }
            }, error: function (xhr, status, error) {

                console.log("STATUS:", status);
                console.log("ERROR:", error);
                console.log("ERROR COMO TAL:", xhr.responseText);
            }

        });


    });

    $('#ojoVerLogin').click(function(){

        $('#ojoVerLogin').hide();
        $('#ojoNoVerLogin').show();
        $('#ContraLogin').attr('type', 'text');


    });

    $('#ojoNoVerLogin').click(function(){

        $('#ojoNoVerLogin').hide();
        $('#ojoVerLogin').show();
        $('#ContraLogin').attr('type', 'password');


    });

});