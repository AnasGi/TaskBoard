import React from 'react'
import NotFound from '../Assets/error.gif'

export default function Error({data , width}) {
  return (
    <div style={{width:"90%"}} className={width ? 'd-flex justify-content-center align-items-center w-100' : 'd-flex justify-content-center align-items-center'}>
        <div>
            <div className='d-flex justify-content-center align-items-center'>
                <img style={{height:"150px"}} src={NotFound} alt='Error'/>
            </div>
            <h4 className='fw-bold'>Somthing went wrong while getting {data}. Try again later!</h4>
        </div>
    </div>
  )
}
