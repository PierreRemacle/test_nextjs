/**
 * global filter component with useAsyncDebounce
 */

import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import { useAsyncDebounce } from 'react-table';
import styles from '../../components/layout.module.css';


const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce(value1 => {
    setFilter(value1 || undefined);
  }, 1000);

  return (
    <span>
      <input
        type="text"
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export default GlobalFilter;

/**
 * global filter component
 */
// const GlobalFilter = ({ filter, setFilter }) => {
//   return (
//     <span>
//       Search:{' '}
//       <input
//         type="text"
//         value={filter || ''}
//         onChange={e => {
//           setFilter(e.target.value);
//         }}
//       />
//     </span>
//   );
// };
