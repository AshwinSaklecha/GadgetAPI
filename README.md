# IMF Gadget API 🕵️‍♀️🔧

A secure REST API for managing the International Mission Force's secret gadget inventory, engineered with cutting-edge technologies.

## 🌟 Features

- **🔐 Secure Authentication**
  - JWT-based authentication system ensuring robust access control
- **🎯 Comprehensive Gadget Management**
  - Full CRUD (Create, Read, Update, Delete) operations
  - Advanced gadget tracking and status management
- **🔄 Intelligent Status Tracking**
  - Real-time monitoring of gadget deployment and availability
- **💥 Advanced Self-Destruct Mechanism**
  - Programmable self-destruct protocols for sensitive equipment
- **🎲 Probabilistic Success Estimation**
  - Dynamic success probability generation for mission-critical gadgets
- **🏷️ Automatic Codename Generation**
  - Intelligent naming conventions for enhanced operational security

## 🚀 Tech Stack

- **Backend**: Node.js & Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render

## 🛠 Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm or yarn

## 📦 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/AshwinSaklecha/GadgetAPI.git
cd GadgetAPI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file with necessary configuration:
- `DATABASE_URL`
- `JWT_SECRET`
- Other required environment variables

### 4. Database Setup
```bash
# Run database migrations
npx prisma migrate dev

# Optional: Seed initial data
npx prisma db seed
```

### 5. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📖 API Documentation

Comprehensive API documentation is available:
- **Postman Docs**: [IMF Gadget API Documentation](https://documenter.getpostman.com/view/34650216/2sAYQgg7rY)
