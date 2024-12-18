'use client'

import Link from 'next/link'
import { type ChangeEvent, useCallback, useEffect, useState } from 'react'

interface Make {
	MakeId: string
	MakeName: string
}

interface ResponseMakes {
	Results: Make[]
}

export default function FilterForm(): React.JSX.Element {
	const [makes, setMakes] = useState<Make[]>([])
	const [makeId, setMakeId] = useState<string>('')
	const [year, setYear] = useState<string>('')

	const fetchMakes = async (): Promise<void> => {
		try {
			const response = await fetch(
				'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
			)
			const data = await response.json() as ResponseMakes
			setMakes(data.Results)
		} catch (error) {
			console.error('Error fetching makes:', error)
		}
	}

	useEffect(() => {
		void fetchMakes()
	}, [])

	const currentYear = new Date().getFullYear()
	const availableYears = Array.from({ length: currentYear - 2014 }, (_, i) =>
		(2015 + i).toString(),
	)

	const handleMakeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => { setMakeId(e.target.value); }, [])

	const handleYearChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => { setYear(e.target.value); }, [])

	return (
		<div className="container mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg">
			<h1 className="mb-6 text-center text-3xl font-bold">Car Dealer Filter</h1>

			<div className="mb-6">
				<label className="mb-2 block text-lg font-medium" htmlFor="make">
					Select Make
				</label>
				<select
					className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
					id="make"
					onChange={handleMakeChange}
					value={makeId}
				>
					<option value="">Select Make</option>
					{makes.map((make) => (
						<option key={make.MakeId} value={make.MakeId}>
							{make.MakeName}
						</option>
					))}
				</select>
			</div>

			<div className="mb-6">
				<label className="mb-2 block text-lg font-medium" htmlFor="year">
					Select Model Year
				</label>
				<select
					className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
					id="year"
					onChange={handleYearChange}
					value={year}
				>
					<option value="">Select Year</option>
					{availableYears.map((yearOption) => (
						<option key={yearOption} value={yearOption}>
							{yearOption}
						</option>
					))}
				</select>
			</div>

			<div className="text-center">
				<Link
					className={`rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-700${
						!makeId || !year ? 'cursor-not-allowed opacity-50' : ''
					}`}
					href={`/result/${makeId}/${year}`}
				>
					Next
				</Link>
			</div>
		</div>
	)
}
