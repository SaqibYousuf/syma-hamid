import Image from 'next/image'
import React from 'react'
import Container from '../constants/container'

function Experience() {
    return (
        <div className='relative w-full '>
            <Image src={'/images/alchemy-exp-bg.png'} fill className='w-full h-full object-cover' />
            <div className="w-full h-full flex items-stretch relative">
                <Container>
                    <div className="flex items-center justify-between py-[33px]">
                        <div className='w-[50%]'>
                            <div className='flex flex-col gap-[22px]'>
                                <p className='font-avenir font-medium text-[22px] leading-[120%] tracking-[3px] uppercase text-[#1C2E22]'>
                                    the philosphy
                                </p>
                                <h2 className="font-cormorant font-semibold text-[66px] leading-[100%] tracking-[0] capitalize text-[#1C2E22]">
                                    What is <br />
                                    Inner Alchemy?
                                </h2>
                                <p className='font-avenir font-normal text-[25px] leading-[120%] tracking-[0px] text-[#1C2E22]'>
                                    Inner Alchemy is the process of turning inner patterns into conscious choice.
                                    <br />
                                    <br />
                                    It is about understanding what lies beneath the surface, your emotional patterns, beliefs, reactions and protective strategies, and transforming that awareness into meaningful change.
                                </p>
                                <div className="h-[1px] w-[150px] border-[0.68px] border-solid [border-image-source:linear-gradient(90deg,#A67539_27.53%,rgba(166,117,57,0.2)_63.76%,rgba(166,117,57,0.5)_100%)] [border-image-slice:1] " />
                            </div>
                        </div>
                        <div className='w-[50%] relative ml-10'>
                            <Image src={'/images/circleDiagramm2.png'} width={400} height={400} className=' object-cover ' />
                        </div>

                    </div>
                </Container>
                  <div className="bg-[#F4ECD9] max-w-[388px] flex-1 w-full flex items-center justify-center px-[37px]">
                    <p className='font-avenir font-normal text-[18px] leading-[120%] tracking-[0px] text-[#1C2E22]'>
                        <span className='font-medium'>More than <br />
                        just insight</span>
                        <br />
                        <br />
                        This is not about fixing
                        you. It’s about helping you
                        understand yourself
                        more deeply, so you can
                        make different choices
                        and create lasting change.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Experience
