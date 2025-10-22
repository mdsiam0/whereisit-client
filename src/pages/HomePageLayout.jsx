import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePageLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar></Navbar>
            <main className="flex-grow">
            <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default HomePageLayout;
