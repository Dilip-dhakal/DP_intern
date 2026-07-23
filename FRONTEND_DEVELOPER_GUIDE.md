# FRONTEND_DEVELOPER_GUIDE

## Document Purpose

This document is the authoritative frontend integration guide for the Finance Management System backend. It is written for frontend engineers, UI developers, and AI-assisted coding tools such as V0, Cursor, Claude Code, and GitHub Copilot.

The goal is to ensure the frontend is implemented exactly according to the backend contract and the product scope of Version 1.0.

This is not a generic starter guide. It is an engineering handoff document intended to support full implementation without needing to ask backend questions.

---

# 1. Project Overview

## Product Summary

The Finance Management System is a finance management application for tracking incomes, expenses, reminders, notes, categories, attachments, and reports. It is designed to help an accountant or finance operator manage day-to-day financial records in a clear and structured dashboard.

## Version 1.0 Scope

Version 1.0 has one role only:

- Accountant

Because there is only one role in Version 1.0:

- No role-based rendering is required.
- No role-based access control UI is required.
- All authenticated users can access the full dashboard experience.

## Important Product Decision

The frontend must be built as if the system is a single-role product in Version 1.0. Do not implement any UI that blocks access based on role. Keep the architecture extensible for future versions.

## Future Version 2.0 Expectations

Version 2.0 may introduce:

- Admin role
- Multiple dashboards
- Role switching
- Role-specific layouts
- Role guard patterns

The frontend architecture should therefore be prepared for future extensibility, even though none of that is required in Version 1.0.

---

# 2. Frontend Tech Recommendation

The recommended stack for this project is:

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Redux Toolkit
- RTK Query or Axios
- React Query (optional, if preferred)
- Recharts
- TanStack Table
- React Hot Toast
- date-fns
- Framer Motion
- Heroicons or Lucide

## Why These Technologies

### Next.js 15 (App Router)
Use Next.js 15 with the App Router for:

- route-based architecture
- server/client component separation
- ease of future scaling
- clean dashboard structure

### TypeScript
TypeScript is mandatory. The backend already uses strong typing and Zod validation. The frontend should mirror this discipline.

### Tailwind CSS + shadcn/ui
Use Tailwind CSS for styling and shadcn/ui for reusable, modern UI components.

### React Hook Form + Zod
Use React Hook Form for form state and Zod for schema validation. This matches the backend validation philosophy and keeps forms robust.

### Redux Toolkit
Redux Toolkit should be used for global auth state and potentially shared dashboard data.

### RTK Query or Axios
Use either:

- RTK Query for a strongly typed API layer, or
- Axios for simple and explicit HTTP handling

If using Axios, create a centralized API client with interceptors.

### React Query
React Query is optional but recommended if the team prefers a data-fetching layer separate from Redux.

### Recharts
Use Recharts for:

- pie charts
- doughnut charts
- line charts
- bar charts

### TanStack Table
Use TanStack Table for data tables with sorting, filtering, pagination, and row actions.

### React Hot Toast
Use Toast for:

- success messages
- validation errors
- authorization failures
- delete confirmations

### date-fns
Use date-fns for all date formatting and date manipulation.

### Framer Motion
Use Framer Motion for subtle page transitions, modal entry animations, and dashboard card animations.

### Heroicons/Lucide
Use these for clean and consistent icons throughout the dashboard.

---

# 3. Authentication Flow

## Authentication Model

The backend uses a two-token authentication strategy:

- Access Token: short-lived, used for protected API calls
- Refresh Token: long-lived, stored in an HttpOnly cookie

## Registration

### Endpoint

- POST /api/v1/auth/register

### Required Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Frontend Behavior

- Show a success toast after registration.
- Redirect to login page.
- Do not auto-login unless the product explicitly requires it.

## Login

### Endpoint

- POST /api/v1/auth/login

### Required Request Body

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Backend Behavior

On successful login:

- The backend returns an access token in the response body.
- The backend sets a refresh token cookie with HttpOnly.

### Frontend Requirement

- Store the access token in memory, preferably in Redux state or a secure in-memory store.
- Do not store the access token in LocalStorage or SessionStorage.
- Store the refresh token only in the HttpOnly cookie handled by the browser.

## Access Token

### Storage

- Store in memory (Redux recommended).
- Do not persist in local storage.

### Usage

- Attach the access token to every protected request via the Authorization header:

