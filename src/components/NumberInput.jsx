const NumberInput = ({label, value, placeholder, changeHandler}) => {
  return(
    <div className="field column">
      <label className="label">{label}</label>
      <p className="control">
        <input className="input is-medium" type="number" step={0.1}
          placeholder={placeholder}
          onChange={e => changeHandler(e.target.value)}
          value={value}
        />
      </p>
    </div>
  );
};

export default NumberInput