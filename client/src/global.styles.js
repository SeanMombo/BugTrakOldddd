import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {

        font-family: 'Open Sans Condensed';
        padding: 0px 0px;
        
        @media screen and (max-width: 800px) {
            padding: 10px;
        }
    }

    a {
        text-decoration: none;
        color: black;
    }

    * {
        box-sizing: border-box;
    }
    
    .pageWrapper {
        
        /* padding:16px; */
        margin-left:260px;  
        /* width: calc(100vw-260px);  */
        overflow-x: auto;
    }
    
`;