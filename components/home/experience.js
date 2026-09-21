import Image from 'next/image'
import React from 'react'
import Container from '../constants/container'

function Experience() {
    return (
        <div className='relative aspect-[1920/656] w-full'>
            <Image src={'/images/experience-bg.png'} fill className='w-full h-full object-cover' />
            <div className="w-full h-full flex items-center relative">
                <Container>
                    <div className="flex justify-between">
                        <div className='w-[56%]'>
                            <div>
                                <p className='font-avenir font-medium text-[22px] leading-[76.97px] tracking-[3px] uppercase text-[#FAF6EF]'>
                                    the signature experience
                                </p>
                                <h2 className="font-cormorant font-semibold text-[66px] leading-[84px] tracking-[0] capitalize text-[#FAF6EF]">
                                    inner alchemy sessions <br /> <span className="font-cormorant font-medium italic text-[55px] leading-[84px] tracking-[0] text-[#A67539]">Real change begins within</span>
                                </h2>
                                <p className='font-avenir font-normal text-[25px] leading-[36px] tracking-[0px] text-white'>
                                    A guided 60-minute deep-dive designed to help you understand the patterns beneath what you're experiencing, reframe limiting narratives, and move forward with greater clarity.
                                </p>
                            </div>
                        </div>
                        <div className='w-[22%] relative'>
                            <Image src={'/images/circleDiagramm-2.png'} width={300} height={300} className=' object-cover absolute' />
                        </div>
                        <div className='w-[22%] flex items-center'>
                            <div className="border-l-[3px] border-[#F0B75B] pl-5 pb-10">
                            <div className=' relative pb-10'>
                                <p className='font-cormorant font-medium italic text-[48px] leading-[55px] tracking-[0] text-[#FAF6EF]'>Understand. <br />
                                    Reframe. <br />
                                    Move Forward. </p>
                                    <div className='absolute bottom-0 w-20 h-1 bg-[#D4A453]'/>
                            </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Experience
