import React, {useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import Image from '../../headers/icon/profile.svg'
import './profile.css'
import axios from 'axios'
import Footer from '../../footers/Footer'


function Profile() {
    const state = useContext(GlobalState)
    const [userId] = state.userAPI.userId
    const [Token] = state.token
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState([])
    const [user, setUser] = useState([])
    

    useEffect(() =>{
        const getUser = async () =>{
            const res = await axios.get(`/api/customer/${userId}`, {
                headers: {Authorization: Token}
            })
            setProfile(res.data)
        }
        getUser()
    })

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
           
            await axios.put(`/user/changePassword/${profile.Id}`, {...user}, {
                headers: {Authorization: Token}
            })
            alert("Changed password")
            window.location.href = "/profile";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
            {profile.length !==0 &&
                <div class="container register">
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p><strong> Account Balance: Rs {profile.balance} </strong></p>
                        
                    </div>
                    <div class="col-md-9 register-right">
                    <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Password</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">{profile.name}</h3>
                                <div class="row register-form">
                                    <div class="mr-auto ml-auto">
                                        <div class="form-group">
                                            <p> <strong> User Id:</strong> {profile.Id}</p>
                                        </div>
                                        <div class="form-group">
                                            <p> <strong> Phone:</strong> {profile.phone}</p>
                                        </div>
                                        <div class="form-group">
                                            <p> <strong> Address:</strong> {profile.address1.toUpperCase()}  {profile.address2.toUpperCase()}  {profile.address3.toUpperCase()}</p>
                                        </div>
                                        <div class="form-group">
                                            <p> <strong> Account Created:</strong> {profile.createdAt} </p>
                                        </div>

                                        
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h3  class="register-heading">Change your password</h3>
                                <div class="row register-form">
                                    
                                    <div class="mr-auto ml-auto">
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Current Password *" name="passwordOld" onChange={handleChangeInput} required />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="New Password *" name="passwordNew" onChange={handleChangeInput} required />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Confirm Password *" name="passwordConf" onChange={handleChangeInput} required />
                                        </div>
                                        <input type="submit" class="btnRegister"  value="Change"/>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            }   

            {profile.length === 0 && <Loading />}
            {profile.length !== 0 && <Footer />}
        </>
    )
}

export default Profile
