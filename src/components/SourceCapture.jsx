'use client';

import { useEffect } from 'react';
import { captureLeadSource } from '@/lib/attribution';

export default function SourceCapture() {
  useEffect(() => {
    captureLeadSource();
  }, []);

  return null;
}
