import React, {useState, useEffect} from 'react';
import './styles.css';

function Input({onSubmit}) {
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  
  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      title,
      owner,
    });

    setTitle('');
    setOwner('');
  }

  return(
    <div className="form-style-8">
      <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="title"/>
              <input 
                name="title" 
                id="title" 
                type="text"
                required
                placeholder = "Nome do seu projeto" 
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="owner"/>
              <input 
                name="owner" 
                id="owner"
                type="text" 
                required
                placeholder = "Autor do projeto"
                value={owner}
                onChange={e => setOwner(e.target.value)}
              />
            </div>
            <input type="submit" value="Salvar"/>
          </form>
        </div>
  )
}

export default Input;