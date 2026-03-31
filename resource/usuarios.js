$(function (){

    
    
    $("#formularioRegistroUsuario").submit(function(e){
        e.preventDefault();
        console.log('ejecutando formulario');

        if(consultarUsuario($('#Usuario').val()) == 1){
           
            Swal.fire('El usuario que selecciono ya existe, favor de utilizar otro', '', 'error');

           

      
        }else if($('#Contra').val() !== $('#CContra').val()){



            Swal.fire('Las contraseñas no coinciden', '', 'error');
            

        }else{

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

        }



   

});

function consultarUsuario(usuario){

    $.ajax({

        url: '../router/rutas.php?action=buscarUsuarioRegistro',
        method: 'POST',
        dataType: 'json',
        data: (usuario).serialize(),

        success: function(response){

            if(response.status=='success'){


            }


        }, error: function(xhr, status){

            console.log('ERROR EN VERIFICAR USUARIO:', xhr.responseText);
            console.log('STATUS:', status);
        }
    });
}

$('#btnNoVer').click(function() {

    $('#btnNoVer').css({'display':'none'});
    $('#btnVer').css({'display':'block'});
    $('#Contra').attr('type', 'text');


});

$('#btnVer').click(function() {

    $('#btnVer').css({'display':'none'});
    $('#btnNoVer').css({'display':'block'});
    $('#Contra').attr('type', 'password');


});

$('#btnNoVer1').click(function() {

    $('#btnNoVer1').css({'display':'none'});
    $('#btnVer1').css({'display':'block'});
    $('#CContra').attr('type', 'text');


});

$('#btnVer1').click(function() {

    $('#btnVer1').css({'display':'none'});
    $('#btnNoVer1').css({'display':'block'});
    $('#CContra').attr('type', 'password');


});



});