import React from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockIcon from '@mui/icons-material/Lock';

const Settings = () => {
  return (
    <div className='flex flex-col items-center justify-center my-5 p-5'>
      <div className='flex justify-center items-center w-2/5 h-14 shadow-2xl border border-gray-300 rounded-md mb-5 cursor-pointer hover:bg-gray-100'>
        <p className='flex items-center'>
          Change Name <DriveFileRenameOutlineIcon className='ml-2' style={{ fontSize: '1rem' }}/>
        </p>
      </div>
      <div className='flex justify-center items-center w-2/5 h-14 shadow-2xl border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100'>
        <p className='flex items-center'>
          Change Password <LockIcon className='ml-2' style={{ fontSize: '1rem' }}/>
        </p>
      </div>
    </div>
  )
}

export default Settings