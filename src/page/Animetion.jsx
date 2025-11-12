import React, { useState, useEffect, useCallback } from 'react';
import footballImg from '../img/football.jpg';
import wood from '../img/wood.jpg';
import basketballImg from '../img/basketball.png';
import voleyImg from '../img/voley.jpg';
import humanImg from '../img/me.jpg';
import toonImg from '../img/son-of-muyeo.jpg';
import logoImg from '../img/logo.jpg';

const FIELD_WIDTH = 650;
const FIELD_HEIGHT = 400;
const BALL_DIAMETER = 150;
const VX = 10;
const VY = 10;
const FRAME_RATE_MS = 25;

const MAX_X = FIELD_WIDTH - BALL_DIAMETER - 2;
const MAX_Y = FIELD_HEIGHT - BALL_DIAMETER - 2;

const IMAGE_PATHS = {
  basketball: basketballImg,
  football: footballImg,
  voley: voleyImg,
  human: humanImg,
  toon: toonImg,
  logo: logoImg,
};

const BUTTON_MAP = [
  { id: 'none', label: 'None', key: '0' },
  { id: 'basketball', label: 'basketball', key: '1' },
  { id: 'football', label: 'football', key: '2' },
  { id: 'voley', label: 'voleyball', key: '3' },
  { id: 'human', label: 'human', key: '4' },
  { id: 'toon', label: 'cartoon', key: '5' },
  { id: 'logo', label: 'logo', key: '6' },
];

const Animation = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(false);
  const [lastSelected, setLastSelected] = useState('none');

  const ballStyle = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${BALL_DIAMETER}px`,
    height: `${BALL_DIAMETER}px`,
    backgroundColor: lastSelected === 'none' ? 'lightgray' : '',
    backgroundImage: lastSelected !== 'none' ? `url(${IMAGE_PATHS[lastSelected]})` : 'none',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
  };

  const fieldStyle = {
    width: `${FIELD_WIDTH}px`,
    height: `${FIELD_HEIGHT}px`,
    position: 'relative',
    backgroundImage: `url(${wood})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 auto',
    border: '2px solid #333',
    borderRadius: '10px',
  };

  const calculate = useCallback(() => {
    setX(prevX => {
      let newX = goRight ? prevX + VX : prevX - VX;
      if (goRight && newX >= MAX_X) { newX = MAX_X; setGoRight(false); }
      if (!goRight && newX <= 0) { newX = 0; setGoRight(true); }
      return newX;
    });

    setY(prevY => {
      let newY = goDown ? prevY + VY : prevY - VY;
      if (goDown && newY >= MAX_Y) { newY = MAX_Y; setGoDown(false); }
      if (!goDown && newY <= 0) { newY = 0; setGoDown(true); }
      return newY;
    });
  }, [goRight, goDown]);

  const runClick = () => setRunning(prev => !prev);
  const handleBallClick = id => setLastSelected(id);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(calculate, FRAME_RATE_MS);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [running, calculate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newId = null;
      switch(event.key){
        case ' ': event.preventDefault(); runClick(); break;
        case '0': newId='none'; break;
        case '1': newId='basketball'; break;
        case '2': newId='football'; break;
        case '3': newId='voley'; break;
        case '4': newId='human'; break;
        case '5': newId='toon'; break;
        case '6': newId='logo'; break;
        default: return;
      }
      if(newId) handleBallClick(newId);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getButtonClass = (id) => {
    if(id==='none') return id===lastSelected ? 'btn-secondary' : 'btn-outline-secondary';
    return id===lastSelected ? 'btn-primary' : 'btn-outline-primary';
  };

  return (
    <div className="container mt-5">
      {/* Field (พื้นหลังรูป) */}
      <div id="field" style={fieldStyle}>
        <div id="ball" style={ballStyle}></div>
      </div>

      {/* Controls (พื้นหลังขาว) */}
      <div
        className="  rounded-3 p-3 mt-3"
        style={{ backgroundColor: 'white' }}
      >
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <button
            id="run"
            onClick={runClick}
            className={`btn ${running ? 'btn-warning' : 'btn-success'}`}
          >
            <span className="bi bi-play"></span>&nbsp;{running ? 'pause' : 'run'}
          </button>

          <div className="d-flex flex-wrap gap-2">
            {BUTTON_MAP.map(btn => (
              <button
                key={btn.id}
                id={btn.id}
                className={`btn ${getButtonClass(btn.id)}`}
                onClick={() => handleBallClick(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
