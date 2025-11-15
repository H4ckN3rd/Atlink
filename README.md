# AtLink - Smart Attendance Management System

AtLink is a modern, real-time dashboard for managing and tracking student attendance. Built with a robust and scalable tech stack, it provides administrators with instant insights into attendance data, user management capabilities, and a clean, responsive user interface.

The application is connected directly to a Firebase Realtime Database, ensuring that all data displayed is live and updates automatically without needing to refresh the page.

![AtLink Dashboard Screenshot](https://i.imgur.com/your-screenshot-url.png) <!-- It's a good idea to add a real screenshot here -->

## ✨ Key Features

- **Real-time Dashboard**: Get a live overview of today's attendance metrics, including present/absent counts and the overall attendance rate.
- **Attendance Overview**: A visual chart displays attendance trends over the last seven days.
- **Detailed Attendance Records**: A paginated and filterable data table to view all historical attendance records. You can filter by student, status (Present/Absent), and date.
- **User Management**: A complete list of all students in the system. You can easily search for students and add new ones via an RFID-based form.
- **Real-time Data Sync**: Powered by Firebase, the application reflects any changes in the database instantly.
- **Responsive Design**: The interface is fully responsive and works seamlessly on both desktop and mobile devices.
- **Light & Dark Mode**: Includes a theme toggler for user comfort.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Firebase Realtime Database](https://firebase.google.com/docs/database)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- `npm` or `yarn`

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/atlink.git
    cd atlink
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add your Firebase configuration details. It should look like this:

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
    NEXT_PUBLIC_FIREBASE_DATABASE_URL="your-database-url"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
    NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📁 Project Structure

-   `src/app/`: Contains the core application pages and layouts, following the Next.js App Router structure.
-   `src/components/`: Shared UI components, including `shadcn/ui` components and custom application components.
-   `src/lib/`: Includes utility functions, Firebase configuration (`firebase.ts`), and type definitions (`types.ts`).
-   `src/hooks/`: Custom React hooks, such as `use-toast.ts`.
-   `.env.local`: Stores environment variables for Firebase configuration (must be created manually).
-   `public/`: Static assets.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
