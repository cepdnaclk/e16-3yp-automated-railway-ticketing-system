import React, {useState} from 'react'
import Loading from '../utils/Loading/Loading'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slide1 from '../../headers/icon/slide1.png'
import slide2 from '../../headers/icon/slide2.jpg'
import slide3 from '../../headers/icon/slide3.jpg'
import './home.css'
import Footer from '../../footers/Footer'

function Homepage() {
    const [loading, setLoading] = useState(false)
    
    const redirect = async () =>{
        window.open('http://slr.malindaprasad.com')
    }
    
    if(loading) return <div><Loading /></div>
    return (
        <>
        <div className="container-fluid row">
            <div class="jumbotron col-md-6 mt-5 ml-5 mr-5">
                <h1 class="display-3">Train Schedules</h1>
                <p class="lead">You can find any train schedule from here!</p>
                <hr class="my-4" />
                <p>You will be redirected to the http://slr.malindaprasad.com from here</p>
                <p class="lead">
                    <a class="btn btn-primary btn-lg" onClick={redirect} role="button">Find Schedules</a>
                </p>
            </div>
            <div class="carsol col-md-4 ml-5 mr-5">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="2500">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block w-100" src={slide1} alt="First slide" />
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src={slide2} alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src={slide3} alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            </div>
        </div>
        
        <Footer />
      </>
    )
}

export default Homepage
