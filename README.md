# 🚀 Elysia Fullstack Template

A modern, production-ready fullstack template built with **Elysia** (backend) and **React** (frontend), powered by **Bun** runtime for lightning-fast development and hot reloading.

## ✨ Features

### 🔥 **Hot Reload Development**

- **Bun-powered hot reload** for both frontend and backend
- **No bundlers needed** - Bun handles everything natively
- **Instant development feedback** with automatic reloading

### 🛡️ **Backend (Elysia)**

- **MikroORM** for database management with TypeScript entities
- **JWT Authentication** with macro-based auth checking
- **Swagger Documentation** automatically generated
- **Type-safe API** with full TypeScript support
- **CORS, Static file serving** and other essential middleware

### ⚛️ **Frontend (React)**

- **Auto-bundled with Bun** - no Vite, Webpack, or other bundlers
- **Hash Router** to avoid conflicts with server routes
- **Zustand** for global state management
- **Tailwind CSS** for utility-first styling
- **Eden Treaty** for end-to-end type safety

### 🔐 **Authentication System**

- **JWT-based authentication** with secure token handling
- **Protected routes** with automatic redirects
- **User state management** with Zustand store
- **Login/Register** pages with form validation

### 🎨 **UI/UX**

- **Modern, responsive design** with Tailwind CSS
- **Beautiful login/register** forms with validation
- **User dashboard** with profile information
- **Professional header/footer** components

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

1. **Create new project using this template**

```bash
bun create codingcat0405/elysia-fullstack-template awesome-web-app
cd awesome-web-app
```

2. **Set up environment variables**

```bash
cp .env.example .env
# Edit .env with your database configuration
```

3. **Start development server**

```bash
bun run dev
```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see your application!

## 📁 Project Structure

```
elysia-fullstack-template/
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── layouts/           # Layout components
│   ├── libs/              # API client and utilities
│   ├── store/             # Zustand stores
│   └── public/            # Static assets
├── src/                   # Backend Elysia application
│   ├── controllers/       # API route handlers
│   ├── services/          # Business logic
│   ├── entities/          # MikroORM entities
│   ├── middlewares/       # Custom middlewares
│   └── macros/            # Authentication macros
└── package.json           # Dependencies and scripts
```

## 🛠️ Development

### Backend Development

The backend runs on Elysia with the following features:

- **Database**: MikroORM with PostgreSQL support
- **Authentication**: JWT with macro-based route protection
- **API Documentation**: Auto-generated Swagger docs
- **Hot Reload**: Automatic server restart on file changes

### Frontend Development

The frontend is a React SPA with:

- **Bun bundling**: No additional bundlers required
- **Hash Router**: Prevents conflicts with server routes
- **Type Safety**: Eden Treaty provides end-to-end types
- **State Management**: Zustand for global state
- **Styling**: Tailwind CSS for rapid UI development

### Available Scripts

```bash
# Start development server (both frontend & backend)
bun run dev

# Build for production
bun run build

# Start production server
bun start
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

### Database Setup

1. Install PostgreSQL
2. Create a database
3. Update `DATABASE_URL` in your `.env` file
4. Run migrations (if any)

## 🚀 Production Deployment

### Important Note: Hash Router Requirement

The frontend **must use hash router** to avoid conflicts with server routes. The static file serving mounts the client folder at the root path (`/`), so any SPA routes need corresponding files in the client folder.

### Production Build Process

For production deployment:

1. **Build static files** for the frontend
2. **Serve only static files** from the server (not the entire React JSX)
3. **Use Docker** for containerization (optional but recommended)

### Docker Deployment

```dockerfile
# Example Dockerfile structure
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build application
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:1-alpine
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
EXPOSE 3000
CMD ["bun", "start"]
```

## 🎯 Key Technologies

- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime
- **Backend**: [Elysia](https://elysiajs.com) - High-performance TypeScript framework
- **Frontend**: [React](https://reactjs.org) - UI library
- **Database**: [MikroORM](https://mikro-orm.io) - TypeScript ORM
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs) - Lightweight state management
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Type Safety**: [Eden Treaty](https://elysiajs.com/eden/overview.html) - End-to-end type safety

## 📚 API Documentation

Once the server is running, visit `http://localhost:3000/swagger` to view the interactive API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Elysia](https://elysiajs.com) for the amazing TypeScript framework
- [Bun](https://bun.sh) for the fast JavaScript runtime
- [MikroORM](https://mikro-orm.io) for the excellent TypeScript ORM
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework

---

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [CodingCat](https://github.com/codingcat0405)
