import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/global.scss"; //'./style.scss'
import Common from '../../components/Common.jsx';

const Home = () => {
  return (
    <nav>
      <Link to="/generator">
          <div style={{color: 'blue',marginTop:"200px",textAlign:"center"}}>GENERATOR</div>
      </Link>
      <Common />
    </nav>
  )
}

export default Home
