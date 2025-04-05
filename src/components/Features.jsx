import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '../utils/animateWithGsapTl'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)


function Features() {
  const videoRef = useRef()

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger:{
           trigger: '#exploreVideo',
           toggleActions:"play pause reverse restart",
           start:"-10% bottom",
      },
      onComplete: ()=>{
        videoRef.current.play()
      }
 })
    animateWithGsap('#features-title', { y: 0, opacity: 1 })
    animateWithGsap('.g_grow', { scale: 1, opacity: 1, ease: 'power1' }, { scrub: 5.5 })
    animateWithGsap('.g_text', { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1})
  }, [])


  return (
    <section className="w-full h-full overflow-hidden relative bg-zinc common-padding">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id='features-title' className="section-heading">Explore the full story.</h1>
        </div>

        <div className="flex items-center justify-center overflow-hidden flex-col">
          <div className="mb-24 mt-32 pl-24">
            <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
            <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in Titanium.</h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="flex items-center w-full h-[50vh] relative">
              <video id="exploreVideo" playsInline preload='none' autoPlay muted className=' w-full h-full object-center object-cover' ref={videoRef}>
                <source src={exploreVideo} type='video/mp4' />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-50vh">
                  <img src={explore1Img} alt="titanium" className='feature-video g_grow' />
                </div>
                <div className="overflow-hidden flex-1 h-50vh">
                  <img src={explore2Img} alt="titanium2" className='feature-video g_grow' />
                </div>
              </div>

              <div className='feature-text-container'>
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is {' '} <span className='text-white'>
                      the first iphone to feature an aerospace-grade titanium design{" "}
                    </span>
                    using the alloy the same alloy that spacecrafts use for missions to Mars.
                  </p>
                </div>
                
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-weight ratios of any metal, making this our {' '}<span className='text-white'>
                      lightest Pro models ever.{" "}
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features