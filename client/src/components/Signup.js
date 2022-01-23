import React,{useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom';

const Signup = () => {

const navigate = useNavigate();    
const[user,setUser]=useState({
   
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
});

    let name,value;
    const handleInputs=(e)=>{
        console.log(e);
    name=e.target.name;
    value=e.target.value;
    
    setUser({...user,[name]:value});
    }

    const PostData =async (e)=>{
        e.preventDefault();
        const {name,email,phone,work,password,cpassword}=user;

        const res = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,phone,work,password,cpassword
            })

        });
        const data =await res.json();
        if(data.status===422|| !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration")
        }
        else{
            window.alert("Registration Successful");
            console.log("Successful Registration")

            navigate("/login");
        }

    }

    return (
        <>
            <section>
                <div className="container mt-5">
                    <div className='signup-form col-lg-8 offset-lg-4'>
                        <h2 className='ml-5'>Sign Up</h2>
                        <form method='post' className='signup-form ml-5 '>
                            <div className='form-group  mt-4'>
                                <label htmlFor='name'>
                                    <i class="zmdi zmdi-account material-iconso-name" />

                                </label>
                                <input className="ml-3 i-field" type="text" name='name' id='name' placeholder='Your Name' autoComplete='off'
                                value={user.name} onChange={handleInputs} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>
                                <i class="zmdi zmdi-email material-iconso-name" />
                                </label>

                                <input className="ml-3 i-field" type="text" name='email' id='email' placeholder='Your Email' autoComplete='off'
                                value={user.email} onChange={handleInputs} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='phone'>
                                <i class="zmdi zmdi-phone material-iconso-name" />
                                </label>
                                <input className="ml-3 i-field" type="text" name='phone' id='phone' placeholder='Your Phone No' autoComplete='off'
                                value={user.phone} onChange={handleInputs} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='work'>
                                <i class="zmdi zmdi-slideshow material-iconso-name" />
                                </label>
                                <input className="ml-3 i-field" type="text" name='work' id='work' placeholder='Your Profession' autoComplete='off'
                                value={user.work} onChange={handleInputs} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>
                                <i class="zmdi zmdi-lock material-iconso-name" />
                                </label>
                                <input className="ml-3 i-field" type="password" name='password' id='password' placeholder='Password' autoComplete='off'
                                value={user.password} onChange={handleInputs} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='cpassword'>
                                <i class="zmdi zmdi-lock material-iconso-name" />
                                </label>
                                <input className="ml-3 i-field" type="password" name='cpassword' id='cpassword' placeholder='Confirm Password' autoComplete='off'
                                value={user.cpassword} onChange={handleInputs} />
                            </div>
                            <div className='form-group form-button'>
                                <input type="submit" name='signup' id="signup" className='form-submit' value="Register"
                                onClick={PostData} />

                            </div>
                        </form>
                        <h6 className='ml-5 mt-5'>
                        <NavLink className="nav-link active" aria-current="page" to="/login">Click here if already registered</NavLink>                            </h6>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Signup;