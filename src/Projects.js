import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub } from 'react-icons/fa';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px; 
`;

const RepoCard = styled.a`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column; 
  transition: transform 0.3s;
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${(props) => props.delay || '0s'};

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin: 8px; 
  }

  @media (max-width: 480px) {
    padding: 10px; 
    font-size: 0.9rem; 
  }
`;

const Description = styled.p`
  margin: 5px 0 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8); 

  @media (max-width: 480px) {
    font-size: 0.9rem; 
  }
`;

const Projects = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const username = 'kroxlycode';
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <Container>
      {repos.map(repo => (
        <RepoCard key={repo.id} href={repo.html_url} target="_blank">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaGithub size={24} />
            <span>{repo.name}</span>
          </div>
          {repo.description && <Description>{repo.description}</Description>} {/* Show description */}
        </RepoCard>
      ))}
    </Container>
  );
};

export default Projects;
