const InputStylized = ({ onChange, placeholder, type, id, name, required }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className="input-general"
            id={id}
            name={name}
        />
    )
}


export default InputStylized;