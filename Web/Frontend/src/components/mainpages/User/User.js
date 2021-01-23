import React, { useContext, useState } from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Footer from '../../footers/Footer'

function User() {
    const state = useContext(GlobalState)
    const [users, setUsers] = useState('')
    const [token] = state.token
    const [Id, SetId] = useState('')
    const [callback, setCallback] = state.customerAPI.callback
  

    const findUser = async() => {
        
        try {
            const res = await axios.get(`/user/${Id}`, {
                headers: {Authorization: token}
            })
            setUsers(res.data)
            console.log(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const deleteCustomer = async (id) =>{
        try{
            const confirm = window.confirm("Are you sure?")
            if(confirm){
                const res = await axios.delete(`/user/${id}`,{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
                setCallback(!callback)
            }
        }catch(err){
            alert(err.response.data.msg)
        }
    }
    
    return (
        <>
        
        <div class="row mt-5 justify-content-center align-items-center ml-5 mr-5">
            
            <input class="form-control col-md-4" type="text" placeholder="User Id" required
            onChange={e => SetId(e.target.value)} />
            <button class="btn btn-warning col-md-1" onClick={() => findUser()}>Search</button>
            
            {users !== '' &&
            <table class="table table-hover container mt-5">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr class="table">
                        <td>{users.Id}</td>
                        <td>{users.createdAt}</td>
                        <td><Link type="button" class="btn btn-outline-danger" onClick={() => deleteCustomer(users.Id)}>Delete</Link></td>
                    </tr>
                        
                
                    
                    
                </tbody>
            </table>
            }

            {users === '' &&
            <>
            <div className="container">
            <div class="alert alert-dismissible alert-info mt-5">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Nothing to show!</strong>  Enter User Id to find App User
            </div>
            </div>
            
            </>
            }
        </div>
        <Footer />
        </>
        
    )
}

export default User
