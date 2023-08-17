import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/authform/Login';
import { Signup } from './components/authform/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import {store} from "./store/store"
import { Dashboard } from './components/dashboard/Dashboard';
import { Navbar } from './components/Navbar/Navbar';
import { ServerAndFileContextProvider } from './context/ServerAndFileContext';
import { Home } from './components/home/Home';
import { Logout } from './components/authform/Logout';
import { ForgotPassword } from './components/forgotPassword/ForgotPassword';

function App() {

    return (
        <div className='root-app' >
        <Provider store={store}>
        <ServerAndFileContextProvider>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route index={true} path="/" element={<Home/>}></Route>
                <Route path="/signup" element={<Signup/>} ></Route>
                <Route path="/login" element={<Login/>} ></Route>
                <Route path="/logout" element={<Logout/>} ></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/forgot-password" element={ <ForgotPassword/> } ></Route>
            </Routes>
        </BrowserRouter>
        </ServerAndFileContextProvider>
        <ToastContainer/>
        </Provider>
        </div>
    );
}
export default App;