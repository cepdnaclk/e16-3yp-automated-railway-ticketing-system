import {useState, useEffect} from 'react'
import axios from 'axios'


function StationAPI() {
    const [stations, SetStations] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [Id, setId] = useState('')
    const [name, setName] = useState('')

    useEffect(() =>{
        const getStation = async () =>{
            try {
                const res = await axios.get('/api/stations')
                SetStations(res.data.stations)
            } catch (err) {
                alert(err.response.data.msg)
            }
        }
        getStation()
    },[callback])


    return {
        stations: [stations, SetStations],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        page: [page, setPage],
        result: [result, setResult],
        Id: [Id, setId],
        name: [name, setName]
    }
}

export default StationAPI
