
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Shield, CheckCircle } from 'lucide-react';
import { FormData } from '../types';

const Task2Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    id: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.id.trim()) newErrors.id = 'ID is required';
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for that field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setErrors({});
      // Optionally reset form
      // setFormData({ name: '', email: '', id: '', password: '' });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* ID Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee/Student ID</label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.id ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="EMP-12345"
            />
          </div>
          {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-4 pr-10 py-2 border rounded-lg outline-none focus:ring-2 transition-all ${
                errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md active:scale-[0.98]"
        >
          Submit Application
        </button>
      </form>

      {submittedData && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 text-green-700 font-bold mb-4">
            <CheckCircle size={20} />
            Submission Successful
          </div>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="text-gray-500">Name:</span>
            <span className="font-medium">{submittedData.name}</span>
            <span className="text-gray-500">Email:</span>
            <span className="font-medium">{submittedData.email}</span>
            <span className="text-gray-500">ID:</span>
            <span className="font-medium font-mono">{submittedData.id}</span>
            <span className="text-gray-500">Password:</span>
            <span className="font-medium">{'•'.repeat(submittedData.password.length)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task2Form;
