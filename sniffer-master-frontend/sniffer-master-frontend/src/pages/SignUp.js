import avatar from '../styles/img/laptop.png'
import PictureLogin from '../styles/img/PictureLogin.png'
import wave from '../styles/img/wave.png'
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState,useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [response, setResponse] = useState('');
    const navigator = useNavigate()

    const { handleSubmit, register, formState: { errors } } = useForm();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
      } else if (window.location.pathname !== '/Home') {
        navigator("/Home");
      }
    }, []);
    const handleSignUp = async (data) => {
        try {
          const response = await axios.post('http://localhost:5000/usuarios', data);
          console.log(response.data);
          setResponse(response.data.mensaje);
        } catch (error) {
          console.error(error.response.data);
          setResponse(error.response.data.mensaje);
        }
      }
      
    return (
        <div>
            <img className='wave' src={wave}></img>
            <div className='container'>
                <div className='img'>
                    <img src={PictureLogin}></img>
                </div>

                <div className='login-content'>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <img src={avatar}></img>
                        <h2 className="title">SignUp</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                id="nombre_completo"
                                placeholder="nombre completo"
                                {...register("nombre_completo", {
                                    required: "Este campo es requerido",
                                    minLength: {
                                        value: 6,
                                        message: "El nombre completo debe tener al menos 6 letras",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z ]+$/,
                                        message: "El nombre completo no debe tener números",
                                    },
                                })}
                            />

                            {errors.nombre_completo && (
                                <span className="text-danger">{errors.nombre_completo.message}</span>
                            )} <label htmlFor="text" className="form-label">
                                nombre completo
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                id="correo"
                                placeholder="Correo"
                                {...register("correo", {
                                    required: "Este campo es requerido",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Correo inválido",
                                    },
                                })}
                            />
                            {errors.correo && (
                                <span className="text-danger">{errors.correo.message}</span>
                            )}
                            <label htmlFor="correo" className="form-label">
                                Correo
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-input"
                                id="contraseña"
                                placeholder="Contraseña"
                                {...register("contraseña", {
                                    required: "Este campo es requerido",
                                    minLength: {
                                        value: 4,
                                        message: "La contraseña debe tener mínimo 4 caracteres",
                                    },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{4,}/,
                                        message:
                                            "La contraseña debe tener mínimo una letra mayúscula y un símbolo @$!%*?&",
                                    }, 
                                })}
                            />
                            {errors.contraseña && (
                                <span className="text-danger">{errors.contraseña.message}</span>
                            )}
                            <label htmlFor="contraseña" className="form-label">
                                Contraseña
                            </label>


                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                id="telefono"
                                placeholder="telefono"
                                {...register("telefono", {
                                    required: "Este campo es requerido",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "El número de teléfono debe tener 10 dígitos y no aceptar letras"
                                    }
                                })}
                            />
                            {errors.telefono && (
                                <span className="text-danger">{errors.telefono.message}</span>
                            )}
                            <label htmlFor="telefono" className="form-label">
                                telefono
                            </label>
                        </div>
                        <Link to="/">iniciar sesión</Link>
                        <Link to="/SignUpMaster">SignUp Master</Link>


                        <button type="submit" className="form-submit" onClick={handleSubmit(handleSignUp)}>

                            SignUp
                        </button>
                        {response && (
                            <div className="response-message">{response}</div>
                        )}

                    </form>
                </div>

            </div>
        </div>

    )
}
export default SignUp;