'use client'

import { useEffect, useState } from 'react'

interface Params {
	makeId: string
	year: string
}

interface Model {
	Model_ID: string
	Model_Name: string
}

interface ResultProps {
	params: Params
}

interface ResponseModels {
	Results: Model[]
}

export default function Result({ params }: ResultProps): React.JSX.Element {
	const [models, setModels] = useState<Model[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		const fetchModels = async (): Promise<void> => {
			const { makeId, year } = params

			try {
				const response = await fetch(
					`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
				)

				if (!response.ok) {
					throw new Error(
						`${response.status ? `Error ${response.status}` : ''} ${
							response.statusText ? `: ${response.statusText}` : ''
						}`.trim(),
					)
				}

				const data = await response.json() as ResponseModels
				setModels(data.Results)
			} catch (error: unknown) {
				console.error('Error fetching models:', error)
				const errorMessage =
					error instanceof Error
						? `Failed to fetch models: ${error.message}`
						: 'Failed to fetch models'
				setError(errorMessage)
			} finally {
				setLoading(false)
			}
		}

		void fetchModels()
	}, [params])

	if (loading) {
		return <div>Loading models...</div>
	}

	return (
		<div>
			{error && (
				<div className="fixed left-0 top-0 flex size-full items-center justify-center bg-black opacity-50">
					<div className="rounded bg-red-500 p-6 text-white shadow-lg">
						<h2 className="text-xl font-bold">Error</h2>
						<p>{error}</p>
					</div>
				</div>
			)}
			{!error && (
				<>
					{models.length === 0 ? (
						<p className="text-center text-xl">
							No models found for {params.year} {params.makeId}
						</p>
					) : (
						<ul className="space-y-6">
							{models.map((model) => (
								<li
									className="rounded-md border p-6 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
									key={model.Model_ID}
								>
									<h2 className="text-2xl font-semibold">{model.Model_Name}</h2>
									<p className="text-lg">Model ID: {model.Model_ID}</p>
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</div>
	)
}
