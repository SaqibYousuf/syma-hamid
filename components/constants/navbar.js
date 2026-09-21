import React from 'react'
import Container from './container'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const links  = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About',
        href: '/'
    },
    {
        name: 'Services',
        href: '/'
    },
    {
        name: 'Inner Alchemy',
        href: '/'
    },
    {
        name: 'Assessments',
        href: '/'
    },
    {
        name: 'Wheel of Emotions',
        href: '/'
    },
    {
        name: 'Blog',
        href: '/'
    },
    {
        name: 'Contact',
        href: '/'
    },
]

function Navbar() {
    return (
        <div className='bg-[#FBF8F3]'>
            <Container>
                <div className='flex justify-between items-center py-4'>
                    <div>
                        <Image src={'/images/logo.png'} alt='Logo' width={275} height={53} className='h-[45px] w-auto'/>
                    </div>
                    <div className='flex items-center justify-center gap-6'>
                        {links.map((link, index) => (
                            <a key={index} href={link.href} className='font-urbanist font-medium text-lg leading-[19.5px] tracking-[0.32px] text-[#A67539]'>
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div>
                        <button className='font-cormorant font-semibold text-lg leading-[32px] tracking-[0px] bg-[#223329] rounded-2xl text-white flex items-center justify-center gap-[10px] px-6 py-3'>
                            Book an Appointment
                            <ArrowRight size={16} color='#fff'/>
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar
