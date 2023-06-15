import { useState, useRef } from "react";
import PropTypes from "prop-types";
import useApi from "../services/useApi";

import "../styles/AddModal.css";

export default function AddModal({ setIsModalOpen, setReloadProjects }) {
  const api = useApi();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const inputRef = useRef();

  const resetForm = () => {
    setName("");
    setDescription("");
    setDate("");
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };

  const handleDateInput = (e) => {
    setDate(e.target.value);
  };

  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", inputRef.current.files[0]);

    api.post("/image", formData).then((res) => {
      api.post("/projects", {
        name,
        description,
        creation_date: date,
        image_address: res.data.filename,
      });
      resetForm();
      setIsModalOpen(false);
      setReloadProjects((prev) => !prev);
    });
  };

  return (
    <div className="add-modal">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <h2>Nouveau Projet</h2>
        <label>
          Nom
          <input
            type="text"
            name="name"
            onChange={handleNameInput}
            value={name}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            onChange={handleDescriptionInput}
            value={description}
          />
        </label>
        <label>
          Date
          <input
            type="date"
            name="date"
            onChange={handleDateInput}
            value={date}
          />
        </label>
        <label>
          Image (Format acceptés : JPEG, PNG)
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
        </label>
        <button type="button" onClick={handleCancel}>
          Annuler
        </button>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

AddModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  setReloadProjects: PropTypes.func.isRequired,
};
