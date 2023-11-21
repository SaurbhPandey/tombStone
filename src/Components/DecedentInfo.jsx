"use client"
import React, { useState , useEffect } from 'react'

const DecedentInfo = () => {


  const [checkedItemIndexes, setCheckItemIndex] = useState([]);
  const [query, setQuery] = useState('');
  const [decedents, setDecedents] = useState([]);
  


  const handleInputChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }

  const getAllDecedents = async () => {
    try {
      const result = await fetch(`https://tombstone-matcher-backend.onrender.com/api/get-decedents?name=${query.toUpperCase()}`)
      const response = await result.json();
      // console.log("Decedents List FUNCTION ", response);
      setDecedents(response.decedents);
    }
    catch (error) {
      console.log("Error Occured ", error.message);
    }
  }

  const handleCheckedItem = (index) => {
    var newArr = [...checkedItemIndexes, index]
    setCheckItemIndex(newArr);
  }

  console.log("decedent data", decedents)

  return (
    <div className='flex flex-col'>
      <div className=' mb-8'>
        <div className='mx-10'>
          <h1 className='pt-10 pb-1 text-sm '>Enter Names</h1>
        </div>
        <div className='flex justify-center mx-10'>
          <div className='flex'>
            <input
              type='text'
              placeholder='Enter First Or Last Name'
              value={query}
              onChange={(e) => handleInputChange(e)}
              className='border border-black p-2  rounded-l outline-none'
            />
            <button type='submit' onClick={getAllDecedents} className='border border-black p-2 bg-blue-300 rounded-r'>Search</button>
          </div>

        </div>
        <div className='mt-12 mb-4'>
          <h1 className='text-sm font-semibold text-center'>SEARCH RESULTS</h1>
        </div>
        <div className='flex justify-center'>
          <table className='w-full'>
            <thead className=''>
              <tr >
                <th className='text-sm font-semibold '>SELECT</th>
                <th className='text-sm font-semibold '>NAME</th>
                <th className='text-sm font-semibold '>SECTION</th>
              </tr>
            </thead>
            <tbody>
              {decedents?.map((item, index) =>
              (
                <tr key={index} style={{ backgroundColor: (checkedItemIndexes.includes(index)) ? 'yellow' : (index % 2 === 0 ? '#848482' : '#A5A5A8') }}>
                  <td className='flex justify-center items-center'>
                    <input
                      className='w-4 h-4 my-2'
                      type="checkbox"
                      checked={checkedItemIndexes.includes(index)}
                      onChange={() => handleCheckedItem(index)}
                    />
                  </td>
                  <td className='text-center'>{item.DECEASED_FIRST} {item.DECEASED_LAST}</td>
                  <td className='text-center'>{item.SECTIONname}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center mt-8'>
          <button className='text-sm font-semibold border border-black rounded-md bg-blue-300 px-2 py-2' >
            ADD SELECTED NAMES TO PHOTO
          </button>
        </div>
      </div>
    </div>
  )
}

export default DecedentInfo