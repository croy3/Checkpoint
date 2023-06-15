import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../services/useApi";

import "../styles/Project.css";

export default function Project() {
  const api = useApi();
  const { id } = useParams();

  const [project, setProject] = useState({});

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => {
      setProject(res.data);
    });
  }, [id]);
  return (
    <div>
      {Object.keys(project).length > 0 && (
        <div className="project">
          <h1>{project.name}</h1>
          <p>Date : {project.creation_date.split("T")[0]}</p>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
              project.image_address
            }`}
            alt=""
          />
          <p>{project.description}</p>
          <Link to="/">Retourner à l'accueil</Link>
        </div>
      )}
    </div>
  );
}
