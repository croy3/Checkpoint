import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../styles/ProjectBox.css";

export default function ProjectBox({ project }) {
  return (
    <div className="project-box">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
          project.image_address
        }`}
        alt=""
      />
      <h2>{project.name}</h2>
      <Link to={`/projects/${project.id}`}>
        <button className="access-button" type="button">
          Accéder au projet
        </button>
      </Link>
    </div>
  );
}

ProjectBox.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_address: PropTypes.string.isRequired,
  }).isRequired,
};
