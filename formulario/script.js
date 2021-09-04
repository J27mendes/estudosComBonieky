let validador = {
    handleSubmit:(event)=> {
        event.preventDefault();

        let enviar = true;

        let inputs = formulario.querySelectorAll('input');

        validador.limparErros();
        
        for(let i=0; i<inputs.length; i++){
            let input = inputs[i];
            let check = validador.checkInput(input);
            if(check !== true) {
                enviar = false;
                validador.showError(input, check);             
                }
        }
                if(enviar){
            formulario.submit();
        };
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let j in rules){
                let detalheRegras = rules[j].split('=');
                switch (detalheRegras[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Este campo é obrigatório.';
                        }
                    break; 

                    case 'min':
                        if(input.value.length < detalheRegras[1]){
                            return 'Este campo precisa ter obrigatóriamente ' +detalheRegras[1]+' caracteres.';
                        } 
                    break;

                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'Este Email não é válido'
                            };
                        }
                }
            }

        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    limparErros:()=> {

        let inputs = formulario.querySelectorAll('input');
        for(let k = 0; k < inputs.length; k++){
            inputs[k].style = "";
        }; 

        let errorElements = document.querySelectorAll('.error');
        for(let l = 0; l < errorElements.length; l++){
            errorElements[l].remove();
        };
    },    
};

let formulario = document.querySelector('.b7validator');
formulario.addEventListener('submit', validador.handleSubmit);