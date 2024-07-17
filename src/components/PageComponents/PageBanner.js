import React from 'react';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { isNightMode } from '../Objects/theme';

const Banner = styled('div')(({ imgUrl }) => ({
    position: 'relative',
    width: '100%',
    height: '200px',
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
}));

const Text = styled('h1')(() => ({
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 10)',
}));

const SubText = styled('p')(() => ({
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '24px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 10)',
    textAlign: 'center',
}));

const Waves = styled('div')(() => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    return {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: isMobile ? '80px' : '150px',
        overflow: 'hidden',
        lineHeight: 0,
    };
});

const Wave = styled('svg')(({ speed }) => ({
    position: 'absolute',
    bottom: 0,
    width: '200%',
    height: '100%',
    transform: 'rotate(180deg)',
    left: 0,
    '& .wave': {
        animation: `moveWave ${speed}s linear infinite`,
    },
    '@keyframes moveWave': {
        '0%': {
            transform: 'translateX(0)',
        },
        '100%': {
            transform: 'translateX(-50%)',
        },
    },
}));

const HorizontalBar = styled('div')(({ waveColor }) => ({
    position: 'absolute',
    bottom: '-10px',
    width: '100%',
    height: '10px',
    background: `linear-gradient(to bottom, rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, 1), ${isNightMode() ? 'black' : 'white'})`,
}));

const PageBanner = ({ text, subtext, imgUrl, waveColor }) => {
    return (
        <Banner imgUrl={imgUrl}>
            <div>
                <Text>{text}</Text>
                <SubText>{subtext}</SubText>
            </div>
            
            <Waves>
                <Wave viewBox="0 0 600 120" preserveAspectRatio="none" speed={40}>
                    <path className="wave" d="M0,0 V46c48.7,22,102.5,22,151,0s102.5-22,151,0,102.5,22,151,0,102.5-22,151,0,102.5,22,151,0,102.5-22,151,0,102.5,22,151,0V0z" fill={`rgba(${waveColor.r+50}, ${waveColor.g+50}, ${waveColor.b+50}, 0.9)`} />
                </Wave>
                <Wave viewBox="0 0 600 120" preserveAspectRatio="none" speed={25}>
                    <path className="wave" d="M0,0 V46c48.7,22,102.5,22,151,0s102.5-22,151,0,102.5,22,151,0,102.5-22,151,0,102.5,22,151,0,102.5-22,151,0,102.5,22,151,0,102.5-22,151,0,102.5,22,151,0V0z" fill={`rgba(${waveColor.r+25}, ${waveColor.g+25}, ${waveColor.b+25}, 0.7)`} />
                </Wave>
                <Wave viewBox="0 0 600 120" preserveAspectRatio="none" speed={15}>
                    <path className="wave" d="M0,0 V46c48.7,22,102.5,22,151,0s102.5-22,151,0,102.5,22,151,0,102.5-22,151,0,102.5,22,151,0,102.5-22,151,0,102.5,22,151,0,102.5-22,151,0,102.5,22,151,0V0z" fill={`rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, 0.5)`} />
                </Wave>
            </Waves>
            <HorizontalBar waveColor={waveColor} />
        </Banner>
    );
};

export default PageBanner;
