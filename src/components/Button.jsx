const Button = ({ children, onClick }) => {
  return (
    <button className="btn rounded-none" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
