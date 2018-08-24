import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  errors,
  icon,
  type,
  onChange,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>

      <input
      className={classnames('form-control form-control-lg', {'is-invalid': errors})} 
      placeholder={placeholder} 
      name={name} 
      value={value}
      onChange={onChange}
      />
      {errors && (<div className='invalid-feedback'>{errors}</div>)}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,

};

InputGroup.defaultProps = {
  type: 'text'
};


export default InputGroup;
