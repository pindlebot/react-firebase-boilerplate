import React from 'react'

const Notes = ({items}) => (
  <div>
    {items && items.length > 0 ? items.map(item => 
    <div>
      {JSON.stringify(item, null, 2)}
    </div>) : ''}
  </div>
)

export default Notes
