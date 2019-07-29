import React from "react";

function TechItem({ tech, index, onDelete }) {
  return (
    <li key={index}>
      {tech}
      <button type="button" onClick={onDelete}>
        Remover
      </button>
    </li>
  );
}

export default TechItem;
