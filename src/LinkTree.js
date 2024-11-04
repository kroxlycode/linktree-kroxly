import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaYoutube, FaLink, FaGithub, FaCopy } from 'react-icons/fa';
import Spotify from './Spotify';
import Projects from './Projects';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
  background-color: rgb(0, 0, 0);
  height: 100vh;
  color: rgb(240, 240, 240);
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: Verdana, Tahoma, sans-serif;
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  z-index: 1;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Tab = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 1.2rem;
  transition: border-bottom 0.3s;
  border-bottom: 2px solid transparent;

  &.active {
    border-bottom: 2px solid white;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const LinkButton = styled.a`
  border: 1px solid white;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.2rem;
  width: 100%; 
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${(props) => props.delay || '0s'};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1rem; 
    padding: 8px 16px;
  }
`;

const CopyButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-left: 10px;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 

  @media (max-width: 768px) {
    padding: 0 10px; 
  }
`;

const StyledSpotifyContainer = styled.div`
  width: 550px;
  height: 450px;
  margin-bottom: 10px;
  opacity: 0;
  animation: ${fadeUp} 0.5s forwards;
  animation-delay: 0.8s; 

  @media (max-width: 768px) {
  width: 350px
  }
`;

const LinkTree = () => {
  const [activeTab, setActiveTab] = useState('links'); 

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <Container>
      <br></br>
      <Avatar src="https://efwlxc.babyworldnatural.com/uploads/kroxly.jpg" alt="Kroxly's Avatar" />
      <Title>Kroxly</Title>

      {/* Tab Menu */}
      <TabMenu>
        <Tab className={activeTab === 'links' ? 'active' : ''} onClick={() => setActiveTab('links')}>Links</Tab>
        <Tab className={activeTab === 'spotify' ? 'active' : ''} onClick={() => setActiveTab('spotify')}>Music</Tab>
        <Tab className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Projects</Tab>
      </TabMenu>

      <StyledButtonContainer>
        {activeTab === 'links' && (
          <>
            <LinkButton href="https://kroxly.xyz" target='_blank' delay="0.2s">
              <FaLink size={24} />
              <span style={{ flex: 1, textAlign: 'center' }}>Website</span>
              <CopyButton onClick={() => handleCopy('https://kroxly.xyz')}>
                <FaCopy size={20} />
              </CopyButton>
            </LinkButton>
            <LinkButton href="https://youtube.com/@kroxlycode" target='_blank' delay="0.4s">
              <FaYoutube size={24} />
              <span style={{ flex: 1, textAlign: 'center' }}>Youtube</span>
              <CopyButton onClick={() => handleCopy('https://youtube.com/@kroxlycode')}>
                <FaCopy size={20} />
              </CopyButton>
            </LinkButton>
            <LinkButton href="https://github.com/kroxlycode" target='_blank' delay="0.6s">
              <FaGithub size={24} />
              <span style={{ flex: 1, textAlign: 'center' }}>GitHub</span>
              <CopyButton onClick={() => handleCopy('https://github.com/kroxlycode')}>
                <FaCopy size={20} />
              </CopyButton>
            </LinkButton>
          </>
        )}
      </StyledButtonContainer>
      {activeTab === 'spotify' && (
        <StyledSpotifyContainer>
          <Spotify />
        </StyledSpotifyContainer>
      )}
      {activeTab === 'projects' && (
        <Projects />
      )}
    </Container>
  );
};

export default LinkTree;