```http
Authorization: Bearer <accessToken>
```

### Expiration

The backend issues short-lived access tokens. The frontend must assume the token may expire during a session.

## Refresh Token

### Endpoint

- POST /api/v1/auth/refresh-token

### Frontend Behavior

When the access token expires or is rejected with a 401:

1. The frontend should automatically call POST /api/v1/auth/refresh-token
2. The backend should return a new access token
3. The frontend should retry the original request automatically

### Important Implementation Detail

The refresh token is not sent manually in the request body. It is sent automatically by the browser through the HttpOnly cookie.

## Logout

### Endpoint

- POST /api/v1/auth/logout

### Frontend Behavior

On logout:

- Call the logout endpoint
- Clear the Redux auth state
- Remove any in-memory access token reference
- Clear any UI state tied to the authenticated session
- Redirect to /login

## Recommended Auth UX

- Keep the user logged in until the refresh token expires or the user explicitly logs out.
- Show a loading state during refresh attempts.
- If refresh fails, force redirect to /login.

---

# 4. Protected Routes

## Rule

All routes under /dashboard are protected.

## Version 1.0 Access Rule

No role checking is required in Version 1.0.

If a user has no valid access token:

- redirect to /login

## Frontend Routing Policy

Use middleware or a route guard such as:

- If authenticated and token valid: allow access
- If not authenticated: redirect to /login

## Recommended Route Structure

- /login
- /register
- /dashboard
- /dashboard/income
- /dashboard/expenses
- /dashboard/categories
- /dashboard/notes
- /dashboard/reminders
- /dashboard/reports
- /dashboard/attachments
- /dashboard/profile

## Important Note

Do not implement role-based route restrictions in Version 1.0. The structure should be future-proof but currently simple.

---

# 5. Dashboard Layout

The dashboard UI should be a modern, responsive finance administration layout.

## Recommended Layout Structure

- Static left sidebar
- Top navbar
- Main content area
- Responsive behavior for mobile/tablet/desktop

## Sidebar Items

The sidebar should contain:

- Dashboard
- Income
- Expenses
- Categories
- Notes
- Reminders
- Reports
- Attachments
- Profile
- Logout

## Layout Requirements

- Keep it clean and minimal
- Use cards and whitespace generously
- Use consistent spacing and typography
- Keep the sidebar fixed on desktop
- Collapse into a mobile menu on smaller screens

## No Role-Based UI

Do not render different dashboards per role in Version 1.0.

---

# 6. Every API Endpoint

All backend routes are prefixed with /api/v1.

The frontend should treat every protected endpoint as requiring the Authorization header with an access token.

## Authentication Module

### 1) Register User

- Method: POST
- Route: /api/v1/auth/register
- Purpose: Create a new user account
- Authentication Required: No
- Request Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

- Response Example:

```json
{
  "success": true,
  "message": "User registered successfully",
  "meta": null,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
}
```

- Error Example:

```json
{
  "message": "Email already in use"
}
```

- Notes:
  - Use this for the register page.
  - Validate name length minimum 2, email format, password minimum 6.

### 2) Login User

- Method: POST
- Route: /api/v1/auth/login
- Purpose: Authenticate user and receive access token
- Authentication Required: No
- Request Body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

