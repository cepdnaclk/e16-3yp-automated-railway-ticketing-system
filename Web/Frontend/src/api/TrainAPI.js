import {useState} from 'react'


function TrainAPI() {
    const [trains, setTrains] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [Id, setId] = useState('')
    const [name, setName] = useState('')
    

    return {
        trains: [trains, setTrains],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        page: [page, setPage],
        result: [result, setResult],
        Id: [Id, setId],
        name: [name, setName]
    }
}

export default TrainAPI
