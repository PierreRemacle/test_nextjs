import React, { useState, useMemo } from 'react';
import { useTable, useGlobalFilter, useFilters } from 'react-table';
import ColumnFilter from '../../components/ColumnFilter';
import { COLUMNS } from '../../components/columns';
import {useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../components/layout.module.css';
import withAuth from '../api/withAuth';


const FilteringTable = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    };
  }, []);


  const togglePaid = async (values) => {

    values.paid = values.paid == "false"
    
    await axios.put('/api/api_course', values);
    const updatedData = await axios.get('/api/api_course');

    setData(updatedData.data.data)

  };

    useEffect(() => {
    const fetchData = async () => {  
      let config = {
      method: 'GET',
      url: `/api/api_course`,
      headers: {
        'Content-Type': 'application/json',
      },
      
    }
    try {
      const response = await axios(config);
      
      if (response.status == 200) {
        setData(response.data.data)
        reset();
      }
    } catch (err) {}};

    fetchData();
    }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <div>
      <nav className={styles.topnav}>
        
        <Link href="/">Home</Link>
        <Link href="reservation">Reservation</Link>
        <Link href="transition">Transition</Link>
        <Link href="students">Students</Link>
        <Link href="ListOfReservation" className={styles.selected}>Table</Link>
  
      </nav>
      

      <table className={styles.fltable} {...getTableProps()}>
      
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>

                
              ))}
            </tr>
            
          ))}

        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    
                  );
                })}
                <td>
                  <input 
                  type="checkbox"
                  checked={row.original.paid == "true"} 
                  onChange={() => togglePaid(row.original)} 
                  />
                </td>
              </tr>
              


              
            );
          })}
        </tbody>
       
      </table>
    </div>
  );
};

export default withAuth(FilteringTable);
