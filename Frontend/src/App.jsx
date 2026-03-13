// Frontend/src/App.jsx
import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { Toaster } from "react-hot-toast" // 🔥 Import Toaster here

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        {/* 🔥 Add Toaster here so it is available globally */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155'
            }
          }}
        />
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App