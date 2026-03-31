$(function(){

    var categoria = document.querySelectorAll('.categoriadano');


    categoria.forEach(categoria => {

        let texto = categoria.textContent;

    if(texto == 'Grave'){

        categoria.style.color ='red';

    }else if(texto == 'Medio'){

        categoria.style.color='yellow';
    }else{

        categoria.style.color='green';
    }

})





});