/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { env } from '../env';
import Button from '../components/Button';

function Project() {
    const { handle } = useParams()
    const [project, setProject] = useState({id: '', name: ''});
    useEffect(() => {
        axios.get(`${env.VITE_REACT_APP_BASE_URL}:${env.VITE_REACT_APP_PORT}/projects/${handle}`)
        .then(response => {
            setProject(response.data.project);
        })
    }, [handle]);

    const [resources, setResources] = useState([{id: '', name: '', amount: 0, project_id: ''}]);
    useEffect(() => {
        axios.get(`${env.VITE_REACT_APP_BASE_URL}:${env.VITE_REACT_APP_PORT}/projects/${handle}/resources`)
        .then(response => {
            setResources(response.data.resources);
        })
    }, [handle]);

    const {name} = project;
    
    const projectResources = resources.map(resource => (
        <div key={resource.id} className='resource'>
          <span>{resource.name}</span>
          <span>{resource.amount}</span>
        </div>
      ))

    const [components, setComponents] = useState([{id: '', name: '', email: '', project_id: ''}]);
    useEffect(() => {
        axios.get(`${env.VITE_REACT_APP_BASE_URL}:${env.VITE_REACT_APP_PORT}/projects/${handle}/components`)
        .then(response => {
            setComponents(response.data.components);
        })
    }, [handle]);

    const projectComponents = components.map(component => (
        <div key={component.id} className='resource'>
          <span>{component.name}</span>
          <span>{component.email}</span>
        </div>
    ))

    return (
        <>
            <h1>{name}</h1>
            <div>
                {projectResources}
            </div>
            <div>
                {projectComponents}
            </div>
            <Button redirect='/projects' title='Return' />
        </>
    )
}

export default Project