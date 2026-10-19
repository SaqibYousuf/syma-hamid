import Image from 'next/image'
import React from 'react'
import Container from './container'
import { FaFacebook, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { ArrowRight, CopyrightIcon } from 'lucide-react'

function Footer() {
    return (
        <div className="relative">
            <Image fill src="/images/footer-bg.png" className="object-cover" />
            <Container>
                <div>
                    <div className="grid grid-cols-3 divide-x divide-[#A67539]">
                        <div className='flex items-center'>
                            <Image src="/images/footer-logo.png" alt="Footer Logo" width={408} height={86} className="h-[75px] w-auto" />
                        </div>
                        <div className='flex items-center justify-center'>
                            <div>
                                <h4 className="font-avenir font-normal text-[24px]  tracking-[0px] text-center text-white">Deeper Insight. Lasting Change.</h4>
                                <div className="flex gap-4 justify-center mt-5">
                                    <div className="w-14 aspect-square rounded-full cursor-pointer border border-[#A67539] flex items-center justify-center">
                                        <FaFacebookF size={21} color="white" />
                                    </div>
                                    <div className="w-14 aspect-square rounded-full cursor-pointer border border-[#A67539] flex items-center justify-center">
                                        <FaInstagram size={21} color="white" />
                                    </div>
                                    <div className="w-14 aspect-square rounded-full cursor-pointer border border-[#A67539] flex items-center justify-center">
                                        <FaLinkedinIn size={21} color="white" />
                                    </div>
                                    <div className="w-14 aspect-square rounded-full cursor-pointer border border-[#A67539] flex items-center justify-center">
                                        <FaXTwitter size={21} color="white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-end'>
                            <button className="border-[#A67539] border py-3 px-5 cursor-pointer rounded-[10px] text-[white] gap-2 flex items-center justify-center]">
                                <p className='font-cormorant font-semibold text-xl  tracking-[0px] align-middle'>Begin your journey</p>
                                <ArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className='border-t border-t-[#A6753980] mt-20'>
                        <div className='flex items-center justify-center py-5'>
                            <p className='flex items-center gap-3 font-avenir font-normal text-lg  tracking-[0px] text-center text-white uppercase'>
                                <span color='text-[#A67539]'>
                                    <CopyrightIcon color="#A67539" />
                                </span>
                                2026 Syma Hamid.  All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer
