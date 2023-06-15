import PropTypes from "prop-types";

import "../styles/ProjectRow.css";

export default function ProjectRow({ project, handleDelete }) {
  return (
    <div className="project-row">
      {project && (
        <>
          <p>{project.name}</p>
          <button onClick={() => handleDelete(project.id)} type="button">
            Supprimer
          </button>
        </>
      )}
    </div>
  );
}

ProjectRow.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
