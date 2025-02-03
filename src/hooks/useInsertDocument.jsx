import {useState, useEffect, useReducer} from "react";
import {db} from "../firebase/config"
import{collection, addDoc, Timestamp } from "firebase/firestore"

//defining initial state 
const initialState={
    loading:null,
    error:null
}

//reducer is a function that manages state changes in a predictable way
const insertReducer = (state,action) =>{
    switch(action.type){
        case "LOADING":
            return{loading:true, error:null}
        case "INSERTED_DOC":
            return{loading:false,error:null}
        case "ERROR":
            return{loading:false, error:action.payload}
        default:
            return state;
    }
}

//defining the insertDocument 
//receives the document of which element will be inserted
export const useInsertDocument =(docCollection)=>{

    const[response, dispatch] = useReducer(insertReducer, initialState)

    //dealing with memory link
    const[cancelled, setCancelled] = useState(false)

    //before any action check if it is cancelled
    const checkCancelBeforeDispatch =(action)=>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const insertDocument =async(document)=>{
        checkCancelBeforeDispatch({ type: "LOADING"});

        try{
            console.log("try")
            
            //create the new document with the data of document + the date 
            const newDocument = {...document, createdAt: Timestamp.now()}

            //it looks for the collection that we want to insert data
            const insertedDocument = await addDoc(
                collection(db,docCollection),
                newDocument
            );
            
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument,
              });

        } catch(error){
            console.log("ERROR",error)
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
         }
    };

    useEffect(()=>{
        return () => setCancelled(true)
    },[]);
    
    return {insertDocument, response}

}