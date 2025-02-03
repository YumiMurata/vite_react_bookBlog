import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut

} from 'firebase/auth'

import {app} from '../firebase/config'

import {useState, useEffect} from 'react'

export const useAuthentication = () =>{
    //teremos dois estados, um de erro e um de loading
    const [error, setError] = useState(null)
    const[loading, setLoading] = useState(null)

    //cleanup para nao deixar resquicios de funcoes
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth(app)
    //isso aqui é o cleanup
    function checkIfIsCancelled (){
        if (cancelled){
            return;
        }
    }

    //REGISTER  
    //assincrona pois é uma funcao que utiliza componente externo (BD)
    //entao isso faz demorar
    const createUser=async(data)=>{
        checkIfIsCancelled()

        setLoading(true)
        setError(null)
        
        try{

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user,
                {displayName :data.displayName
            })
            setLoading(false);

            return user
            
        } catch(error) {
            console.log(error.message)
            
            let systemErrorMessage;

            if(error.message.includes("password")){
                systemErrorMessage= "A senha precisa conter pelo menos 6 caracteres."
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado para um usuário"
            }else{
                systemErrorMessage= "Ocorreu um erro no sistema. Favor tentar mais tarde."
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    

    };

    //logout - SIGN OUT
    const logout = () =>{
        checkIfIsCancelled();
        //function of firebase
        signOut(auth)
    }

    //logout - SIGN IN
    const login = async(data) => {
        checkIfIsCancelled();

        setLoading(true)
        setError(false)

        let systemErrorMessage

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        }catch (error){
            console.log(error.message)
            if (error.message.includes("user-not-found")){
                systemErrorMessage="User not found"
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Wrong Password"
            }else {
                systemErrorMessage= "Ocurred an error, please try again later."
            }
        }
        setError(systemErrorMessage);
        setLoading(false)


    }

    //é executado apenas uma vez
    //faz o cancelado como true, assim que sai dessa funcao
    useEffect(()=>{
        return()=> setCancelled(true);
    },[]);

    return{
        auth, 
        createUser,
        error,
        loading,
        logout,
        login
    }



}