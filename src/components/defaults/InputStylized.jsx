const InputStylized = ({ onKeyPress, onChange, placeholder, type, id, name, required }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            onKeyPress={onKeyPress}
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