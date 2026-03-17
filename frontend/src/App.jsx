import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';

import AuthState from './context/auth/AuthState'
import UserState from './context/user/UserState'
import RoomState from './context/room/RoomState'
import DashboardLayout from './components/pages/dashboard/DashboardLayout'
import Login from './components/common/auth/Login'
import Register from './components/common/auth/Register';
import Home from './components/pages/home/Home'
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './components/pages/dashboard/pages/dashboard/Dashboard';
import Room from './components/pages/dashboard/pages/rooms/Room';
import Account from './components/pages/dashboard/pages/accounts/Account';
import RoomDetailPage from './components/pages/dashboard/pages/rooms/roomDetail/RoomDetailPage';



function App() {

  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#000000',
            fontSize: '16px',
            padding: '14px 18px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },

          success: {
            iconTheme: {
              primary: 'green',
              secondary: '#ffffff',
            },
          },

          error: {
            iconTheme: {
              primary: 'red',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </AppProvider>

  )
}

function AppProvider({ children }) {
  return (
    <RoomState>
      <UserState>
        <AuthState>
          {children}
        </AuthState>
      </UserState>
    </RoomState>

  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path='/dashboard'
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='room' element={<Room />} />
        <Route path='room/:roomId/room-detail-page' element={<RoomDetailPage />} />
        <Route path='account' element={<Account />} />
      </Route>


      <Route path='/*' element={<Home />} />
    </Routes>
  )
}



export default App  
