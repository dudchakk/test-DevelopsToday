import { Suspense } from 'react'
import Result from '../../../components/Result'

interface Make {
	MakeId: string
	MakeName: string
}

interface StaticPath {
	params: {
		makeId: string
		year: string
	}
}

interface Params {
	makeId: string
	year: string
}

interface ResultPageProps {
	params: Params
}

export async function generateStaticParams(): Promise<StaticPath[]> {
	const response = await fetch(
		'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
	)
	if (!response.ok) {
		throw new Error(
			`Failed to fetch makes: ${response.status} ${response.statusText}`,
		)
	}
	const makesData = await response.json()
	const makes: Make[] = makesData.Results

	const currentYear = new Date().getFullYear()
	const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i)

	const staticPaths: StaticPath[] = []

	makes.forEach((make) => {
		years.forEach((year) => {
			staticPaths.push({
				params: {
					makeId: make.MakeId.toString(),
					year: year.toString(),
				},
			})
		})
	})

	return staticPaths
}

const Loader = (): JSX.Element => (
	<div className="text-center text-xl">
		<p>Loading data...</p>
	</div>
)

export default function ResultPage({ params }: ResultPageProps): JSX.Element {
	return (
		<div className="container mx-auto p-6 max-w-5xl">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Car Models for {params.year} {params.makeId}
			</h1>

			<Suspense fallback={<Loader />}>
				<Result params={params} />
			</Suspense>
		</div>
	)
}
