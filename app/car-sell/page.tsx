'use client'
import { useState } from 'react'
import { FaCar, FaCamera, FaInfoCircle, FaUser, FaCheck, FaChevronRight } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SellCarPage() {
  const [step, setStep] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    condition: '',
    transmission: '',
    fuelType: '',
    color: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    location: ''
  })

  const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Tesla', 'Other']
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor']
  const transmissions = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic']
  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Other']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const newImages = files.map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages].slice(0, 10)) // Limit to 10 images
    }
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Car listing submitted:', { ...formData, images })
    nextStep() // Move to confirmation
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Sell Your Car With Us</h1>
          <p className="text-lg text-gray-600">
            Get the best value for your vehicle with our trusted selling platform
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
                {stepNumber === 1 && 'Vehicle'}
                {stepNumber === 2 && 'Details'}
                {stepNumber === 3 && 'Contact'}
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
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {step === 1 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCar className="text-red-500 mr-2" /> Vehicle Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                  <Select onValueChange={(value) => handleSelectChange('make', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <Input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <Input
                    type="number"
                    name="year"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km)</label>
                  <Input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asking Price ($)</label>
                  <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <Select onValueChange={(value) => handleSelectChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  onClick={nextStep}
                  disabled={!formData.make || !formData.model || !formData.year || !formData.mileage || !formData.price || !formData.condition}
                  className={`flex items-center ${!formData.make || !formData.model || !formData.year || !formData.mileage || !formData.price || !formData.condition ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  Continue <FaChevronRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaInfoCircle className="text-red-500 mr-2" /> Additional Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                  <Select onValueChange={(value) => handleSelectChange('transmission', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      {transmissions.map(transmission => (
                        <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <Select onValueChange={(value) => handleSelectChange('fuelType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map(fuelType => (
                        <SelectItem key={fuelType} value={fuelType}>{fuelType}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <Input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your vehicle's features, history, and any additional information..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaCamera className="mr-2 text-red-500" /> Upload Photos (Max 10)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {images.map((img, index) => (
                        <div key={index} className="relative h-24 rounded-md overflow-hidden">
                          <img
                            src={img}
                            alt={`Vehicle ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex items-center bg-red-500 hover:bg-red-600"
                >
                  Continue <FaChevronRight className="ml-2" />
                </Button>
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
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className={`flex items-center ${!formData.name || !formData.email || !formData.phone ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  Continue <FaChevronRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCheck className="text-red-500 mr-2" /> Confirm Your Listing
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-medium text-lg mb-4">Vehicle Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><span className="font-medium">Make/Model:</span> {formData.make} {formData.model}</p>
                    <p><span className="font-medium">Year:</span> {formData.year}</p>
                    <p><span className="font-medium">Mileage:</span> {formData.mileage} km</p>
                    <p><span className="font-medium">Price:</span> ${formData.price}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Condition:</span> {formData.condition}</p>
                    <p><span className="font-medium">Transmission:</span> {formData.transmission}</p>
                    <p><span className="font-medium">Fuel Type:</span> {formData.fuelType}</p>
                    <p><span className="font-medium">Color:</span> {formData.color}</p>
                  </div>
                </div>
                {formData.description && (
                  <div className="mt-4">
                    <p className="font-medium">Description:</p>
                    <p className="text-gray-600">{formData.description}</p>
                  </div>
                )}
                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium">Photos ({images.length}):</p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {images.slice(0, 3).map((img, index) => (
                        <div key={index} className="relative h-20 rounded-md overflow-hidden">
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-medium text-lg mb-4">Contact Information</h3>
                <p><span className="font-medium">Name:</span> {formData.name}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                <p><span className="font-medium">Location:</span> {formData.location}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Submit Listing
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="p-6 sm:p-8 text-center">
              <div className="bg-green-50 text-green-700 p-6 rounded-lg max-w-md mx-auto">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Listing Submitted!</h2>
                <p className="mb-4">Your vehicle listing has been successfully submitted.</p>
                <p className="font-medium">We'll contact you shortly at {formData.email}</p>
                <Button
                  className="mt-6 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    setStep(1)
                    setFormData({
                      make: '',
                      model: '',
                      year: '',
                      mileage: '',
                      price: '',
                      condition: '',
                      transmission: '',
                      fuelType: '',
                      color: '',
                      description: '',
                      name: '',
                      email: '',
                      phone: '',
                      location: ''
                    })
                    setImages([])
                  }}
                >
                  List Another Vehicle
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}