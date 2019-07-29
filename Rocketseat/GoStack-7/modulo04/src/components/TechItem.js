import React from "react";
import PropTypes from "prop-types";

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

TechItem.defaultProps = {
  tech: "Sample Tech",
  index: 0
};

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};

export default TechItem;
