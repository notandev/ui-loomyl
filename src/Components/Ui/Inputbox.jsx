import PropTypes from 'prop-types';
import '../../styles/Inputbox.css';

function Inputbox({ type, placeholder, icon, value, onChange, rightIcon, onRightIconClick, ...props }) {
  return (
    <div className="relative input-box">
      <input 
        {...props} 
        type={type || 'text'} 
        placeholder={placeholder || ''} 
        value={value} 
        onChange={onChange} 
        className="input"
      />
      {icon && <i className={`${icon} absolute left-2 top-1/2 transform -translate-y-1/2`}></i>}
      {rightIcon && (
        <img 
          src={rightIcon} 
          alt="icon" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
          onClick={onRightIconClick} 
        />
      )}
    </div>
  );
}

Inputbox.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rightIcon: PropTypes.string,
  onRightIconClick: PropTypes.func,
};

export default Inputbox;