- Response Example:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "meta": null,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "jwt-token"
  }
}
```

- Error Example:

```json
{
  "message": "Invalid Credentials"
}
```

- Notes:
  - The refresh token is stored in an HttpOnly cookie by the backend.
  - Frontend should store access token in memory.

### 3) Refresh Access Token

- Method: POST
- Route: /api/v1/auth/refresh-token
- Purpose: Rotate a new access token using the refresh token cookie
- Authentication Required: No, but refresh token cookie is required
- Request Body: None
- Response Example:

```json
{
  "success": true,
  "message": "Access token refreshed successfully",
  "meta": null,
  "data": {
    "accessToken": "new-jwt-token"
  }
}
```

- Error Example:

```json
{
  "message": "Invalid or expired refresh token"
}
```

- Notes:
  - This endpoint should be called automatically by an HTTP interceptor when a 401 occurs.

### 4) Logout User

- Method: POST
- Route: /api/v1/auth/logout
- Purpose: Clear the refresh token cookie
- Authentication Required: No
- Request Body: None
- Response Example:

```json
{
  "success": true,
  "message": "Logged out successfully",
  "meta": null,
  "data": null
}
```

- Notes:
  - Frontend should clear Redux auth state after logout.

---

## Income Module

### 1) Create Income

- Method: POST
- Route: /api/v1/income
- Purpose: Create an income record
- Authentication Required: Yes
- Request Body:

```json
{
  "transactionDate": "2026-07-24",
  "amount": 1500,
  "incomeCategoryId": "uuid",
  "incomeSource": "Consulting",
  "clientName": "ABC Corp",
  "paymentMethod": "BANK_TRANSFER",
  "referenceNumber": "REF-001",
  "invoiceNumber": "INV-001",
  "description": "Project payment"
}
```

- Validation Rules:
  - transactionDate cannot be in the future
  - amount must be positive
  - incomeCategoryId must be a valid UUID
  - paymentMethod must be one of: CASH, BANK_TRANSFER, CHEQUE, ESEWA, KHALTI, OTHER

- Response Example:

```json
{
  "success": true,
  "message": "Income created successfully",
  "meta": null,
  "data": {
    "id": "uuid",
    "transactionDate": "2026-07-24T00:00:00.000Z",
    "amount": 1500,
    "incomeCategoryId": "uuid",
    "incomeSource": "Consulting"
  }
}
```

- Error Example:

```json
{
  "message": "Such category doesnt exists"
}
```

### 2) Get Income List

- Method: GET
- Route: /api/v1/income
- Purpose: Get paginated income records with optional filters
- Authentication Required: Yes
- Query Parameters:
  - page: number
  - limit: number
  - from: date string
  - to: date string
  - category: UUID
  - payment_method: enum
  - amount_min: number
  - amount_max: number
  - client_name: string
  - search: string

- Response Example:

```json
{
  "success": true,
  "message": "Incoe fetched successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "totalPages": 3,
    "total": 25
  },
  "data": [
    {
      "id": "uuid",
      "transactionDate": "2026-07-24T00:00:00.000Z",
      "amount": 1500,
      "clientName": "ABC Corp"
    }
  ]
}
```

### 3) Get Income By ID

- Method: GET
- Route: /api/v1/income/:id
- Purpose: Get one income record and attached files
- Authentication Required: Yes
- Response Example:

```json
{
  "success": true,
  "message": "income fetched successfully by id",
  "data": {
    "id": "uuid",
    "transactionDate": "2026-07-24T00:00:00.000Z",
    "amount": 1500,
    "attachments": []
  }
}
```

### 4) Update Income

- Method: PATCH
- Route: /api/v1/income/:id
- Purpose: Update an income record
- Authentication Required: Yes
- Request Body: Same fields as create, but all optional
- Response Example:

```json
{
  "success": true,
  "message": "Income updated successfully",
  "data": {
    "id": "uuid",
    "amount": 1800
  }
}
```

### 5) Delete Income

- Method: DELETE
- Route: /api/v1/income/:id
- Purpose: Soft-delete an income record
- Authentication Required: Yes
- Response Example:

```json
{
  "success": true,
  "message": "Income deleted successfully"
}
```

---

## Expense Module

### 1) Create Expense

- Method: POST
- Route: /api/v1/expense
- Purpose: Create an expense record
- Authentication Required: Yes
- Request Body:

```json
{
  "transactionDate": "2026-07-24",
  "amount": 850,
  "expenseCategoryId": "uuid",
  "vendorName": "Office Supplies",
  "paymentMethod": "CASH",
  "referenceNumber": "REF-100",
  "invoiceNumber": "INV-100",
  "description": "Stationery purchase"
}
```

- Validation Rules:
  - transactionDate cannot be in the future
  - amount must be positive
  - paymentMethod must be valid enum value

- Response Example:

```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "id": "uuid",
    "amount": 850,
    "expenseCategoryId": "uuid"
  }
}
```

### 2) Get Expense List

- Method: GET
- Route: /api/v1/expense
- Purpose: Get paginated expense records with filters
- Authentication Required: Yes
- Query Parameters:
  - page
  - limit
  - from
  - to
  - category
  - payment_method
  - amount_min
  - amount_max
  - vendor_name
  - search

### 3) Get Expense By ID

- Method: GET
- Route: /api/v1/expense/:id
- Purpose: Get one expense record and attached files
- Authentication Required: Yes

### 4) Update Expense

- Method: PATCH
- Route: /api/v1/expense/:id
- Purpose: Update an expense record
- Authentication Required: Yes

### 5) Delete Expense

- Method: DELETE
- Route: /api/v1/expense/:id
- Purpose: Soft-delete an expense record
- Authentication Required: Yes

---

## Income Category Module

### 1) Create Income Category

- Method: POST
- Route: /api/v1/income-category
- Purpose: Create a category used for income values
- Authentication Required: Yes
- Request Body:

```json
{
  "name": "Salary",
  "description": "Regular monthly salary"
}
```

- Response Example:

```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": "uuid",
    "name": "Salary"
  }
}
```

### 2) Get Income Categories

- Method: GET
- Route: /api/v1/income-category
- Purpose: List income categories with pagination and search
- Authentication Required: Yes
- Query Parameters:
  - page
  - limit
  - search

### 3) Get Income Category By ID

- Method: GET
- Route: /api/v1/income-category/:id
- Purpose: Retrieve one category
- Authentication Required: Yes

### 4) Update Income Category

- Method: PATCH
- Route: /api/v1/income-category/:id
- Purpose: Update one category
- Authentication Required: Yes

### 5) Delete Income Category

- Method: DELETE
- Route: /api/v1/income-category/:id
- Purpose: Delete category
- Authentication Required: Yes

---

## Expense Category Module

### 1) Create Expense Category

- Method: POST
- Route: /api/v1/expense-category
- Purpose: Create a category used for expenses
- Authentication Required: Yes
- Request Body:

```json
{
  "name": "Utilities",
  "description": "Electricity and internet"
}
```

### 2) Get Expense Categories

- Method: GET
- Route: /api/v1/expense-category
- Authentication Required: Yes

### 3) Get Expense Category By ID

- Method: GET
- Route: /api/v1/expense-category/:id
- Authentication Required: Yes

### 4) Update Expense Category

- Method: PATCH
- Route: /api/v1/expense-category/:id
- Authentication Required: Yes

### 5) Delete Expense Category

- Method: DELETE
- Route: /api/v1/expense-category/:id
- Authentication Required: Yes

---

## Dashboard Module

### 1) Dashboard Summary

- Method: GET
- Route: /api/v1/dashboard/summary
- Purpose: Return KPI totals for today, week, month, and year
- Authentication Required: Yes
- Query Parameters:
  - year: number

- Response Example:

```json
{
  "success": true,
  "message": "Dashboard summary fetched successfully",
  "data": {
    "today": {
      "income": 1200,
      "expense": 400,
      "profit": 800
    },
    "week": {
      "income": 6500,
      "expense": 1800,
      "profit": 4700
    },
    "month": {
      "income": 25000,
      "expense": 9000,
      "profit": 16000
    },
    "year": {
      "income": 280000,
      "expense": 120000,
      "profit": 160000
    }
  }
}
```

### 2) Recent Transactions

- Method: GET
- Route: /api/v1/dashboard/recent-transactions
- Purpose: Get the latest 20 income and expense transactions
- Authentication Required: Yes

### 3) Upcoming Reminders

- Method: GET
- Route: /api/v1/dashboard/upcoming-reminders
- Purpose: Get reminders due within the next 7 days
- Authentication Required: Yes

### 4) Income By Category

- Method: GET
- Route: /api/v1/dashboard/income-by-category
- Purpose: Get totals grouped by income category
- Authentication Required: Yes

### 5) Income Category Chart

- Method: GET
- Route: /api/v1/dashboard/income-category-chart
- Purpose: Get data for income category chart
- Authentication Required: Yes
- Query Parameters:
  - from
  - to

### 6) Expense Category Chart

- Method: GET
- Route: /api/v1/dashboard/expense-category-chart
- Purpose: Get data for expense category chart
- Authentication Required: Yes
- Query Parameters:
  - from
  - to

### 7) Bar Chart

- Method: GET
- Route: /api/v1/dashboard/bar-chart
- Purpose: Get income vs expense comparison by period
- Authentication Required: Yes
- Query Parameters:
  - period: daily | weekly | monthly | yearly

### 8) Monthly Cash Flow

- Method: GET
- Route: /api/v1/dashboard/monthly-cash-flow
- Purpose: Get yearly monthly cash flow data
- Authentication Required: Yes
- Query Parameters:
  - year: integer

---

## Reminder Module

### 1) Create Reminder

- Method: POST
- Route: /api/v1/reminder
- Purpose: Create a reminder
- Authentication Required: Yes
- Request Body:

```json
{
  "title": "Pay rent",
  "description": "Monthly rent payment",
  "reminderDate": "2026-07-30",
  "reminderTime": "10:00",
  "priority": "HIGH",
  "repeat": "MONTHLY"
}
```

### 2) Get Reminders

- Method: GET
- Route: /api/v1/reminder
- Purpose: List reminders
- Authentication Required: Yes
- Query Parameters:
  - page
  - limit
  - search
  - status
  - priority
  - from
  - to

### 3) Get Reminder By ID

- Method: GET
- Route: /api/v1/reminder/:id
- Authentication Required: Yes

### 4) Update Reminder

- Method: PATCH
- Route: /api/v1/reminder/:id
- Authentication Required: Yes

### 5) Delete Reminder

- Method: DELETE
- Route: /api/v1/reminder/:id
- Authentication Required: Yes

### 6) Mark Reminder Completed

- Method: PATCH
- Route: /api/v1/reminder/:id/complete
- Purpose: Mark reminder as completed
- Authentication Required: Yes

---

## Notes Module

### 1) Create Note

- Method: POST
- Route: /api/v1/notes
- Purpose: Create a note
- Authentication Required: Yes
- Request Body:

```json
{
  "title": "Tax reminders",
  "description": "Review invoices before month-end",
  "colorLabel": "blue"
}
```

### 2) Get Notes

- Method: GET
- Route: /api/v1/notes
- Purpose: List notes
- Authentication Required: Yes
- Query Parameters:
  - page
  - limit
  - search
  - is_pinned
  - is_archived

### 3) Get Note By ID

- Method: GET
- Route: /api/v1/notes/:id
- Authentication Required: Yes

### 4) Update Note

- Method: PATCH
- Route: /api/v1/notes/:id
- Authentication Required: Yes

### 5) Toggle Pin Status

- Method: PATCH
- Route: /api/v1/notes/:id/pin
- Authentication Required: Yes

### 6) Toggle Archive Status

- Method: PATCH
- Route: /api/v1/notes/:id/archive
- Authentication Required: Yes

### 7) Delete Note

- Method: DELETE
- Route: /api/v1/notes/:id
- Authentication Required: Yes

---

## Reports Module

### 1) Income Report

- Method: GET
- Route: /api/v1/report/income
- Purpose: Generate an income report
- Authentication Required: Yes
- Query Parameters:
  - from
  - to
  - format: json | csv | excel | pdf

### 2) Expense Report

- Method: GET
- Route: /api/v1/report/expense
- Purpose: Generate an expense report
- Authentication Required: Yes
- Query Parameters:
  - from
  - to
  - format

### 3) Profit and Loss Report

- Method: GET
- Route: /api/v1/report/profit-loss
- Purpose: Generate a profit and loss report
- Authentication Required: Yes
- Query Parameters:
  - from
  - to
  - group_by: daily | weekly | monthly | yearly
  - format

---

## Attachments Module

### 1) Upload Attachment

- Method: POST
- Route: /api/v1/attachment/:entityType/:entityId
- Purpose: Upload a file and attach it to an income, expense, or reminder
- Authentication Required: Yes
- Path Parameters:
  - entityType: INCOME | EXPENSE | REMINDER
  - entityId: UUID
- Request Body:
  - multipart/form-data
  - file field

- Response Example:

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "id": "uuid",
    "fileName": "invoice.pdf",
    "storageUrl": "https://..."
  }
}
```

