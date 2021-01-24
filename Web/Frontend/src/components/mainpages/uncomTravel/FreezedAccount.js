import React,{useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import Footer from '../../footers/Footer'
import Loading from '../utils/Loading/Loading'


function FreezedAccount() {
    const state = useContext(GlobalState)
    const [uncom, setUncom] = state.travelAPI.uncom
    const [Id] = state.travelAPI.Id
    const [isAdmin] = state.userAPI.isAdmin
    const [callback, setCallback] = state.customerAPI.callback
    const [stations, setStations] = state.stationAPI.stations
    const [token] = state.token
    const [loading, setLoading] = useState(false)
    const [stationId, setStationId] = useState('')
    

    const handleChangeInputData = e =>{
        const {name, value} = e.target
        setUncom({...uncom, [name]: value})
    }

    const handleChangeInputNumber = e =>{
        const {name, value} = e.target
        setUncom({...uncom, [name]: parseInt(value)})
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setUncom({...uncom, [name]: value.toLowerCase()})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert("You're not an admin!")

            const res = await axios.put(`/api/uncom/removeFreez/${Id}`,{...uncom},{
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            
            setCallback(!callback)
        }catch(err){
            // alert(err.response.data.msg)
        }
    }

    const handleStation = e =>{
        setStationId(e.target.value) 
    }

    if(loading) return <div><Loading /></div>
    return (
        <div>
        <form onSubmit={handleSubmit} className="container mt-5 border border-primary rounded p-5">
            <h3 className="col text-center mb-5">Remove Freeze</h3>
            
            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label htmlFor="UserId" class="col-md-2 col-form-label">User ID</label>
                <input type="text" name="UserId" id="UserId" required class="form-control col-md-4"
                value={uncom.UserId} disabled={true} />
            </div>

            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label htmlFor="S_StationId" class="col-md-2 col-form-label">Start Station Id</label>
                <input type="text" name="S_StationId" id="S_StationId" required class="form-control col-md-4"
                value={uncom.S_StationId} onChange={handleChangeInputData} disabled={true} />
            </div>

            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label htmlFor="S_StationName" class="col-md-2 col-form-label">Start Station Name</label>
                <input type="text" name="S_StationName" id="S_StationName" required class="form-control col-md-4"
                value={uncom.S_StationName} onChange={handleChangeInput} disabled={true}/>
            </div>

            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label htmlFor="class" class="col-md-2 col-form-label">Class</label>
                <input type="number" name="class" id="class" required class="form-control col-md-4"
                value={uncom.class} onChange={handleChangeInputNumber} />
            </div>

            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label htmlFor="TrainId" class="col-md-2 col-form-label">Train Id</label>
                <input type="text" name="TrainId" id="TrainId" required class="form-control col-md-4"
                value={uncom.TrainId} onChange={handleChangeInputData} />
            </div>

            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label htmlFor="Train" class="col-md-2 col-form-label">Train</label>
                <input type="text" name="Train" id="Train" required class="form-control col-md-4"
                value={uncom.Train} onChange={handleChangeInput} />
            </div>

            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label class="col-md-2 col-form-label">Find Station Details: </label>
                <select className="form-control col-md-4" name="E_StationName"  id="E_StationName" onChange={handleStation}>
                        
                        {
                            stations.map(station =>(
                                <option value={station.Id} key={station.Id}>
                                    {station.name}
                                </option>
                            ))
                        }

                </select>
                <input type="text" name="UserId" id="UserId" required class="form-control col-md-4"
                value={stationId} />
            </div>

            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label htmlFor="E_StationId" class="col-md-2 col-form-label">End Station Id</label>
                <input type="text" name="E_StationId" id="E_StationId" required class="form-control col-md-4"
                value={uncom.E_StationId} onChange={handleChangeInputData}/>
            </div>

            <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                <label htmlFor="E_StationName" class="col-md-2 col-form-label">End Station Name</label>
                <input type="text" name="E_StationName" id="E_StationName" required class="form-control col-md-4"
                value={uncom.E_StationName} onChange={handleChangeInput}/>
            </div>

            <div class="col text-center">
                <button class="btn btn-success" type="submit">Submit</button>
            </div>

        </form>

        {uncom.length === 0 && <Loading />}
        <Footer />
        </div>
    )
}

export default FreezedAccount
