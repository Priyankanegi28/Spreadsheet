import react from '@vitejs/plugin-react';
import * as path from 'path'; // Needed for path aliases
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Set the base URL for GitHub Pages (replace 'your-repo-name' with your actual repo name)
    base: '/Spreadsheet/',
    // Optional: Configure path aliases for cleaner imports
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    // Optional: Configure the development server
    server: {
        port: 3000, // Set your preferred port
        open: true, // Automatically open the app in browser
    },
    // Optional: Build configuration
    build: {
        outDir: 'dist', // This is the default, but good to be explicit
        emptyOutDir: true, // Empty the output directory before build
    }
});
