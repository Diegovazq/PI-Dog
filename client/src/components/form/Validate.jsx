const Validate =({name, height, image, life_span, weightMax, weightMin, temperaments})=>{

    let errors= {};
    let regexImg= /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png|pnj|jpeg)/;
    let regexName= /([0-9])+/;
  
    if(!name.trim()) {
        errors.name= "Elegir un nombre"
    } else if (name.length >40 || name.length <2) {
        errors.name= "El nombre tiene que ser entre 1 y 40 caracteres"
    } else if (regexName.test(name.trim())) {
        errors.name= "No se permiten números"
    }
  
    if(!weightMin){
        errors.weightMin= "Por favor elige un peso mínimo"
    } else if (weightMin.trim() > 100 || weightMin.trim() < 1){
        errors.weightMin= "El mínimo tiene que ser entre 1 y 100" 
    }
  
    if(!weightMax){
        errors.weightMax= "Por favor elige un peso máximo"
    } else if (weightMax.trim() > 100 || weightMax.trim() < 1){
        errors.weightMax= "El máximo tiene que ser entre 1 y 100"
    }
  
    if (weightMax && weightMin){
        if (parseInt(weightMin) >= parseInt(weightMax)){
        errors.weightMax= "El peso máximo no puede ser inferior o igual al peso mínimo"
    }
    }
  
    if(!height){
        errors.height= "Por favor elija una altura máxima y una altura mínima"
    } 
  
    if(!life_span){
        errors.life_span= "Elegir una esperanza de vida aproximada"
    } 
  
    if (!image.trim()) {
        errors.image= "Por favor inserte una URL de la imagen del pichicho"
    } else if (!regexImg.test(image.trim())) {
        errors.image= "Inserte una URL válida"
    }
  
    if (!temperaments) {
        errors.temperaments= "Por favor elija mínimo un temperamento"
    }
  
    return errors
  }
  
  export default Validate;