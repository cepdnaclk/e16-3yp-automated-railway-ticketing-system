import React, { useContext, useState } from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Footer from '../../footers/Footer'

function Payments() {
    const state = useContext(GlobalState)
    const [payment, setPayment] = state.paymentAPI.payment
    const [token] = state.token
    const [callback, setCallback] = state.paymentAPI.callback
    const [s1, sets1] = useState('')
    const [s2, sets2] = useState('')
    const [stations] = state.stationAPI.stations
    const [isAdmin] = state.userAPI.isAdmin
    let Id1;
    let Id2;
    let Id;

    const findPayment = async() =>{
        
        stations.forEach(station =>{
            if(s1 === station.name){
                Id1 = station.Id
                console.log(station.name)
            }
        })
        stations.forEach(station =>{
            if(s2 === station.name){
                Id2 = station.Id
                console.log(station.name)
            }
        })
        IDcheck()                   
    }
    
    const IDcheck = async() =>{
        if(Id1 < Id2) {
            Id = Id1+Id2 
            
        }
        else {
            Id = Id2+Id1
            
        }
        next()
    } 

    const next = async () =>{
        try {
            const res = await axios.get(`/api/payment/${Id}`,{
                headers: {Authorization: token}
            })
            setPayment(res.data)
            console.log(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
        
    }


    return (
        <>
        
        <div class="row mt-5 justify-content-center align-items-center ml-5 mr-5">
            
            <input class="form-control col-md-4" type="text" placeholder="From" required
            onChange={e => sets1(e.target.value.toLowerCase())} />
            <input class="form-control col-md-4" type="text" placeholder="To" required
            onChange={e => sets2(e.target.value.toLowerCase())} />
            <button class="btn btn-warning col-md-1" onClick={() => findPayment()}>Search</button>

            {isAdmin && 
                <Link to='/createPayment' class="btn btn-success col-md-2 ml-3 mr-3" >Create</Link>
            }
            
            
            {payment !== '' &&
            <div className="table-responsive">
            <table class="table table-bordered table-striped table-responsive-stack" id="tableOne">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">First Class</th>
                    <th scope="col">Second Class</th>
                    <th scope="col">Third Class</th>
                    {isAdmin && <th scope="col">Update</th>}
                    
                    </tr>
                </thead>
                <tbody>
                
                    <tr class="table">
                        <td>Rs {payment.first}</td>
                        <td>Rs {payment.second}</td>
                        <td>Rs {payment.third}</td>
                        {isAdmin && <td><Link to={`/createPayment/${payment.Id}`} type="button" class="btn btn-outline-danger">Edit</Link></td>}  
                    </tr>
                      
                
                    
                    
                </tbody>
            </table>
            </div>
            }
            
            {payment === '' &&
            <>
            <div className="container">
            <div class="alert alert-dismissible alert-info mt-5">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Nothing to show!</strong>  Enter Start & End Stations to find Cost or Create a new Payment
            </div>
            </div>
            
            </>
            }
        </div>
        <Footer />
        </>
    )
}

export default Payments
