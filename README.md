# Test Task - Next.js Application

This repository contains the implementation of a test task for the interview process. The project is built using **Next.js** and demonstrates fetching and displaying car models based on selected criteria.


## Features

- **Homepage**: Filter page. Allows users to select a car model and year. Data for the dropdown list of models is fetched dynamically.

- **Result Page**: Displays data based on the selected model and year, passed via the URL.


## How to Run the Application

1. **Clone this project to your local machine:**  

   ```bash
   git clone https://github.com/dudchakk/test-DevelopsToday.git
   ```
2. **Install the required project dependencies:**  

   ```bash
   npm install
   ```
3. **Run the project in development mode:**  

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project structure

- `app/components`: Contains client components.
  - `FilterForm.tsx`: Displays the filter form and fetches data for populating the dropdown with car model options.
  - `Result.tsx`: Fetches and displays data based on the model and year parameters from the URL.
- `app/result/[makeId]/[year]/page.tsx`: Server-side component for the results page. Implements `generateStaticParams` for static generation based on parameters.
- `page.tsx`: Main component for the filter page, rendering the `FilterForm`.


## Technologies used

- **Next.js**: For server-side rendering and static generation, with dynamic routing.
- **Tailwind CSS**: For responsive and modern UI styling.