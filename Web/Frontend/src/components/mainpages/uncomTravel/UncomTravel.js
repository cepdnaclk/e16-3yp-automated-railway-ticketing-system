import React,{useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Footer from '../../footers/Footer'

function UncomTravel() {
    const state = useContext(GlobalState)
    const [uncom, setUncom] = state.travelAPI.uncom
    const [token] = state.token
    const [Id, SetId] = state.travelAPI.Id
    const [callback, setCallback] = state.customerAPI.callback
    
    const findTravel = async() => {
        
        try {
            const res = await axios.get(`/api/uncom/${Id}`, {
                headers: {Authorization: token}
            })
            setUncom(res.data)
            console.log(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <>
        
        <div class="row mt-5 justify-content-center align-items-center ml-5 mr-5">
            
            <input class="form-control col-md-4" type="text" placeholder="User Id" required
            onChange={e => SetId(e.target.value)} />
            <button class="btn btn-warning col-md-1" onClick={() => findTravel()}>Search</button>
            
            {uncom !== '' &&
            <div className="table-responsive">
            <table class="table table-bordered table-striped table-responsive-stack mt-5" id="tableOne">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Remove Freez</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr class="table">
                        <td>{uncom.UserId}</td>
                        <td>{uncom.createdAt}</td>
                        <td><Link to="/removeFreez" type="button" class="btn btn-outline-danger">View</Link></td>
                    </tr>
                        
                
                    
                    
                </tbody>
            </table>
            </div>
            }

            {uncom === '' &&
            <>
            <div className="container">
            <div class="alert alert-dismissible alert-info mt-5">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Nothing to show!</strong>  Enter User Id to Remove freezed account
            </div>
            </div>
            
            </>
            }
        </div>
        <Footer />
        </>
    )
}

export default UncomTravel

