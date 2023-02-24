import { format } from 'date-fns';
import ColumnFilter from './ColumnFilter';

export const COLUMNS = [

  {
    Header: 'date',
    accessor: 'date',
    Footer: 'date',
    // Filter: ColumnFilter,

    
  },
  {
    Header: 'First Name',
    accessor: 'firstname',
    Footer: 'First Name'
    // Filter: ColumnFilter
  },
  {
    Header: 'Last Name',
    accessor: 'lastname',
    Footer: 'Last Name'
    // Filter: ColumnFilter
  },
  {
    Header: 'year',
    accessor: 'year',
    Footer: 'year'
    // Filter: ColumnFilter
  },
  {
    Header: 'subject',
    accessor: 'subject',
    Footer: 'subject'
    // Filter: ColumnFilter
  },

  {
    Header: 'paid',
    accessor: 'paid',
    Footer: 'paid'
    // Filter: ColumnFilter
  },
  {
    accessor: "id"
  }


];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    Footer: 'Id'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      { Header: 'שם פרטי', accessor: 'first_name', Footer: 'First Name' },
      { Header: 'שם משפחה', accessor: 'last_name', Footer: 'Last Name' }
    ]
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
        Footer: 'Date of Birth'
      },
      { Header: 'Country', accessor: 'country', Footer: 'Country' },
      { Header: 'Phone', accessor: 'phone', Footer: 'Phone' }
    ]
  }
];