### 2) Download Attachment

- Method: GET
- Route: /api/v1/attachment/download/:attachmentId
- Purpose: Redirect to the stored file URL
- Authentication Required: Yes

### 3) Get Attachments by Entity

- Method: GET
- Route: /api/v1/attachment/:entityType/:entityId
- Purpose: Get attached files for a parent record
- Authentication Required: Yes

### 4) Delete Attachment

- Method: DELETE
- Route: /api/v1/attachment/:attachmentId
- Purpose: Remove attachment
- Authentication Required: Yes

---

# 7. Dashboard Widgets

The dashboard should be built around the backend’s dashboard endpoints.

## Widget Mapping

### Summary

- Backend Endpoint: GET /api/v1/dashboard/summary
- UI Component: KPI cards
- Suggested cards:
  - Today Income
  - Today Expense
  - Today Profit
  - This Week Income
  - This Month Income
  - This Year Profit

### Income Category Chart

- Backend Endpoint: GET /api/v1/dashboard/income-category-chart
- UI Component: Pie chart or donut chart
- Display: category vs total amount

### Expense Category Chart

- Backend Endpoint: GET /api/v1/dashboard/expense-category-chart
- UI Component: Doughnut chart
- Display: category vs total amount

### Bar Chart

- Backend Endpoint: GET /api/v1/dashboard/bar-chart
- UI Component: Bar chart
- Display: income, expense, and profit comparison by period

