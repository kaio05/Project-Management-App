/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from '../components/Button'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { env } from '../env';
import { Link } from 'react-router-dom';

function Projects() {
  const [data, setData] = useState([{id: '', name: '', resources: [{}]}]);
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

  const projectElements = data.map(project => (
    <div key={project.id}>
      <div>{project.name}</div>
      <Link to={`/projects/${project.id}`}>view</Link>
    </div>
  ))

  return (
    <>
      <Button redirect='/' title='Home' />
      <div className='projects'>
        <div>{projectElements}</div>
      </div>
    </>
  )
}

export default Projects;
