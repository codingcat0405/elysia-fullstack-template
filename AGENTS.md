# Elysia Fullstack Template

## Project Overview

This is a modern fullstack TypeScript template built with Bun runtime, featuring Elysia.js backend and React frontend with end-to-end type safety via Eden Treaty.

**Key Features:**
- 🔥 Hot reload development with Bun (no bundlers needed)
- 🛡️ JWT authentication with macro-based route protection
- 📊 MikroORM for type-safe database operations
- ⚛️ React 19 with Tailwind CSS
- 🔗 Eden Treaty for end-to-end type safety
- 📚 Auto-generated Swagger documentation

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Bun | JavaScript runtime (replaces Node.js) |
| Backend | Elysia.js | High-performance TypeScript web framework |
| Database | MikroORM + PostgreSQL | ORM with decorator-based entities |
| Frontend | React 19 | UI library |
| Routing | React Router (Hash) | Client-side routing |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| State | Zustand | Lightweight state management |
| Type Safety | Eden Treaty | End-to-end TypeScript types |
| Auth | JWT + jsonwebtoken | Token-based authentication |

## Project Structure
```
elysia-fullstack-template/
├── src/                      # Backend (Elysia.js)
│   ├── controllers/          # API endpoint handlers
│   │   └── *.controller.ts   # Pattern: [name].controller.ts
│   ├── services/             # Business logic layer
│   │   └── *Service.ts       # Pattern: [Name]Service.ts
│   ├── entities/             # Database models (MikroORM)
│   │   ├── BaseEntity.ts     # Base class with id, createdAt, updatedAt
│   │   └── *.ts              # Entity classes with decorators
│   ├── middlewares/          # Request/response processors
│   │   ├── error-middleware.ts
│   │   └── response-middleware.ts
│   ├── macros/               # Elysia macros (e.g., auth)
│   │   └── auth.ts           # JWT authentication macro
│   ├── db.ts                 # Database initialization & services
│   ├── mikro-orm.config.ts   # MikroORM configuration
│   └── index.ts              # Server entry point
│
├── client/                   # Frontend (React)
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/                # Page components
│   │   └── *Page.tsx         # Pattern: [Name]Page.tsx
│   ├── layouts/              # Layout wrappers
│   │   └── index.tsx         # ProtectedPageLayout
│   ├── store/                # Zustand stores
│   │   └── user.ts           # User state management
│   ├── libs/                 # Utilities & API client
│   │   └── api.ts            # Eden Treaty API client
│   ├── constants.ts          # App constants
│   ├── router.ts             # Route definitions (Hash Router)
│   ├── index.tsx             # React entry point
│   ├── index.html            # HTML template
│   └── global.css            # Global styles (Tailwind import)
│
├── .env.example              # Environment variables template
├── .prettierrc               # Code formatting rules
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── bunfig.toml               # Bun configuration
└── Dockerfile                # Container configuration
```

## Architecture Patterns

### 1. Backend Architecture (Elysia.js)

#### Controller Pattern
```typescript
// src/controllers/user.controller.ts
import { Elysia, t } from "elysia";
// const userService = new UserService() // if exported as class directly
const userController = new Elysia()
  .group("/users", group =>
    group
      .use(userService)        // Inject service if exported as Elysia plugin`
      .use(authMacro)          // Add auth capabilities
      .post("/register", handler, {
        body: t.Object({       // Validation schema
          username: t.String(),
          password: t.String(),
        }),
        detail: { tags: ["User"] }  // Swagger tags
      })
      .get("/me", handler, {
        checkAuth: ['user'],   // Auth macro - protected route
        detail: {
          tags: ["User"],
          security: [{ JwtAuth: [] }]  // Swagger auth
        }
      })
  )

export default userController
```

#### Service Pattern
```typescript
// src/services/UserService.ts
import { Elysia } from "elysia";
import { initORM } from "../db";

export class UserService {
  async register(username: string, password: string) {
    const db = await initORM()
    // Business logic here
    const user = db.user.create({ username, password, role: "user" })
    await db.em.persistAndFlush(user)
    return user
  }
}

// Export as Elysia plugin for dependency injection
export default new Elysia().decorate('userService', new UserService())
//or can just export the service class directly
// export default new UserService()
```

#### Entity Pattern (MikroORM)
```typescript
// src/entities/User.ts
import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  role!: string;
}
```

#### Auth Macro Pattern
```typescript
// src/macros/auth.ts
const authMacro = new Elysia()
  .macro({
    checkAuth(roles: string[]) {
      return {
        resolve({ headers }) {
          const token = headers.authorization?.split(" ")[1]
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          if (!roles.includes(decoded.role)) {
            throw new Error('Permission denied')
          }
          return { user: decoded }
        }
      }
    }
  })
