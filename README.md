🛍️ Full-Stack Look E-Commerce
A modern, fully functional e-commerce platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application offers a seamless shopping experience with robust features for both users and administrators.​

🌟 Features
🔧 Backend Features
User Authentication: Secure user signup, login, and logout functionalities implemented using JSON Web Tokens (JWT) with Express.js and MongoDB.​

Admin Panel: Dedicated admin authentication allowing administrators to manage products and orders.​

Product Management: Admins can add new products, delete existing ones, and update product statuses such as "Order Placed," "Shipped," "Packing," "Out for Delivery," and "Delivered."​

Database Integration: All backend operations are connected to a MongoDB database, ensuring data persistence and reliability.​

💻 Frontend Features
Home Page: Features a visually appealing hero section and multiple product sections displaying product cards.​

Product Details: Clicking on a product redirects users to a detailed page showcasing comprehensive information about the selected product.​

Product Filtering: Implemented filtering functionality to allow users to search and sort products based on various criteria.​

Responsive Design: The application is fully responsive, ensuring optimal viewing experiences across various devices.​

📁 Project Structure
graphql
Copy
Edit
Full-Stack-Look-Ecom/
├── admin/               # Admin panel interface
├── backend/             # Express.js backend with API routes
├── frontend/            # React.js frontend application
├── .gitignore
└── README.md
🛠️ Technologies Used
Frontend: React.js, Axios, React Router​

Backend: Node.js, Express.js​

Database: MongoDB, Mongoose​

Authentication: JWT, bcryptjs​

Environment Management: dotenv​
Canvas Community
+7
CTLD Ready
+7
Stack Overflow
+7

⚙️ Getting Started
Prerequisites
Node.js and npm installed on your machine.​

MongoDB instance (local or hosted, e.g., MongoDB Atlas).​

Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/themdwaris/Full-Stack-Look-Ecom.git
cd Full-Stack-Look-Ecom
Setup Backend

bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend directory and add the following:​

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the backend server:​

bash
Copy
Edit
npm start
Setup Frontend

bash
Copy
Edit
cd ../frontend
npm install
Start the frontend development server:​

bash
Copy
Edit
npm start
Setup Admin Panel

bash
Copy
Edit
cd ../admin
npm install
Start the admin panel development server:​

bash
Copy
Edit
npm start
Accessing the Application
Frontend: Navigate to http://localhost:3000 to access the user-facing application.​

Admin Panel: Navigate to http://localhost:3001 (or the port specified in the admin panel configuration) to access the admin interface.​

🔐 API Endpoints
User Authentication

POST /api/auth/signup: Register a new user.​

POST /api/auth/login: Authenticate user and return JWT.​

Product Management

POST /api/products: Add a new product (Admin only).​

DELETE /api/products/:id: Delete a product by ID (Admin only).​

PUT /api/products/:id/status: Update product status (Admin only).​

Product Retrieval

GET /api/products: Retrieve all products.​
Obsidian Forum
+7
Stack Overflow
+7
Obsidian Forum
+7

GET /api/products/:id: Retrieve product details by ID.​

📬 Contact
For any inquiries or feedback, please contact themdwaris.​