### Recent Transactions

- Backend Endpoint: GET /api/v1/dashboard/recent-transactions
- UI Component: Data table or transaction list
- Display: latest income and expense items

### Upcoming Reminders

- Backend Endpoint: GET /api/v1/dashboard/upcoming-reminders
- UI Component: Reminder cards
- Display: title, date, priority, status

### Monthly Cash Flow

- Backend Endpoint: GET /api/v1/dashboard/monthly-cash-flow
- UI Component: Line chart or area chart
- Display: monthly income, expense, and profit

### Income by Category

- Backend Endpoint: GET /api/v1/dashboard/income-by-category
- UI Component: Bar chart or stacked card list

---

# 8. Forms

The frontend should include the following forms.

## Login Form

### Fields

- Email
- Password

### Validation

- Email required and valid format
- Password required and minimum 6 characters

### Button Label

- Login

### Success Flow

- Save access token in memory
- Redirect to /dashboard

---

## Register Form

### Fields

- Name
- Email
- Password

### Validation

- Name minimum 2 characters
- Email required and valid format
- Password minimum 6 characters

### Button Label

- Create Account

### Success Flow

- Show success toast
- Redirect to login

---

## Income Form

### Fields

- Transaction Date
- Amount
- Income Category
- Income Source
- Client Name
- Payment Method
- Reference Number
- Invoice Number
- Description

