import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Briefcase, Cloud, Code, Zap, Award, Users, ChevronsRight, Menu, X } from 'lucide-react';

// --- IMPORT LOGOS ---
// **Updated**: Importing logos from the `public` directory.
// This works because files in `public` are served from the root of the site.
import amexLogo from '/amex.svg';
import barkboxLogo from '/barkbox.svg';
import frontdoorLogo from '/frontdoor.png';
import powerfleetLogo from '/powerfleet.png';
import nomisLogo from '/nomis.svg';
import rocheLogo from '/roche.svg';
import smartbearLogo from '/smartbear.svg';


// --- I18N CONTENT ---
const translations = {
    en: {
        nav: {
            services: 'Services',
            about: 'About Us',
            clients: 'Our Experience',
        },
        hero: {
            title: 'Modern Solutions for Your Business Growth',
            subtitle: 'Axis Consultancy specializes in Web App Development, Cloud Migrations, and Enterprise Automation, leveraging cutting-edge Google technologies to drive your success.',
            cta: 'Contact Us on WhatsApp',
        },
        services: {
            title: 'Our Core Services',
            subtitle: 'Tailored solutions designed to solve your most complex challenges.',
            list: [
                { title: 'Web App Development', description: 'We build scalable, high-performance web applications that provide seamless user experiences and drive business value.' },
                { title: 'Cloud Migrations', description: 'Effortlessly migrate your infrastructure to the cloud with our expert guidance, ensuring security, scalability, and cost-efficiency.' },
                { title: 'CI/CD & DevOps', description: 'Streamline your development lifecycle with our CI/CD and DevOps consultancy, accelerating delivery and improving quality.' },
                { title: 'Enterprise Automations', description: 'Boost productivity and reduce operational costs by automating your key business processes with our intelligent solutions.' },
            ],
        },
        about: {
            title: 'Why Choose Axis Consultancy?',
            subtitle: 'Experience and expertise you can trust.',
            points: [
                { title: 'Backed by Google Technology', description: 'All our implementations are built on the robust and innovative foundation of Google Cloud Platform and Google Workspace.' },
                { title: 'Google Certified Staff', description: 'Our team consists of Google-certified professionals, ensuring the highest standard of expertise and quality in every project.' },
                { title: '15+ Years of Industry Experience', description: 'With over a decade and a half of experience, we bring a wealth of knowledge and a proven track record of success.' },
            ],
        },
        clients: {
            title: 'Experience Forged at Industry Leaders',
            subtitle: "Our consultancy is built on a foundation of direct experience with some of the world's most recognized brands, bringing that wealth of knowledge to every project.",
        },
        whatsapp: {
            tooltip: 'Chat with us on WhatsApp',
            modalTitle: 'Human Verification',
            modalSubtitle: 'Please complete the verification step to continue.',
            buttonContinue: 'Continue to WhatsApp',
            buttonCancel: 'Cancel',
            verifying: 'Verifying...',
        },
        footer: {
            copyright: `© ${new Date().getFullYear()} Axis Consultancy. All Rights Reserved.`,
        },
    },
    es: {
        nav: {
            services: 'Servicios',
            about: 'Nosotros',
            clients: 'Nuestra Experiencia',
        },
        hero: {
            title: 'Soluciones Modernas para el Crecimiento de su Negocio',
            subtitle: 'Axis Consultancy se especializa en Desarrollo de Aplicaciones Web, Migraciones a la Nube y Automatización Empresarial, utilizando tecnologías de Google de vanguardia para impulsar su éxito.',
            cta: 'Contáctenos por WhatsApp',
        },
        services: {
            title: 'Nuestros Servicios Principales',
            subtitle: 'Soluciones a medida diseñadas para resolver sus desafíos más complejos.',
            list: [
                { title: 'Desarrollo de Aplicaciones Web', description: 'Construimos aplicaciones web escalables y de alto rendimiento que ofrecen experiencias de usuario fluidas y generan valor comercial.' },
                { title: 'Migraciones a la Nube', description: 'Migre su infraestructura a la nube sin esfuerzo con nuestra guía experta, garantizando seguridad, escalabilidad y rentabilidad.' },
                { title: 'CI/CD y DevOps', description: 'Optimice su ciclo de vida de desarrollo con nuestra consultoría en CI/CD y DevOps, acelerando la entrega y mejorando la calidad.' },
                { title: 'Automatización Empresarial', description: 'Aumente la productividad y reduzca los costos operativos automatizando sus procesos comerciales clave con nuestras soluciones inteligentes.' },
            ],
        },
        about: {
            title: '¿Por Qué Elegir Axis Consultancy?',
            subtitle: 'Experiencia y conocimientos en los que puede confiar.',
            points: [
                { title: 'Respaldado por Tecnología de Google', description: 'Todas nuestras implementaciones se basan en la base sólida e innovadora de Google Cloud Platform y Google Workspace.' },
                { title: 'Personal Certificado por Google', description: 'Nuestro equipo está formado por profesionales certificados por Google, lo que garantiza el más alto nivel de experiencia y calidad en cada proyecto.' },
                { title: 'Más de 15 Años de Experiencia en la Industria', description: 'Con más de una década y media de experiencia, aportamos una gran cantidad de conocimientos y un historial comprobado de éxito.' },
            ],
        },
        clients: {
            title: 'Experiencia Forjada en Líderes de la Industria',
            subtitle: 'Nuestra consultoría se basa en una fundación de experiencia directa con algunas de las marcas más reconocidas del mundo, aportando esa riqueza de conocimientos a cada proyecto.',
        },
        whatsapp: {
            tooltip: 'Chatea con nosotros en WhatsApp',
            modalTitle: 'Verificación Humana',
            modalSubtitle: 'Por favor, complete el paso de verificación para continuar.',
            buttonContinue: 'Continuar a WhatsApp',
            buttonCancel: 'Cancelar',
            verifying: 'Verificando...',
        },
        footer: {
            copyright: `© ${new Date().getFullYear()} Axis Consultancy. Todos los Derechos Reservados.`,
        },
    },
};

