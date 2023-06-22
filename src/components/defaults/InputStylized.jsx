const InputStylized = ({onChange, placeholder, width = false, padding = false, height = false }) => {
    return <input
        onChange={onChange}
        placeholder={placeholder}
        className={`text-ColorTwo rounded-lg bg-ColorTree outline-none border border-slate-700/50`}
        style={{
            padding: padding ? padding : "0",
            width: width ? width : "0%",
            height : height ? height : "0%"
        }}
    />
} 


export default InputStylized;