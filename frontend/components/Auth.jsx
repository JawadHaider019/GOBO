"use client";

import { useState, useCallback, useEffect } from 'react';

const Auth = ({ 
  user, 
  onAuth, 
  isLoading = false, 
  error = '',
  onLogout,
  showQR = true
}) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Reset form when user logs out
  useEffect(() => {
    if (!user) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setIsLoginMode(true);
      setActiveField(null);
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [user]);

  // Auto-format Phone as user types
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 11) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 11)}`;
  };

  const handlePhoneChange = useCallback((e) => {
    const formatted = formatPhone(e.target.value);
    handleInputChange({ target: { name: 'phone', value: formatted } });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const authData = {
      isLogin: isLoginMode,
      email: formData.email,
      password: formData.password
    };
    
    if (!isLoginMode) {
      authData.name = formData.name;
      authData.phone = formData.phone;
      authData.confirmPassword = formData.confirmPassword;
    }
    
    if (onAuth) {
      onAuth(authData);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setActiveField(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  // Responsive input classes for white background with specific placeholder colors
  const getInputClass = (fieldName) => {
    // Add text-gray-900 to ensure dark text color for all inputs
    const baseClass = "w-full bg-white border rounded-lg px-4 py-3 font-medium text-sm outline-none transition-all duration-200 shadow-sm text-gray-900";
    
    let placeholderClass = "";
    if (fieldName === 'password' || fieldName === 'confirmPassword') {
      placeholderClass = "placeholder-gray-600"; // Darker gray for password fields
    } else {
      placeholderClass = "placeholder-gray-500"; // Normal gray for other fields
    }
    
    if (activeField === fieldName) {
      return `${baseClass} ${placeholderClass} border-[#003d2b] ring-2 ring-[#003d2b]/20`;
    }
    
    if (error && formData[fieldName]) {
      return `${baseClass} ${placeholderClass} border-red-300 bg-red-50/50`;
    }
    
    return `${baseClass} ${placeholderClass} border-gray-300 hover:border-gray-400 focus:border-[#003d2b] focus:ring-2 focus:ring-[#003d2b]/20`;
  };

  // Show logged-in state
  if (user) {
    return (
      <div className="text-center space-y-6 w-full mx-auto">
        {/* User Profile Icon - Replaced QR Code */}
        <div className="relative">
          <div className="w-40 h-40 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl border border-gray-200 flex items-center justify-center mx-auto p-3 shadow-sm">
            <i className="fas fa-user-check text-5xl text-[#003d2b]"></i>
          </div>
        </div>
        
        {/* User Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {user.name}
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <span className="text-xs font-bold text-green-500">
                IDENTITY ACTIVE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-xs font-bold text-green-500">
                SECURE NODE
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Email Address
            </p>
            <p className="text-base font-medium text-gray-900">
              {user.email || 'Not available'}
            </p>
          </div>

          <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Phone Number
            </p>
            <p className="text-base font-medium text-gray-900">
              {user.phone || 'Not available'}
            </p>
          </div>
          
          {/* Logout */}
          {onLogout && (
            <div className="pt-4">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to sign out?')) {
                    onLogout();
                  }
                }}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
   
        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#003d2b] text-2xl shadow-md">
          <i className={`fas ${isLoginMode ? 'fa-sign-out-alt' : 'fa-id-card'}`}></i>
        </div>
        <h4 className="text-xl font-black text-gray-900 tracking-tight mb-1">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </h4>
      
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-shake">
          <div className="flex items-center gap-2">
            <i className="fas fa-exclamation-circle text-red-500"></i>
            <div>
              <p className="text-sm font-semibold text-red-600">{error}</p>
              <p className="text-xs text-red-500 mt-1">Please check your input and try again</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Registration Fields */}
      {!isLoginMode && (
        <div className="space-y-3 animate-slideDown">
          <div className="relative">
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              value={formData.name} 
              onChange={handleInputChange}
              onFocus={() => setActiveField('name')}
              onBlur={() => setActiveField(null)}
              className={getInputClass('name')}
              required
              style={{ color: '#111827' }}
            />
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              name="phone"
              placeholder="Phone Number " 
              value={formData.phone} 
              onChange={handlePhoneChange}
              onFocus={() => setActiveField('phone')}
              onBlur={() => setActiveField(null)}
              className={getInputClass('phone')}
              maxLength="12"
              required
              style={{ color: '#111827' }}
            />
          </div>
        </div>
      )}
      
      {/* Common Fields */}
      <div className="space-y-3">
        <div className="relative">
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleInputChange}
            onFocus={() => setActiveField('email')}
            onBlur={() => setActiveField(null)}
            className={getInputClass('email')}
            required
            style={{ color: '#111827' }}
          />
      
        </div>
        
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password"
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange}
            onFocus={() => setActiveField('password')}
            onBlur={() => setActiveField(null)}
            className={getInputClass('password')}
            required
            style={{ color: '#111827' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
          </button>
        </div>

        {/* Confirm Password for Registration */}
        {!isLoginMode && (
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"
              placeholder="Confirm Password" 
              value={formData.confirmPassword} 
              onChange={handleInputChange}
              onFocus={() => setActiveField('confirmPassword')}
              onBlur={() => setActiveField(null)}
              className={getInputClass('confirmPassword')}
              required
              style={{ color: '#111827' }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
            </button>
          </div>
        )}
      </div>
      
      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isLoading}
        className="relative w-full bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 mt-5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin text-xs"></i>
              {isLoginMode ? 'SIGNING IN...' : 'CREATING ACCOUNT...'}
            </>
          ) : (
            <>
              <i className="fas fa-shield-alt text-xs"></i>
              {isLoginMode ? 'SIGN IN' : 'SIGN UP'}
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#006644] to-[#00995d] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </button>
      
      {/* Toggle Mode */}
      <button 
        type="button" 
        onClick={toggleMode}
        className="w-full text-sm font-medium text-gray-600 hover:text-[#003d2b] transition-all duration-200 group pt-2"
      >
        <span className="flex items-center justify-center gap-2">
          {isLoginMode ? (
            <>
              <i className="fas fa-user-plus text-xs"></i>
              Don't have an account? Sign Up
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt text-xs"></i>
              Already have an account? Sign In
            </>
          )}
          <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
        </span>
      </button>
    </form>
  );
};

export default Auth;

<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  
  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
  
  /* Force dark text for all inputs */
  input {
    color: #111827 !important; /* gray-900 - dark text */
  }
  
  /* Placeholder colors - make them visible */
  ::placeholder {
    color: #6b7280 !important; /* gray-500 - medium gray */
  }
  
  /* Specific style for password placeholder - slightly darker */
  input[type="password"]::placeholder,
  input[name="password"]::placeholder,
  input[name="confirmPassword"]::placeholder {
    color: #4b5563 !important; /* gray-600 - darker gray */
  }
`}</style>