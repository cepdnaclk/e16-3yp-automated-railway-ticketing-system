import {useState} from 'react'

function PaymentAPI() {

    const [payment, setPayment] = useState('')
    const [callback, setCallback] = useState(false)
    const [payId, setPayId] = useState('')
    

    return {
        payment: [payment, setPayment],
        callback: [callback, setCallback],
        payId: [payId, setPayId]
    }
}

export default PaymentAPI

