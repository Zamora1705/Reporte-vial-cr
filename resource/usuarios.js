$(function (){

    $("#formularioRegistroUsuario").submit(function(){


    $.ajax({

        url: '../router/rutas.php?action=crearUsuario',
        method : 'POST',
        data: $(this).serialize(),
        success: function (response){

            if (response.status == 'success'){

                swal('! Registro exitso !', '', 'success');
                setTimeout(function (){

                    window.location.href='../main/index.php';
                }, 1000);
            }else{

                swal('! Ocurrio un error fatal en la creación del usuario ¡', '', 'error');
            } 
        },

        error:function(){

            swal('Ocurrio un error en el servidor', '', 'error');

        }

    });

});



});