```

### 2. Frontend Architecture (React)

#### API Client Pattern (Eden Treaty)
```typescript
// client/libs/api.ts
import { treaty } from '@elysiajs/eden'
import type { app } from '@server'

export const api = treaty<typeof app>(window.location.origin, {
  onRequest() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      return {
        headers: { Authorization: `Bearer ${token}` }
      }
    }
  }
})

// Usage in components:
const response = await api.api.users.login.post({
  username: "test",
  password: "pass"
})
// Fully typed! TypeScript knows the shape of response
```

#### Store Pattern (Zustand)
```typescript
// client/store/user.ts
import { create } from 'zustand'

export type UserStore = {
  user: User,
  setUser: (user: User) => void,
  clearUser: () => void,
}

const useUserStore = create<UserStore>((set) => ({
  user: defaultUser,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: defaultUser }),
}))
```

#### Protected Route Pattern
```typescript
// client/layouts/index.tsx
const ProtectedPageLayout = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (!token) navigate('/login')
  }, [pathname])

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
```

#### Router Pattern (CRITICAL)
```typescript
// client/router.ts
import { createHashRouter } from "react-router";  // ✅ Hash Router

// ❌ NEVER use createBrowserRouter - conflicts with static serving
const router = createHashRouter([
  {
    Component: ProtectedPageLayout,
    children: [{ path: "/", Component: HomePage }]
  },
  { path: "/login", Component: LoginPage }
])
```

## Critical Rules & Conventions

### 🚨 MUST FOLLOW

1. **Hash Router Required**
   - ALWAYS use `createHashRouter` from `react-router`
   - NEVER use `createBrowserRouter`
   - Reason: Static file serving mounts at `/`, browser router conflicts with server routes

2. **Database Access Pattern**
```typescript
   // ✅ CORRECT
   const db = await initORM()
   const user = await db.user.findOne({ id })
   
   // ❌ WRONG - Don't create new ORM instances
   const orm = await MikroORM.init(config)
```

3. **Entity Registration**
   - New entities MUST extend `BaseEntity`
   - New entities MUST be added to `src/db.ts` services interface
   - Schema auto-updates on server restart

4. **Protected Routes**
```typescript
   // Backend
   .get("/endpoint", handler, {
     checkAuth: ['user'],  // or ['admin']
     detail: {
       security: [{ JwtAuth: [] }]  // For Swagger
     }
   })
   
   // Frontend
   const token = localStorage.getItem(ACCESS_TOKEN_KEY)
   // Token auto-added to requests via api.ts onRequest
```

5. **Code Style (.prettierrc)**
   - Use tabs (width: 4)
   - Single quotes
   - No semicolons
   - No trailing commas

### 📁 Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Controllers | `[name].controller.ts` | `user.controller.ts` |
| Services | `[Name]Service.ts` | `UserService.ts` |
| Entities | `[Name].ts` | `User.ts` |
| Pages | `[Name]Page.tsx` | `LoginPage.tsx` |
| Components | `[Name].tsx` | `Header.tsx` |

## Common Development Tasks

### Adding a New API Endpoint

1. **Create/Update Controller** (`src/controllers/`)
```typescript
   const myController = new Elysia()
     .group("/myroute", group =>
       group
         .get("/", handler, { detail: { tags: ["MyTag"] } })
     )
```

2. **Add to Main App** (`src/index.ts`)
```typescript
   .group("/api", group =>
     group
       .use(myController)  // Add here
   )
```

3. **Frontend Auto-Updates**
   - Eden Treaty automatically gets new types
   - Use: `api.api.myroute.get()`

### Adding a New Database Entity

1. **Create Entity** (`src/entities/MyEntity.ts`)
```typescript
   @Entity()
   export class MyEntity extends BaseEntity {
     @Property()
     name!: string;
   }
```

2. **Register in db.ts**
```typescript
   export interface Services {
     // ... existing
     myEntity: EntityRepository<MyEntity>;
   }
   
   dataSource = {
     // ... existing
     myEntity: orm.em.getRepository(MyEntity)
   }
```

3. **Use in Services**
```typescript
   const db = await initORM()
   const item = await db.myEntity.findOne({ id })
```

### Adding a Protected Frontend Route

1. **Add Route Definition** (`client/router.ts`)
```typescript
   const router = createHashRouter([
     {
       Component: ProtectedPageLayout,
       children: [
         { path: "/newpage", Component: NewPage }  // Protected
       ]
     }
   ])
