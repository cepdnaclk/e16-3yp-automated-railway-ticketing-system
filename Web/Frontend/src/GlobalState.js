import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './api/UserAPI'
import TravelAPI from './api/TravelsAPI'
import CustomerAPI from './api/CustomerAPI'
import StationAPI from './api/StationAPI'
import TrainAPI from './api/TrainAPI'
import PaymentAPI from './api/PaymentAPI'
import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        travelAPI : TravelAPI(token),
        customerAPI : CustomerAPI(),
        stationAPI : StationAPI(),
        trainAPI : TrainAPI(),
        paymentAPI : PaymentAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}