### Validation

- Date required and cannot be in the future
- Amount must be positive
- Category required
- Payment method required

### Button Labels

- Create Income
- Update Income

### Success Flow

- Show success toast
- Redirect to income list or stay on form in create mode

---

## Expense Form

### Fields

- Transaction Date
- Amount
- Expense Category
- Vendor Name
- Payment Method
- Reference Number
- Invoice Number
- Description

### Validation

- Date required and cannot be in the future
- Amount must be positive
- Category required
- Payment method required

### Button Labels

- Create Expense
- Update Expense

### Success Flow

- Show success toast
- Redirect to expense list

---

## Reminder Form

### Fields

- Title
- Description
- Reminder Date
- Reminder Time
- Priority
- Repeat

### Validation

- Title required
- Reminder date required
- Priority required

### Button Labels

- Create Reminder
- Update Reminder

### Success Flow

- Show success toast
- Redirect to reminder list

---

## Category Form

### Fields

- Name
- Description

### Validation

- Name required and minimum length enforced by backend

### Button Labels

- Create Category
- Update Category

### Success Flow

- Show success toast
- Close modal or redirect to category list

---

## Note Form

### Fields

- Title
- Description
- Color Label

### Validation

- Title required
- Description required

### Button Labels

- Create Note
- Update Note

### Success Flow

- Show success toast
- Return to notes list

---

## Attachment Form

### Fields

- File upload

### Validation

- File is required
- File should be accepted by the upload endpoint

### Button Label

- Upload

### Success Flow

- Show success toast
- Refresh attachments list

---

# 9. Tables

The frontend should provide list pages for the main entities.

## Income Table

### Columns

- Date
- Amount
- Category
- Client / Source
- Payment Method
- Reference Number
- Actions

### Actions

- View
- Edit
- Delete
- Attachments

### Features

- Pagination
- Search
- Filtering by category and payment method
- Sorting by date, amount, and category

---

## Expense Table

### Columns

- Date
- Amount
- Category
- Vendor
- Payment Method
- Reference Number
- Actions

### Features

- Pagination
- Search
- Filters
- Sorting

---

## Income Categories Table

### Columns

- Name
- Description
- Status
- Actions

### Features

- Search
- Pagination
- Edit/Delete

---

## Expense Categories Table

### Columns

