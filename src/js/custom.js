// o uso de "$" instancia jQuery e evita conflitos com outra bibliotecas.
//jQuery(function($) pode ser iniciado dessa forma

$(document).ready(function(){

    $('.owl-carousel').owlCarousel();

    let titulos = $('h4') // tag
   
    let itens = $('.featured-item') // class
    
    let destaques = $('#featured') // id

    $('.featured-item a').addClass('btn btn-success stretch-link');

    $('.featured-item:first h4').append('<span class="badge bg-s">Novo</span>')

    // $('.featured-item:first h4').start('<span class="badge bg-secondary">Novo</span>')
    // $('.featured-item:first h4').html('<span class="badge bg-secondary">Novo</span>')
    // $('.featured-item:first h4').addClass('active')
    // $('.featured-item:first h4').removeClass('active')
    // $('.featured-item:first h4').toggleClass('active')
    // $('.featured-item:first h4').hide()
    // $('.featured-item:first h4').show()
    // $('.featured-item:first h4').fadeIn(2000)
    // $('.featured-item:first h4').fadeOut()
    //  $('.featured-item:first h4').css('color', '#f00')
    //$('.featured-item:first h4').css('color','#cfa') 
   //$('.featured-item a').on('blur', function(event){
   //    event.preventDefault();
   //   alert('Produto Esgotado')
   // })

    //CallBack
   // $('.featured-item:nth(1)').hide(500, function(){
   //     console.log( $(this).find('h4').text() + ' esgotado' )
   // })
   // .show(500, function(){
   //    console.log( $(this).find('h4').text() + ' em estoque' )
   //})
    const duracao = 1000
    $('.featured-item')
    .hide(1)
    .show(duracao)

    $('#form-submit').on('click', function(e){

        e.preventDefault()

        if( $('#email').val() != '' ){

            $('#email').animate({

                opacity: "toggle",
                top: "-50"
            }, duracao, function(){
                console.log($(this).val())
            })
        }
           
    })

    /*
    * Ouvinte de eventos 
    */
    $('.nav-modal-open').on('click', function(e){

        e.preventDefault();
  
        let elem = $(this).attr('rel')
  
        $('.modal-body').html($('#'+elem).html())
        
        $('.modal-header h5.modal-title').html($(this).text())
  
        let myModal = new bootstrap.Modal($('#modelId'))
  
        myModal.show()
  
  
     })

     function validate(elem){
        if( elem.val() == '') {
  
           console.log('o campo de '+ elem.attr('name') + ' é obrigatório')
  
           elem.parent().find('.text-muted').show()
  
           elem.addClass('invalid')
  
           return false
        } else {
           elem.parent().find('.text-muted').hide()
           elem.removeClass('invalid')
        }
     }

     function validateName(elem){
        if(elem.val().length < 3) {
  
           console.log('o campo de '+ elem.attr('name') + ' é obrigatório')
  
           elem.parent().find('.text-muted').show()
  
           elem.addClass('invalid')
  
           return false
        } else {
           elem.parent().find('.text-muted').hide()
           elem.removeClass('invalid')
        }
     }

     function validateEmail(elem){
        if(elem.val().includes('@') && elem.val().includes('.com')) {
            elem.parent().find('.text-muted').hide()
            elem.removeClass('invalid')

        } else {
              
           console.log('o campo de '+ elem.attr('name') + ' é obrigatório')
           elem.parent().find('.text-muted').show()
           elem.addClass('invalid')
           return false
        }
     }
  
     $('body').on('submit', '.modal-body .form', function(e){
  
        e.preventDefault()
  
        const inputName = $('#nome')
        const inputEmail = $('#email')
  
        validateName(inputName)
        validateEmail(inputEmail)
  
        if(inputName.hasClass('invalid') || inputEmail.hasClass('invalid')){
           console.log('verificar campos obrigatórios')
           return false
        } else {
           $(this).submit()  
        }
  
     })

     $('body').on('click', '#nome', function(){
        validateName($(this))
     })
  
     $('body').on('click', '#email', function(){
        validateEmail($(this))
     })

     $('body').on('click', '#date', function(){
        validate($(this))
        $(this).mask('00/00/0000')
     })

     $('body').on('focus', '#date', function(){
        $(this).datepicker()
     })

     $('body').on('click', '#time', function(){
        validate($(this))
        $(this).mask('00:00')
     })

     $('body').on('click', '#cep', function(){
        validate($(this))
        $(this).mask('00000-000')
     })

     $('body').on('click', '#phone', function(){
        validate($(this))
        $(this).mask('00000-0000')
     })

     $('body').on('click', '#cpf', function(){
        validate($(this))
        $(this).mask('000.000.000-00')
        // desenvoli toda a regex, mas não consegui aplicar nas mascara
        //"/^\d{3}.?\d{3}.?\d{3}-?\d{2}$/"
        // alguma ideia?
     })


})

