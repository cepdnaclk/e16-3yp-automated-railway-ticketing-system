import React, {useContext, useState, useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import Filters from '../Travels/Filter'
import LoadMore from '../Travels/LoadMore'
import axios from 'axios'
import Footer from '../../footers/Footer'

function Travels() {
    const state = useContext(GlobalState)
    const [travels, setTravels] = useState([])
    const [token] = state.token
    const [userId, setUserId] = state.travelAPI.userId
    const [callback, setCallback] = state.travelAPI.callback
    const [loading, setLoading] = useState(false)
    const [page, setPage] = state.travelAPI.page
    const [sort, setSort] = state.travelAPI.sort
    const [start, setStart] = state.travelAPI.start
    const [end,setEnd] = state.travelAPI.end
    const [result, setResult] = state.travelAPI.result
    const [train, setTrain] = state.travelAPI.train

    useEffect(() => {
        const getTravels = async () => {
            const res = await axios.get(`/api/travel/${userId}?limit=${page*10}&S_StationName[regex]=${start}&Train[regex]=${train}&E_StationName[regex]=${end}&${sort}`,{
                headers: {Authorization: token}
            })
            setTravels(res.data.travels)
            setResult(res.data.results)
            console.log(res.data.travels)
        }
        getTravels()
        
    },[callback, sort, start, end, page, train, userId]) 
    
    if(loading) return <div><Loading /></div>
    return (
        <div className="mr-auto ml-auto">
            <Filters />
            <table class="table table-hover container">
                <thead>
                    <tr>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Train</th>
                    <th scope="col">Class</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        travels.map(travel => (
                            <tr class="table-primary">
                                <td>{travel.S_StationName.toUpperCase()}</td>
                                <td>{travel.E_StationName.toUpperCase()}</td>
                                <td>{travel.Train.toUpperCase()}</td>
                                <td>{travel.class}</td>
                                <td>{travel.cost}</td>
                                <td>{travel.createdAt}</td>
                            </tr>
                        ))
                    }
                
                    
                    
                </tbody>
            </table>
            <LoadMore />
            {travels.length === 0 && <Loading />}
            {travels.length !== 0 && <Footer />}
            
        </div>
    
        
    )
}

export default Travels
