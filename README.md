# MERN Expense Management System

## Overview

The MERN Expense Management System is a modern web application designed to provide users with a complete solution for managing their personal finances. The application features a clean, responsive user interface built with React and Ant Design, a robust backend API powered by Express.js, and secure data storage using MongoDB.

**Live Demo**: [https://expense-management-system-six-theta.vercel.app](https://expense-management-system-six-theta.vercel.app)

### Key Highlights
- **User Authentication**: Secure registration and login system
- **Transaction Management**: Add, edit, delete, and categorize financial transactions
- **Real-time Analytics**: Visual charts and statistics for spending analysis
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Data Filtering**: Advanced filtering by date range, category, and transaction type
- **Modern UI/UX**: Built with Ant Design components and Tailwind CSS

## Core Features

### User Authentication
- User registration with email validation
- Secure login system
- Protected routes and session management
- User profile management

### Transaction Management
- **Add Transactions**: Record income and expense transactions
- **Edit Transactions**: Modify existing transaction details
- **Delete Transactions**: Remove unwanted transactions
- **Transaction Categories**: 
  - Income: Salary, Freelance, Investment, Other
  - Expenses: Food, Entertainment, Education, Medical, Tax, Rent, Bills, Other
- **Transaction Details**: Amount, type, category, date, reference, description

### Analytics & Reporting
- **Dashboard Statistics**: Total income, total expenses, net balance
- **Visual Analytics**: Interactive charts and graphs
- **Date Range Filtering**: View transactions by week, month, year, or custom range
- **Category Analysis**: Breakdown of spending by category
- **Transaction History**: Complete transaction log with search and filter capabilities

### User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Built with Ant Design UI library
- **Interactive Elements**: Smooth animations and transitions
- **Data Visualization**: Charts and graphs for better insights
- **Intuitive Navigation**: Easy-to-use interface with clear navigation

### Advanced Filtering
- Filter by transaction type (Income/Expense)
- Filter by category
- Filter by date range (7 days, 30 days, 1 year, custom)
- Real-time search and filtering

## Project Structure

```
Expense_management_system/
├── client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # React Components
│   │   │   ├── HomePage.jsx         # Main dashboard with transactions
│   │   │   ├── Analytics.jsx        # Charts and analytics view
│   │   │   ├── Login.jsx            # User login component
│   │   │   ├── Register.jsx         # User registration component
│   │   │   ├── LandingPage.jsx      # Landing page
│   │   │   ├── AboutUs.jsx          # About page
│   │   │   ├── Pricing.jsx          # Pricing page
│   │   │   ├── Header.jsx           # Navigation header
│   │   │   └── Footer.jsx           # Footer component
│   │   ├── utilities/
│   │   │   └── baseUrl.js           # API base URL configuration
│   │   ├── App.jsx                  # Main App component with routing
│   │   ├── Layout.jsx               # Layout wrapper component
│   │   ├── main.jsx                 # Application entry point
│   │   ├── App.css                  # Global styles
│   │   └── index.css                # Base styles
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── vite.config.js               # Vite build configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── config/                          # Backend Configuration
│   └── connectdb.js                 # MongoDB connection setup
│
├── controllers/                     # Backend Controllers
│   ├── user.controller.js           # User authentication logic
│   └── transaction.controller.js    # Transaction CRUD operations
│
├── models/                          # Database Models
│   ├── user.model.js                # User schema definition
│   └── transaction.model.js         # Transaction schema definition
│
├── routes/                          # API Routes
│   ├── user.route.js                # User authentication routes
│   └── transaction.route.js         # Transaction management routes
│
├── server.js                        # Express server setup
├── package.json                     # Backend dependencies
└── README.md                        # Project documentation
```

### Frontend Structure
- **React Components**: Modular, reusable UI components
- **Routing**: React Router for navigation between pages
- **State Management**: Local state with React hooks
- **Styling**: Tailwind CSS for utility-first styling
- **UI Library**: Ant Design for professional components
- **Build Tool**: Vite for fast development and building

### Backend Structure
- **Express.js Server**: RESTful API server
- **MongoDB Integration**: Mongoose ODM for database operations
- **Authentication**: JWT-based user authentication
- **API Routes**: Organized route handlers for different features
- **Middleware**: CORS, Morgan logging, JSON parsing
- **Error Handling**: Comprehensive error handling and validation

## Technologies Used

### Frontend Technologies
- **React 18.3.1**: Modern JavaScript library for building user interfaces
- **Vite 5.2.0**: Fast build tool and development server
- **React Router DOM 6.24.1**: Client-side routing
- **Ant Design 5.19.0**: Enterprise-class UI design language
- **Tailwind CSS 3.4.3**: Utility-first CSS framework
- **Framer Motion 12.5.0**: Animation library for React
- **Axios 1.7.2**: HTTP client for API requests
- **Moment.js 2.30.1**: Date manipulation library
- **Redux 5.0.1**: State management library

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js 4.19.2**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose 8.4.4**: MongoDB object modeling tool
- **CORS 2.8.5**: Cross-Origin Resource Sharing middleware
- **Morgan 1.10.0**: HTTP request logger middleware
- **Dotenv 16.4.5**: Environment variable loader
- **Nodemon 3.1.4**: Development server with auto-restart

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS post-processing
- **Autoprefixer**: CSS vendor prefixing
- **Concurrently**: Run multiple commands simultaneously

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Expense_management_system
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URL=mongodb://localhost:27017/expense_manager
   PORT=8080
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the backend server**
   ```bash
   # Development mode with auto-restart
   npm run server
   
   # Production mode
   npm start
   ```

   The backend server will run on `http://localhost:8080`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Configure API Base URL**
   Update `client/src/utilities/baseUrl.js`:
   ```javascript
   export const baseUrl = 'http://localhost:8080';
   ```

4. **Start the frontend development server**
   ```bash
   npm start
   ```

   The frontend application will run on `http://localhost:3000`

### Database Setup

1. **Local MongoDB Setup**
   - Install MongoDB locally
   - Start MongoDB service
   - The application will automatically create the database and collections

2. **MongoDB Atlas Setup (Cloud)**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Update the `MONGODB_URL` in your `.env` file

### Running the Complete Application

1. **Start both frontend and backend simultaneously**
   ```bash
   # From the root directory
   npm run dev
   ```

   This command will start both the backend server and frontend development server concurrently.

2. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`

### Production Deployment

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy the backend**
   - Set up environment variables on your hosting platform
   - Deploy the backend code
   - Update the frontend's `baseUrl.js` with your production API URL

3. **Deploy the frontend**
   - Upload the `client/dist` folder to your hosting service
   - Configure your web server to serve the React application

## Usage

1. **Registration**: Create a new account with email and password
2. **Login**: Sign in to access your dashboard
3. **Add Transactions**: Click "Add Transaction" to record income or expenses
4. **View Analytics**: Switch to analytics view to see spending patterns
5. **Filter Data**: Use the filter options to view specific time periods or categories
6. **Manage Transactions**: Edit or delete existing transactions as needed

## Contributing

- Contributions are welcome! Please feel free to submit a Pull Request.

## License

- This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.