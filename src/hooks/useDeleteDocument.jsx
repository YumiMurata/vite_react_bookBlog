import {useState, useEffect, useReducer} from "react";
import {db} from "../firebase/config"
import{doc, deleteDoc } from "firebase/firestore"

//defining initial state 
const initialState={
    loading:null,
    error:null
}

//reducer is a function that manages state changes in a predictable way
const deleteReducer = (state,action) =>{
    switch(action.type){
        case "LOADING":
            return{loading:true, error:null}
        case "DELETED_DOC":
            return{loading:false,error:null}
        case "ERROR":
            return{loading:false, error:action.payload}
        default:
            return state;
    }
}

//defining the insertDocument 
//receives the document of which element will be inserted
export const useDeleteDocument =(docCollection)=>{

    const[response, dispatch] = useReducer(deleteReducer, initialState)

    //dealing with memory link
    const[cancelled, setCancelled] = useState(false)

    //before any action check if it is cancelled
    const checkCancelBeforeDispatch =(action)=>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const deleteDocument =async(id)=>{
        checkCancelBeforeDispatch({ type: "LOADING"});

        try{
            const deletedDocument = await deleteDoc(doc(db,docCollection, id))
            
            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument,
              });

        } catch(error){
            console.log("ERROR",error)
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
         }
    };

    useEffect(()=>{
        return () => setCancelled(true)
    },[]);
    
    return {deleteDocument, response}

}