const InputStylized = ({ onChange, placeholder, type, id, name, required }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            required={required}
            className="input-general"
            id={id}
            name={name}
        />
    )
}


export default InputStylized;