import React from 'react'
import LinkedInIcon from '../../../../assets/img/icons/linkedin-black.svg'
import TwitterIcon from '../../../../assets/img/icons/twitter-x.svg'
import FacebookIcon from '../../../../assets/img/icons/facebook-black.svg'
const InstructorProfileCard = ({instructor}) => {
  return (
    <div className='p-5 rounded-[16px] w-full bg-white'>
      <div className='flex items-center gap-x-[10px]'>
        <div className='w-[110px]'>
          <div className='w-[100px] h-[100px] rounded-full' 
            style={{
              backgroundImage: `url(${instructor.avatar})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }} 
          />
        </div>
        <div className='w-full'>
          <h3 className='mt-[10px] font-medium'>{instructor.name}</h3>
          <p className='text-[14px] my-[10px]'>{instructor.email}</p>
          <div className='flex items-center gap-x-[10px]'>
            <a href={instructor.socials.linkedin} target='_blank' rel="noreferrer">
              <img src={LinkedInIcon} alt=''  className='w-[25px]'/>
            </a>
            <a href={instructor.socials.twitter} target='_blank' rel="noreferrer">
              <img src={TwitterIcon} alt='' className='w-[25px]'/>
            </a>
            <a href={instructor.socials.facebook} target='_blank' rel="noreferrer">
              <img src={FacebookIcon} alt=''  className='w-[25px]'/>
            </a>
          </div>
        </div>
      </div>

      <p className='text-[13px] mt-[20px]'>{instructor.about}</p>
    </div>
  )
}

export default InstructorProfileCard