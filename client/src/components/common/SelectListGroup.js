import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  value,
  errors,
  info,
  onChange,
  options,
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">

      <select 
      className={classnames('form-control form-control-lg', {'is-invalid': errors})}  
      name={name} 
      value={value}
      onChange={onChange}
      >
      {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && (<div className='invalid-feedback'>{errors}</div>)}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};


export default SelectListGroup;
