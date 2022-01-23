import React ,{useState,useEffect} from 'react';

const Home = () => {
    const [userName, setuserName] = useState('')
    const [show,setShow]=useState(false);
    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
             setuserName( data.name );
             setShow(true);


        } catch (e) {
            console.log(e);

        }
    }

    useEffect(() => {
        userHomePage();
    },
        []);
    return (
        <>
            <div className='home-page w-100 d-grid py-5'>
                <div className='home-div w-100 py-5'>
                <p className='pt-5 text-center text-dark display-5 '><strong>WELCOME</strong></p>
                <h1 className='text-center display-1 text-success'><strong>{userName}</strong></h1>
                <h1 className='text-center text-dark display-2 '><strong>{show?'Happy to see you back':'I Am A MERN DEVELOPER'}</strong></h1>
                </div>
            </div>


        </>
    )
}

export default Home
