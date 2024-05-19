import axios from 'axios';
import { useEffect, useState } from 'react'

export default function GetNotes() {

    const [allNotes, setallNotes] = useState([]);
    const [load , setLoad] = useState(true)

    useEffect(() => {

        const fetchData = async ()=>{
            await axios.get("http://localhost:8000/api/notes")
            .then(res=>setallNotes(res.data.notes))
            .catch(err=>setallNotes('error'))
            setLoad(false)
          }
        fetchData()
    }, []);
    return load ? 'load' : allNotes
}