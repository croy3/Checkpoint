import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../services/useApi";
import ProjectBox from "../components/ProjectBox";

import "../styles/Home.css";

export default function Home() {
  const api = useApi();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get(`/projects`).then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <div className="home">
      <header>
        <h1>Camille Roy</h1>
        <h3>Portfolio</h3>
      </header>
      <div className="home-container">
        <div className="about">
          <h2>A Propos</h2>
          <p>
            Je suis une développeuse web et web mobile formée à la Wild Code
            School.
          </p>
          <div className="about-paragraphs">
            <div className="about-left">
              <p>
                J'ai une expertise en HTML, CSS, JavaScript, React et Express,
                ainsi qu'une solide maîtrise des bases de données, notamment
                MySQL.
              </p>
              <p>
                J'ai acquis une expérience en résolution de problèmes et en
                gestion de projet selon les méthodes Agile SCRUM.
              </p>
            </div>
            <div className="about-right">
              <p>
                Je crée des interfaces esthétiques, ergonomiques et
                performantes, en offrant une expérience utilisateur optimale.
              </p>
              <p>
                Je suis prête à apporter mes compétences pour concevoir des
                expériences numériques remarquables.
              </p>
            </div>
          </div>
        </div>
        <div className="projects">
          <h2>Mes Projets</h2>
          <div className="projects-list">
            {projects.length > 0 &&
              projects.map((project) => (
                <ProjectBox key={project.id} project={project} />
              ))}
          </div>
        </div>
        <div className="contact">
          <h2>Me Contacter</h2>
          <div className="contact-container">
            <ul>
              <li>
                <p>camille.roy@example.com</p>
              </li>
              <li>
                <p>06 01 02 03 04</p>
              </li>
              <li>
                <p>Camille Roy</p>
              </li>
            </ul>
            <form>
              <label>
                <p>E-mail</p>
                <input type="email" name="email" />
              </label>
              <label>
                <p>Objet</p>
                <input type="text" name="object" />
              </label>
              <label>
                <p>Message</p>
                <textarea name="message" />
              </label>
              <button type="button">Envoyer</button>
            </form>
          </div>
        </div>
        <Link to="/login">Espace Administrateur</Link>
      </div>
    </div>
  );
}
