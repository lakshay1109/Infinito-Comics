import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginBackground from '../../../assets/Images/LoginBackground.jpg';
import Bullet from '../../../assets/Images/Bullet.png';
import Riza from '../../../assets/Images/Riza Jose.png';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';
import SignupStep4 from './SignupStep4';
import SignupStep5 from './SignupStep5';

const SignupWrapper = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialStep = parseInt(queryParams.get('step')) || 1;

  const [step, setStep] = useState(initialStep);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dob: '',
    username: '',
    newsLetter: true,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignupStep1
            formData={formData}
            handleChange={handleChange}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <SignupStep2
            formData={formData}
            handleChange={handleChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return <SignupStep3 onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <SignupStep4 onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <SignupStep5 onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden font-sans">
      {/* Background Section */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="h-[70%] w-full relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${LoginBackground})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #310303, #000000)',
              opacity: 0.7
            }}
          />
        </div>
        <div
          className="h-[30%] w-full"
          style={{ background: 'linear-gradient(to bottom, #111111, #663939)' }}
        />
      </div>

      {/* Characters (only visible for steps 1 to 3) */}
      {step < 4 && (
        <>
          <img
            src={Bullet}
            alt="Bullet"
            className="absolute left-56 bottom-8 h-[700px] z-50 object-contain pointer-events-none"
          />
          <img
            src={Riza}
            alt="Riza"
            className="absolute right-48 bottom-8 h-[700px] z-50 object-contain pointer-events-none"
          />
        </>
      )}

      {/* Step Form */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        {renderStep()}
      </div>
    </div>
  );
};

export default SignupWrapper;
