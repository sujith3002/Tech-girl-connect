# Tech For Girls Registration Application

## Overview

This is a registration website for the "Tech For Girls" community project. The application allows users to register by filling out a form, sharing the project on WhatsApp (with a click counter requirement), uploading a screenshot, and submitting their registration. The system includes form validation, duplicate prevention, and data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives wrapped in shadcn/ui components
- **Routing**: Wouter for client-side routing
- **Icons**: Lucide React and React Icons (for WhatsApp icon)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured via Neon serverless)
- **Validation**: Zod for request/response validation
- **Session Management**: Express sessions with PostgreSQL store

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (currently unused)
- **Registrations Table**: Stores registration data including:
  - Personal information (name, phone, email, college)
  - Screenshot file metadata
  - Share count tracking
  - Submission timestamp

### Form Validation
- Name: Minimum 2 characters
- Phone: International format validation (10-15 digits)
- Email: Standard email validation
- College: Required field with predefined options
- Screenshot: Required file upload
- Share count: Must reach 5 clicks before submission

### WhatsApp Integration
- Pre-filled message: "Hey Buddy, Join Tech For Girls Community"
- Click counter with 5/5 requirement
- Progress tracking with visual feedback
- Prevents submission until sharing requirement is met

### Data Persistence
- Local storage prevents duplicate submissions
- Server-side duplicate email detection
- Form state preservation during user interaction

## Data Flow

1. **User Registration Flow**:
   - User fills out personal information
   - User uploads screenshot file
   - User clicks WhatsApp share button 5 times
   - System validates all requirements
   - Data is submitted to backend API
   - Backend validates and stores in database
   - Success confirmation displayed

2. **Validation Flow**:
   - Client-side validation using React Hook Form + Zod
   - Server-side validation using shared schema
   - Duplicate email detection at database level
   - File upload validation for screenshot requirement

## External Dependencies

### UI and Styling
- Tailwind CSS for styling
- shadcn/ui component library
- Radix UI for accessible components
- Lucide React for icons

### Form Management
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integration

### Database and Backend
- Drizzle ORM for database operations
- @neondatabase/serverless for PostgreSQL connection
- Express.js for API endpoints

### Optional Integration
- Google Apps Script integration (example provided)
- Can be used as alternative to database storage

## Deployment Strategy

### Development
- Vite dev server for frontend hot reload
- tsx for TypeScript execution in development
- Concurrent frontend and backend development

### Production Build
- Vite builds optimized static assets
- esbuild bundles server code
- Single Node.js process serves both frontend and API

### Environment Configuration
- DATABASE_URL required for PostgreSQL connection
- Automatic database schema migration via Drizzle
- Environment-specific configuration support

## Changelog

Changelog:
- July 07, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.