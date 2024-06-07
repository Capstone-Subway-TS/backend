import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import Header from './Header'


const Main = ( props ) => {
    return (
        <HelmetProvider>
            <Helmet 
                titleTemplate="%s | 캡스톤디자인 TS" 
                defaultTitle="TS" 
                defer={false}
            >
                {props.title && <title>{props.title}</title>}
                <meta name="description" content={props.description} />
            </Helmet>

            <Header />

            <main id="main" role="main">
                {props.children}
            </main>
           
            
        </HelmetProvider>
    )
}

export default Main