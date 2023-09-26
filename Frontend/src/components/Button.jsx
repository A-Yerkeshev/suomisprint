import "../styles/Button.css";

function Button({ color, text, onClick }) {
  const className = `button ${color}`;

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
