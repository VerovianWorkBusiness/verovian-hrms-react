import React from 'react'

const AudioPlayer = ({audioSrc}) => {
  return (
    <div className='w-full flex items-center justify-center'>
        
        <audio controls>
            {/* <source src="horse.ogg" type="audio/ogg" /> */}
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>

    </div>
  )
}

export default AudioPlayer