// --- HELPER & NEW COMPONENTS ---

const WhatsAppIcon = (props) => (
    <svg viewBox="0 0 32 32" {...props}><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.044-.53-.044-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.38.33-.85.33-1.515.24-1.662-.09-.144-.33-.215-.6-.215z" fill="currentColor"></path><path d="M16 0A16 16 0 1 0 16 32 16 16 0 0 0 16 0zM22.51 18.32c.338 1.13.243 2.285-.276 3.35-.393.81-.97 1.4-1.636 1.857a5.27 5.27 0 0 1-2.242.793c-.695.105-1.4.15-2.102.15-3.02 0-5.805-1.15-7.898-3.24a11.525 11.525 0 0 1-3.214-7.9c0-3.112 1.26-6.01 3.35-8.1a11.34 11.34 0 0 1 8.1-3.35c3.11 0 6.01 1.25 8.1 3.35s3.35 4.99 3.35 8.1c0 1.4-.25 2.77-.73 4.090z" fill="currentColor"></path></svg>
);

const VerificationModal = ({ isOpen, onClose, onVerified, content }) => {
    const [isVerified, setIsVerified] = useState(false);
    const recaptchaRef = useRef();
    const siteKey = "6LerKqArAAAAAG2-xJ5_Wuh4GQhJW5No32duU3Z6"; // **UPDATED** Your new v2 site key

    useEffect(() => {
        // Reset reCAPTCHA when modal opens or closes
        if (!isOpen) {
            setIsVerified(false);
        }
        recaptchaRef.current?.reset();
    }, [isOpen]);

    if (!isOpen) return null;

    const handleRecaptchaChange = (token) => {
        if (token) {
            setIsVerified(true);
        }
    };

    const handleRecaptchaExpire = () => {
        setIsVerified(false);
    }

    const handleContinue = () => {
        onVerified();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">{content.modalTitle}</h3>
                <p className="text-gray-600 text-center mb-6">{content.modalSubtitle}</p>

                <div className="flex items-center justify-center my-6">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={siteKey}
                        onChange={handleRecaptchaChange}
                        onExpired={handleRecaptchaExpire}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        onClick={handleContinue}
                        disabled={!isVerified}
                        className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        {isVerified ? content.buttonContinue : content.verifying}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        {content.buttonCancel}
                    </button>
                </div>
            </div>
        </div>
    );
};

const WhatsAppButton = ({ onClick, content }) => (
    <button onClick={onClick} title={content.tooltip} className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg hover:bg-green-600 transform hover:scale-110 transition-all duration-300 z-40">
        <WhatsAppIcon className="w-8 h-8" />
    </button>
);