- Name
- Description
- Status
- Actions

### Features

- Search
- Pagination
- Edit/Delete

---

## Notes Table / List

### Columns

- Title
- Description
- Pinned
- Archived
- Created At
- Actions

### Features

- Search
- Filter by pinned/archive
- Pin/unpin
- Archive/unarchive

---

## Reminders Table

### Columns

- Title
- Date
- Time
- Priority
- Status
- Repeat
- Actions

### Features

- Search
- Filter by priority and status
- Complete reminder
- Delete reminder

---

## Attachments List

### Columns

- File Name
- Type
- Size
- Uploaded At
- Actions

### Features

- Download
- Delete

---

# 10. Charts

Use Recharts for all dashboard visualizations.

## Recommended Chart Library

- Recharts

## Chart Mapping

### KPI Cards

- No chart library required
- Powered by GET /api/v1/dashboard/summary

### Pie Chart / Doughnut Chart

- Use for income and expense category charts
- Powered by:
  - GET /api/v1/dashboard/income-category-chart
  - GET /api/v1/dashboard/expense-category-chart

### Bar Chart

- Use for income vs expense comparison
- Powered by GET /api/v1/dashboard/bar-chart

### Line Chart / Area Chart

- Use for monthly cash flow
- Powered by GET /api/v1/dashboard/monthly-cash-flow

## Expected Data Shape

### Income Category Chart

```json
[
  {
    "category": "Salary",
    "amount": 15000
  }
]
```

### Expense Category Chart

```json
[
  {
    "category": "Utilities",
    "amount": 3200
  }
]
```

### Bar Chart

```json
[
  {
    "label": "Jan",
    "income": 5000,
    "expense": 3000,
    "profit": 2000
  }
]
```

### Monthly Cash Flow

```json
[
  {
    "month": "Jan",
    "income": 5000,
    "expense": 3000,
    "profit": 2000
  }
]
```

## Visual Recommendations

- Use a muted blue/indigo palette for income
- Use a rose/red palette for expenses
- Use green for profit
- Keep legends simple and legible
- Avoid too many colors in one view

---

# 11. Redux State

Use Redux Toolkit for global state.

## Recommended Slices

### authSlice

Stores:

- user
- accessToken
- auth status
- isLoading
- error
- isAuthenticated

### incomeSlice

Stores:

- income list
- selected income
- pagination metadata
- filters
- loading state

### expenseSlice

Stores:

- expense list
- selected expense
- pagination metadata
- filters
- loading state

### dashboardSlice

Stores:

- summary data
- recent transactions
- reminder data
- chart data
- selected year/period

### noteSlice

Stores:

- note list
- selected note
- filters
- pinned/archive state

### reminderSlice

Stores:

- reminder list
- selected reminder
- filters
- completion state

### categorySlice

Stores:

- income categories
- expense categories
- selected category
- search/filter state

### attachmentSlice

Stores:

- attachments for current entity
- upload progress
- selected attachment

### reportSlice

Stores:

- report generation parameters
- export type
- download state

## Auth State Handling

- Do not persist access token in local storage.
- Keep auth state minimal and stable.
- On refresh failure, clear auth state immediately.

---

# 12. Folder Structure

Use an enterprise-ready Next.js folder structure.

```text
app/
  (auth)/
  (dashboard)/
  globals.css
  layout.tsx
  page.tsx

components/
  ui/
  layout/
  forms/
  charts/
  tables/

features/
  auth/
  dashboard/
  income/
  expense/
  categories/
  notes/
  reminders/
  reports/
  attachments/

services/
  api/
  auth/
  dashboard/
  income/
  expense/
  categories/
  notes/
  reminders/
  reports/
  attachments/

hooks/
  useAuth.ts
  useDebounce.ts

lib/
  axios.ts
  utils.ts
  date.ts
  constants.ts

types/
  auth.ts
  income.ts
  expense.ts
  dashboard.ts
  notes.ts
  reminders.ts
  reports.ts
  attachments.ts

store/
  index.ts
  provider.tsx
  slices/

schemas/
  auth.schema.ts
  income.schema.ts
  expense.schema.ts
  reminder.schema.ts
  note.schema.ts
  category.schema.ts

constants/
  routes.ts
  enums.ts
  labels.ts
```

## Architectural Guidance

