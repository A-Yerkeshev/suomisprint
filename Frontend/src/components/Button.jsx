import "../styles/Button.css";

function Button({ color, text }) {
  const className = `button ${color}`;

  return <button className={className}>{text}</button>;
}

export default Button;
