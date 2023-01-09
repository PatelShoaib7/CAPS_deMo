import axios from "axios";
import { createContext, useState , Children, useEffect } from "react";
import { userData } from "../API/Api";

export const App_Context = createContext()

export const AppContext_Provider = ({children}) => {
const [count  , setCount]=useState(0);
const [page , setPage]=useState(1);
const [data , setData]=useState([]);
const [status , setStatus]=useState('');
   const fetchUser =async ()=>{
            const {data}= await axios.get(userData());
            console.log(data.results);
            setData(data.results)
   }
useEffect(()=>{
   fetchUser()
},[])
   return <App_Context.Provider value={{count ,page , setPage  , data , setStatus , status}}>
            {children}
         </App_Context.Provider>
}
//location.country
