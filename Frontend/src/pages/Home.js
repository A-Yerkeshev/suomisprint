// Home.js
import '../styles/App.css';
import manInTheSenSquare from '../img/man-in-the-sen-square.png';
import womanImage from '../img/woman-image.JPG';
import Button from '../components/Button';

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
          <Button color="coral" text="Join Us" />
          <Button color="blue" text="Learn More" />
        </div>
      </div>
      <div className="right-section">
        
          <div className="coral-square"></div>
    
          <img className="man-image" src={manInTheSenSquare} alt="Man in the Sen Square" />
          <img className="woman-image" src={womanImage} alt="Woman" />
        
      </div>
    </div>
  );
}

export default Home;
