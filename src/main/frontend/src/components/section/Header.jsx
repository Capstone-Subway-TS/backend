// Header.jsx

import React, { useState } from 'react';
import Logo from '../header/Logo';
import Menu from '../header/Menu';
import Sns from '../header/Sns';
import Dest from '../header/Dest';

import { IoMdMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const Header = () => {    
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    const toggleHeader = () => {
        setIsHeaderVisible(!isHeaderVisible);
    };

    const closeHeader = () => {
        if (isHeaderVisible) {
            setIsHeaderVisible(false);
        }
    };

    return (
        <div className="header-container">
            <div className="hcc">
                <button className="toggle-button" onClick={toggleHeader}>{isHeaderVisible ? <IoCloseOutline/> : <IoMdMenu/>}</button>
            </div>
            
            
            
            
            <header id='header' className={isHeaderVisible ? '' : 'hidden'} role='banner' onClick={closeHeader}>
                <Logo />
                <Dest />
                <Menu />
                <Sns />
            </header>
            
        </div>
    );
};

export default Header;
