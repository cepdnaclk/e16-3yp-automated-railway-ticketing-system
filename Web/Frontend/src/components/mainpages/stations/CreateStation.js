import React,{useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import Footer from '../../footers/Footer'
import Loading from '../utils/Loading/Loading'
import '../../../bootstrap.css'

const initialState = {
    Id: '',
    name: ''
}

function CreateStation() {

    const params = useParams()
    const state = useContext(GlobalState)
    const [station, setStation] = useState(initialState)
    const [token] = state.token
    const [callback, setCallback] = state.stationAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [loading, setLoading] = useState(false)

    useEffect (() =>{
        if(params.Id){
            setOnEdit(true)
            const getStation = async () =>{
                const res = await axios.get(`/api/stations/${params.Id}`,{
                    headers: {Authorization: token} 
                })
                setStation(res.data)
                console.log(res.data)
            }
            getStation()
            setCallback(false)
        }else{
            setOnEdit(false)
            setStation(initialState)
        }
    },[callback])

    const handleChangeInputData = e =>{
        const {name, value} = e.target
        setStation({...station, [name]: value})
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setStation({...station, [name]: value.toLowerCase()})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin!")

            if(onEdit){
                const res = await axios.put(`/api/stations/${station.Id}`,{...station},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post(`/api/stations`,{...station},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }        
    }

    if(loading) return <div><Loading /></div>
    return (
        <div>
            <form onSubmit={handleSubmit} className="container mt-5 border border-primary rounded p-5">
                <h3 className="col text-center mb-5">Station</h3>
                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="Id" class="col-md-2 col-form-label">Station ID</label>
                    <input type="text" name="Id" id="Id" required class="col-md-4"
                    value={station.Id} onChange={handleChangeInputData} disabled={onEdit} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="name" class="col-md-2 col-form-label">Station Name</label>
                    <input type="text" name="name" id="name" required class="col-md-4"
                    value={station.name} onChange={handleChangeInput} />
                </div>

                <div class="col text-center">
                    <button class="btn btn-success" type="submit">{onEdit? "Update" : "Create"}</button>
                </div>
            </form>
            
            {station.length === 0 && <Loading />}
            {station.length !== 0 && <Footer />}
        </div>
    )
}

export default CreateStation
