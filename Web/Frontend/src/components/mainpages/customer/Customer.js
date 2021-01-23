import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import Loading from '../utils/Loading/Loading'
import Footer from '../../footers/Footer'
import '../../../bootstrap.css'

const initialState = {
    Id: '',
    name: '',
    address1: '',
    address2: '',
    address3: '',
    phone: '',
    balance: 0,
    deposit: 0
}


function Customer() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [customer, setCustomer] = useState(initialState)
    const [token] = state.token
    const [callback, setCallback] = state.customerAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(params.Id){
            setOnEdit(true)
            const getCustomer = async () =>{
                const res = await axios.get(`/api/customer/${params.Id}`,{
                    headers: {Authorization: token} 
                })
                setCustomer(res.data)
                console.log(res.data)
            }
            getCustomer()
        }else{
            setOnEdit(false)
            setCustomer(initialState)
        }
    },[callback])

    const handleChangeInputData = e =>{
        const {name, value} = e.target
        setCustomer({...customer, [name]: value})
    }

    const handleChangeInputNumber = e =>{
        const {name, value} = e.target
        setCustomer({...customer, [name]: parseInt(value)})
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setCustomer({...customer, [name]: value.toLowerCase()})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert("You're not an admin!")

            if(onEdit){
                const res = await axios.put(`/api/customer/update/${customer.Id}`,{...customer},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post(`/api/customer/register`,{...customer},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setCallback(!callback)
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    if(loading) return <div><Loading /></div>
    return (
    
        <div>
            <form onSubmit={handleSubmit} className="container mt-5 border border-primary rounded p-5">
                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="Id" class="col-md-2 col-form-label">User ID</label>
                    <input type="text" name="Id" id="Id" required class="col-md-4"
                    value={customer.Id} onChange={handleChangeInputData} disabled={onEdit} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="name" class="col-md-2 col-form-label">Name</label>
                    <input type="text" name="name" id="name" required class="col-md-4"
                    value={customer.name} onChange={handleChangeInput} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="balance" class="col-md-2 col-form-label">Balance</label>
                    <input type="number" name="balance" id="balance" required class="col-md-4"
                    value={customer.balance} onChange={handleChangeInputNumber} disabled={true} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="deposit" class="col-md-2 col-form-label">Deposit</label>
                    <input type="number" name="deposit" id="deposit" required class="col-md-4"
                    value={customer.deposit} onChange={handleChangeInputNumber} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="phone" class="col-md-2 col-form-label">Phone</label>
                    <input type="text" name="phone" id="phone" required class="col-md-4"
                    value={customer.phone} onChange={handleChangeInputData} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="address1" class="col-md-2 col-form-label">Address:1</label>
                    <input type="text" name="address1" id="address1"  class="col-md-4"
                    value={customer.address1} onChange={handleChangeInput} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="address2" class="col-md-2 col-form-label">Address:2</label>
                    <input type="text" name="address2" id="address2" class="col-md-4"
                    value={customer.address2} onChange={handleChangeInput} />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="address3" class="col-md-2 col-form-label">City</label>
                    <input type="text" name="address3" id="address3" class="col-md-4"
                    value={customer.address3} onChange={handleChangeInput} />
                </div>
                <div class="col text-center">
                    <button class="btn btn-success" type="submit">{onEdit? "Update" : "Create"}</button>
                </div>
            </form>
            {customer.length === 0 && <Loading />}
            {customer.length !== 0 && <Footer />}
        </div>
    )
}

export default Customer
