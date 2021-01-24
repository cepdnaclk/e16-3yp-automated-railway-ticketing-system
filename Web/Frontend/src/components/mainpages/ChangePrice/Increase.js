import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import '../../../bootstrap.css'
import {GlobalState} from '../../../GlobalState'
import Footer from '../../footers/Footer'

function Increase() {
    const [payment, setPayment] = useState('')
    const state = useContext(GlobalState)
    const [token] = state.token
    const [isAdmin] = state.userAPI.isAdmin

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setPayment({...payment, [name]: parseInt(value)})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin!")
            const res = await axios.put(`/api/payments/increase`,{...payment},{
                headers: {Authorization: token}
            })
            alert(res.data.msg)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="container mt-5 border border-primary rounded p-5">
                <h3 className="col text-center mb-5">Increase All Prices by</h3> <br/>
                <p className="col text-center mb-5"><strong>Enter the amount you want to increase for each class</strong></p>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                    <label htmlFor="first" class="col-md-2 col-form-label">First Class</label>
                    <input type="text" name="first" id="first" required class="col-md-4"
                     onChange={handleChangeInput}  />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                        <label htmlFor="second" class="col-md-2 col-form-label">Second Class</label>
                        <input type="text" name="second" id="second" required class="col-md-4"
                         onChange={handleChangeInput}  />
                </div>

                <div className="form-group row justify-content-center align-items-center mr-auto ml-auto">
                        <label htmlFor="third" class="col-md-2 col-form-label">Third Class</label>
                        <input type="text" name="third" id="third" required class="col-md-4"
                         onChange={handleChangeInput}  />
                </div>
                <div class="col text-center">
                    <button class="btn btn-success" type="submit">Increase</button>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Increase
