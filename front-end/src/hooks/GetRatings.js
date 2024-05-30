import axios from 'axios';
import { useEffect, useState } from 'react'



export default function GetRatings() {

    const [allRatings, setAllRatings] = useState([]);
    const [load , setLoad] = useState(true)

    useEffect(() => {

        const fetchData = async ()=>{
            await axios.get("http://localhost:8000/api/ratings")
            .then(res=>setAllRatings(res.data.ratings))
            .catch(err=>setAllRatings('error'))
            setLoad(false)
          }

        fetchData()

    }, []);


    return load ? 'load' : allRatings
}
