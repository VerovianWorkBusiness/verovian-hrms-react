import React, { useEffect } from 'react'

const VideoPlayer = ({videoSrc}) => {
    // const player = useRef(null);

    // const videoRef = useRef(null);

    useEffect(() => {

    }, []);

    // const [videoMuted, setVideoMuted] = useState(false);

    // const toggleVideoSound = () => {
    //     const vid = document.getElementById("video1");
    //     vid.muted = !videoMuted; 
    //     setTimeout(() => {
    //     setVideoMuted(!videoMuted)
    //     }, 50);
    // }

    // useEffect(() => {
    //     // Call whenever you like - also available on `useMediaRemote`.
    //     player.current.startLoading();
    
    //     // Call when poster should start loading.
    //     player.current.startLoadingPoster();
    //   }, []);
  return (
    <div className='p-[30px]'>
    {/* <MediaPlayer load="custom" posterLoad="custom" ref={player} title="Sprite Fight" src="https://files.vidstack.io/sprite-fight/720p.mp4" viewType="video" streamType="on-demand">
        <MediaProvider>
            <Poster
                className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                src="https://files.vidstack.io/sprite-fight/poster.webp"
                alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
            />

            <Controls.Root className="data-[visible]:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity pointer-events-none">
                <Controls.Group className="pointer-events-auto w-full flex items-center px-2">
                Top Controls Group
                </Controls.Group>
                <div className="flex-1" />
                <Controls.Group className="pointer-events-auto w-full flex items-center px-2">
                Center Controls Group
                </Controls.Group>
                <div className="flex-1" />
                <Controls.Group className="pointer-events-auto w-full flex items-center px-2">
                Bottom Controls Group
                </Controls.Group>
            </Controls.Root>
        </MediaProvider>
    </MediaPlayer> */}

    <div className='w-full pt-[64px] relative' 
        data-aos="fade-up" 
        data-aos-delay="250"
        data-aos-duration="400"
        data-aos-easing="ease-in-out"
        data-aos-once="false"
    >
        <video id='video1' autoPlay  width={`100%`} controls
            // poster='https://files.vidstack.io/sprite-fight/poster.webp'
        >
        {/* <source src='/videos/about-us.mp4' type="video/mp4" /> */}
            <source src={videoSrc} type="video/mp4" />
        </video>
        {/* <button onClick={toggleVideoSound} className='w-[65px] h-[65px] rounded-full flex items-center justify-center bg-black bg-opacity-70 text-white absolute top-[80px] right-[20px] gap-x-2 transition duration-200 hover:bg-opacity-50 active:bg-opacity-95'>
        {videoMuted ? <UnmuteIcon className={`h-4 w-4`} /> : <MuteIcon className={`h-4 w-4`} /> }
        </button> */}
    </div>
</div>
  )
}

export default VideoPlayer