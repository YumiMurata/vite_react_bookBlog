import {useState, useEffect, useReducer} from "react";
import {db} from "../firebase/config"
import{updateDoc, doc} from "firebase/firestore"

//defining initial state 
const initialState={
    loading:null,
    error:null
}

//reducer is a function that manages state changes in a predictable way
const updateReducer = (state,action) =>{
    switch(action.type){
        case "LOADING":
            return{loading:true, error:null}
        case "UPDATE_DOC":
            return{loading:false,error:null}
        case "ERROR":
            return{loading:false, error:action.payload}
        default:
            return state;
    }
}

//defining the insertDocument 
//receives the document of which element will be inserted
export const useUpdateDocument =(docCollection)=>{

    const[response, dispatch] = useReducer(updateReducer, initialState)

    //dealing with memory link
    const[cancelled, setCancelled] = useState(false)

    //before any action check if it is cancelled
    const checkCancelBeforeDispatch =(action)=>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const updateDocument =async(id, data)=>{
        checkCancelBeforeDispatch({ type: "LOADING"});

        try{
            const docRef = await doc(db, docCollection, id)
            const updatedDocument = await updateDoc(docRef, data)
            
            checkCancelBeforeDispatch({
                type: "UPDATE_DOC",
                payload: updatedDocument,
              });

        } catch(error){
            console.log("ERROR",error)
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
         }
    };

    useEffect(()=>{
        return () => setCancelled(true)
    },[]);
    
    return {updateDocument, response}

}