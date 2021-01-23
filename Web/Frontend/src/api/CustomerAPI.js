import {useState} from 'react'


function CustomerAPI() {
    const [customers, setCustomers] = useState([])
    const [callback, setCallback] = useState([])
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [city, setCity] = useState('')
    const [Id, setId] = useState('')

    return {
        customers: [customers, setCustomers],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        page: [page, setPage],
        result: [result, setResult],
        city: [city, setCity],
        Id: [Id, setId]
    }
}

export default CustomerAPI
