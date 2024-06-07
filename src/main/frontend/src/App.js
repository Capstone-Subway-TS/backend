import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/section/Main';
import { Provider } from 'react-redux';
import store from './data/store'; // Redux store 불러오기

const Login = lazy(() => import('./pages/Login'));
const Nav = lazy(() => import('./pages/Nav'));
const Tsteam = lazy(() => import('./pages/Tsteam'));
const Map = lazy(() => import('./pages/Map'));
const Signup = lazy(() => import('./pages/Signup'));
const Routemap = lazy(() => import('./pages/Routemap'));
const Pre = lazy(() => import('./pages/Pre'));

const App = () => {
    return (
        <Provider store={store}> {/* Redux Provider 추가 */}
            <Router>
                <Suspense fallback={<Main />}>
                    <Routes>
                        <Route path='/' element={<Map />} />
                        <Route path='/nav' element={<Nav />} />
                        <Route path='/tsteam' element={<Tsteam />} />
                        <Route path='/map' element={<Map />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/routemap' element={<Routemap />} />
                        <Route path='/pre' element={<Pre />} />
                    </Routes>
                </Suspense>
            </Router>
        </Provider>
    );
}

export default App;
