import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import Filter from './Filter'
import Loadmore from './LoadMore'
import axios from 'axios'
import Footer from '../../footers/Footer'
import {Link} from 'react-router-dom'

function Main() {
    const state = useContext(GlobalState)
    const [customers, setCustomers] = useState([])
    const [token] = state.token
    const [callback, setCallback] = state.customerAPI.callback
    const [loading, setLoading] = useState(false)
    const [page, setPage] = state.customerAPI.page
    const [sort, setSort] = state.customerAPI.sort
    const [result, setResult] = state.customerAPI.result
    const [city, setCity] = state.customerAPI.city
    const [Id, setId] = state.customerAPI.Id

    useEffect(() => {
        const getCustomers = async () => {
            const res = await axios.get(`/api/customer/all?limit=${page*10}&Id[regex]=${Id}&address3[regex]=${city}&${sort}`,{
                headers: {Authorization: token} 
            })
            setCustomers(res.data.customers)
            setResult(res.data.results)
            console.log(res.data.customers)
        }
        getCustomers()
    },[callback, sort, page, Id, city])

    const deleteCustomer = async (id) =>{
        try{
            const confirm = window.confirm("Are you sure?")
            if(confirm){
                const res = await axios.delete(`/api/customer/${id}`,{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
                setCallback(!callback)
            }
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    if(loading) return <div><Loading /></div>
    return (
        <div>
            <div>
            
            <Filter />
            <table class="table table-hover container">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Balance</th>
                    <th scope="col">City</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(customer => (
                            <tr class="table-primary">
                                <td>{customer.Id}</td>
                                <td>{customer.name.toUpperCase()}</td>
                                <td>{customer.balance}</td>
                                <td>{customer.address3.toUpperCase()}</td>
                                <td><Link type="button" class="btn btn-outline-success" to={`/customer/update/${customer.Id}`}>Update</Link></td>
                                <td><Link type="button" class="btn btn-outline-danger" onClick={() => deleteCustomer(customer.Id)}>Delete</Link></td>
                            </tr>
                        ))
                    }
                
                    
                    
                </tbody>
            </table>
            <Loadmore />
            {customers.length === 0 && <Loading />}
            {customers.length !== 0 && <Footer />}
            
        </div>
        </div>
    )
}

export default Main
