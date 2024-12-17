'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FilterForm() {
  const [makes, setMakes] = useState([])
  const [makeId, setMakeId] = useState('')
  const [year, setYear] = useState('')

  const fetchMakes = async () => {
    try {
      const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      )
      const data = await response.json()
      setMakes(data.Results)
    } catch (error) {
      console.error('Error fetching makes:', error)
    }
  }

  useEffect(() => {
    fetchMakes()
  }, [])

  return (
    <div className='container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Car Dealer Filter</h1>

      <div className='mb-6'>
        <label htmlFor='make' className='block text-lg font-medium mb-2'>
          Select Make
        </label>
        <select
          id='make'
          className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          value={makeId}
          onChange={(e) => setMakeId(e.target.value)}
        >
          <option value=''>Select Make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-6'>
        <label htmlFor='year' className='block text-lg font-medium mb-2'>
          Select Model Year
        </label>
        <select
          id='year'
          className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value=''>Select Year</option>
          {Array.from(
            { length: new Date().getFullYear() - 2014 },
            (_, i) => 2015 + i
          ).map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>

      <div className='text-center'>
        <Link
          href={`/result/${makeId}/${year}`}
          className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:bg-blue-700 ${
            !makeId || !year ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  )
}
