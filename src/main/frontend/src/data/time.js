export const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('ko-KR');
}

export const getDayType = () => {
    const now = new Date();
    const day = now.getDay();
    return day === 0 || day === 6 ? '휴일' : '평일'; // 0: Sunday, 6: Saturday
}