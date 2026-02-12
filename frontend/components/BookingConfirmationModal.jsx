// components/BookingConfirmationModal.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BookingConfirmationModal = ({ 
  isOpen, 
  onClose, 
  bookedTicket,
  onConfirmBooking,
  onContinueExploring 
}) => {
  const router = useRouter();
  const [step, setStep] = useState('cnic'); // 'cnic', 'payment', 'confirmation'
  const [cnicForm, setCnicForm] = useState({
    cnicNumber: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    bank: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCnicSubmit = (e) => {
    e.preventDefault();
    if (!cnicForm.cnicNumber || cnicForm.cnicNumber.replace(/\D/g, '').length !== 13) {
      alert('Please enter a valid 13-digit CNIC number');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardHolder || !paymentForm.bank) {
      alert('Please complete all payment fields');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 1500);
  };

  const handleConfirmBooking = () => {
    if (onConfirmBooking) {
      onConfirmBooking({
        ...bookedTicket,
        cnic: cnicForm.cnicNumber,
        paymentMethod: 'credit_card',
        bank: paymentForm.bank
      });
    }
    // Navigate to dashboard
    router.push('/dashboard?tab=tickets');
  };

  const handleContinueExploring = () => {
    onClose?.();
    if (onContinueExploring) {
      onContinueExploring();
    }
  };

  const handleClose = () => {
    setStep('cnic');
    setCnicForm({ cnicNumber: '' });
    setPaymentForm({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: '',
      bank: ''
    });
    onClose?.();
  };

  // Format CNIC as 12345-1234567-1
  const formatCNIC = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    if (numbers.length <= 12) return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 12)}-${numbers.slice(12, 13)}`;
  };

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
  };

  // Pakistani banks list
  const banks = [
    { value: '', label: 'Select your bank', disabled: true },
    { value: 'habib', label: 'Habib Bank Limited (HBL)' },
    { value: 'ubl', label: 'United Bank Limited (UBL)' },
    { value: 'meezan', label: 'Meezan Bank' },
    { value: 'alfalah', label: 'Bank Alfalah' },
    { value: 'allied', label: 'Allied Bank' },
    { value: 'mcB', label: 'MCB Bank' },
    { value: 'standard', label: 'Standard Chartered' },
    { value: 'faysal', label: 'Faysal Bank' },
    { value: 'askari', label: 'Askari Bank' },
    { value: 'islami', label: 'Bank Islami' },
    { value: 'silkbank', label: 'Silkbank' },
    { value: 'soneri', label: 'Soneri Bank' },
    { value: 'summit', label: 'Summit Bank' },
    { value: 'samba', label: 'Samba Bank' },
    { value: 'js', label: 'JS Bank' },
    { value: 'nbp', label: 'National Bank (NBP)' }
  ];

  const renderCNICStep = () => (
    <form onSubmit={handleCnicSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-[#003d2b] to-[#006644] rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-id-card text-3xl text-white"></i>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tighter">Verify Identity</h3>
        <p className="text-gray-500 text-sm md:text-base">
          Please enter your CNIC number to proceed with booking
        </p>
      </div>

      <div>
        <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">
          CNIC Number *
        </label>
        <input
          type="text"
          value={cnicForm.cnicNumber}
          onChange={(e) => setCnicForm({cnicNumber: formatCNIC(e.target.value)})}
          placeholder="12345-1234567-1"
          maxLength="15"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:border-[#003d2b] focus:outline-none focus:ring-2 focus:ring-[#003d2b]/20 transition-all"
          required
        />
        <p className="text-[10px] text-gray-500 mt-2">
          Format: 12345-1234567-1 (13 digits)
        </p>
      </div>

   

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-[#003d2b] text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm hover:bg-[#002d1f] transition-all shadow-lg hover:shadow-xl"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl uppercase tracking-widest text-sm border border-gray-200 hover:bg-gray-200 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderPaymentStep = () => (
    <form onSubmit={handlePaymentSubmit} className="flex flex-col justify-between gap-1">
      <div className="text-center mb-4">
        <div className="w-20 h-20 bg-gradient-to-r from-[#003d2b] to-[#006644] rounded-full flex items-center justify-center mx-auto mb-1">
          <i className="fas fa-credit-card text-3xl text-white"></i>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 tracking-tighter">Payment Details</h3>
        <p className="text-gray-500 text-sm md:text-base">
          Enter your card information to complete booking
        </p>
      </div>

<div className="relative">
  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1 block">
    Select Bank *
  </label>
  <div className="relative">
    <select
      value={paymentForm.bank}
      onChange={(e) => setPaymentForm({...paymentForm, bank: e.target.value})}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:border-[#003d2b] focus:outline-none focus:ring-2 focus:ring-[#003d2b]/20 transition-all appearance-none cursor-pointer"
      required
    >
      {banks.map((bank, index) => (
        <option key={index} value={bank.value} disabled={bank.disabled}>
          {bank.label}
        </option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
      <i className="fas fa-chevron-down text-gray-400"></i>
    </div>
  </div>
</div>

      <div>
        <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1 block">
          Card Number *
        </label>
        <div className="relative">
          <input
            type="text"
            value={paymentForm.cardNumber}
            onChange={(e) => setPaymentForm({...paymentForm, cardNumber: formatCardNumber(e.target.value)})}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:border-[#003d2b] focus:outline-none focus:ring-2 focus:ring-[#003d2b]/20 transition-all"
            required
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
            <i className="fab fa-cc-visa text-xl text-gray-400"></i>
            <i className="fab fa-cc-mastercard text-xl text-gray-400"></i>
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1 block">
          Cardholder Name *
        </label>
        <input
          type="text"
          value={paymentForm.cardHolder}
          onChange={(e) => setPaymentForm({...paymentForm, cardHolder: e.target.value})}
          placeholder="John Doe"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:border-[#003d2b] focus:outline-none focus:ring-2 focus:ring-[#003d2b]/20 transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1 block">
            Expiry Date *
          </label>
          <input
            type="text"
            value={paymentForm.expiryDate}
            onChange={(e) => setPaymentForm({...paymentForm, expiryDate: formatExpiryDate(e.target.value)})}
            placeholder="MM/YY"
            maxLength="5"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:border-[#003d2b] focus:outline-none focus:ring-2 focus:ring-[#003d2b]/20 transition-all"
            required
          />
        </div>
        <div>
          <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1 block">
            CVV *
          </label>
          <input
            type="password"
            value={paymentForm.cvv}
            onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
            placeholder="123"
            maxLength="3"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:border-[#003d2b] focus:outline-none focus:ring-2 focus:ring-[#003d2b]/20 transition-all"
            required
          />
        </div>
      </div>

      {/* Ticket Summary */}
      {bookedTicket && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Booking Summary</h4>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-600">Ticket Price</span>
            <span className="text-sm font-bold text-gray-900">Rs {bookedTicket.totalAmount || bookedTicket.price}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-600">Tax (5%)</span>
            <span className="text-sm font-bold text-gray-900">Rs {Math.round((bookedTicket.totalAmount || bookedTicket.price) * 0.05)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-xs font-bold text-gray-800">Total</span>
            <span className="text-lg font-black text-[#003d2b]">Rs {Math.round((bookedTicket.totalAmount || bookedTicket.price) * 1.05)}</span>
          </div>
        </div>
      )}

    

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isProcessing}
          className="flex-1 bg-[#003d2b] text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm hover:bg-[#002d1f] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <i className="fas fa-spinner animate-spin"></i>
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
        <button
          type="button"
          onClick={() => setStep('cnic')}
          className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl uppercase tracking-widest text-sm border border-gray-200 hover:bg-gray-200 transition-all"
        >
          Back
        </button>
      </div>
    </form>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-[#003d2b] to-[#006644] rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-check text-4xl text-white"></i>
          </div>
          <div className="absolute inset-0 border-4 border-[#003d2b]/30 rounded-full animate-ping"></div>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tighter">Booking Confirmed!</h3>
        <p className="text-gray-500 text-sm md:text-base">
          Your ticket has been booked and saved to your account.
        </p>
      </div>

      {/* Ticket Preview */}
      {bookedTicket && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                <img 
                  src={bookedTicket.image} 
                  alt={bookedTicket.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-[#003d2b] text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                BOOKED
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-lg text-gray-900 line-clamp-1">{bookedTicket.title}</h4>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-gray-500 text-xs">
                  <i className="fas fa-calendar text-[#003d2b] mr-1"></i>
                  {bookedTicket.date}
                </p>
                <p className="text-gray-500 text-xs">
                  <i className="fas fa-location-dot text-[#003d2b] mr-1"></i>
                  {bookedTicket.location}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Booking ID</p>
              <p className="font-black text-sm font-mono text-gray-900 tracking-tight">{bookedTicket.ticketId?.slice(0, 10)}...</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">CNIC</p>
              <p className="font-black text-sm text-gray-900">{cnicForm.cnicNumber}</p>
            </div>
          </div>
          
          {/* Seats Info */}
          {bookedTicket.seats && bookedTicket.seats.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Your Seats</p>
              <div className="flex flex-wrap gap-2">
                {bookedTicket.seats.map((seat, index) => (
                  <span 
                    key={index} 
                    className="bg-[#003d2b]/10 text-[#003d2b] px-3 py-1.5 rounded-full text-xs font-black border border-[#003d2b]/20"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

   

      {/* Action Buttons */}
      <div className="space-y-4 pt-4">
        <button
          onClick={handleConfirmBooking}
          className="w-full group bg-[#003d2b] text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm hover:bg-[#002d1f] transition-all shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center justify-center gap-2">
            <i className="fas fa-ticket-alt group-hover:animate-bounce"></i>
            View My Ticket
          </span>
        </button>
        
        <button
          onClick={handleContinueExploring}
          className="w-full bg-gray-100 text-gray-700 font-black py-4 rounded-2xl uppercase tracking-widest text-sm border border-gray-200 hover:bg-gray-200 transition-all"
        >
          Continue Exploring
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-2xl max-w-md w-full p-8 md:p-10 text-gray-900 animate-in zoom-in duration-300 relative">
        
        {/* Close Button - Only show on CNIC and Payment steps */}
        {step !== 'confirmation' && (
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 hover:bg-gray-200 transition"
          >
            <i className="fas fa-times text-gray-600 text-sm"></i>
          </button>
        )}

        {/* Step Content */}
        {step === 'cnic' && renderCNICStep()}
        {step === 'payment' && renderPaymentStep()}
        {step === 'confirmation' && renderConfirmationStep()}

        {/* Confetti Animation (only on confirmation) */}
        {step === 'confirmation' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem] md:rounded-[4rem]">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-[#003d2b] to-[#006644] rounded-full opacity-30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `confetti-fall ${1 + Math.random() * 2}s linear ${Math.random() * 1}s infinite`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        )}

        {/* Add confetti animation styles */}
        <style jsx>{`
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;