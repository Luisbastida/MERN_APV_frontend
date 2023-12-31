import AdminNav from "../components/AdminNav"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"


const CambiarPassword = () => {
  const {guardarPassword} = useAuth()

  const [alerta,setAlerta]= useState({})
  const [password, setPassword] = useState({
    pwd_actual : '',
    pwd_nuevo : ''
  })

  const handleSubmit = async e =>{
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password.pwd_nuevo.length <=8){
      setAlerta({
        msg:'El password debe ser tener al menos 8 caracteres',
        error: true
      })
      return
    }

    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
      
  }

  const {msg} = alerta;
  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold" >Password aquí</span>
        </p>


        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta} />}
                <form
                    onSubmit={handleSubmit}
                 >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input type="password" className="bg-gray-50 w-full rounded-lg border p-2 mt-5" 
                        name="pwd_actual"
                        placeholder="Escribe tu password actual"
                        onChange={e => setPassword({
                          ...password, 
                          [e.target.name] : e.target.value
                        })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nueva Password</label>
                        <input type="password" className="bg-gray-50 w-full rounded-lg border p-2 mt-5" 
                        name="pwd_nuevo"
                        placeholder="Escribe tu nueva password"
                        onChange={e => setPassword({
                          ...password, 
                          [e.target.name] : e.target.value
                        })}
                  
                        />
                    </div>


                    <input type="submit" value="Actualizar Password" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full text-center hover:cursor-pointer" />
                </form>
            </div>
        </div>

    </>
  )
}

export default CambiarPassword