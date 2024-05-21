import React from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockIcon from '@mui/icons-material/Lock';

const Settings = () => {
  return (
    <div className='flex flex-col justify-center'>
        <div className=' p-5 pb-5 flex justify-center w-4/5 h-8 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>
            <p>Change Name <DriveFileRenameOutlineIcon/></p>
        </div>
        <div>
            <p>Change Password <LockIcon/> </p>
        </div>
    </div>
  )
}

export default Settings