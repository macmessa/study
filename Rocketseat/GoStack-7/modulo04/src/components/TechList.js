import React, { Component } from "react";
import PropTypes from "prop-types";

import TechItem from "./TechItem";

class TechList extends Component {
  static defaultProps = {
    techList: []
  };

  static propTypes = {
    techList: PropTypes.array
  };

  state = {
    newTech: "",
    techs: this.props.techList
  };

  // Executado assim que o componente aparece em tela
  componentDidMount() {
    const techs =
      JSON.parse(localStorage.getItem("techs")) || this.props.techList;

    this.setState({ techs });
  }

  // Executado sempre que houver alterações nas props ou estado
  // Parâmetros: prevProps, prevState
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = techKey => {
    this.setState({
      techs: this.state.techs.filter((tech, index) => index !== techKey)
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <ul>
            {this.state.techs.map((tech, index) => (
              <TechItem
                key={index}
                tech={tech}
                onDelete={() => this.handleDelete(index)}
              />
            ))}
          </ul>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={this.state.newTech}
          />
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  }
}

export default TechList;
