import React, {useState, useEffect } from 'react'
import{useNavigate} from "react-router-dom"
import Nopic from "../images/no.jpg"
const About = () => {


    const navigate=useNavigate();
    const [pic,setPic]=useState(0);
    const [userData,setUserData]=useState({})
    const callAboutPage = async()=>{
        try {
            const res =await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data= await res.json();
            
            setUserData(data);
            if(!res.status===200){
                const error  = new  Error(res.error);
                throw error;
            }
        } catch (e) {
            console.log(e);
            navigate('/login'); 
            setPic(1);
        }
    }

    useEffect(()=>{
       callAboutPage();     
    },
    [] );
    return (
        <>
            <div className='container emp-profile'>
                <form method="GET">
                    <div className='row mt-3 d-flex ml-4'>
                        <div className="col-md-4">
                            <img src={Nopic} width="40%" alt='profile pic' />
                        </div>
                        <div className="col-md-6">
                            <div className='profile-head'>
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className='profile-rating mt-3 mb-5'>Ranking: <span>8/10</span></p>
                                
                                
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item ">
                                        <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link " id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>



                        <div className='col-md-2'>
                            <input type="submit" className='profile-edit-btn' name="btnAddMore" value="Edit Profile" />

                        </div>
                    </div>

                    <div className='row'>
                        {/* Left Side Url */}
                        <div className='col-md-4'>
                            <div className='profile-work ml-4 mt-2'>
                                <p>WORK LINK</p>
                                <a href="https://google.com" target="_kaushal">YouTube</a><br />
                                <a href="https://google.com" target="_kaushal">Instagram</a><br />
                                <a href="https://google.com" target="_kaushal">Facebook</a><br />
                                <a href="https://google.com" target="_kaushal">LinkedIn</a><br />
                                <a href="https://google.com" target="_kaushal">Google</a><br />


                            </div>
                        </div>
                        {/* rightSide */}
                        <div className='col-md-8 pl-5 about-info'>

                            <div className='tab-content mt-5 ' id='myTabContent'>

                                <div className='tab-pane fade show active' id='home' role="tabpanel" aria-labelledby='home-tab'>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>USER ID</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>55325</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p> {userData.name}</p>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Email</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Profession</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='tab-pane fade ' id='profile' role="tabpanel" aria-labelledby='profile-tab'>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Experience</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Expert</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Rs 100</p>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Total Projects</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>5</p>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>English Level</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Expert</p>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Availability</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>1 Year</p>
                                        </div>
                                    </div>



                                </div>

                            </div>

                        </div>
                    </div>
                </form>

            </div>

        </>
    )
}

export default About;
