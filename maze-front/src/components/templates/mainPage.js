import React, {useState, useEffect} from 'react';

import Menu from '../organisms/menu';
import Grid from '../organisms/grid';

export default function MainPage() {

  const [matrix, setMatrix] = useState([]);
  const [size, setSize] = useState(21); 

  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      size:size,
      showSteps:true
    })
  }

  const buildLabyrinth = async () => {
    const data = await fetch('http://localhost:3000/initGrid', request);
    let tensor = await data.json();
    if(JSON.parse(request.body).showSteps){
      for(const matrix of tensor){
        setMatrix(matrix);
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/initGrid', request);
      setMatrix(await data.json());
    }
    fetchData().catch(err => console.log(err));
    return () => {};
    }, []);

  return (
    <div className='container'>
      <Menu size={size} setSize={setSize} onSendRequest={buildLabyrinth}/>
      <Grid matrix={matrix}/>
    </div>
  );
}
