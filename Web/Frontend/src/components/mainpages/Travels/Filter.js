import React,{useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filter() {

    const state = useContext(GlobalState)
    const [start, setStart] = state.travelAPI.start
    const [end,setEnd] = state.travelAPI.end
    const [sort, setSort] = state.travelAPI.sort
    const [train, setTrain] = state.travelAPI.train

    return (
        <div>
            <div className="container mt-5 mr-auto ml-auto">
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
                            <span class="input-group-text">Start</span>
                        </div>
                        <input type="text" value={start} placeholder="Start Station" class="form-control"
                        onChange={e => setStart(e.target.value.toLowerCase())} />
                    </div>

                    <div class="input-group mb-3 col-md-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">End</span>
                        </div>
                        <input type="text" value={end} placeholder="End Station" class="form-control"
                        onChange={e => setEnd(e.target.value.toLowerCase())} />
                    </div>

                    <div class="input-group mb-3 col-md-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Station</span>
                        </div>
                        <input type="text" value={train} placeholder="Train Name" class="form-control"
                        onChange={e => setTrain(e.target.value.toLowerCase())} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter
