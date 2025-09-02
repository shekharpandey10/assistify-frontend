const Input = ({ label, type = "text", value, onChange, placeholder,name }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 text-gray-700">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default Input;
