import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';

import PublicLayout from './components/layout/PublicLayout';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import PrivateLayout from './components/layout/PrivateLayout';
import NotFound from './components/common/NotFound';

import { privateRoutes, publicRoutes } from './routes/routeConfig';


function App() {
  return (
    <>
      <AppRoutes />

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
    </>
  )
}



function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PublicRoute>{route.element}</PublicRoute>}
            />
          ))}
        </Route>

        {/* Private routes  */}
        <Route
          element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}


export default App  
