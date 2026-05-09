// src/pages/About.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FaLeaf, FaUtensils, FaCheckCircle, FaFlask, FaWhatsapp, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import any from '../assets/any (1).png'
import any1 from '../assets/any (2).png'
import any2 from '../assets/any (3).png'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } }
}

const AboutSteps = () => {
    const { t } = useTranslation()
    return [
        { n: 1, title: t('step1Title'), desc: t('step1Desc') },
        { n: 2, title: t('step2Title'), desc: t('step2Desc') },
        { n: 3, title: t('step3Title'), desc: t('step3Desc') },
    ]
}



function About() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
            alert('Please fill in all required fields.')
            return
        }
        const text = `*New Message from Al-Labban Website*%0A%0A` +
            `*Name:* ${form.name}%0A` +
            `*Phone:* ${form.phone}%0A` +
            `*Email:* ${form.email || 'Not provided'}%0A` +
            `*Message:*%0A${form.message}`
        window.open(`https://wa.me/201095592832?text=${text}`, '_blank')
        setForm({ name: '', phone: '', email: '', message: '' })
    }

    return (
        <div className='bg-white text-gray-900'>

            {/* ── HERO ── */}
            <div className='relative min-h-[420px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex items-center px-8 sm:px-16 py-20 overflow-hidden'>
                {/* Blue accent glow to replace the orange one */}
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.15),transparent_60%)]' />

                <motion.div className='relative z-10 max-w-2xl' variants={fadeUp} initial='hidden' animate='visible'>
                    <span className='inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/85 text-xs font-semibold px-4 py-1.5 rounded-full mb-5'>
                        {t('about.heroBadge') || 'Premium Home Appliances'}
                    </span>

                    <h1 className='text-white font-bold leading-tight mb-4' style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2rem,5vw,3.4rem)' }}>
                        Quality You Can <span className='text-blue-400'>Trust</span>:<br />
                        Smart Solutions for<br /> Your Modern Home
                    </h1>

                    <p className='text-white/65 text-sm leading-relaxed mb-8 max-w-lg'>
                        Discover a curated selection of high-performance electronics at Al-Hamed Center. Located in Al-Rawda, we provide the finest appliances with certified quality and expert support.
                    </p>

                    <div className='flex gap-4 flex-wrap'>
                        <button onClick={() => navigate('/products')}
                            className='bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all hover:-translate-y-1'>
                            Explore Products
                        </button>
                        <button className='border border-white/40 hover:border-white text-white font-semibold px-8 py-3 rounded-xl transition-all'>
                            Our Services
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* ── PLACE STORY ── */}
            {/* ── PLACE STORY (AL-HAMED CENTER) ── */}
            <div className='py-20 px-8 sm:px-16 bg-white'>
                <div className='text-center mb-14'>
                    <h2 className='text-3xl sm:text-4xl font-bold' style={{ fontFamily: 'Playfair Display,serif' }}>
                        {t('storyTitle') || 'Our Legacy'}
                    </h2>
                    <div className='w-12 h-1 bg-blue-600 rounded-full mx-auto mt-3' />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-16 items-center max-w-5xl mx-auto'>
                    {/* Visual Placeholder for the Center/Showroom */}
                    <motion.div
                        className='h-72 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-800 to-blue-900 flex items-center justify-center text-6xl'
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: .7 }}
                    >
                        <span className='opacity-20 grayscale'>🏘️</span>
                        <img src={any} alt="Al-Hamed Center Showroom" className='w-full h-full object-cover' />
                    </motion.div>

                    <motion.div
                        className='flex flex-col gap-4'
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: .7, delay: .15 }}
                    >
                        <span className='text-blue-600 text-xs font-bold tracking-widest uppercase'>
                            {t('whyAlRawda') || 'Established in Al-Rawda'}
                        </span>
                        <h3 className='text-3xl font-bold' style={{ fontFamily: 'Playfair Display,serif' }}>
                            {t('centerTitle') || 'A Tradition of Reliability'}
                        </h3>
                        <p className='text-gray-500 text-sm leading-relaxed'>
                            {t('centerDesc') || 'Al-Hamed Center has been a cornerstone of the Al-Rawda community for years. We specialize in providing the latest home technologies - from advanced refrigeration systems to high-efficiency laundry solutions - for Damietta families.'}
                        </p>
                        <span className='inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-2 rounded-lg w-fit'>
                            {t('centerBadge') || 'Al-Rawda’s Go-To Appliance Hub'}
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* ── QUALITY ── */}
            <div className='py-20 px-8 sm:px-16 bg-gray-50'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-16 items-center max-w-5xl mx-auto'>
                    <div className='h-72 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-100 to-amber-300 flex items-center justify-center text-6xl'>
                        <img src={any1} alt="Quality" className='w-full h-full object-cover' />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-3xl font-bold' style={{ fontFamily: 'Playfair Display,serif' }}>{t('committedToQuality')}</h3>
                        <p className='text-gray-500 text-sm leading-relaxed'>{t('qualityControl')}</p>
                        {[
                            { icon: <FaLeaf color="#f97316" />, title: '100% Natural', sub: 'No preservatives or vegetable oils' },
                            { icon: <FaFlask color="#f97316" />, title: 'Lab Tested Daily', sub: 'Every batch verified before shipping' },
                        ].map((b, i) => (
                            <div key={i} className='flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4'>
                                <div className='w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center'>{b.icon}</div>
                                <div>
                                    <p className='font-semibold text-sm'>{b.title}</p>
                                    <p className='text-xs text-gray-400'>{b.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PROCESS ── */}
            <div className='py-20 px-8 sm:px-16 bg-[#0f1e35]'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-16 items-center max-w-5xl mx-auto'>
                    <div className='relative h-80 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1a2a4a] to-[#2a4a7a] flex items-center justify-center text-7xl'>
                        <img src={any2} alt="Processing" className='w-full h-full object-cover' />
                        <div className='absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 flex items-center gap-2'>
                            <span className='text-orange-500 font-black text-xl' style={{ fontFamily: 'Playfair Display,serif' }}>0%</span>
                            <span className='text-xs font-semibold text-gray-700'>Preservatives</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h2 className='text-white text-3xl font-bold' style={{ fontFamily: 'Playfair Display,serif' }}>{t('fromFarmToTable')}<br />{t('farm')} {t('table')}</h2>
                        {AboutSteps().map(s => (
                            <div key={s.n} className='flex gap-4'>
                                <div className='w-9 h-9 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0'>{s.n}</div>
                                <div>
                                    <p className='text-white font-semibold text-sm mb-1'>{s.title}</p>
                                    <p className='text-white/50 text-xs leading-relaxed'>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                        <div className='bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden'>
                            <div className='h-full w-[88%] bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full' />
                        </div>
                        <div className='flex justify-between text-xs text-white/40'>
                            <span>{t('farm')}</span><strong className='text-white'>{t('table')}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── VALUES ── */}
            <div className='py-20 px-8 sm:px-16 bg-white'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl sm:text-4xl font-bold' style={{ fontFamily: 'Playfair Display,serif' }}>{t('whyChooseAlLaban')}</h2>
                    <div className='w-12 h-1 bg-orange-500 rounded-full mx-auto mt-3' />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                    {[
                        { icon: <FaUtensils color="#f97316" size={22} />, title: t('authenticTaste'), desc: t('authenticDesc') },
                        { icon: <FaLeaf color="#f97316" size={22} />, title: t('fullTransparency'), desc: t('transparencyDesc') },
                        { icon: <FaCheckCircle color="#f97316" size={22} />, title: t('trustedQuality'), desc: t('trustedDesc') },
                    ].map((v, i) => (
                        <motion.div key={i}
                            className='flex flex-col items-center text-center gap-4 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300'
                            whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: .3 }}>
                            <div className='w-14 h-14 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center'>{v.icon}</div>
                            <h4 className='font-bold text-base' style={{ fontFamily: 'Playfair Display,serif' }}>{v.title}</h4>
                            <p className='text-gray-500 text-sm leading-relaxed'>{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── CONTACT FORM ── */}
            <div className='py-20 px-8 sm:px-16 bg-gray-50'>
                <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start'>
                    <motion.div variants={fadeUp} initial='hidden' whileInView='visible' viewport={{ once: true }}>
                        <span className='text-orange-500 text-xs font-bold tracking-widest mb-2 block'>{t('getInTouch')}</span>
                        <h2 className='text-3xl sm:text-4xl font-bold mb-4' style={{ fontFamily: 'Playfair Display,serif' }}>{t('sendMessage')}</h2>
                        <p className='text-gray-500 text-sm leading-relaxed mb-6 max-w-md'>
                            {t('contactDesc') || 'Have questions or need assistance? Send us a message and our team will get back to you as soon as possible.'}
                        </p>
                        <div className='flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 w-fit'>
                            <div className='w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center'>
                                <FaWhatsapp size={18} />
                            </div>
                            <div>
                                <p className='text-xs text-green-700 font-semibold'>WhatsApp</p>
                                <p className='text-sm font-bold text-gray-800'>+20 109 559 2832</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form onSubmit={handleSubmit} className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm'
                        variants={fadeUp} initial='hidden' whileInView='visible' viewport={{ once: true }} transition={{ delay: .1 }}>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-semibold text-gray-500 tracking-wider'>FULL NAME *</label>
                                <input name='name' type='text' placeholder='Enter your name' value={form.name} onChange={handleChange}
                                    className='border-b border-gray-200 focus:border-orange-400 py-2 text-sm outline-none bg-transparent transition-colors' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-semibold text-gray-500 tracking-wider'>PHONE NUMBER *</label>
                                <input name='phone' type='tel' placeholder='010XXXXXXXX' value={form.phone} onChange={handleChange}
                                    className='border-b border-gray-200 focus:border-orange-400 py-2 text-sm outline-none bg-transparent transition-colors' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 mb-4'>
                            <label className='text-xs font-semibold text-gray-500 tracking-wider'>EMAIL</label>
                            <input name='email' type='email' placeholder='your@email.com' value={form.email} onChange={handleChange}
                                className='border-b border-gray-200 focus:border-orange-400 py-2 text-sm outline-none bg-transparent transition-colors' />
                        </div>
                        <div className='flex flex-col gap-1 mb-6'>
                            <label className='text-xs font-semibold text-gray-500 tracking-wider'>MESSAGE *</label>
                            <textarea name='message' placeholder='How can we help you?' rows={4} value={form.message} onChange={handleChange}
                                className='border-b border-gray-200 focus:border-orange-400 py-2 text-sm outline-none bg-transparent transition-colors resize-none' />
                        </div>
                        <button type='submit'
                            className='bg-[#0f1e35] hover:bg-[#1a3a5c] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-1 flex items-center gap-2'>
                            <FaWhatsapp size={16} /> {t('sendMessage') || 'Send Message'}
                        </button>
                    </motion.form>
                </div>
            </div>

            {/* ── GOOGLE MAP SECTION ── */}
            <div className='py-20 px-8 sm:px-16 bg-white'>
                <div className='max-w-5xl mx-auto'>
                    <div className='text-center mb-12'>
                        <span className='text-orange-500 text-xs font-bold tracking-widest mb-2 block'>{t('visitUs')}</span>
                        <h2 className='text-3xl sm:text-4xl font-bold' style={{ fontFamily: 'Playfair Display,serif' }}>{t('ourLocation')}</h2>
                        <div className='w-12 h-1 bg-orange-500 rounded-full mx-auto mt-3' />
                        <p className='text-gray-500 text-sm mt-4'>{t('locationDesc')}</p>
                    </div>

                    <motion.div
                        className='w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white'
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <iframe
                            title="Al-Labban Location"
                            src="https://maps.google.com/maps?q=31.3244,31.7638&z=15&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8'>
                        <div className='bg-gray-50 p-6 rounded-2xl flex items-center gap-4'>
                            <div className='w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600'>
                                <a href="https://maps.google.com/maps?q=31.3244,31.7638&z=15&output=embed" target="_blank" rel="noopener noreferrer">
                                    <FaMapMarkerAlt size={20} />
                                </a>
                            </div>
                            <div>
                                <p className='font-bold text-sm'>{t('address')}</p>
                                <p className='text-xs text-gray-500'>{t('addressValue')}</p>
                            </div>
                        </div>
                        <div className='bg-gray-50 p-6 rounded-2xl flex items-center gap-4'>
                            <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600'>
                                <FaClock size={20} />
                            </div>
                            <div>
                                <p className='font-bold text-sm'>{t('workingHours')}</p>
                                <p className='text-xs text-gray-500'>Sat - Thu: 06:00 AM - 12:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CTA ── */}
            <div className='py-20 px-8 bg-gray-50 text-center'>
                <div className='max-w-xl mx-auto flex flex-col items-center gap-5'>
                    <h2 className='text-3xl sm:text-4xl font-bold' style={{ fontFamily: 'Playfair Display,serif' }}>Ready to Taste the Difference?</h2>
                    <p className='text-gray-500 text-sm leading-relaxed'>Thousands of families have discovered the real taste of Damietta dairy. Fresh, natural, and delivered to your door.</p>
                    <button onClick={() => navigate('/categories')}
                        className='bg-gray-900 hover:bg-gray-700 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 flex items-center gap-2'>
                        Browse Our Products →
                    </button>
                </div>
            </div>

        </div>
    )
}

export default About