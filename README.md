# Tech For Girls Registration Website

A modern registration website for the Tech For Girls community with WhatsApp sharing requirements, file uploads, and form validation.

## Features

- ✅ **Registration Form** with name, phone, email, and college/department fields
- ✅ **WhatsApp Share Button** with click counter (5 shares required)
- ✅ **File Upload** for screenshots/documents
- ✅ **Progress Tracking** through registration steps
- ✅ **Form Validation** and duplicate prevention
- ✅ **Modern UI** with purple/pink gradient theme
- ✅ **Mobile Responsive** design
- ✅ **Local Storage** prevents duplicate submissions
- ✅ **Google Sheets Integration** (optional)

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS + shadcn/ui components
- React Hook Form with Zod validation
- Wouter for routing
- TanStack Query for API calls

### Backend
- Node.js with Express.js
- TypeScript
- In-memory storage (can be extended to PostgreSQL)
- Zod validation

## Setup Instructions for VS Code

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [VS Code](https://code.visualstudio.com/)
- Git

### Step 1: Download and Extract Project
1. Download the project files as a ZIP
2. Extract to your desired folder
3. Open the folder in VS Code:
   ```bash
   code tech-for-girls-registration
   ```

### Step 2: Install Dependencies
Open VS Code terminal (`Ctrl+Shift+` ` or `View > Terminal`) and run:

```bash
# Install Node.js dependencies
npm install

# Or if you prefer yarn
yarn install
```

### Step 3: Start Development Server
Run the development server:

```bash
# Start both frontend and backend
npm run dev

# Or with yarn
yarn dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server with hot reload
- The app will be accessible at `http://localhost:5000`

### Step 4: Open in Browser
The terminal will show the server is running. Open your browser and go to:
```
http://localhost:5000
```

## Project Structure

```
tech-for-girls-registration/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components (shadcn/ui)
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and query client
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage layer
│   └── vite.ts           # Vite integration
├── shared/               # Shared code between frontend/backend
│   └── schema.ts         # Database schema and validation
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── google-apps-script-example.js  # Google Sheets integration
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the development server with hot reload.

### `npm run build`
Builds the app for production.

### `npm run preview`
Serves the production build locally.

### `npm run type-check`
Runs TypeScript type checking.

## VS Code Extensions (Recommended)

Install these extensions for the best development experience:

1. **ES7+ React/Redux/React-Native snippets** - React code snippets
2. **TypeScript Importer** - Auto import TypeScript modules
3. **Tailwind CSS IntelliSense** - Tailwind CSS autocomplete
4. **Prettier - Code formatter** - Code formatting
5. **ESLint** - Code linting
6. **Auto Rename Tag** - HTML/JSX tag renaming
7. **Bracket Pair Colorizer** - Colorize matching brackets

## Environment Setup (Optional)

Create a `.env` file in the root directory for environment variables:

```env
# Database connection (if using PostgreSQL instead of in-memory storage)
DATABASE_URL=your_postgresql_connection_string

# Google Apps Script URL (if using Google Sheets integration)
VITE_GOOGLE_SCRIPT_URL=your_google_apps_script_url
```

## Google Sheets Integration

The project includes a Google Apps Script example for saving registrations to Google Sheets:

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the code from `google-apps-script-example.js`
4. Create a Google Sheet and update the `SPREADSHEET_ID`
5. Deploy as a web app
6. Use the web app URL in your frontend

## Troubleshooting

### Common Issues:

1. **Port already in use**: Change the port in `server/index.ts` or kill the process using the port
2. **Module not found**: Run `npm install` again
3. **TypeScript errors**: Run `npm run type-check` to see detailed errors
4. **Build fails**: Check for syntax errors and run `npm run build`

### VS Code Terminal Commands:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Clear npm cache (if having issues)
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## Development Workflow

1. **Start development server**: `npm run dev`
2. **Make changes** to files in VS Code
3. **Hot reload** will automatically update the browser
4. **Check terminal** for any errors or warnings
5. **Test features** in the browser
6. **Build for production**: `npm run build` when ready to deploy

## Deployment Options

- **Vercel**: Connect your GitHub repository to Vercel
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages**: Use the built files from the `dist` folder
- **Cloud hosting**: Deploy to AWS, Google Cloud, or Azure

The app is ready to run in VS Code with all modern development features including hot reload, TypeScript support, and debugging capabilities!