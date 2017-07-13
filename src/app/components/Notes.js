import React from 'react';
import PropTypes from 'prop-types';

const Notes = ({ items }) => (
  <div>
    {items && items.length > 0 ? items.map(item =>
      (<div>
        {JSON.stringify(item, null, 2)}
      </div>)) : ''}
  </div>
);

Notes.propTypes = {
  items: PropTypes.array
};

export default Notes;
