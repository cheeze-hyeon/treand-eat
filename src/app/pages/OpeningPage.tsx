import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import logoImage from '../../asset/Frame 471.png';

export default function OpeningPage() {
 const navigate = useNavigate();

 useEffect(() => {
 const timer = setTimeout(() => {
 navigate('/onboarding');
 }, 2500);

 return () => clearTimeout(timer);
 }, [navigate]);

 return (
  <div className="bg-[#2e211c] h-full w-full min-h-0 flex items-center justify-center overflow-hidden">
  <div className="flex flex-col items-center">
  <img
  src={logoImage}
  alt="Trend EAT"
  className="w-[220px] max-w-[92vw] h-auto object-contain"
  />
  <p className="font-bold text-[12px] text-white mt-[13px] whitespace-nowrap">
  취향에 맞게 고르는 요즘 유행 음식들
  </p>
  </div>
  </div>
  );
  }
