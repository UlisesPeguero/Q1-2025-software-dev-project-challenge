# Project Title: Personal Finance Tracker

## **Premise**

Build a simple, full-stack personal finance application where users can create an account, log in, and manage their financial transactions (income and expenses). The front end must be built with React and JavaScript, while the back end can be implemented in any language or framework you prefer (Node.js, Python/Django, Ruby on Rails, Java/Spring Boot, Go, etc.). The application’s main goal is to help users track their finances in a straightforward manner.

---

## **General Requirements (Beginner Level)**

### 1. User Authentication

1. **Sign Up**
    - Users can register with an email/username and password.
    - Basic validation (e.g., required fields, valid email format).
2. **Login**
    - Users can log in with their registered credentials.
    - Store session data securely (e.g., using JWT-based auth or session-based auth).
3. **Logout**
    - Users can log out to end their session.

> **Note:** For a beginner project, it’s acceptable to store user credentials in a simple manner (e.g., a JSON file or in-memory list). If you want better security and scalability, integrate a proper database and implement secure password hashing (bcrypt, Argon2, etc.).

### 2. Front End (React + JavaScript)

1. **UI Framework (Optional)**
    - You may use a UI library (e.g., Bootstrap, Material UI, Tailwind CSS) or create your own CSS.

2. **Transaction Management Pages**
    
    - **Dashboard/Home Page:**
        - Displays a summary of total income, total expenses, and net balance.
    - **Transaction List Page:**
        - Shows all transactions (income and expenses) in a list/table.
        - Each transaction should display a date, category (optional for beginner), description, and amount.
    - **Add Transaction Page or Modal:**
        - A form to add a new transaction (income or expense).
        - Required fields: amount, date, and type (income/expense).
        - Optional fields: description, category, etc.

3. **Routing**
    - Use React Router (or similar) to manage routes (e.g., `/login`, `/signup`, `/dashboard`, `/transactions`).
    
4. **State Management**
    - Use React’s built-in state management (useState, useContext) for simpler projects.
    - Redux or other libraries are optional if you prefer more structured state management.

5. **Basic Validation and Feedback**
    - Display error messages for invalid inputs (e.g., negative amounts, missing fields).
    - Show success or failure messages after adding, editing, or deleting a transaction.

### 3. Back End (Language Agnostic)

> You can choose any back-end technology (Node.js/Express, Python/Flask, Java/Spring Boot, etc.) but ensure it implements the following endpoints.

1. **Authentication Endpoints**
    
    - **POST /auth/signup**
        - Registers a new user.
    - **POST /auth/login**
        - Authenticates the user and returns a session or token.
    - **POST /auth/logout**
        - Terminates the user session or invalidates the token.

2. **Transaction Endpoints**
    
    - **GET /transactions**
        - Returns all transactions belonging to the authenticated user.
    - **POST /transactions**
        - Creates a new transaction (income or expense).
    - **GET /transactions/:id**
        - Retrieves a specific transaction by ID.
    - **PUT /transactions/:id** (Optional for Beginner)
        - Updates an existing transaction.
    - **DELETE /transactions/:id**
        - Deletes a transaction.

3. **Database or Data Storage**
    - For beginners, you can store data in memory, a JSON file, or a simple database like SQLite.
    - Ideally, use a relational or NoSQL database (PostgreSQL, MySQL, MongoDB) to gain real-world experience.

4. **Security Considerations**
    - Ensure that only the transaction’s owner can edit/delete their own transactions.
    - Hash user passwords if you are storing them in a database.

### 4. Project Structure and Workflow

1. **Project Setup**
    - Separate your front-end and back-end code or keep them in a monorepo.
    - Use a package manager (npm or yarn) for both the frontend and backend.

2. **Front-End to Back-End Communication**
    - Use `fetch` or `axios` in React to call the REST API endpoints.

3. **Deployment**
    - Provide instructions on how to build and run the app locally.

4. **Version Control**
    - Use Git to track changes.
    - Maintain a clear commit history with meaningful messages.

