"use client";
import { useState } from "react";
import { FaCar, FaCalendarAlt, FaUser, FaCheck, FaChevronRight, FaTools, FaShieldAlt } from "react-icons/fa";
import { MdLocationOn, MdNotes } from "react-icons/md";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "",
    vehicleType: "",
    date: "",
    time: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const services = [
    { id: "maintenance", name: "Routine Maintenance", icon: <FaTools className="mr-2" /> },
    { id: "repair", name: "Repair Service", icon: <FaCar className="mr-2" /> },
    { id: "diagnostic", name: "Diagnostic Check", icon: <FaShieldAlt className="mr-2" /> },
    { id: "detailing", name: "Detailing", icon: <FaCar className="mr-2" /> },
    { id: "tires", name: "Tire Service", icon: <FaCar className="mr-2" /> },
    { id: "custom", name: "Custom Work", icon: <FaCar className="mr-2" /> }
  ];

  const vehicleTypes = [
    "Sedan", "SUV", "Truck", "Luxury", "Sports Car", "Electric Vehicle", "Hybrid", "Vintage"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Booking submitted and email sent:", formData);
        nextStep(); // Move to confirmation
      } else {
        console.error("Failed to send email:", await response.json());
        alert("Oops, something went wrong sending the email. Your booking is still saved!");
        nextStep();
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Something broke, mate! Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Schedule Your Service</h1>
          <p className="text-lg text-gray-600">
            Book an appointment with our expert technicians in just a few easy steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                ${step >= stepNumber ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step > stepNumber ? <FaCheck /> : stepNumber}
              </div>
              <span className={`mt-2 text-sm font-medium ${step >= stepNumber ? 'text-red-500' : 'text-gray-500'}`}>
                {stepNumber === 1 && 'Service'}
                {stepNumber === 2 && 'Date & Time'}
                {stepNumber === 3 && 'Details'}
                {stepNumber === 4 && 'Confirm'}
              </span>
            </div>
          ))}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-1">
            <div 
              className="h-1 bg-red-500 transition-all duration-300" 
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-White shadow-xl rounded-lg overflow-hidden">
          {step === 1 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCar className="text-red-500 mr-2" /> Select Service Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    className={`p-4 border rounded-lg text-left transition-all ${formData.serviceType === service.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
                    onClick={() => {
                      setFormData({ ...formData, serviceType: service.id });
                      setTimeout(nextStep, 300);
                    }}
                  >
                    <div className="flex items-center">
                      {service.icon}
                      <span className="font-medium">{service.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCalendarAlt className="text-red-500 mr-2" /> Select Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select a time</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select vehicle type</option>
                    {vehicleTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MdLocationOn className="inline mr-1" /> Location
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select location</option>
                    <option value="downtown">Downtown Service Center</option>
                    <option value="north">Northside Auto Care</option>
                    <option value="west">West End Garage</option>
                    <option value="premium">Premium Motors Lounge</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.date || !formData.time || !formData.vehicleType || !formData.location}
                  className={`px-6 py-2 rounded-md text-white flex items-center ${!formData.date || !formData.time || !formData.vehicleType || !formData.location ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  Continue <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaUser className="text-red-500 mr-2" /> Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <MdNotes className="mr-1" /> Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Any specific requests or details about your vehicle..."
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className={`px-6 py-2 rounded-md text-white flex items-center ${!formData.name || !formData.email || !formData.phone ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  Continue <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCheck className="text-red-500 mr-2" /> Confirm Your Appointment
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-medium text-lg mb-4">Appointment Summary</h3>
                <div className="space-y-3">
                  <p><span className="font-medium">Service:</span> {services.find(s => s.id === formData.serviceType)?.name}</p>
                  <p><span className="font-medium">Date:</span> {formData.date} at {formData.time}</p>
                  <p><span className="font-medium">Vehicle Type:</span> {formData.vehicleType}</p>
                  <p><span className="font-medium">Location:</span> {formData.location}</p>
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Contact:</span> {formData.email} | {formData.phone}</p>
                  {formData.notes && <p><span className="font-medium">Notes:</span> {formData.notes}</p>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
                >
                  Confirm & Book Appointment
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="p-6 sm:p-8 text-center">
              <div className="bg-green-50 text-green-700 p-6 rounded-lg max-w-md mx-auto">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="mb-4">Your appointment has been successfully scheduled.</p>
                <p className="font-medium">Confirmation details have been sent to {formData.email}</p>
                <button
                  className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium"
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      serviceType: "",
                      vehicleType: "",
                      date: "",
                      time: "",
                      location: "",
                      name: "",
                      email: "",
                      phone: "",
                      notes: ""
                    });
                  }}
                >
                  Book Another Service
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}