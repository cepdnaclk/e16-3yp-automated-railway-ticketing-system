import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import Loading from '../utils/Loading/Loading'
import Footer from '../../footers/Footer'
import '../../../bootstrap.css'



function CreatePayment() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [callback, setCallback] = state.paymentAPI.callback
    const [token] = state.token
    const [loading, setLoading] = useState(false)
    const [stations] = state.stationAPI.stations
    const [newPay, setNewPay] = useState('')
    const [stationId, setStationId] = useState('')
    

    const [payment, setPayment] = useState('')
    const [onEdit, setOnEdit] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin

    const handleStation = e =>{
        setStationId(e.target.value) 
    }

    useEffect(() =>{
        if(params.Id){
            setOnEdit(true)
            const getPayment = async () =>{
                const res = await axios.get(`/api/payment/${params.Id}`,{
                    headers: {Authorization: token}
                })
                setPayment(res.data)
                console.log(res.data)
            }
                
            getPayment()
            setCallback(false)
        }else{
            setOnEdit(false)
            
        }
    },[callback])

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setPayment({...payment, [name]: parseInt(value)})
    }

    const handleChangeInputNew = e =>{
        const {name, value} = e.target
        setNewPay({...newPay, [name]: parseInt(value)})
    }

    const handleChangeInputData = e =>{
        const {name, value} = e.target
        setNewPay({...newPay, [name]: value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin!")
            if(onEdit){
                const res = await axios.put(`/api/payment/${payment.Id}`,{...payment},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post(`/api/payment`,{...newPay},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    if(loading) return <div><Loading /></div>
    return (
        <div>
            
            {onEdit && 
            <form onSubmit={handleSubmit} className="container mt-5 border border-primary rounded p-5">
                <h3 className="col text-center mb-5">Payment Details</h3>
                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="Id" class="col-md-2 col-form-label">User ID</label>
                    <input type="text" name="Id" id="Id" required class="col-md-4"
                    value={payment.Id}  disabled={true} />
                </div>
                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="first" class="col-md-2 col-form-label">First Class</label>
                    <input type="text" name="first" id="first" required class="col-md-4"
                    value={payment.first} onChange={handleChangeInput}  />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                        <label htmlFor="second" class="col-md-2 col-form-label">Second Class</label>
                        <input type="text" name="second" id="second" required class="col-md-4"
                        value={payment.second} onChange={handleChangeInput}  />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                        <label htmlFor="third" class="col-md-2 col-form-label">Third Class</label>
                        <input type="text" name="third" id="third" required class="col-md-4"
                        value={payment.third} onChange={handleChangeInput}  />
                </div>
                <div class="col text-center">
                    <button class="btn btn-success" type="submit">{onEdit? "Update" : "Create"}</button>
                </div>
            </form>
            }
           
            


            {
                !onEdit &&
                <form onSubmit={handleSubmit} className="container mt-5 border border-primary rounded p-5">
                <h3 className="col text-center mb-5">Payment Details</h3>
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
                <input type="text" name="UserId" id="UserId" class="form-control col-md-4"
                value={stationId} />
            </div>
                
                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="s1" class="col-md-2 col-form-label">From</label>
                    <input type="text" name="s1" id="s1" required class="col-md-4"
                    onChange={handleChangeInputData} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="s2" class="col-md-2 col-form-label">To</label>
                    <input type="text" name="s2" id="s2" required class="col-md-4"
                    onChange={handleChangeInputData} />
                </div>
                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="first" class="col-md-2 col-form-label">First Class</label>
                    <input type="number" name="first" id="first" required class="col-md-4"
                     onChange={handleChangeInputNew}  />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                        <label htmlFor="second" class="col-md-2 col-form-label">Second Class</label>
                        <input type="number" name="second" id="second" required class="col-md-4"
                        onChange={handleChangeInputNew}  />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                        <label htmlFor="third" class="col-md-2 col-form-label">Third Class</label>
                        <input type="number" name="third" id="third" required class="col-md-4"
                        onChange={handleChangeInputNew}  />
                </div>
                <div class="col text-center">
                    <button class="btn btn-success" type="submit">{onEdit? "Update" : "Create"}</button>
                </div>
                </form>
            }
            
           
           <Footer />
        </div>
    )
}

export default CreatePayment
