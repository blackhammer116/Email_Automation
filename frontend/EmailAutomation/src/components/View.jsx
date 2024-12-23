// 'use client';
import axios from 'axios'
import {useState, useEffect} from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from '@tremor/react';
import DialogPopup from './DialogPopup';
  
//   const data = [
//     {
//       workspace: 'sales_by_day_api',
//       owner: 'John Doe',
//       status: 'live',
//       costs: '$3,509.00',
//       region: 'US-West 1',
//       capacity: '99%',
//       lastEdited: '23/09/2023 13:00',
//     },
//     {
//       workspace: 'marketing_campaign',
//       owner: 'Jane Smith',
//       status: 'live',
//       costs: '$5,720.00',
//       region: 'US-East 2',
//       capacity: '80%',
//       lastEdited: '22/09/2023 10:45',
//     },
//     {
//       workspace: 'sales_campaign',
//       owner: 'Jane Smith',
//       status: 'live',
//       costs: '$5,720.00',
//       region: 'US-East 2',
//       capacity: '80%',
//       lastEdited: '22/09/2023 10:45',
//     },
//     {
//       workspace: 'development_env',
//       owner: 'Mike Johnson',
//       status: 'live',
//       costs: '$4,200.00',
//       region: 'EU-West 1',
//       capacity: '60%',
//       lastEdited: '21/09/2023 14:30',
//     },
//     {
//       workspace: 'new_workspace_1',
//       owner: 'Alice Brown',
//       status: 'live',
//       costs: '$2,100.00',
//       region: 'US-West 2',
//       capacity: '75%',
//       lastEdited: '24/09/2023 09:15',
//     },
//     {
//       workspace: 'test_environment',
//       owner: 'David Clark',
//       status: 'inactive',
//       costs: '$800.00',
//       region: 'EU-Central 1',
//       capacity: '40%',
//       lastEdited: '25/09/2023 16:20',
//     },
//   ];
  
  export default function ViewInterns() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [status, setStatus] = useState();
    const [error, setError] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/view_interns');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    }, []);

    const sendEmail = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:5000/send_email');
            if (response.status===200) {
              console.log(response);
              setSuccessMessage('Email sent successfully!');
              setStatus(true);
              setShowPopup(true);
              // <DialogPopup message='Email sent successfully!' />
            }
            else {
              // Handle non-200 status codes
              setError('Email sending failed. Status code: ' + response.status);
              <DialogPopup message='Email sending failed!!' onClose={() => setShowPopup(false)}/>
              console.log(error)
          }
          } catch (error) {
              // More informative error handling
              setError('Error sending email: ' + (error.response ? error.response.data : error.message));
              console.log(error)
          } finally {
              // Always hide the loading indicator
              setIsLoading(false);
          }
    };

    const handleSubmit =  async (e) => {
      e.preventDefault();
      await sendEmail();
    };

    return (
      <>
        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
          <div>
            <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Icog-Labs AI Interns
            </h3>
            <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
             Intern's Weekly training score
            </p>
          </div>
          <button
            type="submit"
            // onSubmit={handleSubmit()}
            className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
            onClick={sendEmail}
          >
            {isLoading ? 'Sending...' : 'Send Email'}
          </button>
           
          <p>
            {
              showPopup ? <DialogPopup message="Email Sent Successfuly!" /> : ''
          }
          </p>
        </div>
        <Table className="mt-8">
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Intern's Name
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Email
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Result
              </TableHeaderCell>
              {/* <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Region
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Capacity
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Costs
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Last edited
              </TableHeaderCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {item.name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.results}</TableCell>
                {/* <TableCell>{item.region}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }