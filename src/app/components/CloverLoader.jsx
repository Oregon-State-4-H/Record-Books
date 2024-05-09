import styled, { keyframes } from 'styled-components';
import logo from '@/app/assets/4hlogorgb.png'; // Import your PNG image
import Image from 'next/image';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;


export const Loader = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0);
  border-top: 0.2em solid #FFFFFF;
  border-radius: 50%;
    width: 100%;
    height: 100%;
  animation: ${spin} 1.0s linear infinite;
`;

/**
 * Custom 4-H Clover loader
 * @returns {JSX.Element}
 */
export function CloverLoader() {
    return (
        <div style={{position: 'relative',width: '100px', height: '100px', marginTop: '30px'}}>
            <Image src={logo} alt="4-H Clover" style={{padding: '10px', objectFit: 'contain'}} fill />
            <Loader style={{borderTop: '0.2em solid #D73F09'}} />
        </div>
    )
}

export default CloverLoader;