// --- MAIN SECTIONS ---

const Header = ({ lang, setLang, content, isMenuOpen, setIsMenuOpen }) => {
    const navLinks = [
        { href: '#services', text: content.nav.services },
        { href: '#about', text: content.nav.about },
        { href: '#clients', text: content.nav.clients },
    ];

    const handleScroll = (e, target) => {
        e.preventDefault();
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#" className="flex items-center space-x-2">
                    <img src="/axis.svg" alt="Axis Consultancy Logo" className="h-10 w-auto" />
                </a>
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">{link.text}</a>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden text-sm">
                        <button onClick={() => setLang('en')} className={`px-3 py-1 transition-colors duration-300 ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>EN</button>
                        <button onClick={() => setLang('es')} className={`px-3 py-1 transition-colors duration-300 ${lang === 'es' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>ES</button>
                    </div>
                    <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button></div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
                    <nav className="flex flex-col items-center space-y-4 p-6">
                        {navLinks.map(link => <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium text-lg">{link.text}</a>)}
                    </nav>
                </div>
            )}
        </header>
    );
};

const HeroSection = ({ content, onCtaClick }) => (
    <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">{content.hero.title}</h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-8">{content.hero.subtitle}</p>
            <button onClick={onCtaClick} className="inline-flex items-center gap-3 bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg">
                <WhatsAppIcon className="w-6 h-6" />
                {content.hero.cta}
            </button>
        </div>
    </section>
);

const ServicesSection = ({ content }) => {
    const icons = [<Code size={32} />, <Cloud size={32} />, <ChevronsRight size={32} />, <Zap size={32} />];
    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{content.services.title}</h2>
                    <p className="text-lg text-gray-600 mt-2">{content.services.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {content.services.list.map((service, index) => (
                        <div key={service.title} className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mb-6">{icons[index]}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutSection = ({ content }) => {
    const icons = [<Award size={32} />, <Users size={32} />, <Briefcase size={32} />];
    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{content.about.title}</h2>
                    <p className="text-lg text-gray-600 mt-2">{content.about.subtitle}</p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {content.about.points.map((point, index) => (
                        <div key={point.title} className="text-center p-6">
                            <div className="flex justify-center mb-4"><div className="bg-green-100 text-green-600 rounded-full h-16 w-16 flex items-center justify-center">{icons[index]}</div></div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{point.title}</h3>
                            <p className="text-gray-600">{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ClientsSection = ({ content }) => {
    const clients = [
        { name: "American Express", logo: amexLogo },
        { name: "Barkbox", logo: barkboxLogo },
        { name: "Powerfleet (formerly FleetComplete)", logo: powerfleetLogo },
        { name: "Roche", logo: rocheLogo },
        { name: "FrontDoor Inc.", logo: frontdoorLogo },
        { name: "Nomis Solutions", logo: nomisLogo },
        { name: "SmartBear", logo: smartbearLogo },
    ];
    return (
        <section id="clients" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{content.clients.title}</h2>
                    <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">{content.clients.subtitle}</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-16">
                    {clients.map(client => (
                        <a key={client.name} href="#" onClick={(e) => e.preventDefault()} title={client.name} className="grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300">
                            <img src={client.logo} alt={`${client.name} logo`} className="h-9 md:h-12 w-auto" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = ({ content }) => (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center"><p>{content.footer.copyright}</p></div>
    </footer>
);

// --- MAIN APP COMPONENT ---
export default function App() {
    const [lang, setLang] = useState('en');
    const [content, setContent] = useState(translations.en);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const whatsappNumber = "523321924234";

    useEffect(() => {
        setContent(translations[lang]);
        document.documentElement.lang = lang;
    }, [lang]);

    const handleOpenWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="font-sans text-gray-800 bg-white">
            <Header lang={lang} setLang={setLang} content={content} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main>
                <HeroSection content={content} onCtaClick={() => setIsModalOpen(true)} />
                <ServicesSection content={content} />
                <AboutSection content={content} />
                <ClientsSection content={content} />
            </main>
            <Footer content={content} />
            <WhatsAppButton onClick={() => setIsModalOpen(true)} content={content.whatsapp} />
            <VerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onVerified={handleOpenWhatsApp} content={content.whatsapp} />
        </div>
    );
}
