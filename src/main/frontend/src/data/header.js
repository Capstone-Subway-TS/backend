import { FaRegMap } from "react-icons/fa";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";
import { RiLoginCircleLine } from "react-icons/ri";
import { MdPersonalInjury } from "react-icons/md";
import { SiBeijingsubway } from "react-icons/si";
import { SlVector } from "react-icons/sl";
//


import { AiFillGithub } from "react-icons/ai";
import { AiOutlineCodepen } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

export const headerMenus = [
    {
        title: "로그인",
        icon: <RiLoginCircleLine />,
        src: "/login"
    },
    {
        title: "지도",
        icon: <FaRegMap />,
        src: "/map"
    },
    /*
    {
        title: "실시간 길찾기 (삭제)",
        icon: <IoNavigateCircleOutline />,
        src: "/nav"
    },

    {
        title: "실시간 도착정보 (삭제)",
        icon: <SiBeijingsubway />,
        src: "/live"
    },

    {
        title: "노선별 혼잡도 (삭제)",
        icon: <FaPeopleRoof />,
        src: "/arrival"
    },
    */
    {
        title: "지하철 노선도",
        icon: <SlVector />,
        src: "/routemap"
    },
    
    
    
   
];

export const searchKeyword = [
    {
        title: "TS팀 소개",
        src: "/tsteam"
    },
    
];

export const snsLink = [
    {
        title: "github",
        url: "https://github.com/Capstone-Subway-TS",
        icon: <AiFillGithub />
    },
]