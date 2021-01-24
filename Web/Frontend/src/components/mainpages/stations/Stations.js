import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import Filter from './Filter'
import axios from 'axios'
import Footer from '../../footers/Footer'
import {Link} from 'react-router-dom'

function Stations() {

    const state = useContext(GlobalState)
    const [stations, setStations] = state.stationAPI.stations
    const [token] = state.token
    const [callback, setCallback] = state.stationAPI.callback
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = state.stationAPI.sort
    const [Id, setId] = state.stationAPI.Id
    const [name, setName] = state.stationAPI.name

    useEffect(() =>{
        const getStations = async () =>{

            const res = await axios.get(`/api/stations?Id[regex]=${Id}&name[regex]=${name}&${sort}`)
            setStations(res.data.stations)
            console.log(res.data.stations)
        }
        getStations()
        setCallback(false)
    },[callback, sort, Id, name])

    const deleteStation = async (id) =>{
        try {
            const confirm = window.confirm("Are you sure?")
            if(confirm){
                const res = await axios.delete(`/api/stations/${id}`,{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
                setCallback(!callback)
            }
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    if(loading) return <div><Loading /></div>
    return (
        <div>
        <div className="container-fluid">
            <Filter /> 
        <div className="table-responsive">
            <table class="table table-bordered table-striped table-responsive-stack" id="tableOne">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stations.map(station => (
                            <tr class="table-primary">
                                <td>{station.Id}</td>
                                <td>{station.name.toUpperCase()}</td>
                                <td><Link type="button" class="btn btn-outline-success" to={`/createStation/${station.Id}`}>Update</Link></td>
                                <td><Link type="button" class="btn btn-outline-danger" onClick={() => deleteStation(station.Id)}>Delete</Link></td>
                            </tr>
                        ))
                    }
                
                    
                    
                </tbody>
            </table>
        </div>
            
        </div>
            {stations.length === 0 && <Loading />}
            {stations.length !== 0 && <Footer />}
        </div>
    )
}

export default Stations
