$(function (){

    
    
    $("#formularioRegistroUsuario").submit(function(e){
        let form = $(this);
        e.preventDefault();
        console.log('ejecutando formulario');

        let usuario = $('#Usuario').val();
        console.log('El usuario:', usuario);

           $.ajax({


        url: '../../router/rutas.php?action=buscarUsuarioRegistro',
        method: 'POST',
        dataType: 'json',
        data: { usuario : usuario},

        success: function(response){

            if(response.status=='success'){

                console.log('La busqueda del usuario fue success y el resultado es:', response.data);
                if(response.data>0){
                    


                    Swal.fire('Lo sentimos este nombre de usuario ya existe', '', 'error');
                      
                }else{
                    
                    if($('#Contra').val() !== $('#CContra').val()){


                        Swal.fire('Las contraseñas no coinciden', '', 'error');
                    }else{

                         $.ajax({

                url: '../../router/rutas.php?action=crearUsuario',
                method : 'POST',
                data: form.serialize(),
                dataType: 'json',
                success: function (response){
                        console.log(response);
                    if (response.status == 'success'){
                        console.log(response);
                        Swal.fire('! Registro exitso !', '', 'success');
                        setTimeout(function (){
        
                            window.location.href='login.php';
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
                }

              

            }else{

                Swal.fire('Error en verificar el usuario', '', 'error');
            }


        }, error: function(xhr, status){

            console.log('ERROR EN VERIFICAR USUARIO:', xhr.responseText);
            console.log('STATUS:', status);
        }
    });

           


        


  
   

});



 


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