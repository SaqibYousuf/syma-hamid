import Image from 'next/image'
import React from 'react'
import Container from '../constants/container'
import { ArrowRight } from 'lucide-react'

function Hero() {
    return (
        <div className='relative w-full aspect-[1920/656] flex items-center'>
            <Image src={'/images/hero-bg.png'} alt='Hero Background' className='w-full h-full object-[100%] object-center' fill />
            <div className='relative'>
                <Container>
                    <div className="max-w-[752px] w-full py-6 flex items-start flex-col gap-[22px]">
                        <p className='font-avenir font-medium text-[22px] leading-[100%] tracking-[3px] capitalize text-[#1C2E22] text-[#1C2E22]'>DEEPER INSIGHT. LASTING CHANGE</p>
                        <h1 className='font-cormorant font-semibold text-[94px] leading-[84px] tracking-[0] capitalize text-[#1C2E22]'>heal what’s holding you back</h1>
                        <p className='font-avenir font-normal text-[25px] leading-[36px] tracking-[0px] text-[#1C2E22]'>Psychological support, powerful tools and a compassionate space to help you understand yourself, break unhelpful patterns and create a more fulfilling life.</p>
                        <button className='font-cormorant font-semibold text-lg leading-[32px] tracking-[0px] bg-[#223329] rounded-2xl text-white flex items-center justify-center gap-[10px] px-6 py-3'>Begin your journey <ArrowRight /></button>
                    </div>
                </Container>
            </div>
            <div className='absolute right-[10%] border-b border-[#D4A453]'>
                <p className='font-cormorant font-medium italic text-[48px] leading-[55px] tracking-[0] text-[#FAF6EF]'>Real change <br />
                    begin within</p>
            </div>

        </div>
    )
}

export default Hero
