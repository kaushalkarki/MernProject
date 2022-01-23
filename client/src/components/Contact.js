import React, { useState, useEffect } from 'react';
const Contact = () => {


    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" })
    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        userContact();
    },
        []);

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })

    }

    const contactForm = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;
        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 name, email, phone, message 
                })
        });
        const data = await res.json();
        console.log(data);

        if(!data){
            console.log("message not send");
        }
        else{
            alert("Message Send");
            setUserData({...userData,message:""})
        };
    }

    return (
        <>
            <div className='contact-info'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1 d-lg-flex justify-content-between '>

                            {/* //Phone Number */}
                            <div className='contact-info-item d-flex mt-3 ml-3 justify-content-start align-items-center '>
                                <i class="zmdi zmdi-phone material-iconso-name" />
                                <div className='contact-info-content ml-3'>
                                    <div className='contact-info-title text-wrap'>
                                       <strong> Phone</strong>
                                    </div>
                                    <div className='contact-info-text text-wrap'>
                                        {userData.phone}
                                    </div>
                                </div>
                            </div>



                            {/* //Email */}
                            <div className='contact-info-item d-flex mt-3 ml-3 justify-content-start align-items-center '>
                                <i class="zmdi zmdi-email material-iconso-name" />
                                <div className='contact-info-content ml-3'>
                                    <div className='contact-info-title text-wrap'>
                                        <strong> Email</strong>
                                    </div>
                                    <div className='contact-info-text text-wrap'>
                                        {userData.email}
                                    </div>
                                </div>
                            </div>



                            {/* //Address */}
                            <div className='contact-info-item d-flex mt-3 ml-3 justify-content-start align-items-center '>
                                <i class="zmdi zmdi-home material-iconso-name" />
                                <div className='contact-info-content ml-3'>
                                    <div className='contact-info-title text-wrap'>
                                    <strong> Address</strong>
                                    </div>
                                    <div className='contact-info-text text-wrap'>
                                        Haldwani U.K India
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* //Contact Form */}

            <div className='contact-form'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8 offset-lg-2'>
                            <div className='contact-form-container py-5'>
                                <div className='contact-form-title display-4 my-3'>
                                    <strong>Get In Touch</strong>
                                </div>

                                <form id='contact-form mt-' method='POST'>
                                    <div className='contact-form-name d-lg-flex justify-content-between align-items-between'>
                                        <div className='mb-3 ml-3'>
                                            <input type="text" id='contact-form-name'
                                                className='contact-form-name input_field'
                                                onClick={handleInputs} name="name" value={userData.name} placeholder='Your Name' required="true" />
                                        </div>
                                        <div className='mb-3 ml-3'>
                                            <input type="email" id='contact-form-email'
                                                className='contact-form-email input-field '
                                                onClick={handleInputs} name="email" value={userData.email} placeholder='Your Email' required="true" />
                                        </div>
                                        <div className='mb-3 ml-3'>
                                            <input type="number" id='contact-form-phone'
                                                className='contact-form-phone input-field'
                                                onClick={handleInputs} name="phone" value={userData.phone} placeholder='Your Phone No' required="true" />
                                        </div>
                                    </div>

                                    <div className='contact-form-text form-group ml-3'>
                                        <label for="t-area" />
                                        <textarea id="t-area" className=" form-control  mt-3" rows={4}
                                            onClick={handleInputs} name="message" value={userData.messgae} placeholder='Enter Message' />

                                    </div>
                                    <div className='contact-form-btn d-flex ml-3'>
                                        <input type="submit" onClick={contactForm} value="Send Message" />
                                    </div>

                                </form>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Contact
