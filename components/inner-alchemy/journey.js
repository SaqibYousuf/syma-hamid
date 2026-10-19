import React from 'react'
import Container from '../constants/container'
import { AssesmentIcon, Brain, HandsIcon, LotusFlower, LotusSolidIcon, LotusTriangleIcon, PlantIcon } from '../constants/icons'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function Journey() {
    return (
        <div className="bg-[#FFF6E2] py-20">
            <Container>
                <div>
                    <div className="w-full flex items-end gap-10">
                        <div className='w-[50%]'>
                            <p className='font-avenir font-medium text-[22px] leading-[76.97px] tracking-[3px] uppercase  text-[#1C2E22]'>
                                The journey
                            </p>
                            <h2 className="font-cormorant font-semibold text-[66px] leading-[84px] tracking-[0] capitalize text-[#1C2E22]">
                                what we’ll work on
                            </h2>
                        </div>
                        <div className="flex-1 ">
                            <p className='font-avenir font-normal text-[22px] leading-[120%] tracking-[0px] text-[#1C2E22]'>
                                These four pillars guide our work together,
                                helping you move from insight to lasting change.
                            </p>
                        </div>
                    </div>

                    <div className='w-full grid grid-cols-4 mt-10 gap-[28px] mt-20'>
                        <div className='w-full  overflow-hidden  border border-[#F0B75B] rounded-[6px] flex flex-col'>
                            <div className="w-full h-[150px] relative overflow-hidden">
                                <Image fill src={'/images/assesment.png'} className='object-cover object-center' />
                            </div>
                            <div className='px-2 pb-10 -mt-[50px] h-full'>
                                <div className='flex items-center flex-col gap-2 flex-1 h-full justify-between'>
                                    <div className='relative w-[100px] aspect-square rounded-full border border-[#F0B75B] bg-[#1C2E22] flex items-center justify-center'>
                                        <Image src="/images/rootlock.svg" width={38} height={38} />
                                    </div>
                                    <h5 className="font-cormorant font-bold text-[30.84px] leading-[34.96px] tracking-[0] text-center uppercase text-[#1C2E22]">
                                        identify
                                        the root block</h5>
                                    <p className="font-avenir font-normal text-[22.62px] leading-[34.96px] tracking-[0px] text-center">
                                        Uncover what’s truly
                                        holding you back.
                                    </p>
                                    <div className='bg-[#F0B75B] h-0.5 w-[68px]' />
                                    <Link href="#" className="font-cormorant font-semibold text-[26.73px] leading-[32.9px] tracking-[0px] capitalize underline gap-2 flex items-center">
                                        <span className='underline text-[#1C2E22]'>Explore</span> <ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='w-full  overflow-hidden  border border-[#F0B75B] rounded-[6px] flex flex-col'>
                            <div className="w-full h-[150px] relative overflow-hidden">
                                <Image fill src={'/images/emotions.png'} className='object-cover object-center' />
                            </div>
                            <div className='px-2 pb-10 -mt-[50px] h-full'>
                                <div className='flex items-center flex-col gap-2 flex-1 h-full justify-between'>
                                    <div className='relative w-[100px] aspect-square rounded-full border border-[#F0B75B] bg-[#1C2E22] flex items-center justify-center'>
                                        <Image src="/images/lotus.svg" width={38} height={38} />
                                    </div>
                                    <h5 className="font-cormorant font-bold text-[30.84px] leading-[34.96px] tracking-[0] text-center uppercase text-[#1C2E22]">get unstuck</h5>
                                    <p className="font-avenir font-normal text-[22.62px] leading-[34.96px] tracking-[0px] text-center">
                                        Break patterns of self-doubt.
                                        perfectionism and self-sabotage.
                                    </p>
                                    <div className='bg-[#F0B75B] h-0.5 w-[68px]' />
                                    <Link href="#" className="font-cormorant font-semibold text-[26.73px] leading-[32.9px] tracking-[0px] capitalize underline gap-2 flex items-center">
                                        <span className='underline text-[#1C2E22]'>Explore</span> <ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='w-full  overflow-hidden  border border-[#F0B75B] rounded-[6px] flex flex-col'>
                            <div className="w-full h-[150px] relative overflow-hidden">
                                <Image fill src={'/images/sessions.png'} className='object-cover object-center' />
                            </div>
                            <div className='px-2 pb-10 -mt-[50px] h-full'>
                                <div className='flex items-center flex-col gap-2 flex-1 h-full justify-between'>
                                    <div className='relative w-[100px] aspect-square rounded-full border border-[#F0B75B] bg-[#1C2E22] flex items-center justify-center'>
                                        <Image src="/images/wind.svg" width={38} height={38} />
                                    </div>
                                    <h5 className="font-cormorant font-bold text-[30.84px] leading-[34.96px] tracking-[0] text-center uppercase text-[#1C2E22]">cognitive
                                        restructuring</h5>
                                    <p className="font-avenir font-normal text-[22.62px] leading-[34.96px] tracking-[0px] text-center">
                                        Shift persistent negative
                                        thoughts and doubts.
                                    </p>
                                    <div className='bg-[#F0B75B] h-0.5 w-[68px]' />
                                    <Link href="#" className="font-cormorant font-semibold text-[26.73px] leading-[32.9px] tracking-[0px] capitalize underline gap-2 flex items-center">
                                        <span className='underline text-[#1C2E22]'>Explore</span> <ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='w-full  overflow-hidden  border border-[#F0B75B] rounded-[6px] flex flex-col'>
                            <div className="w-full h-[150px] relative overflow-hidden">
                                <Image fill src={'/images/sessions.png'} className='object-cover object-center' />
                            </div>
                            <div className='px-2 pb-10 -mt-[50px] h-full'>
                                <div className='flex items-center flex-col gap-2 flex-1 h-full justify-between'>
                                    <div className='relative w-[100px] aspect-square rounded-full border border-[#F0B75B] bg-[#1C2E22] flex items-center justify-center'>
                                        <Image src="/images/flow.svg" width={38} height={38} />
                                    </div>
                                    <h5 className="font-cormorant font-bold text-[30.84px] leading-[34.96px] tracking-[0] text-center uppercase text-[#1C2E22]">Reconnect with your inner flow</h5>
                                    <p className="font-avenir font-normal text-[22.62px] leading-[34.96px] tracking-[0px] text-center">
                                        Build emotional resilience and move
                                        forward with greater eas and purpose.
                                    </p>
                                    <div className='bg-[#F0B75B] h-0.5 w-[68px]' />
                                    <Link href="#" className="font-cormorant font-semibold text-[26.73px] leading-[32.9px] tracking-[0px] capitalize underline gap-2 flex items-center">
                                        <span className='underline text-[#1C2E22]'>Explore</span> <ArrowRight />
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

export default Journey
