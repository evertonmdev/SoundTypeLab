import '../../styles/styles.scss';

const InputStylized = ({ onChange, placeholder }) => {
    return (
        <input
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}


export default InputStylized;