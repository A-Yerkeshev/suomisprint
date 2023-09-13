// Home.js
import '../styles/App.css';
import manInTheSenSquare from '../img/man-in-the-sen-square.png';

function Home() {
  return (
    <div className="home-container">
      <div className="left-section">
        <div className="welcome-text">Welcome</div>
        <div className="big-text">
          SuomiSprint<br />
          Online Finnish<br />
          courses
        </div>
        <div className="small-text">Learn Finnish online in small groups</div>
        <div className="two-buttons">
          <button className="coral-button">Join Us</button>
          <button className="blue-button">Learn More</button>
        </div>
      </div>
      <div className="right-section">
      <img src={manInTheSenSquare} alt="Man in the Sen Square" />
      </div>
    </div>
  );
}

export default Home;
