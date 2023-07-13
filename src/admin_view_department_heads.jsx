import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import {  Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

export default function Admin_ViewHead() {
  const [dept, setDept] = useState([]);
  const[token,settoken]=useState([])
  const navigator = useNavigate()

  const handleDelete = async (id) => {
    try {
      axios.post(`http://localhost:4001/delete_department_head/${id}`)
      setDept(dept.filter((d) => d._id !== id));
      toast.success('Department deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }  
  };

  useEffect(() => {
    axios.get('http://localhost:4001/view_department_heads',{headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}` ,
      
    }
  })
      .then(({ data }) => {
        console.log(data);
        if(data.status==false){
          settoken(true)
          navigator('/')
          
        }
        else{
          setDept(data);

        }

      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (

    <div style={{
    position: 'relative',
    left: '20%',
    width: '80%'
}}>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Image</th>
            <th scope='col'>Department Head Name</th>
            <th scope='col'>Department  Name</th>
            <th scope='col'>E_number</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {dept.map((dept) => (
            <tr key={dept._id}>
              <td>
                                <img src={dept.image} alt="" height={100} width={100}/>

                </td>
              <td>
                
                    {dept.Name}
                
              </td>
              <td>{dept.Dept_Name}</td>
              <td>
                <p className='fw-normal mb-1'>{dept.E_number}</p>
              </td>
           
              <td>
              <Link to={`/home/edit_dept_head/${dept._id}`}>
                  <Button variant='primary'>Edit</Button>
                </Link><br></br>
                <Button variant="primary" type="submit" onClick={() => handleDelete(dept._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        </div>
  );
}