---

## **Optional Features (Intermediate Level)**

If you want to extend this project to intermediate level, consider adding one or more of the following features:

1. **Advanced Authentication & Authorization**
    - Implement password reset via email.
    - Use more secure session management or token-based auth with refresh tokens.
    - Add Multi-Factor Authentication (2FA).

2. **Categories & Budgeting**
    - Introduce categories (e.g., Food, Rent, Utilities, Travel).
    - Set monthly budgets for each category and track spending against those budgets.

3. **Recurring Transactions**
    - Allow users to set up recurring incomes or expenses (e.g., monthly subscription, salary).

4. **Analytics & Charts**
    - Provide visual charts for spending/income trends over time (using a library like Chart.js or Recharts).
    - Show breakdowns by category, monthly spending, etc.

5. **Filtering & Sorting**
    - Enable advanced filtering (e.g., by date range, category) and sorting (by amount, date) on the transactions list.

6. **Multi-Currency Support**
    - Let users record transactions in different currencies.
    - Optionally, integrate exchange rate APIs (requires a third-party service, so purely optional).

7. **Search Functionality**
    - Implement a search bar to quickly find transactions by description or category.
    
8. **File Uploads**
    - Allow users to upload receipts or documents for each transaction.
    - Store files securely (in a local storage folder).
    - WARNING - Don't upload any real financial documents. Just use dummy .txt and .pdf files to show that the feature works.

9. **Notifications and Alerts**
    - Notify users when they approach or exceed their budget limit.
    - Email reminders for recurring transactions or upcoming bills.

10. **Testing**
    - Write basic unit and integration tests for your front end (Jest, React Testing Library).
    - Write automated tests for back-end APIs using your chosen framework’s testing tools.

---

## **Learning Objectives**

- **Frontend (React + JavaScript)**
    - Build a functional UI with React.
    - Manage data and forms (creating/editing/deleting transactions).
    - Communicate with a back-end server using async/await or callbacks.

- **Backend (Language of Your Choice)**
    - Design and implement RESTful endpoints for CRUD operations.
    - Secure user data and manage authentication.
    - Store and retrieve data from a database or other storage.

- **Integration**
    - Connect the front end and back end seamlessly.
    - Ensure secure data transmission (potentially using HTTPS in production).

- **Optional Intermediate Skills**
    - Advanced auth, real-time features, analytics, or multi-currency support.
    - Testing strategies for higher code quality.

---

## **Suggested Project Flow**

1. **Plan & Design**
    - Sketch a simple UI flow.
    - Decide on the data schema (e.g., how to represent transactions, budgets) if using a database.
    - Outline the API endpoints.

2. **Set Up & Initialize**
    - Create a new React app using Vite.
    - Initialize your chosen back-end project (Node.js/Express, Python/Django, etc.).
    - Set up basic routes for authentication and transactions.

3. **Implement Authentication**
    - Build Sign Up and Login pages in React.
    - Implement the corresponding back-end endpoints.

4. **Transaction CRUD**
    - Develop the UI for listing, adding, and deleting transactions.
    - Integrate the back-end routes for data persistence.

5. **Dashboards & Summaries**
    - Display total incomes, expenses, and net balance on the main page.
    - Provide basic feedback to users on their spending status.

6. **Polish & UX Improvements**
    - Add validation, success/error messages, and basic styling.
    - Improve the layout and user experience.

7. **Optional Intermediate Upgrades**
    - Implement advanced features like recurring transactions, category budgets, or data analytics.

8. **Testing & Documentation**
    - Optionally write tests to ensure stability.
    - Provide a comprehensive README with setup and usage instructions.

---

## **Final Notes**

This personal finance tracker project is an excellent way to learn full-stack development fundamentals. It touches on user authentication, basic data management, and communication between a React front end and a separate back end. By incorporating optional features, you can extend the project to intermediate complexity, exploring topics like analytics, category-based budgeting, and even multi-currency support.

Good luck building your personal finance app!