```

2. **Create Page Component** (`client/pages/NewPage.tsx`)
```typescript
   const NewPage = () => {
     const { user } = useUserStore()  // Access user
     return <div>{/* Content */}</div>
   }
```

### Adding Authentication to Endpoint
```typescript
// In controller
.get("/protected", handler, {
  checkAuth: ['user'],  // Require 'user' or 'admin' role
  detail: {
    tags: ["Protected"],
    security: [{ JwtAuth: [] }]  // Swagger UI auth
  }
})

// Handler receives user
async ({ user }) => {
  console.log(user.id, user.role)
  // ... logic
}
```

## Environment Variables

Create `.env` file (see `.env.example`):
```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
```

## Development Commands
```bash
# Install dependencies
bun install

# Development with hot reload
bun run dev

# Build for production (compile to binary)
bun run build

# Start production server
bun start
```

## API Documentation

- **Swagger UI**: http://localhost:3000/api-docs
- Auto-generated from Elysia route definitions
- JWT authentication support built-in

## Testing API Endpoints

### Using Swagger UI
1. Start server: `bun run dev`
2. Open: http://localhost:3000/api-docs
3. Click "Authorize" and enter JWT token
4. Test endpoints directly

### Using Eden Treaty (Frontend)
```typescript
// Fully typed API calls
const { data, error } = await api.api.users.login.post({
  username: "test",
  password: "password"
})

if (error) {
  console.error(error.value)
} else {
  console.log(data)  // TypeScript knows the shape
}
```

## Error Handling

### Backend
```typescript
// In handlers - throw errors
if (!user) {
  throw new Error("User not found")  // Auto-handled by middleware
}

// error-middleware.ts catches and formats
return {
  message: error.message,
  status: 400
}
```

### Frontend
```typescript
// API calls return { data, error }
const response = await api.api.users.login.post(body)

if (response.error) {
  const errorMsg = response.error.value?.message ?? "Unknown error"
  alert(errorMsg)
} else {
  const data = response.data
  // Success logic
}
```

## Database Operations

### Common MikroORM Patterns
```typescript
// Find one
const user = await db.user.findOne({ username })

// Find many
const users = await db.user.findAll()

// Create
const user = db.user.create({ username, password, role: "user" })
await db.em.persistAndFlush(user)

// Update
user.username = "newname"
await db.em.flush()

// Delete
await db.em.removeAndFlush(user)

// Query builder
const users = await db.user.find(
  { role: 'admin' },
  { orderBy: { createdAt: 'DESC' } }
)
```

## Security Considerations

1. **Password Hashing**
```typescript
   // Use Bun's built-in bcrypt
   const hashed = await Bun.password.hash(password, 'bcrypt')
   const isValid = await Bun.password.verify(password, hashed, 'bcrypt')
```

2. **JWT Tokens**
   - Stored in localStorage (client-side)
   - Sent via Authorization header
   - Validated on every protected route

3. **Route Protection**
   - Backend: `checkAuth` macro
   - Frontend: Protected layout checks token

## Deployment

### Docker
```bash
# Build image
docker build -t elysia-fullstack .

# Run container
docker run -p 3000:3000 --env-file .env elysia-fullstack
```

### Production Build
```bash
# Compile to standalone binary
bun run build

# Run binary
./server
```

## Troubleshooting

### Common Issues

1. **"Token not found" error**
   - Check localStorage has `ACCESS_TOKEN_KEY`
   - Verify Authorization header format: `Bearer <token>`

2. **Routes not working in production**
   - Ensure using Hash Router, not Browser Router
   - Check static files are being served correctly

3. **Database connection fails**
   - Verify DATABASE_URL in .env
   - Check PostgreSQL is running
   - Ensure database exists

4. **Types not syncing between frontend/backend**
   - Restart dev server to regenerate types
   - Check `@server` path alias in tsconfig.json
   - Verify Eden Treaty is properly configured

## Additional Resources

- [Elysia.js Documentation](https://elysiajs.com)
- [MikroORM Documentation](https://mikro-orm.io)
- [Bun Documentation](https://bun.sh/docs)
- [Eden Treaty Guide](https://elysiajs.com/eden/overview.html)
- [Tailwind CSS v4](https://tailwindcss.com)

## Contributing Guidelines

When contributing to this template:

1. Follow existing patterns and conventions
2. Update this AGENTS.md if adding new patterns
3. Ensure TypeScript strict mode compliance
4. Test both development and production builds
5. Update Swagger documentation for new endpoints
6. Follow Prettier code style (.prettierrc)

---

**Note for AI Agents**: This file contains the complete context needed to understand, modify, and extend this fullstack template. Always refer to the patterns and conventions outlined here when generating code.