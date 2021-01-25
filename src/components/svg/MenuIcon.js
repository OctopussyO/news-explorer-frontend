const MenuIcon = ({
  className = '',
  width = 24,
  height = 24,
  fill = '#1A1B22',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={fill} d="M4 8h16v2H4zM4 14h16v2H4z"/>
    </svg>
  )
};

export default MenuIcon;
