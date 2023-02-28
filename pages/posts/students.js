import React, { useState, useMemo } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../components/layout.module.css';
import { useRouter } from 'next/router';
import withAuth from '../api/withAuth';
import Students from '/api/api_students';
import course from "/api/api_course";


const fetchData = () => axios.get(Students).then(response => response.data.data);


const updateData = async (values) => {
  await axios.put(Students, values);
  const updatedData = await axios.get(Students);

  return updatedData.data.data;
};
const delData = async (values) => {

    await axios.delete(Students, { data: values });
  const updatedData = await axios.get(Students);


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
    await axios.post(Students, newElement);
    const updatedData = await axios.get(Students);
  
    return updatedData.data.data;
  };
  const createNewcourse = async (values , coursevalues) => {

    await axios.post(course, {...values, ...coursevalues});
    
  };

const Home = () => {
  const router = useRouter();
  const newitemid = router.query;
  const [data, setData] = useState([]);
  const [newcourseelement, setNewCourseElement] = useState({
    newsubject: "",
    newdate: ""
  });
  
  const [selectedItem, setSelectedItem] = useState(null);
  

  useEffect(() => {
    const fetch = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
  
      if (newitemid.newstudent != null) {
        const selected = fetchedData.find(item => item.id === newitemid.newstudent);
        setSelectedItem(selected);
      }
      else if (fetchedData.length > 0){
        setSelectedItem(fetchedData[0]);
    }
    };
    fetch();
  }, []);
  
  
  const handleClick = (item) => {
    newcourseelement.newsubject=""
    newcourseelement.newdate=""
    setSelectedItem(item);
  };

  const onSubmit = async (values) => {

    const updatedData = await updateData(values);
    setData(updatedData);
    setNewCourseElement({
      newsubject: "",
      newdate: ""
    });
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
  const Newcourse = async (values , newvalues) => {

    await createNewcourse(values, newvalues);
    setNewCourseElement({
      newsubject: "",
      newdate: ""
    });
    
  };
  
    return (
        
        <div>
            <div>
                <nav className={styles.topnav}>
            
                    <Link href="/">Home</Link>
                    <Link href="reservation">Reservation</Link>
                    <Link href="transition">Transition</Link>
                    <Link href="students" className={styles.selected}>Students</Link>
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
                                    <label>Text:</label>
                                    <textarea className = {styles.biginput} type="text" value={selectedItem.text} onChange={(e) => setSelectedItem({...selectedItem, text: e.target.value})} />
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
                                    <h3>Newcourse:</h3>
                                    <label>subject:</label>
                                    <input className = {styles.biginput} type="text" value={newcourseelement.newsubject} onChange={(e) => setNewCourseElement({...newcourseelement, newsubject: e.target.value})}   />
                                    <label>date:</label>
                                    <input className = {styles.biginput} type="date" value={newcourseelement.newdate} onChange={(e) => setNewCourseElement({...newcourseelement, newdate: e.target.value})}  />
                                    <br></br>
                                    <button onClick={() => {
                                      Newcourse(selectedItem ,newcourseelement );
                                      
                                      }}>Submit
                                    </button>
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
