
import { Outlet ,useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../components/Footer';
import { useEffect } from 'react';

const MainLayout = () => {

  const {pathname} = useLocation();

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  },[pathname])
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer autoClose={1500}  />

    </>
  )
}

export default MainLayout
