import React from 'react'
import Layout from '@/components/layout/Layout'
import { useTheme } from '@/context/ThemeContext'
import LeftSection from '@/components/pages/profile/LeftSection'

const Profile = ({ children, pageTitle }) => {
    const { isDarkMode } = useTheme();
    return (
        <Layout>
            <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className='flex justify-center items-start max-w-[1440px] flex-col p-4 gap-4 md:flex-row'>
                    <LeftSection pageTitle={pageTitle} />
                    <div
                        className={`w-full md:w-[60vw] lg:w-[70vw] h-auto rounded-xl flex flex-col p-4 gap-4 text-left border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                            }`}>
                        {children}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Profile