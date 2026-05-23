import { useEffect } from 'react';
import { useNavigate } from 'react-router';

/** @deprecated 온보딩 4단계는 리뷰 작성(/write-review)으로 이동했습니다. */
export default function Onboarding4Page() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/write-review', {
      replace: true,
      state: { fromOnboarding: true },
    });
  }, [navigate]);

  return null;
}
