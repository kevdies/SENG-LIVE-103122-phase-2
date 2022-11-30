// Deliverable 1: Submit the edit project form and 
// make a PATCH request

  // DONE - Update the `useEffect` inside the `ProjectEditForm` 
  // component so that the side effect will run upon 
  // `projectId` updates

  // DONE - Inside of the `ProjectEditForm` component, update 
  // `handleSubmit` to include a `PATCH` request

  // DONE - Include the updated state values in the `PATCH` 
  // request

  // DONE - Update the `projects` state in the parent 
  // component `App` using the `.map` function

    // The goal is to return a new array with the 
    // original project excluded and the newly updated 
    // project included. (Swapped Out)

  // NOT NECESSARY - Reset the edit form after submission is complete

import { useState, useEffect } from "react";

const ProjectEditForm = ({ projectId, completeEditing, handleUpdate }) => {
  const initialState = {
    name: "",
    about: "",
    phase: "",
    link: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { name, about, phase, link, image } = formData;

  useEffect(() => {
    fetch(`http://localhost:4000/projects/${projectId}`)
      .then((res) => res.json())
      .then((project) => setFormData(project));
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Two Tasks:
    // Update State
    // Update Data

  function handleSubmit(e) {
    
    // Still Want to Prevent Page Refresh (Default Behavior)
    e.preventDefault();
    

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    // Update projects Data
    fetch(`http://localhost:4000/projects/${projectId}`, configObj)
      .then((resp) => resp.json())
      .then((updatedProject) => {
        
        // console.log(project);

        // Update projects State - Pessimistically
        handleUpdate(updatedProject);
        
        setFormData({
          name: "",
          about: "",
          phase: "",
          link: "",
          image: "",
        });
      });
    
    // Add code here
    completeEditing();

    // setFormData(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="form" autoComplete="off">
      <h3>Edit Project</h3>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleChange}
      />

      <label htmlFor="about">About</label>
      <textarea id="about" name="about" value={about} onChange={handleChange} />

      <label htmlFor="phase">Phase</label>
      <select name="phase" id="phase" value={phase} onChange={handleChange}>
        <option value="1">Phase 1</option>
        <option value="2">Phase 2</option>
        <option value="3">Phase 3</option>
        <option value="4">Phase 4</option>
        <option value="5">Phase 5</option>
      </select>

      <label htmlFor="link">Project Homepage</label>
      <input
        type="text"
        id="link"
        name="link"
        value={link}
        onChange={handleChange}
      />

      <label htmlFor="image">Screenshot</label>
      <input
        type="text"
        id="image"
        name="image"
        value={image}
        onChange={handleChange}
      />

      <button type="submit">Update Project</button>
    </form>
  );
};

export default ProjectEditForm;