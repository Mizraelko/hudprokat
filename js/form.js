"use strict"


document.addEventListener('DOMContentLoaded', function() {

  const selector = document.getElementById("tel_modal");
  const modal = document.getElementById('modal');
  const modalBody = document.querySelector('.modal__body')
  let im = new Inputmask("+7 (999)999-99-99");
  im.mask(selector);

    const form = document.getElementById('form');
    const popupClose = document.getElementById('popup');
    form.addEventListener('submit', formSend);
    
      async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if(error === 0) {
            form.classList.add('_sending');
  
            let response = await fetch('../contacts.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
                setTimeout(() => {
                  popupClose.classList.remove('open');
                  showModalWindow(true, modal)
                  
                },1000);
                
            }else {
              form.classList.remove('_sending');
              
                setTimeout(() => {
                  popupClose.classList.remove('open'); 
                  showModalWindow(false, modal);
                },1000);
                
              }
        }else {
          showModalWindow('no-valid', modal);
        }

    }
    
    function showModalWindow(answer, modal) {
      const modalChild = [...modal.childNodes];
      
      switch (answer) {
        case true:
          modal.showModal()
          break;
        case false:
          modalChild.map((e) => {
            if(e.tagName === 'H3') {
              e.style.backgroundColor = 'red';
              e.style.color = 'white';
            }
            if(e.tagName === 'DIV') {
              const parag = [...e.childNodes]
              parag.map((e) => {
                e.innerHTML = ''
                if(e.className === '_remove') {
                  e.innerHTML = '<strong>Упсс, сообщение не отправленно</strong>'
                }
                
              })
            }
          });
          modal.showModal()
         break;
        case 'no-valid':
          modalChild.map((e) => {
            if(e.tagName === 'H3') {
              e.style.backgroundColor = 'red';
              e.style.color = 'white';
            }
            if(e.tagName === 'DIV') {
              const parag = [...e.childNodes]
              parag.map((e) => {
                e.innerHTML = ''
                if(e.className === '_remove') {
                  e.innerHTML = '<strong>Заполните обязательные поля</strong>'
                }
                
              })
            }
          });
          
          modal.showModal();
          
         break   
        default:
          break;
      }
     return setTimeout(() =>  modal.close(), 1500);
    }
    
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.__req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
          
            if(input.classList.contains('__email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);

                error++;
            }else {
                if(input.value === '') {
                    formAddError(input);
                    error++;
                }
              }    
        }
        
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
        
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
        
        
    }

    //регулярка на email
    function emailTest(input) {
        return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value)
    }
    //Превьюшка фотки
    const formImage = document.getElementById('file');

    const formPreview = document.getElementById('formPreview');
    if (!window.location.href.includes('contact')) {
      formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });
    
    function uploadFile(file) {
        if(!['image/jpeg', 'image/png', "image/gif"].includes(file.type)) {
            alert('Разрешены только изображения.');
            formImage.value = '';
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть не более 2 МБ.');
            return
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="фото">`;
        }
        reader.onerror = function (e) {
            alert('Ошибка');
        }
        reader.readAsDataURL(file);
    }

    }
   

});