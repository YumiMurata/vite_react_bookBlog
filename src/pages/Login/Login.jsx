import styles from './Login.module.css';

import { useAuthentication } from '../../hooks/useAuthentication'
import {useState, useEffect} from 'react'


const Login = () => {

  //Criando variáveis para os campos 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  //cria usuario de acordo com o hook
  const{createUser,error:authError, loading, login} = useAuthentication();

  //async pois utiliza funcao await de criacao de usuario
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError("")

    const user={
      email,
      password
    }


    const res = await login(user)

    console.log(user);
  };

  useEffect(()=>{
    if (authError){
      setError(authError)
    }
  },[authError])
  



  return (
        <div className={styles.login}>
          <form onSubmit={handleSubmit}>

          <h1>Login</h1>
          <p>Login to you account to post your reads!</p>
            <label htmlFor="">
              <span>E-mail:</span>
              <input type="email" 
              name="email" 
              required 
              placeholder="E-mail" 
              value= {email}
              onChange={(e) =>setEmail(e.target.value)}/>
            </label>

            <label htmlFor="">
              <span>Senha:</span>
              <input type="password" 
              name="password" 
              required 
              placeholder="Senha"
              value={password}
              onChange={(e)=>setPassword(e.target.value)} />
            </label>


            {!loading && <button className="btn">Login</button>}
            {loading && <button className="btn" disabled>Aguarde...</button>}
            {error && <p className="error">{error}</p>}

          </form>
        </div>
  )
}

export default Login