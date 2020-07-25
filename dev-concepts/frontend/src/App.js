import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Input from './components/Input/Input';
import Output from './components/Output/Output';
import './App.css';
import api from './services/api';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject(data){      
        const response = await api.post('projects', data);
        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
        <>
            <Input onSubmit={handleAddProject}/>
            <ul>
                {projects.map(project => (
                    <Output key={project.id} project={project} /> 
                ))}
            </ul>
        </>
    );
}

export default App;