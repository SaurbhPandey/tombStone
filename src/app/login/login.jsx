"use client"
import React, { useState } from 'react'
import { FadeLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const router = useRouter();
    const authenticateUser = async (credential) => {
        try {
            const response = await fetch('https://tombstone-matcher-backend.onrender.com/api/authenticate-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credential)
            })
            const result = await response.json();
            console.log("result", result)
            return result;
        }
        catch (error) {
            console.log("Error Occured ", error.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (data.username && data.password) {
                const credential = {
                    'username': data.username,
                    'password': data.password
                }
                console.log("Credential ", credential);
                const apiResponse = await authenticateUser(credential);
                console.log("Printing Api Response", apiResponse);
                if (apiResponse?.validUser) {
                    console.log("Valid User ", apiResponse?.validUser);
                    localStorage.setItem('username', credential.username);
                    router.push("/");
                }
                else{
                    alert("Please check the details you have entered")
                }
                setData({
                    username: "",
                    password: ""
                })
            }
            else {
                alert("Please enter username and password");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className='grid grid-cols-12 '>
            <div className='col-span-4 col-start-5  mt-20 pb-20 pl-10 pr-10 pt-10 bg-white shadow-2xl rounded-lg'>
                <div className='pb-10'>
                    <h1 className='text-3xl text-center font-sans font-semibold'>Login</h1>
                </div>
                <div>
                    <form action="" >
                        <label htmlFor="" className='block text-m font-medium mb-2'>Username</label>
                        <input type="text" required className='w-full p-2.5 rounded-2xl border  border-black-700 bg-slate-100 font-sans' placeholder='Enter Your Username Here' onChange={(e) => setData({
                            ...data,
                            username: e.target.value
                        })} value={data.username} />
                        <label htmlFor="" className='block text-m font-medium mb-2 mt-3'>Password</label>
                        <input type="password" required className='w-full p-2.5 rounded-2xl border  border-black-700 bg-slate-100 font-sans' placeholder='Enter Your Password Here' onChange={(e) => setData({
                            ...data,
                            password: e.target.value
                        })} password={data.password} />
                        <div className='text-center mt-5'>
                            <button onClick={(e) => handleSubmit(e)} className='bg-green-600 px-3 py-2  rounded-lg  font-semibold w-full text-white hover:bg-green-500 font-sans'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login