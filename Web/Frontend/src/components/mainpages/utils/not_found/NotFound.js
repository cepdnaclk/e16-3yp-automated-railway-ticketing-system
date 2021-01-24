import React from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../../footers/Footer'

function NotFound() {
    return (
        <div>
            <div class="jumbotron">
                <h1 class="display-3">404 | Not Found</h1>
                <p class="lead">The Content you find is not found :(</p>
                <hr class="my-4" />
                
                <p class="lead">
                    <Link to='/' class="btn btn-primary btn-lg" href="#" role="button">Back to Home Page</Link>
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound
