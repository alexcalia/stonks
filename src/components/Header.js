import React, {useState} from 'react';

const Header = ({day, setSpeed}) => {

  const [active, setActive] = useState("one");

  const handleClick = (e) => {
    if (e.target.value === "one") {
      setActive("one");
    } else if (e.target.value === "two") {
      setActive("two");
    } else if (e.target.value === "four") {
      setActive("four");
    }
  }

  return ( 
    <div className="header">
      <div className="wrapper">
        <h1>Stonks</h1>
        
        <div className="speedChoices">
          <p>Speed:</p>
          <button className={active === "one" ? "speedActive" : "speedBtn"} onClick={(e)=> {setSpeed(60000); handleClick(e)}} value="one">1x</button>
          <button className={active === "two" ? "speedActive" : "speedBtn"} onClick={(e)=> {setSpeed(30000); handleClick(e)}} value="two">2x</button>
          <button className={active === "four" ? "speedActive" : "speedBtn"} onClick={(e)=> {setSpeed(15000); handleClick(e)}} value="four">4x</button>
        </div>
        <p className="dayHeader">Day: {day}</p>
        <button className="restartButton" onClick={() => window.location.reload()}>Restart</button>
      </div>
    </div>
  );
}

export default Header;