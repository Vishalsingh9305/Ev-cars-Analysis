# EV Analytics Dashboard

This is a frontend React dashboard (Vite) that dynamically visualizes the provided `Electric_Vehicle_Population_Data.csv`.

## What it includes
- CSV upload (client-side) using PapaParse
- KPIs (total records, average battery capacity, most common make)
- Charts (top states bar chart, energy/fuel-type pie chart) using Recharts
- Searchable, pageable data table
- Sidebar and simple navbar
- Simple, clean CSS styling

## How to run locally (VSCode)
1. Unzip the project (or open the folder in VSCode).
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the browser at the URL printed by Vite (usually http://localhost:5173).

## Notes
- This app expects you to upload the `Electric_Vehicle_Population_Data.csv` from your assessment repo.
- If column names differ slightly, the app tries multiple common variants (e.g., `BatteryCapacity` or `Battery Capacity`).
- You can extend charts or add more KPI calculations as needed.

Good luck with the MapUp assessment!