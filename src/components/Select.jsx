const Select = ({ title, items = [], onChange = () => {} }) => {
  return (
    <select defaultValue={title} className="select rounded-none" onChange={(e) => onChange(e.target.value)}>
      {items.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
