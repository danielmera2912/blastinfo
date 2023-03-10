import React, {useState, useEffect} from 'react';
import '../../hojas-de-estilo/sesion/Registrar.sass';
import Cerrar from "../../images/icons/cerrar.svg";
/**
 * Componente que representa modificar perfil del perfil
 *
 * @component
 * @example
 * const props.abierto = true
 * const props.setAbierto(false) = function => props.abierto=false 
 * const props.nombreUser = "Juan"
 * const props.correoUser = "juan@gmail.com"
 * const props.fechaUser = "2010-10-10"
 * const props.descripcionUser = "me gusta pokemon"
 * return (
 *   <Modificar nombreUser={nombreUser} correoUser={correoUser} fechaUser={fechaUser} descripcionUser={descripcionUser} />
 * )
 */

function Modificar(props) {
  /**
  * Expresión Regular del nombre del Usuario
  */
  const expresionUsuario = /^[a-zA-Z]+$/
  /**
  * Expresión Regular de la contraseña Usuario
  */
  const expresionPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  /**
  * Expresión Regular del correo del Usuario
  */
  const expresionCorreo = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
  /**
  * Expresión Regular de la descripción del Usuario
  */
  const expresionDescripcion = /^[\s\S]{1,300}$/
  const [errorRegistro, setErrorRegistro] = useState(null)
  const [validacionRegistro, setValidacionRegistro] = useState(true)
  const [textCorreo, setTextCorreo] = useState(props.correoUser)
  const [textFecha, setTextFecha] = useState(props.fechaUser)
  const [textDescripcion, setTextDescripcion] = useState(props.descripcionUser)
  const [textUserRegistro, setTextUserRegistro] = useState(props.nombreUser)
  const [textPassRegistro, setTextPassRegistro] = useState("Ee98499304")

  /**
   * establece un cambio de texto para el correo del Usuario
   * @param   {string} e  nuevo correo para el Usuario
   */
  const cambiarTextoCorreo = (e) => {
    setTextCorreo(e.target.value);
  }
  /**
   * establece un cambio de texto para el nombre del Usuario en el registro
   * @param   {string} e  nuevo nombre para el Usuario en el registro
   */
  const cambiarTextoUsuarioRegistro = (e) => {
    setTextUserRegistro(e.target.value);
  }
  /**
   * establece un cambio de texto para la contraseña del Usuario en el registro
   * @param   {string} e  nueva contraseña para el Usuario en el registro
   */
  const cambiarTextoPassRegistro = (e) => {
    setTextPassRegistro(e.target.value);
  }
  /**
   * establece un cambio de texto para la fecha del Usuario
   * @param   {string} e  nueva fecha para el Usuario
   */
  const cambiarTextoFecha = (e) => {
    setTextFecha(e.target.value);
  }
  /**
   * establece un cambio de texto para la descripción del Usuario
   * @param   {string} e  nueva descripción para el Usuario
   */
  const cambiarTextoDescripcion = (e) => {
    setTextDescripcion(e.target.value);
  }

  /**
   * cierra la caja de modificar sesión
   */
  const cerrar_registrar = () => {
    props.setAbierto(false)
  }

  /**
   * establece el modificados de sesión si todos los datos han sido correctos y validados mediante las expresiones regulares
   */
  const ir_iniciarSesion = () => {
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let fechaUser = textFecha.substr(0,4)
    let edadUsuario = anio-fechaUser;
    if(expresionUsuario.test(textUserRegistro)){
      if(expresionCorreo.test(textCorreo)){
        if(expresionPass.test(textPassRegistro)){
          if(edadUsuario>13 && edadUsuario <= 120){
            if(expresionDescripcion.test(textDescripcion)){
              cerrar_registrar();
              alert("Modificado correctamente")
            }else{
              setValidacionRegistro(false);
              setErrorRegistro("Escribe al menos un carácter y menos de 300.")
            }
            
          }else{
            setValidacionRegistro(false);
          setErrorRegistro("Fecha incorrecta, comprueba que hayas puesto una fecha de nacimiento válida y además, ser mayor de 13 años.")
          }
          
        }else{
          setValidacionRegistro(false);
          setErrorRegistro("Contraseña incorrecta, necesitas tener entre 8 a 16 caracteres, al menos un dígito, mayúscula y minúscula.")
        }
      }else{
        setValidacionRegistro(false);
        setErrorRegistro("Correo electronico incorrecto, necesitas tener un patrón correcto, como: usuario@gmail.com")
      }
    }else{
      setValidacionRegistro(false);
      setErrorRegistro("Usuario incorrecto")
    }
    
  }

  return (
    <div>
    {
      props.abierto==true && <div>
        <div className="fondo" onClick={cerrar_registrar}></div>
        <form className="registrar">
            <a href="#" onClick={cerrar_registrar}><img className="registrar__cerrar" src={Cerrar}/></a>
            <tittle className="registrar__titulo">Modificar</tittle>
            <section className="registrar__caja">
            <div className={validacionRegistro ? 'registrar__caja__informativo1' : "registrar__caja__informativo1--visible"} >{errorRegistro}</div>
                <input className="registrar__caja__elemento" onChange={cambiarTextoUsuarioRegistro} value={textUserRegistro} type="text" placeholder="Usuario..."/>
                <input className="registrar__caja__elemento" onChange={cambiarTextoCorreo} value={textCorreo} type="email" placeholder="Correo electrónico..."/> 
                <input className="registrar__caja__elemento" onChange={cambiarTextoPassRegistro} value={textPassRegistro} type="password" placeholder="Contraseña..."/> 
                <input className="registrar__caja__elemento" onChange={cambiarTextoFecha} value={textFecha} type="date"/>
                <input className="registrar__caja__elemento" onChange={cambiarTextoDescripcion} value={textDescripcion} type="text" placeholder="Descripción..."/>
            </section>
            <section className="registrar__boton">
                <a className="registrar__boton__opcion registrar__boton__opcion--registrar" onClick={ir_iniciarSesion}>Guardar</a>

            </section>
        </form>
      </div>
    }

    
    </div>
    
    


  );    
}

export default Modificar;