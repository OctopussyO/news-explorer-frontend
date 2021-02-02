const MenuIcon = ({
  className = '',
  pathClassName = '',
  width = 24,
  height = 24,
  fill = '#fff',
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
      <path className={pathClassName} fill={fill} d="M4 8h16v2H4zM4 14h16v2H4z"/>
    </svg>
  )
};

export default MenuIcon;
