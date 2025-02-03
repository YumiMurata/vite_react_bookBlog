import { useState, useEffect } from "react"
import {db} from "../firebase/config"

//imports for query in firebase
import {collection, query, orderBy, onSnapshot, where, QuerySnapshot} from 'firebase/firestore'


export const useFetchDocuments =(docCollection, search=null, uid=null)=>{

    const [documents, setDocuments] = useState(null)
    const[error, setError]=useState(null)
    const[loading, setLoading] = useState(null)

    //dealing with memory link
    const[cancelled, setCancelled] = useState(false)

    useEffect(()=>{

        async function loadData(){
            if(cancelled){ 
                return;}
            setLoading(true)

            const collectionRef = await collection(db, docCollection);

            try{
                let q;
                //search based on the tags of the post
                if(search){
                    q=await query(
                        collectionRef,
                        where("tagsArray","array-contains",search),
                    orderBy("createdAt","desc")

                );
                console.log("SEARCH _________")

                }else if(uid){
                    q=await query(
                        collectionRef,
                        where("uid","==",uid),
                        orderBy("createdAt","desc"))
                        console.log("ELSE IF _________");
                }
                else{
                    q=  query(collectionRef, orderBy("createdAt","desc"))
                    console.log("ELSE___________-")
                }
                console.log('QUERY',q)
                onSnapshot(q,(querySnapshot)=>{
                    
                    setDocuments(
                        querySnapshot.docs.map((doc)=>({
                            id:doc.id, //id vem de um lugar
                            ...doc.data(), //the rest of the data comes from doc
                        }))
                    )
                    console.log("FETCHED DATA", documents)
                });
                setLoading(false)
            }catch(error){
                console.log("ERROR FETCH",error)
                setError(error.message)
                setLoading(false)
            }
        }

         //chamando a funcao quando o docCollection, search or cancelled statees change
         loadData();

        //this will happen one time

        return () => {
            setCancelled(true);
          };
        

    },[docCollection, search, uid,cancelled])

    return {documents, loading, error};
}