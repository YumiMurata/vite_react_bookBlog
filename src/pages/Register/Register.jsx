import { useAuthentication } from '../../hooks/useAuthentication'
import styles from './Register.module.css'
import {useState, useEffect} from 'react'

const Register = () => {
  //Criando variáveis para os campos 
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  //cria usuario de acordo com o hook
  const{createUser,error:authError, loading} = useAuthentication();

  //async pois utiliza funcao await de criacao de usuario
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError("")

    const user={
      displayName,
      email,
      password
    }

    if (password !== confirmPassword){
      setError("As senhas não são compatíveis, favor verificar para criação da sua conta.");
      return;
    }

    const res = await createUser(user)

    console.log(user);
  };

  useEffect(()=>{
    if (authError){
      setError(authError)
    }
  },[authError])
  


  return (

        <div className={styles.registerform}>

          <form onSubmit={handleSubmit}>
            <h1>Cadastre-se</h1>
            <p>Crie sua conta para compartilhar suas leituras</p>
            
            <label htmlFor="">
              <span>Nome:</span>
              <input type="text" 
              name="displayName" 
              required 
              placeholder="Nome do usuário" 
              value={displayName}
              onChange={(e)=>setDisplayName(e.target.value)}/>
            </label>

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

            <label htmlFor="">
              <span>Confirmação de senha:</span>
              <input type="password" 
              name="confirmPassword" 
              required 
              placeholder="Confirme a sua senha"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)} />
            </label>

            {!loading && <button className="btn">Cadastre-se</button>}
            {loading && <button className="btn" disabled>Aguarde...</button>}
            {error && <p className="error">{error}</p>}

          </form>
        </div>
  )
}

export default Register