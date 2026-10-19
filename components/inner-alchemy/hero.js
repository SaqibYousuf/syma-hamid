import Image from 'next/image'
import React from 'react'
import { StarIcon } from '../constants/icons'
import { ArrowRight } from 'lucide-react'

function Hero() {
    return (
        <div className='flex flex-col items-center justify-center  relative w-full aspect-[1920/768]'>
            <Image fill src="/images/alchemy-bg.png" alt="Hero Image" className='w-full h-full' />
            <div className="max-w-[752px] relative w-full py-6 flex items-start flex-col gap-[22px]">
                <p className='font-avenir uppercase font-medium text-[22px] leading-[100%] tracking-[3px] text-[#1C2E22] text-[#1C2E22]'>the signature experience</p>
                <h1 className='font-cormorant uppercase font-semibold text-[94px] leading-[84px] tracking-[0] text-[#1C2E22]'>inner alchemy
                    sessions</h1>
                <p className='font-cormorant font-medium italic text-[48px] leading-[55px] tracking-[0] text-[#1C2E22]'>Real change
                    begin within</p>
                <div className="flex items-center gap-5">
                    <div className="h-[1px] w-[150px] border-[0.68px] border-solid [border-image-source:linear-gradient(90deg,#A67539_27.53%,rgba(166,117,57,0.2)_63.76%,rgba(166,117,57,0.5)_100%)] [border-image-slice:1] " />
                    <StarIcon />
                    <div className="h-[1px] w-[150px] border-[0.68px] border-solid [border-image-source:linear-gradient(90deg,#A67539_27.53%,rgba(166,117,57,0.2)_63.76%,rgba(166,117,57,0.5)_100%)] [border-image-slice:1] " />
                </div>
                <p className='font-avenir font-normal text-[25px] leading-[36px] tracking-[0px] text-[#1C2E22]'>Psychological support, powerful tools and a compassionate space to help you understand yourself, break unhelpful patterns and create a more fulfilling life.</p>
                <button className='font-cormorant font-semibold text-lg leading-[32px] tracking-[0px] bg-[#223329] rounded-2xl text-white flex items-center justify-center gap-[10px] px-6 py-3 capitalize'>Begin your inner alchemy <ArrowRight /></button>

            </div>
        </div>
    )
}

export default Hero