- Keep feature modules grouped by business domain.
- Keep API client logic separate from UI components.
- Keep validation schemas near the feature modules.
- Use shared UI primitives from shadcn/ui.

---

# 13. Error Handling

The backend returns successful responses in the following envelope shape:

```json
{
  "success": true,
  "message": "...",
  "meta": null,
  "data": {}
}
```

## Frontend Error Strategy

The frontend should implement a global error handler that can handle:

- network failures
- validation errors
- unauthorized responses
- 404s
- 500s
- expired token responses

## Toast Handling

Use toast notifications for:

- create/update/delete success
- validation issues
- failed login
- failed refresh
- request timeout

## Validation Errors

Show inline form errors and a toast summary if needed.

## Unauthorized

If the backend returns 401:

- attempt refresh token
- if refresh fails, redirect to /login

## 404

Show a friendly empty state or not-found page.

## 500

Show a generic failure message and recommend retrying later.

## Expired Token

Treat expired access token as an auth refresh event. Do not immediately log the user out unless refresh also fails.

---

# 14. Loading States

The frontend should show loading feedback for all major data-fetching views.

## Table Loading

Use skeleton rows while list data loads.

## Card Loading

Use skeleton cards for dashboard KPI cards and summary widgets.

## Chart Loading

Show chart skeletons before data arrives.

## Form Loading

Disable the submit button while a form request is pending.

## Recommended UX

- Use skeleton loaders for initial load
- Use spinners for small mutations
- Avoid blank screens for network requests

---

# 15. Future Ready

The architecture should remain extensible for future versions.

## Version 2.0 Future Requirements

Planned future capabilities include:

- Role switching
- Admin dashboard
- Multiple layouts
- Role guards
- Role selector

## Frontend Recommendation

Do not implement role-based UI in Version 1.0, but keep the architecture flexible by:

- separating auth and route guards from feature UI
- using a central route config
- keeping layout logic modular
- designing shared page shells that can later support multiple dashboards

---

# 16. UI Inspiration

The visual style should be modern, calm, and minimal.

Recommended inspirations:

- Vercel
- Linear
- Stripe
- Notion
- Supabase
- GitHub

## Design Principles

- clean spacing
- low visual noise
- strong information hierarchy
- subtle micro-interactions
- calm and professional dashboard appearance

---

# 17. Final Checklist

Use this checklist before considering the frontend complete.

## Authentication

- [ ] Login works
- [ ] Register works
- [ ] Refresh token flow works
- [ ] Logout clears auth state
- [ ] Protected routes redirect to /login when unauthenticated

## Dashboard

- [ ] Dashboard layout is implemented
- [ ] Summary cards render correctly
- [ ] Recent transactions widget works
- [ ] Upcoming reminders widget works
- [ ] Charts render correctly

## Income CRUD

- [ ] Create income works
- [ ] List income works
- [ ] Edit income works
- [ ] Delete income works
- [ ] Filters and pagination work

## Expense CRUD

- [ ] Create expense works
- [ ] List expense works
- [ ] Edit expense works
- [ ] Delete expense works
- [ ] Filters and pagination work

## Reports

- [ ] Income report works
- [ ] Expense report works
- [ ] Profit/Loss report works
- [ ] Export formats are handled correctly

## Notes

- [ ] Create note works
- [ ] Edit note works
- [ ] Pin/unpin works
- [ ] Archive/unarchive works
- [ ] Delete note works

## Reminder

- [ ] Create reminder works
- [ ] List reminders works
- [ ] Edit reminder works
- [ ] Delete reminder works
- [ ] Complete reminder works

## Charts

- [ ] Income category chart renders
- [ ] Expense category chart renders
- [ ] Bar chart renders
- [ ] Monthly cash flow chart renders

## Responsive UX

- [ ] Sidebar works on mobile
- [ ] Content layout is responsive
- [ ] Tables are usable on small screens

## Optional

- [ ] Dark mode implemented
- [ ] Smooth page transitions added

## Deployment and API Verification

- [ ] Frontend builds successfully
- [ ] CORS works with backend
- [ ] Swagger API contract is tested
- [ ] Auth flow verified end-to-end

---

## Final Implementation Note

Build the frontend as a single-role, accountant-first dashboard in Version 1.0. Keep the experience polished, simple, and professional. Do not over-engineer the UI around roles that do not exist yet. Keep the codebase structured so Version 2.0 can expand cleanly without major refactoring.
