# StaffPulse — Employee Dashboard & Management System
> **Assignment 2: React Employee Dashboard**

An enterprise-grade, responsive Employee Management Portal built with **React**, **Vite**, and **React Router DOM**. The application consumes real-time employee records from an external REST API, displays them across customizable table and card views, and provides an Employee Registration Form with live validation and routing.

---

## 🚀 Live Demo & Assignment Submission

- **Repository Link**: *[Submit your GitHub repository URL here]*
- **External API Source**: [`https://jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users)

---

## 📋 Requirements & Features Matrix

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **React Library** | Built using modern React 19 functional components and hooks (`useState`, `useEffect`, `useContext`) | ✅ Complete |
| **Navbar with Navigation Links** | Sticky responsive navbar with **Home** (Dashboard) and **Employee Form** links with active state styling | ✅ Complete |
| **API Integration** | Real-time `fetch()` integration querying `https://jsonplaceholder.typicode.com/users` | ✅ Complete |
| **Dashboard Display (id, name, email)** | Rich view options: Interactive **Tabular View** and **Card Grid View** highlighting `id`, `name`, and `email` | ✅ Complete |
| **Employee Form** | Complete form featuring **Name**, **Designation**, **Location**, and **Salary** with validation | ✅ Complete |
| **Routing** | Client-side routing with `react-router-dom` navigating between `/` (Home/Dashboard), `/employee-form`, and 404 handler | ✅ Complete |
| **CSS Styling & Polish** | Curated CSS design system with Dark/Light mode theme switcher, glassmorphism, and micro-animations | ✅ Complete |
| **No Backend POST required** | Client-side optimistic persistence saving submissions in local state so newly added employees appear on the Dashboard | ✅ Complete |

---

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS3 custom properties (Design System with light/dark theme support)
- **Data Source**: JSONPlaceholder Public REST API

---

## 📂 Project Structure

```text
├── index.html                  # HTML template with Google Fonts & metadata
├── src/
│   ├── main.jsx                # Application root entry
│   ├── App.jsx                 # Routing and layout structure
│   ├── index.css               # Design system, theme variables, and global CSS
│   ├── context/
│   │   └── EmployeeContext.jsx # Global state provider (API fetch, theme, local additions)
│   ├── components/
│   │   ├── Navbar.jsx          # Responsive navigation bar with Home & Form links
│   │   ├── Footer.jsx          # Footer with tech stack information
│   │   ├── EmployeeModal.jsx   # Detailed employee profile viewer modal
│   │   └── ToastContainer.jsx  # Notification alert toasts
│   └── pages/
│       ├── Dashboard.jsx       # Home / Dashboard page (Table & Card views, search, stats)
│       ├── EmployeeForm.jsx    # Employee registration form (Name, Designation, Location, Salary)
│       └── NotFound.jsx        # 404 fallback page
└── package.json
```

---

## 🚦 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd 19
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 💡 Key Highlights

1. **Dual View Modes**: Seamless toggle between a streamlined **Data Table** and a responsive **Card Grid**.
2. **Instant Search & Filter**: Real-time filtering across IDs, employee names, emails, and roles.
3. **Employee Detail Modal**: Clicking any employee reveals their extended profile (phone, company, website, address).
4. **Theme Customization**: Toggle seamlessly between sleek Dark Mode and high-contrast Light Mode.
5. **Form Feedback**: Includes inline validation indicators and feedback toasts.
