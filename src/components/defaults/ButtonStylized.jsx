const ButtonStylized = ({href, onClick, padding, children}) => {
  return <button
    href={href}
    onClick={onClick}
    className={`bg-ColorTree text-ColorTwo rounded-lg hover:scale-x-110 transition-all`}
    style={{
        padding: padding ? padding : "0",
    }}
    >
    {children}
  </button>
}

export default ButtonStylized