'use client'

import { useState, useEffect } from 'react'

export default function Result({ params }) {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchModels = async () => {
      const { makeId, year } = params
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        )
        if (!response.ok) {
          throw new Error(
            `${response.status ? `Error ${response.status}` : ''}
            ${response.statusText ? `: ${response.statusText}` : ''}`.trim()
          )
        }
        const data = await response.json()
        setModels(data.Results)
      } catch (error) {
        console.error('Error fetching models:', error)
        const errorMessage = `Failed to fetch models${
          error.message ? `: ${error.message}` : ''
        }`
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [params])

  if (loading) {
    return <div>Loading models...</div>
  }

  return (
    <div>
      {error && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-red-500 text-white p-6 rounded shadow-lg'>
            <h2 className='text-xl font-bold'>Error</h2>
            <p>{error}</p>
          </div>
        </div>
      )}
      {!error && (
        <>
          {models.length === 0 ? (
            <p className='text-center text-xl'>
              No models found for {params.year} {params.makeId}
            </p>
          ) : (
            <ul className='space-y-6'>
              {models.map((model) => (
                <li
                  key={model.Model_ID}
                  className='border p-6 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out'
                >
                  <h2 className='text-2xl font-semibold'>{model.Model_Name}</h2>
                  <p className='text-lg'>Model ID: {model.Model_ID}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
