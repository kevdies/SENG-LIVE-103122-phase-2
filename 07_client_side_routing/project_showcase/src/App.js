// Deliverable 2: Use Switch and Route to set up initial routes so we can 
// conditionally render components based on URL

  // - Import the `Switch` component from the `react-router-dom` library 
  // and wrap the components designated for routing

  // - Import the `Route` component from the `react-router-dom` library 
  // and wrap each individual component designated for routing

  //   - Provide the `path` prop to the `Route` component to create a URL 
  // path associated with the component

  // - Demonstrate each route in the browser to confirm desired expectation 
  // is occuring

  // - Demonstrate the use of the `exact` prop passed to the `Route` 
  // component

// React Router Imports
import { Switch, Route } from "react-router-dom";

import { useState, useEffect } from "react";

import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import ProjectEditForm from "./components/ProjectEditForm";
import ProjectDetail from "./components/ProjectDetail";
import Home from "./components/Home";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then((resp) => resp.json())
      .then((projects) => setProjects(projects));
  }, []);

  const onToggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };

  const onAddProject = (newProj) => {
    setProjects((projects) => [...projects, newProj]);
  };

  const onUpdateProject = (updatedProj) => {
    const updatedProjects = projects.map((ogProject) => {
      if (ogProject.id === updatedProj.id) {
        return updatedProj;
      } else {
        return ogProject;
      }
    });
    setProjects(updatedProjects);
  };

  const onDeleteProject = (deletedProj) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== deletedProj.id
    );
    setProjects(updatedProjects);
  };

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />

      <Switch>
        
        {/* Root Route (/) */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* ProjectEditForm Route (/projects/:id/edit) */}
        <Route path="/projects/:id/edit">
          <ProjectEditForm onUpdateProject={onUpdateProject} />
        </Route>
        
        {/* ProjectForm Route (/projects/add) */}
        <Route path="/projects/new">
          <ProjectForm onAddProject={onAddProject} />
        </Route>
        
        {/* Project Detail Route (/projects/:id) */}
        <Route path="/projects/:id">
          <ProjectDetail />
        </Route>
        
        {/* ProjectList Route (/projects) */}
        <Route path="/projects">
          <ProjectList
            projects={projects}
            onDeleteProject={onDeleteProject}
          />
        </Route>
      </ Switch>
    </div>
  );
};

export default App;
