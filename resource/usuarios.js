$(function (){

    $("#formularioRegistroUsuario").submit(function(e){
        e.preventDefault();
        console.log('ejecutando formulario');

    $.ajax({

        url: '../../router/rutas.php?action=crearUsuario',
        method : 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        success: function (response){
                console.log(response);
            if (response.status == 'success'){
                console.log(response);
                Swal.fire('! Registro exitso !', '', 'success');
                setTimeout(function (){

                    window.location.href='../../main/index.php';
                }, 1000);
            }else{

                Swal.fire('! Ocurrio un error fatal en la creación del usuario ¡', '', 'error');
            } 
        },

        error:function(xhr, status, error){

            console.log("STATUS:", status);
            console.log("ERROR:", error);

            Swal.fire('Ocurrio un error en el servidor', xhr.responseText, 'error');

        }

    });

});



});