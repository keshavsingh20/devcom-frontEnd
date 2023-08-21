import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import SignUp from './pages/register/SignUp';
import { useSelector } from 'react-redux';
import Footer from './components/footer/Footer';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import Reset from './pages/resetPassword/Reset';
import Forgot from './pages/forgotPassword/Forgot';
import Chat from './pages/chat/Chat';
import ConnectionSuggestions from './pages/connSuggestions/ConnectionSuggestions';
import Connections from './pages/connections/Connections';
import EditProfile from './pages/editPorfile/EditProfile';

function App() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes >
            {/* <Route path='/' element={user?.other?.verified === true ? <Home /> : <Login />} /> */}
            <Route path='/' element={user?.other?.verified === true ? <Home /> : <Navigate to={'/login'} replace={true}/>} />
            <Route path='/profile/:id' element={user?.other?.verified === true ? <Profile /> : <Navigate to={'/login'} replace={true}/>} />
            {/* <Route path='/login' element={user !== null ? <Navigate to={"/"} /> : <Login />} />
            <Route path='/signup' element={user !== null ? <Navigate to={"/"} /> : <SignUp />} /> */}
             <Route path='/login' element={ user?.other?.verified === true ? <Navigate to={'/'} replace={true}/> : <Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path="/verify/email" element={user?.status === 'Pending' ? <VerifyEmail /> : user?.other?.verifed === true ? <Navigate to={"/"} replace={true} /> : <Navigate to={"/login"} replace={true}/>}></Route>
            <Route path="/forgot/password" element={<Forgot />}></Route>
            <Route path="/reset/password" element={<Reset />}></Route>
            <Route path="/chat" element={user?.other?.verified === true ? <Chat /> : <Navigate to={'/login'} replace={true}/>}></Route>
            <Route path="/suggestions" element={user?.other?.verified === true ? <ConnectionSuggestions /> : <Navigate to={'/login'} replace={true}/>}></Route>
            <Route path="/connections" element={user?.other?.verified === true ? <Connections /> : <Navigate to={'/login'} replace={true}/>}></Route>
            <Route path="/edit/profile/:id" element={user?.other?.verified === true ? <EditProfile /> : <Navigate to={'/login'} replace={true}/>}></Route>
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </>
  );
}

export default App;
