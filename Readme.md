
# SalesPulse — Sales Data Analytics Dashboard

A beginner-friendly sales analytics portfolio project built with HTML, CSS, and vanilla JavaScript.

## Features
- Total revenue, orders, units sold, and average order value
- Monthly revenue trend chart
- Revenue distribution by product category
- Quarter selector from Q1 to Q4
- Search and filters for region and category
- Sales records table
- CSV export for filtered records
- Responsive desktop and mobile layout

## Run locally
1. Extract the project ZIP.
2. Open the SalesAnalyticsDashboard folder in VS Code.
3. Open index.html in your browser, or use the Live Server extension.
4. Test the quarter selector, search, filters, and CSV export.

No backend or database is required. The project uses sample data in script.js.

## CSV data fields
- id
- product
- category
- region
- date (YYYY-MM-DD)
- units
- revenue (INR)

## Upload to GitHub
Run these commands in the VS Code terminal:

git init
git add .
git commit -m "Build SalesPulse analytics dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/salespulse-dashboard.git
git push -u origin main

Replace YOUR-USERNAME with your GitHub username.

You can publish the site through GitHub Pages in your repository's
Settings > Pages section.

## Data note
The dataset is fictional sample data for learning and demonstration.
The displayed trend percentages are illustrative, not calculated
from a historical comparison period.
