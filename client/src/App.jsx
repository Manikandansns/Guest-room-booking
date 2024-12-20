import './App.css'
// import AppRoutes from './routes'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLoginPage from './pages/admin/auth/LoginPage';
import AdminSignUpPage from './pages/admin/auth/SignUpPage';
// import HomePage from './pages/HomePage';
import UserLoginPage from './pages/user/auth/LoginPage';
import UserSignUpPage from './pages/user/auth/SignUpPage';
import CompanyPage from './pages/admin/CompanyPage';
import RegisterRoom from './pages/admin/RegisterRoomPage';
import ValidationPage from './pages/ValidationPage';
import HomePage from './pages/homepage/HomePage';
import SingleCardPage from './pages/singlecardpage/SingleCardPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import RoomForm from './pages/admin/RoomForm';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './pages/FavoritesContext';
import FloatingButton from './components/floating/Floating';
function App() {

  return (
    <>
    <FavoritesProvider>
    <BrowserRouter>
    <FloatingButton/>
            <Routes>                
                <Route path="/" element={<ValidationPage/>} />

                <Route path="/admin-login" element={<AdminLoginPage />} />
                <Route path="/admin-register" element={<AdminSignUpPage />} />

                <Route path="/user-login" element={<UserLoginPage/> } />
                <Route path="/user-register" element={<UserSignUpPage/> } />

                <Route path="/company" element={<CompanyPage/> } />
                <Route path="/room" element={<RegisterRoom/> } />    

                <Route path="/homepage" element={<HomePage/> } />           
                <Route path="/singlecard" element={<SingleCardPage/> } />   
                <Route path="/room/:id" element={<SingleCardPage />} />

                <Route path="/admin/dashboard" element={<AdminDashboard/>} />
                <Route path="/admin/add-room" element={<RoomForm/>} />
                <Route path="/admin/edit-room/:id" element={<RoomForm />} />

                <Route path="/cart" element={<CartPage/>} />
                <Route path="/favorites" element={<FavoritesPage/>} />
            </Routes>
        </BrowserRouter>
        </FavoritesProvider>
    </>
  )
}

export default App
