/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from '../components/Button'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { env } from '../env';

function Projects() {
  const [data, setData] = useState([{id: '', name: ''}]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get(`${env.VITE_REACT_APP_BASE_URL}:${env.VITE_REACT_APP_PORT}/projects/`)
      .then(response => {
        setData([...response.data.projects]);
      })
      .catch(err => {
        setError(err);
        console.log(error)
      });
  }, []);

  const projectElements = data.map(project => <li>{project.name}</li>)

  return (
    <>
      <Button redirect='/' title='Home' />
      <div className='projects'>
        <ul>{projectElements}</ul>
      </div>
    </>
  )
}

export default Projects;
