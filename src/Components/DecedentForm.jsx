"use client"
import React, { useEffect, useState } from 'react'
import image from '../assets/image.png'
import Image from 'next/image'
const DecedentForm = () => {
    const [images, setImages] = useState();
    const [loading , setLoading] = useState(false);
    const fetchImages = async (imageType) => {
         setLoading(true);
        let apiResponse;
        if (images) {
            console.log("Enter in if condition");
            if (imageType === 'currImage') apiResponse = await fetch(`https://tombstone-matcher-backend.onrender.com/api/get-photos?id=${images?.photoDetails?.currentImage[0]?._id}`);
            else if (imageType === 'prevImage') apiResponse = await fetch(`https://tombstone-matcher-backend.onrender.com/api/get-photos?id=${images?.photoDetails?.previousImage[0]?._id}`);
            else apiResponse = await fetch(`https://tombstone-matcher-backend.onrender.com/api/get-photos?id=${images?.photoDetails?.nextImage[0]?._id}`);
        }
        else {
            apiResponse = await fetch('https://tombstone-matcher-backend.onrender.com/api/get-photos');
        }
        const apiResult = await apiResponse.json();
        console.log("Printing Api result ", apiResult);
        setImages(apiResult);
        setLoading(false);
    }


    console.log("Images Data ", images);

    useEffect(() => {
        fetchImages('currImage');
    }, []);
    let decedents = [
        {
            name: 'ELLA AMOS',
            section: 3,
        },
        {
            name: 'ROL AMOS',
            section: 3
        }
    ]
    return (
        <div>
            <div className='flex justify-center font-semibold text-sm mt-4 mb-4'>
                <h1>PHOTO DETAILS</h1>
            </div>
            <div className='mx-8  lg:flex lg:justify-around'>
                <div className='mr-8'>
                    <div className='flex justify-start '>
                        <div className='text-sm pr-4 text-center'>
                            <h1>Section:</h1>
                            <p className='py-2'>3</p>
                        </div>
                        <div className='text-sm pl-4 text-center'>
                            <h1>Image Name:</h1>
                            <p className='py-2'>12.jpeg</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                            <thead style={{ border: '1px solid black' }} className=''>
                                <tr className='flex justify-center px-14' style={{ backgroundColor: '#BEBEBE' }}>
                                    <th className='text-sm'>ASSOCIATED DECEDENTS</th>
                                </tr>
                            </thead>
                            <thead >
                                <tr className='flex justify-evenly ' style={{ backgroundColor: '#696969' }}>
                                    <th className=' px-2 text-sm w-32 text-center'>NAME</th>
                                    <th style={{ borderLeft: '1px solid black', borderRight: '1px solid black' }} className='px-6 text-sm w-24 text-center'>SECTION</th>
                                    <th className='px-8 text-sm w-8'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {decedents.map((item) => {
                                    return (
                                        <tr className='flex justify-evenly' style={{ backgroundColor: '#BEBEBE' }}>
                                            <th className=' px-2 text-sm w-32 text-center font-medium'>{item.name}</th>
                                            <th className='w-24 text-center font-medium' style={{ borderLeft: '1px solid black', borderRight: '1px solid black' }}>{item.section}</th>
                                            <th className='px-8 text-sm w-8 font-medium'></th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-start'>
                    <div>
                        <form action="">
                            <div className='flex justify-center'>
                                <div>
                                    <label htmlFor="" className='text-xs my-1'>PHOTO CATEGORY:</label>
                                    <br />
                                    <select name="" id="" className='pr-6 pl-2 py-2 w-56 my-1' style={{ border: "2px solid black" }}>
                                        <option value="" style={{ border: "1px solid black", outline: "none" }}>FULL NAMES</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="" className='text-xs mx-11 my-1'>NAME ERROR:</label>
                                    <br />
                                    <input type="text" className='w-12 py-1.5 px-1 mx-12 text-center my-1' style={{ border: "2px Solid black" }} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className='text-xs my-1'>TYPE THE LAST NAME</label>
                                <br />
                                <input type="text" name="" id="" className='w-36 py-2 px-2 my-1' style={{ border: "2px solid black" }} />
                            </div>
                            <div>
                                <label htmlFor="" className='text-xs my-1'>NOTES:</label>
                                <br />
                                <input type="text" className='w-full h-20 my-1' style={{ border: "2px solid black" }} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className=' flex  justify-center mt-8'>
                {loading ? (<h1>Loading</h1>) :
                <div className='lg:w-3/4 md:mx-4 md:w-3/4 flex justify-center py-4' style={{ border: "1px solid black", height: "400px" }}>
                    <Image src={`https://ik.imagekit.io/tombstonematcher/tombstone_images/${images?.photoDetails?.currentImage[0]?.PHOTO}`} alt='tombstone image' width={800} height={300} />
                </div>}
            </div>
            <div className='flex justify-evenly mt-6 mb-8 '>
                <button className='font-semibold px-3 py-2 md:mx-2 bg-blue-300' style={{ border: "2px solid black" }} onClick={() => fetchImages('prevImage')}>PREVIOUS IMAGE</button>
                <button className='font-semibold px-3 py-2 bg-green-500 md:mx-2' style={{ border: "2px solid black" }}>SAVE CHANGES</button>
                <button className='font-semibold px-3 py-2 bg-red-600 md:mx-2' style={{ border: "2px solid black" }}>ABORT CHANGES</button>
                <button className='font-semibold px-3 py-2 bg-blue-300 md:mx-2' style={{ border: "2px solid black" }} onClick={() => fetchImages('nextImage')}>NEXT IMAGE</button>
            </div>
        </div>
    )
}

export default DecedentForm