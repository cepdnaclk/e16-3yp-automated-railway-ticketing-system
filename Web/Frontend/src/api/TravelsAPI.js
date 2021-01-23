import {useState, useEffect} from 'react'
import axios from 'axios'

function TravelsAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [travels, setTravels] = useState([])
    const [callback, setCallback] = useState([])
    const [sort, setSort] = useState('')
    const [start, setStart] = useState('')
    const [end,setEnd] = useState('')
    const [train, setTrain] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [userId, setUserId] = useState('')

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setUserId(res.data.Id)
                    
                    
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])
    
    return {
        travels: [travels, setTravels],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        start: [start, setStart],
        end: [end,setEnd],
        page: [page, setPage],
        result: [result, setResult],
        train: [train, setTrain],
        userId: [userId, setUserId]
    }
}

export default TravelsAPI
