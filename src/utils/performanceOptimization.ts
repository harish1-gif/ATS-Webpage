// Performance optimization utilities

// Detect if device has low performance specs
export const isLowPerformanceDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  // Check memory
  const deviceMemory = (navigator as any).deviceMemory || 0;
  if (deviceMemory > 0 && deviceMemory < 4) return true;

  // Check effective connection type
  const connection = (navigator as any).connection;
  if (connection?.effectiveType === "4g" || connection?.effectiveType === "3g") {
    return true;
  }

  // Check for reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  return false;
};

// Throttle function for mouse events
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

// Request animation frame wrapper
export const raf = (callback: FrameRequestCallback): number => {
  return requestAnimationFrame(callback);
};

// Calculate FPS
export const measureFPS = (): number => {
  let lastTime = performance.now();
  let frames = 0;
  let fps = 60;

  const countFrame = () => {
    const currentTime = performance.now();
    frames++;

    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frames * 1000) / (currentTime - lastTime));
      frames = 0;
      lastTime = currentTime;
    }

    raf(countFrame);
  };

  raf(countFrame);
  return fps;
};

// Disable animations for low-performance devices
export const getAnimationConfig = (
  normalConfig: any,
  lowPerfConfig: any
): any => {
  return isLowPerformanceDevice() ? lowPerfConfig : normalConfig;
};

// Optimize particle count based on device performance
export const getOptimizedParticleCount = (baseCount: number): number => {
  if (isLowPerformanceDevice()) {
    return Math.max(5, Math.floor(baseCount * 0.3));
  }
  return baseCount;
};

// Check if GPU is available and capable
export const hasCapableGPU = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
};

// Estimate device performance tier
export type PerformanceTier = "low" | "medium" | "high";

export const getPerformanceTier = (): PerformanceTier => {
  if (isLowPerformanceDevice()) return "low";

  const connection = (navigator as any).connection;
  if (
    connection?.effectiveType === "4g" &&
    (navigator as any).deviceMemory >= 8
  ) {
    return "high";
  }

  return "medium";
};
