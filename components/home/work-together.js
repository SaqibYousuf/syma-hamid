import Image from 'next/image'
import React from 'react'
import Container from '../constants/container'
import { CounsellingIcon, TherapyIcon } from '../constants/icons'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function WorkTogether() {
    return (
        <div className="bg-[#F9F9F9] py-20 relative">
            <Image fill src="/images/work-bg.png" className='object-cover' />
            <div className='absolute bg-[#1C2E2266] bg-opacity-40'></div>
            <div className='relative'>
                <Container>
                    <div>
                        <div className='max-w-[1288px] mx-auto flex flex-col items-center justify-center gap-[22px] text-center'>
                            <p className='font-avenir font-medium text-[22px] tracking-[3px] uppercase  text-[#FAF6EF] opacity-70'>
                                Ways We Can Work Together
                            </p>
                            <h2 className="font-cormorant font-semibold text-[66px] leading-[84px] tracking-[0] capitalize text-[#FAF6EF]">
                                Support Tailored to
                                <br />Where You Are.
                            </h2>
                            <p className='font-avenir font-normal text-[23px] leading-[36px] tracking-[0px] text-[#FAF6EF] opacity-70'>
                                Every person arrives with a different story. Explore counselling and therapeutic approaches designed to support greater clarity, understanding and meaningful change.
                            </p>
                            <div className='flex items-center justify-center gap-[30px] max-w-[400px] w-full'>
                                <div className='bg-[#FAF6EF] rounded-[12px] p-1.5 w-full flex items-center justify-between'>
                                    <button className="bg-[#A67539] h-[48px] w-1/2 rounded-[6px] font-cormorant font-bold text-[18px] leading-[20px] tracking-[0.35px] text-center text-white flex items-center justify-center gap-2">
                                        <CounsellingIcon /> Counselling
                                    </button>
                                    <button className=" h-[48px] w-1/2 rounded-[6px] font-cormorant font-bold text-[18px] leading-[20px] tracking-[0.35px] text-center flex items-center justify-center gap-2">
                                        <TherapyIcon /> Therapy
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-10 mt-20">
                            <div className="bg-[#FBF8F3] rounded-[24px] overflow-hidden flex flex-col">
                                <Image src="/images/work-1.png" width={400} height={230} className="w-full object-cover aspect-[400/230]" />
                                <div className="p-[21px] flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className='text-[#1C2E22] font-cormorant font-bold text-[26.2px] leading-[130%] tracking-[0]'>
                                            Individual Therapy
                                        </h4>
                                        <p className="font-avenir font-normal text-[15.28px] leading-[135%] tracking-[0]">One-to-one support designed to help you understand emotions, improve your mood, recognise patterns and create practical changes that support your individual goals.</p>
                                    </div>
                                    <Link href={'#'} className='text-[#A67539] font-urbanist font-bold text-[15.28px] leading-[21.83px] tracking-[0.38px] flex items-center gap-2 mt-[10px] underline'>
                                        Explore Individual Therapy <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-[#FBF8F3] rounded-[24px] overflow-hidden flex flex-col">
                                <Image src="/images/couple.png" width={400} height={230} className="w-full object-cover aspect-[400/230]" />
                                <div className="p-[21px] flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className='text-[#1C2E22] font-cormorant font-bold text-[26.2px] leading-[130%] tracking-[0]'>
                                            Couples Therapy
                                        </h4>
                                        <p className="font-avenir font-normal text-[15.28px] leading-[135%] tracking-[0]">A collaborative space for couples to explore communication, intimacy, co-parenting and relationship patterns while creating greater clarity and connection.</p>
                                    </div>
                                    <Link href={'#'} className='text-[#A67539] font-urbanist font-bold text-[15.28px] leading-[21.83px] tracking-[0.38px] flex items-center gap-2 mt-[10px] underline'>
                                        Explore Couples Therapy <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-[#FBF8F3] rounded-[24px] overflow-hidden flex flex-col">
                                <Image src="/images/online.png" width={400} height={230} className="w-full object-cover aspect-[400/230]" />
                                <div className="p-[21px] flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className='text-[#1C2E22] font-cormorant font-bold text-[26.2px] leading-[130%] tracking-[0]'>
                                            Online Therapy / Counseling
                                        </h4>
                                        <p className="font-avenir font-normal text-[15.28px] leading-[135%] tracking-[0]">Flexible online counselling and therapy sessions available regardless of location, arranged around your availability and time zone.</p>
                                    </div>
                                    <Link href={'#'} className='text-[#A67539] font-urbanist font-bold text-[15.28px] leading-[21.83px] tracking-[0.38px] flex items-center gap-2 mt-[10px] underline'>
                                        Explore Online Therapy / Counseling <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#FBF8F3] rounded-[24px] overflow-hidden flex flex-col">
                                <Image src="/images/nlp.png" width={400} height={230} className="w-full object-cover aspect-[400/230]" />
                                <div className="p-[21px] flex-1 flex flex-col justify-between">
                                    <div>

                                        <h4 className='text-[#1C2E22] font-cormorant font-bold text-[26.2px] leading-[130%] tracking-[0]'>
                                            NLP Sessions
                                        </h4>
                                        <p className="font-avenir font-normal text-[15.28px] leading-[135%] tracking-[0]">Neuro Linguistic Programming techniques are combined with psychological insight to support behavioural change, communication, personal development and improved performance.</p>
                                    </div>
                                    <Link href={'#'} className='text-[#A67539] font-urbanist font-bold text-[15.28px] leading-[21.83px] tracking-[0.38px] flex items-center gap-2 mt-[10px] underline'>
                                        Explore NLP Sessions <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default WorkTogether
