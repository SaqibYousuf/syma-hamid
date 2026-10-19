import Image from 'next/image'
import React from 'react'
import Container from '../constants/container'

function HowWork() {
    const stepsData = [
        {
            icon: "/images/la_brain.svg", // ya aapka icon path
            title: "ARRIVE",
            desc: "A safe, supportive space to be yourself.",
        },
        {
            icon: "/images/explore.svg",
            title: "EXPLORE",
            desc: "We go beneath the surface.",
        },
        {
            icon: "/images/brain.svg",
            title: "UNDERSTAND",
            desc: "Patterns, beliefs and triggers.",
        },
        {
            icon: "/images/reframe.svg",
            title: "REFRAME",
            desc: "New perspectives, new possibilities.",
        },
        {
            icon: "/images/forward.svg",
            title: "MOVE FORWARD",
            desc: "With clarity, confidence and a practical plan.",
        },
    ];
    return (
        <div className="bg-[#FFF6E2] py-20 relative">
            <Image fill src="/images/howWork-bg.png" />
            <div className="relative">
                <Container>
                    <div className="w-full flex justify-end gap-10">
                        <div className="flex justify-start flex-col  gap-12 w-[68%]">
                            <div className=''>
                                <p className='font-avenir font-medium text-[22px]  tracking-[3px] uppercase  text-[#FAF6EF]'>
                                    the 60-minute experience
                                </p>
                                <h2 className="font-cormorant font-semibold text-[66px] leading-[84px] tracking-[0] capitalize text-[#FAF6EF]">
                                    How it works
                                </h2>
                            </div>
                            <div className='grid grid-cols-5 flex-wrap'>
                            {stepsData.map((step, index) => (
                                <div key={index} className="flex flex-col max-w-[170px]  items-center gap-5">
                                    <Image width={72} height={72} src={step.icon} alt={step.title} />
                                    <div className='flex flex-col justify-between flex-1'>
                                        <h5 className="font-cormorant font-bold text-[26px] leading-[34px] tracking-normal text-center uppercase text-[#FCF9F5] flex-1">
                                            {step.title}
                                        </h5>
                                        <p className="font-avenir font-normal text-[20px] leading-[26px] tracking-[0px] text-center text-[#FCF9F5] flex-1">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default HowWork
