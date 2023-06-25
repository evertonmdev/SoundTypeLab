const InputStylized = ({ onChange, placeholder, type }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className="input-general"
        />
    )
}


export default InputStylized;