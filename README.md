# Spreadsheet Prototype

A modern, interactive spreadsheet web app built with React, TypeScript, and Vite. This project provides an Excel/Google Sheets-like experience with a pixel-perfect UI and rich interactivity.

## Features

- **Pixel-perfect spreadsheet UI** matching Figma and Excel/Sheets style
- **Editable cells** with keyboard navigation (arrows, Tab, Enter, F2)
- **Add new rows** with the + button in the header
- **Column resize and hide/show** (drag handles, hide/show buttons)
- **Toolbar with interactive buttons:**
  - **Import:** Upload `.csv` or `.xlsx` files (file picker)
  - **Export:** Download current data as `.csv`
  - **Share:** Copy shareable link to clipboard
  - **New Spreadsheet:** Clears all data for a fresh start
  - **Hide/Show fields:** Toggle all columns except row number
  - **Sort:** Sort by "Job Request" column (toggle asc/desc)
  - **Filter:** Filter rows by any column and value
  - **Cell view:** View full content of the selected cell in a modal
- **Footer tabs:**
  - **All Orders, Pending, Reviewed, Arrived:** Filter rows by status
  - **Custom tabs:** Add your own named tabs with the + button
- **Search bar:**
  - Instantly filter rows by any cell content (case-insensitive)
  - Highlights matching text in the table
- **Profile popover:**
  - Click avatar/name to view user details and log out
- **Responsive, accessible, and keyboard-friendly**

## Usage

### 1. Install dependencies
```sh
npm install
```

### 2. Start the development server
```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```sh
npm run build
```

### 4. Lint and type-check
```sh
npm run lint
```

## How to Use the App

- **Edit cells:** Click or double-click a cell, type, and press Enter or click away to save. Use arrow keys, Tab, or Enter to navigate.
- **Add row:** Click the + button in the table header.
- **Import:** Click Import, select a `.csv` or `.xlsx` file. (File is not parsed into the table by default; extend logic as needed.)
- **Export:** Click Export to download the current table as a CSV file.
- **Share:** Click Share to copy the current page URL to your clipboard.
- **New Spreadsheet:** Click New Action to clear all data and start fresh.
- **Hide/Show fields:** Click Hide fields to hide all columns except row number; click again to show them.
- **Sort:** Click Sort to sort by "Job Request" (toggle asc/desc).
- **Filter:** Click Filter, select a column and value, and apply. Click Clear to remove the filter.
- **Cell view:** Click Cell view to see the full content of the selected cell in a modal.
- **Tabs:** Use footer tabs to filter by status or add your own custom tabs.
- **Search:** Type in the search bar to instantly filter and highlight matches in the table.
- **Profile:** Click the user avatar/name to view details and log out.

## Tech Stack
- React 18 + TypeScript
- Vite
- CSS Modules
- React Icons

## Customization
- Extend import logic to parse and display uploaded files
- Add more advanced filters, tab management, or spreadsheet features as needed

## License
MIT
