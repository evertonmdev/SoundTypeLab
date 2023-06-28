const InputStylized = ({ onChange, placeholder, type, id, name }) => {
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