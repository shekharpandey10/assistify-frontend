const Button = ({ children, onClick, type = "button", className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
