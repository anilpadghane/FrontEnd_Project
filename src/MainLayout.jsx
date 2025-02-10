import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Navbar from "./component/Navbar";
import PopUpCard from "./component/PopUpCard";
import MiddleImg from "./component/MiddleImg";
import ItemSection from "./component/ItemSection";
import TwoImage from "./component/TwoImage";
import CarouselTwo from "./component/CarouselTwo";
import Vendor from "./component/Vendor";
import ServiceCard from "./component/ServiceCard";
import Blogg from "./component/Blogg";
import DiscoverItem from "./component/DiscoverItem";
import EmailImg from "./component/EmailImg";
import Footer from "./component/Footer";
// import MiddleImg from "./component/MiddleImg";

const MainLayout = () => {
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Show these components ONLY on the Home page */}
      {location.pathname === "/" && (
        <>
          <Header />
          <Navbar />
          <PopUpCard />
          
        </>
      )}

      {/* Renders the current page content for all routes */}
      <Outlet />
      <MiddleImg/>
      <ItemSection/>
      <TwoImage/>
      <CarouselTwo/>
      <Vendor/>
      <ServiceCard/>
      <Blogg/>
      <DiscoverItem/>
      <EmailImg/>
      <Footer/>
    </>
  );
};

export default MainLayout;
