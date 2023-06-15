import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectRow from "../components/ProjectRow";
import AddModal from "../components/AddModal";
import useApi from "../services/useApi";
import { useUser } from "../contexts/userContext";

import "../styles/Admin.css";

export default function Admin() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const api = useApi();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projects, setProjects] = useState([]);

  const [reloadProjects, setReloadProjects] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");

    api
      .get(`/projects`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reloadProjects]);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    api.delete(`/projects/${id}`).then(() => {
      setReloadProjects((prev) => !prev);
    });
  };

  const handleLogout = () => {
    api.defaults.headers.authorization = "";
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="admin">
      {user && (
        <div className="admin-rows">
          <header>
            <h1>Projects</h1>
            <button type="button" onClick={handleAdd}>
              Ajouter
            </button>
          </header>
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                handleDelete={handleDelete}
              />
            ))}
          <button
            className="logout-button"
            onClick={handleLogout}
            type="button"
          >
            Déconnexion
          </button>

          {isModalOpen && (
            <AddModal
              setIsModalOpen={setIsModalOpen}
              setReloadProjects={setReloadProjects}
            />
          )}
        </div>
      )}
    </div>
  );
}
