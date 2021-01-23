import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function LoadMore() {

    const state = useContext(GlobalState)
    const [page, setPage] = state.travelAPI.page
    const [result] = state.travelAPI.result
   
    return (
        <div className="container">
            {
                result < page * 10 ? ""
                : <button type="button" class="btn btn-outline-danger" onClick={() => setPage(page+1)}>Load more</button>
            }
        </div>
    )
}

export default LoadMore
