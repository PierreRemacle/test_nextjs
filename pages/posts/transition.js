import React, { useState, useMemo } from 'react';
import {useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../components/layout.module.css';
import withAuth from '../api/withAuth';


const fetchData = async () => {
  const response = await axios.get('/api/form');
  return response.data.data;
};

const updateData = async (values) => {
  await axios.put('/api/form', values);
  const updatedData = await axios.get('/api/form');

  return updatedData.data.data;
};
const delData = async (values) => {
    console.log("del")
    console.log(values)
    await axios.delete("/api/form", { data: values });
  const updatedData = await axios.get('/api/form');
  console.log("updatedData")
  console.log(updatedData)

  return updatedData.data.data;
};
const createData = async () => {
    const newElement = [
        {
          firstname: "NEW ELEMENT",
          lastname: "",
          subject: "",
          year: "",
          phone: "",
          email: "",
          text: "",
        },
      ];
    await axios.post("/api/form", newElement);
    const updatedData = await axios.get("/api/form");
  
    return updatedData.data.data;
  };

  const createNewStudent = async (values) => {

    await axios.post("/api/api_students", values);
    
  };

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setSelectedItem(fetchedData[0]);
    };
    fetch();
  }, []);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const onSubmit = async (values) => {

    const updatedData = await updateData(values);
    setData(updatedData);
  };
  const NewItem = async (values) => {

    const updatedData = await createData(values);
    setData(updatedData);
    setSelectedItem(updatedData[updatedData.length - 1]);
  };
  const buttondelete = async (values) => {

    const updatedData = await delData(values);
    setData(updatedData);
    if (updatedData.length > 0){
        setSelectedItem(updatedData[updatedData.length - 1]);
    }
    else{
        setSelectedItem(null)
    }
    
  };
  const NewStudent = async (values) => {

    await createNewStudent(values);
    await delData(values);
    router.push({
      pathname: 'students',
      query: {
        newstudent: values.id,
      },
    });
  };
    return (
        
        <div>
            <div>
                <nav className={styles.topnav}>
            
                    <Link href="/">Home</Link>
                    <Link href="reservation">Reservation</Link>
                    <Link href="transition" className={styles.selected}>Transition</Link>
                    <Link href="students">Students</Link>
                    <Link href="ListOfReservation">Table</Link>
            
                </nav>
                <div className={styles.border}>
                    <div className={styles.sidenav}>
                    {data.map(item => (
                        <a key={item.id} href="#" onClick={() => handleClick(item)} className={selectedItem === item ?"active" : ''} >{item.firstname}</a>
                    ))}
                    
                    </div>
                    <button className = {styles.addNew} onClick={() => {
                                    NewItem();
                                    
                                    }}>new</button>
                    <div className = {styles.Info}>
                    {selectedItem ? (
                        <div className = {styles.insideInfo}>
                            <p>id: {selectedItem.id}</p>
                            <div className = {styles.setrow}>
                                <div className = {styles.setcolumn}>
                                    <label>First Name:</label>
                                    <input type="text" value={selectedItem.firstname} onChange={(e) => setSelectedItem({...selectedItem, firstname: e.target.value})} />

                                    <label>Last Name:</label>
                                    <input type="text" value={selectedItem.lastname} onChange={(e) => setSelectedItem({...selectedItem, lastname: e.target.value})} />

                                    <label>Year:</label>
                                    <input type="text" value={selectedItem.year} onChange={(e) => setSelectedItem({...selectedItem, year: e.target.value})} />
                                </div>
                                <div className = {styles.setcolumn}>
                                    <label>Subject:</label>
                                    <textarea className = {styles.biginput} type="text" value={selectedItem.subject} onChange={(e) => setSelectedItem({...selectedItem, subject: e.target.value})} />
                                </div >
                            </div>
                            <div className = {styles.setrow}>
                                <div className = {styles.setcolumn}>
                                    <label>Date:</label>
                                    <input type="text" value={selectedItem.date} onChange={(e) => setSelectedItem({...selectedItem, date: e.target.value})} />

                                    <label>Phone:</label>
                                    <input type="text" value={selectedItem.phone} onChange={(e) => setSelectedItem({...selectedItem, phone: e.target.value})} />

                                    <label>Email:</label>
                                    <input type="text" value={selectedItem.email} onChange={(e) => setSelectedItem({...selectedItem, email: e.target.value})} />
                                    </div>
                                    <div className = {styles.setcolumn}>
                                    <label>Text:</label>
                                    <textarea className = {styles.biginput} type="text" value={selectedItem.text} onChange={(e) => setSelectedItem({...selectedItem, text: e.target.value})} />
                                </div>
                            </div>
                           
                            <div className = {styles.setrowbuttons}>
                                <button onClick={() => {                
                                    buttondelete(selectedItem);
                                    
                                    }}>Delete
                                </button>
                                <button onClick={() => {                   
                                    onSubmit(selectedItem);
                                    
                                    }}>Edit
                                </button>
                                <button onClick={() => {
                                    NewStudent(selectedItem);
                                    
                                    }}>Submit
                                </button>
                            </div>

                        </div>
                        ) : (
                        null
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withAuth(Home);
