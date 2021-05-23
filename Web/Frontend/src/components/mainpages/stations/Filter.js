import React,{useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'

function Filter() {

    const state = useContext(GlobalState)
    const [sort, setSort] = state.stationAPI.sort
    const [Id, setId] = state.stationAPI.Id
    const [name, setName] = state.stationAPI.name

    return (
        <div>
            <div className="container mt-5">
                <div class="form-group row">

                    <div class="input-group mb-3 col-md-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Sort By</span>
                        </div>
                        <select className="form-control" value={sort} onChange={e => setSort(e.target.value)} >
                            <option value=''>Newest</option>
                            <option value='sort=oldest'>Oldest</option>
                        </select>
                    </div>

                    <div class="input-group mb-3 col-md-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Name</span>
                        </div>
                        <input type="text" value={name} placeholder="Station Name" class="form-control"
                        onChange={e => setName(e.target.value.toLowerCase())} />
                    </div>

                    <div class="input-group mb-3 col-md-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Station Id</span>
                        </div>
                        <input type="text" value={Id} placeholder="Train Id" class="form-control"
                        onChange={e => setId(e.target.value)} />
                    </div>
                    <div class="input-group mb-3 col-md-3">
                        <Link to="/createStation" type="button" class="btn btn-warning btn-sm btn-block">Create Station</Link>                   
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Filter
