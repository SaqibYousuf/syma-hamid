import React from 'react'
import Container from '../constants/container'
import { AssesmentIcon, Brain, HandsIcon, LotusFlower, LotusSolidIcon, LotusTriangleIcon, PlantIcon } from '../constants/icons'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function Support() {
    return (
        <div className="bg-[#FFF6E2] py-20">
            <Container>
                <div>
                    <div className="w-full flex items-end gap-10">
                        <div className='w-[33%]'>
                            <p className='font-avenir font-medium text-[22px] leading-[76.97px] tracking-[3px] uppercase  text-[#1C2E22]'>
                                how can i support you?
                            </p>
                            <h2 className="font-cormorant font-semibold text-[66px] leading-[84px] tracking-[0] capitalize text-[#1C2E22]">
                                My Approach
                            </h2>
                            <p className='font-avenir font-normal text-[23px] leading-[36px] tracking-[0px] text-[#1C2E22]'>
                                i combine evidence-based psychological tools with neuro-linguistic programming to help you create meaningful, lasting change - at your own pace.
                            </p>
                            <Link href="#" className="font-cormorant font-semibold text-[30px] leading-[32px] tracking-[0px] capitalize underline flex items-center mt-5 gap-2">
                                <span className='underline text-[#1C2E22]'>Learn more about me</span> <ArrowRight />
                            </Link>
                        </div>
                        <div className="flex-1 grid grid-cols-4">
                            <div className='px-3 pt-10 border-l border-l-[#F0B75B] flex flex-col justify-center items-center gap-2'>
                                <Brain />
                                <h5 className="font-cormorant font-bold text-[24px] leading-[100%] tracking-[0] text-center capitalize text-[#1C2E22]">Evidence-Based Approach</h5>
                                <p className="font-avenir font-normal text-[16px] leading-[100%] tracking-[0] text-center text-[#1C2E22]">
                                    Rooted in psychology and neuroscience.
                                </p>
                            </div>
                            <div className='px-3 pt-10 border-l border-l-[#F0B75B] flex flex-col justify-center items-center gap-2'>
                                <HandsIcon />
                                <h5 className="font-cormorant font-bold text-[24px] leading-[100%] tracking-[0] text-center capitalize text-[#1C2E22]">Personalized Support</h5>
                                <p className="font-avenir font-normal text-[16px] leading-[100%] tracking-[0] text-center text-[#1C2E22]">
                                    Tailored to your unique journey and goals
                                </p>
                            </div>
                            <div className='px-3 pt-10 border-l border-l-[#F0B75B] flex flex-col justify-center items-center gap-2'>
                                <LotusFlower />
                                <h5 className="font-cormorant font-bold text-[24px] leading-[100%] tracking-[0] text-center capitalize text-[#1C2E22]">a safe, Compassionate Space</h5>
                                <p className="font-avenir font-normal text-[16px] leading-[100%] tracking-[0] text-center text-[#1C2E22]">
                                    Where you can be yourself, fully.
                                </p>
                            </div>
                            <div className='px-3 pt-10 border-l border-l-[#F0B75B] flex flex-col justify-center items-center gap-2'>
                                <PlantIcon />
                                <h5 className="font-cormorant font-bold text-[24px] leading-[100%] tracking-[0] text-center capitalize text-[#1C2E22]">Lasting Transformation</h5>
                                <p className="font-avenir font-normal text-[16px] leading-[100%] tracking-[0] text-center text-[#1C2E22]">
                                    Not just relief, but real change.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full grid grid-cols-3 mt-10 gap-[28px] mt-20'>
                        <div className='w-full  overflow-hidden  border border-[#F0B75B] rounded-[6px] overflow-hidden'>
                            <div className="w-full aspect-[553/186] relative overflow-hidden">
                                <Image fill src={'/images/assesment.png'} className='object-cover object-center' />
                            </div>
                            <div className='px-2 pb-10 -mt-[50px]'>
                                <div className='flex items-center flex-col justify-center gap-4'>
                                    <div className='relative w-[100px] aspect-square rounded-full border border-[#F0B75B] bg-[#1C2E22] flex items-center justify-center'>
                                        <AssesmentIcon />
                                    </div>
                                    <h5 className="font-cormorant font-bold text-[30.84px] leading-[34.96px] tracking-[0] text-center uppercase text-[#1C2E22]">Assessments</h5>
                                    <p className="font-avenir font-normal text-[22.62px] leading-[34.96px] tracking-[0px] text-center">
                                        Understand your patterns.
                                    </p>
                                    <div className='bg-[#F0B75B] h-0.5 w-[68px]' />
                                    <Link href="#" className="font-cormorant font-semibold text-[26.73px] leading-[32.9px] tracking-[0px] capitalize underline gap-2 flex items-center">
                                        <span className='underline text-[#1C2E22]'>Take an Assessment</span> <ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='w-full  overflow-hidden  border border-[#F0B75B] rounded-[6px] overflow-hidden'>
                            <div className="w-full aspect-[553/186] relative overflow-hidden">
                                <Image fill src={'/images/emotions.png'} className='object-cover object-center' />
                            </div>
                            <div className='px-2 pb-10 -mt-[50px]'>
                                <div className='flex items-center flex-col justify-center gap-4'>
                                    <div className='relative w-[100px] aspect-square rounded-full border border-[#F0B75B] bg-[#1C2E22] flex items-center justify-center'>
                                        <LotusSolidIcon />
                                    </div>
                                    <h5 className="font-cormorant font-bold text-[30.84px] leading-[34.96px] tracking-[0] text-center uppercase text-[#1C2E22]">Wheel of emotions</h5>
                                    <p className="font-avenir font-normal text-[22.62px] leading-[34.96px] tracking-[0px] text-center">
                                        Find words for what you’re feeling
                                    </p>
                                    <div className='bg-[#F0B75B] h-0.5 w-[68px]' />
                                    <Link href="#" className="font-cormorant font-semibold text-[26.73px] leading-[32.9px] tracking-[0px] capitalize underline gap-2 flex items-center">
                                        <span className='underline text-[#1C2E22]'>Explore the Wheel</span> <ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='w-full  overflow-hidden  border border-[#F0B75B] rounded-[6px] overflow-hidden'>
                            <div className="w-full aspect-[553/186] relative overflow-hidden">
                                <Image fill src={'/images/sessions.png'} className='object-cover object-center' />
                            </div>
                            <div className='px-2 pb-10 -mt-[50px]'>
                                <div className='flex items-center flex-col justify-center gap-4'>
                                    <div className='relative w-[100px] aspect-square rounded-full border border-[#F0B75B] bg-[#1C2E22] flex items-center justify-center'>
                                        <LotusTriangleIcon />
                                    </div>
                                    <h5 className="font-cormorant font-bold text-[30.84px] leading-[34.96px] tracking-[0] text-center uppercase text-[#1C2E22]">inner alchemy sessions</h5>
                                    <p className="font-avenir font-normal text-[22.62px] leading-[34.96px] tracking-[0px] text-center">
                                        Turn insight into meaningful change
                                    </p>
                                    <div className='bg-[#F0B75B] h-0.5 w-[68px]' />
                                    <Link href="#" className="font-cormorant font-semibold text-[26.73px] leading-[32.9px] tracking-[0px] capitalize underline gap-2 flex items-center">
                                        <span className='underline text-[#1C2E22]'>Learn More</span> <ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Support
