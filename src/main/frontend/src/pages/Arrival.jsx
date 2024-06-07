import React, { useState, useEffect } from 'react';
import Main from '../components/section/Main';

const Arrival = () => {
    const [trainCongestion, setTrainCongestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainCongestion = async () => {
            try {
                const subwayLine = '2'; // 예시로 2호선을 사용하겠습니다.
                const trainNumber = '2312'; // 예시로 2312호 열차를 사용하겠습니다.

                const response = await fetch(`https://apis.openapi.sk.com/puzzle/subway/congestion/rltm/trains/${subwayLine}/${trainNumber}`, {
                    headers: {
                        'appkey': '5W2bkDqBrC4kWrij4ZizS5yuhe5U5mdI7bT3ZaGJ'
                    }
                });

                if (!response.ok) {
                    throw new Error('API 요청에 실패했습니다.');
                }

                const data = await response.json();
                setTrainCongestion(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainCongestion();
    }, []);

    return (
        <Main title="실시간 열차 혼잡도" description="실시간 열차 혼잡도 페이지">
            <h1>실시간 열차 혼잡도</h1>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : error ? (
                <p>오류가 발생했습니다: {error}</p>
            ) : (
                trainCongestion && trainCongestion.success ? (
                    <div>
                        <p>호선: {trainCongestion.data.subwayLine}</p>
                        <p>열차 번호: {trainCongestion.data.trainY}</p>
                        <p>열차 혼잡도: {trainCongestion.data.congestionResult.congestionTrain}</p>
                        <p>칸별 혼잡도: {trainCongestion.data.congestionResult.congestionCar}</p>
                    </div>
                ) : (
                    <p>열차 혼잡도 정보를 가져오지 못했습니다.</p>
                )
            )}
        </Main>
    );
};

export default Arrival;
