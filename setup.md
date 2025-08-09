How to Build and Run the ApplicationFollow these steps to get your website running on your local machine and then deploy it.Step 1: Set Up Your Project with ViteFirst, you need to have Node.js and npm installed on your computer. We'll use Vite to create our React project because it offers a significantly faster development experience.Create a new Vite + React app:npm create vite@latest axis-consultancy -- --template react
cd axis-consultancy
Clean Install Dependencies and Initialize Tailwind CSS:This multi-step command ensures a clean environment and avoids potential conflicts from cached packages. It's the most reliable way to set up the project.# First, clear the npm cache to remove any corrupted data
```shell
npm cache clean --force
```

# Then, remove the existing node_modules folder and the lock file

rm -rf node_modules package-lock.json
```


# Now, perform a fresh installation of all required packages
```shell
npm install
```


# Install Tailwind CSS v3 and its dependencies as dev dependencies
npm install -D tailwindcss@3 postcss autoprefixer react-google-recaptcha

# Finally, initialize Tailwind to create its config files
npx tailwindcss init -p
After running these commands, you should see new tailwind.config.js and postcss.config.js files in your project directory.Configure Tailwind CSS: Open the tailwind.config.js file and update it to scan your component files for class names.
```javascript
/** @type {import('tailwindcss').Config} */
export default {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {
fontFamily: {
sans: ['Inter', 'sans-serif'], // A clean, modern font
},
},
},
plugins: [],
}
```

Add Tailwind directives to your CSS: Open ./src/index.css and replace its content with the following:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add smooth scrolling behavior */
html {
scroll-behavior: smooth;
}
```

Replace the App component: Open ./src/App.jsx and replace its entire content with the React code I provided in the first document. Note the file extension is .jsx.Step 2: Run the App LocallyTo see your website in action on your local machine, run the following command in your project directory:npm run dev
This will open a new browser tab with your website running, typically at http://localhost:5173.Step 3: Build the App for ProductionWhen you're ready to deploy your website, you need to create an optimized, static build.npm run build
This command creates a dist folder in your project directory. This folder contains all the static files (HTML, CSS, JavaScript) that you need to deploy.Dockerfile for DeploymentTo make deployment simple and consistent, you can use Docker. This Dockerfile creates a lightweight, production-ready container for your website using Nginx.
