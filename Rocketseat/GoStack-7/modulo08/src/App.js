import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [techs, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTech([...techs, newTech]);
    setNewTech('');
  }

  // Executa uma única vez, semelhante ao componentDidMount
  useEffect(() => {
    const localTechs = localStorage.getItem('techs');

    if (localTechs) {
      setTech(JSON.parse(localTechs));
    }

    // componentWillUnmount
    // return () => {}
  }, []);

  // Executa sempre que houver uma alteração no state techs
  // semelhante ao componentDidUpdate
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  const techSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <strong>Quantidade de tecnologias: {techSize}</strong>
      <br />
      <input
        type="text"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
