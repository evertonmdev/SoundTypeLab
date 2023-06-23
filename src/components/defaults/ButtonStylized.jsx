import '../../styles/styles.scss';

const ButtonStylized = ({ href, onClick, children }) => {
  return (
    <button
      href={href}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonStylized