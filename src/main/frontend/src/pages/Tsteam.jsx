
import React from 'react'
import Main from '../components/section/Main'

import photo1 from '../assets/img/tsteam/jaejun.PNG';
import photo2 from '../assets/img/tsteam/누끼1.png';
import photo3 from '../assets/img/tsteam/누끼2.png';
import photo4 from '../assets/img/tsteam/누끼3.png';

// 팀원 정보를 담은 배열
const teamMembers = [
    { name: '박종서', role: 'Backend', photo: photo4, bio: '컴퓨터공학과', link: 'https://example.com/member1' },
    { name: '정우철', role: 'AI', photo: photo2, bio: '데이터사이언스학과', link: 'https://example.com/member2' },
    { name: '손한승', role: 'Backend', photo: photo3, bio: '컴퓨터공학과', link: 'https://example.com/member3' },
    { name: '강재준', role: 'Frontend', photo: photo1, bio: '컴퓨터공학과', link: 'https://example.com/member4' }
];

const Tsteam = () => {
    return (
        <Main title="TS팀 구성" description="TS팀 구성 페이지">
            <div className="team-section">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <img src={member.photo} alt={member.name} />
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                        <p>{member.bio}</p>
                        {/*<a href={member.link} className="team-link" target="_blank" rel="noopener noreferrer">더보기</a>*/}
                    </div>
                ))}
            </div>
        </Main>
    );
}

export default Tsteam;

