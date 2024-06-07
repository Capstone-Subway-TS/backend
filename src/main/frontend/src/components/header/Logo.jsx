import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrainSubway } from "react-icons/fa6";


const Logo = () => {
    return (
        <h1 className='header__logo'>
            <Link to='/'>
            <span>subPick</span>
            </Link>
        </h1>
    )
}

export default Logo