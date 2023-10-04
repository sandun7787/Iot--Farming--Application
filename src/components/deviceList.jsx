import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import { fetchData } from '../utils/deviceDataFetching';

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteField,
} from 'firebase/firestore';
import { getFirestoreDB } from '../../database/firebaseConfig';
import getLoggedUserId from '@/utils/getLoggedUserId';

const db = getFirestoreDB();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0353A4',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableContainerWrapper = styled(TableContainer)(({ theme }) => ({
  marginTop: '30px',
  margin: '10px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
}));

export default function DeviceList() {
  const [data, setData] = useState([]);
  const [loggedUserId, setLoggedUserId] = useState();

  useEffect(() => {
    getLoggedUserId((userId) => {
      setLoggedUserId(userId);
      fetchData(userId, setData); // Call the fetchData function with the userId and setData as arguments
    });
  }, []);
  const deleteDeviceFromDatabase = async (userId, deviceId) => {
    try {
      console.log(userId, deviceId);

      const deviceRef = doc(db, 'user-device', userId);
      await updateDoc(deviceRef, {
        [deviceId]: deleteField(),
      });

      console.log('Device deleted successfully!');
    } catch (error) {
      console.error('Error deleting device from the database:', error);
      throw error;
    }
  };

  const handleDelete = async (userId, deviceId) => {
    try {
      // Delete the device from the database using the userId and deviceId
      await deleteDeviceFromDatabase(userId, deviceId);

      // Fetch the updated data after deleting the device
      fetchData(userId, setData);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  return (
    <TableContainerWrapper component={Paper}>
      <Table sx={{ width: '100%' }} aria-label="customized table">
        <TableHead sx={{ backgroundColor: '#0466C8' }}>
          <TableRow>
            <StyledTableCell>Device ID</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Created time</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                No device found
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            data.map((device) => (
              <StyledTableRow key={`${device.userId}-${device.deviceId}`}>
                <StyledTableCell component="th" scope="row">
                  {device.deviceId}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {device.deviceName}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {(() => {
                    const totalSeconds = device.createdAt.seconds + 19800;
                    const totalHours = Math.floor(totalSeconds / 3600);
                    const hours24Format = (totalHours % 24)
                      .toString()
                      .padStart(2, '0');
                    const minutes = Math.floor((totalSeconds % 3600) / 60)
                      .toString()
                      .padStart(2, '0');
                    return `${hours24Format}:${minutes} ${
                      hours24Format >= 12 ? 'PM' : 'AM'
                    }`;
                  })()}
                </StyledTableCell>

                <StyledTableCell align="left">
                  <span
                    style={{
                      color: device.activeStatus === true ? 'green' : 'red',
                    }}
                  >
                    {device.activeStatus === true ? 'Active' : 'Inactive'}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="left">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(device.userId, device.deviceId)}
                    style={{ fontSize: '13.5px' }}
                  >
                    Delete
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainerWrapper>
  );
}
