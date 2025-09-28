import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Mail } from 'lucide-react'

export const OTPVerification = ({
  email,
  onVerify,
  onResend,
  onBack,
  isLoading = false
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(60)
  const inputRefs = useRef([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all digits are entered
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerify(newOtp.join(''))
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('').concat(Array(6 - pasteData.length).fill(''))
      setOtp(newOtp)
      if (pasteData.length === 6) {
        handleVerify(pasteData)
      }
    }
  }

  const handleVerify = (code) => {
    if (code.length === 6) {
      onVerify(code)
    }
  }

  const handleResend = () => {
    setCountdown(60)
    onResend()
  }

  return (
    <div className="card p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary-500 hover-primary-600 mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="text-primary-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark-white mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600 dark-gray-400">
          We've sent a verification code to
        </p>
        <p className="font-medium text-gray-900 dark-white">{email}</p>
      </div>

      {/* OTP Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark-gray-300 mb-4">
          Enter verification code
        </label>
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus-primary-500 focus-2 focus-primary-200 dark-gray-800 dark-gray-600 dark-white"
              disabled={isLoading}
            />
          ))}
        </div>
      </div>

      {/* Verify Button */}
      <button
        onClick={() => handleVerify(otp.join(''))}
        disabled={otp.some(digit => digit === '') || isLoading}
        className="w-full btn-primary py-3 mb-4 disabled-50 disabled-not-allowed"
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </button>

      {/* Resend Code */}
      <div className="text-center">
        <p className="text-gray-600 dark-gray-400 text-sm mb-2">
          Didn't receive the code?
        </p>
        <button
          onClick={handleResend}
          disabled={countdown > 0 || isLoading}
          className="text-primary-500 hover-primary-600 disabled-50 disabled-not-allowed"
        >
          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-3 bg-blue-50 dark-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark-blue-200 text-center">
          Check your spam folder if you don't see the email in your inbox.
        </p>
      </div>
    </div>
  )
}
