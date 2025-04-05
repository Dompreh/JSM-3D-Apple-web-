import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { gsap } from 'gsap'

gsap.registerPlugin(ScrollTrigger)

function VideoCarousel() {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setvideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setloadedData] = useState([])

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    useGSAP(() => {
        gsap.to('#slider',{
            transform:`translateX(${-100 * videoId}%)`,
            duration:2,
            ease:'power2.inOut',
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none"
            },
            onComplete: () => {
                setvideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }))
            }
        })
    }, [isEnd, videoId])

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }


    }, [loadedData, startPlay, isPlaying, videoId])

    const handleLoadedMetaData = (i, e) => {
        setloadedData((pre) => [...pre, e])
    }

    useEffect(() => {
        let span = videoSpanRef.current
        let currentProgress = 0

        if (span[videoId]) {
            //animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)

                    if (progress != currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })

                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                }
            })

            if (videoId === 0) {
                anim.restart()
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }

            if (isPlaying) {
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }
    }, [videoId, startPlay])

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setvideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }))
                break;

            case 'video-last':
                setvideo((pre) => ({ ...pre, isLastVideo: true }))
                break;
            case 'video-reset':
                setvideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }))
                break;
            case 'play':
                setvideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
                break;
            case 'pause':
                setvideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
                break;

            default:
                return video;
        }
    }

    return (
        <>

            <div className='flex items-center'>
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className='sm:pr-24 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center overflow-hidden bg-black rounded-3xl'>
                                <video
                                className={`${list.id === 2 && 'translate-x-44'}`}
                                onEnded={() => i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')} id="video"
                                onLoadedMetadata={(e) => handleLoadedMetaData(i, e)} playsInline={true} muted preload='auto' ref={(el) => (videoRef.current[i] = el)} onPlay={() => {
                                    setvideo((prevVideo) => ({
                                        ...prevVideo, isPlaying: true
                                    }))
                                }}>
                                <source src={list.video} />
                            </video>
                        </div>


                        <div className='absolute top-12 z-10 left-[5%]'>
                            {list.textLists.map((text) => (
                                <p key={text} className='md:text-2xl text-xl font-medium'>
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                    </div>
                ))}
        </div >

            <div className='flex relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, i) => (
                        <span key={i} ref={(el) => (videoDivRef.current[i] = el)} className='mx-2 w-3 h-3 rounded-full bg-gray-200 relative cursor-pointer'>
                            <span className='absolute w-full h-full rounded-full' ref={(el) => (videoSpanRef.current[i] = el)} />


                        </span>
                    ))}
                </div>

                <button className='control-btn'>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess("play") : () => handleProcess('pause')} />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel