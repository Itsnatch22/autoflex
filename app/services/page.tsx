'use client'
import Image from "next/image";
import { FaCar, FaTools, FaShieldAlt, FaGasPump, FaKey } from "react-icons/fa";

export default function ServicesPage() {
  const services = [
    {
      title: "Vehicle Customization",
      description: "Tailor your car to your exact specifications with our premium customization services.",
      icon: <FaCar className="text-3xl text-red-500" />,
      image: "/images/customization.jpg"
    },
    {
      title: "Performance Tuning",
      description: "Unlock your vehicle's full potential with our expert engine tuning and performance upgrades.",
      icon: <FaGasPump className="text-3xl text-red-500" />,
      image: "/images/performance.jpg"
    },
    {
      title: "Maintenance Packages",
      description: "Comprehensive care plans to keep your vehicle running smoothly for years to come.",
      icon: <FaTools className="text-3xl text-red-500" />,
      image: "/images/maintenance.jpg"
    },
    {
      title: "Extended Warranties",
      description: "Peace of mind protection beyond the manufacturer's warranty period.",
      icon: <FaShieldAlt className="text-3xl text-red-500" />,
      image: "/images/warranty.jpg"
    },
    {
      title: "Key Replacement",
      description: "Fast, secure key programming and replacement for all makes and models.",
      icon: <FaKey className="text-3xl text-red-500" />,
      image: "/images/keys.jpg"
    },
    {
        title: "Car Detailing",
        description: "Restore your vehicle's shine with our professional detailing services.",
        icon: <FaCar className="text-3xl text-red-500" />,
        image: "/images/detailing.jpg"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-black text-white">
        <Image
          src="/images/service-hero.jpg"
          alt="Luxury car service center"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Automotive Services</h1>
          <p className="text-xl max-w-2xl">
            Exceptional care for exceptional vehicles. Experience the difference of our white-glove service.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of automotive services to meet all your vehicle needs, from routine
            maintenance to high-performance upgrades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold ml-3">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Premium Service?</h2>
          <p className="text-xl mb-8">
            Schedule an appointment with our specialists today and discover the difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-red-500 font-bold rounded hover:bg-gray-100 transition">
              Book Now
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-red-500 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}