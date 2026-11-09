export function canRenderWebGL() {
  if (typeof window === 'undefined') return false;

  // 1. WebGL available in canvas
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
  } catch {
    return false;
  }

  // 2. prefers-reduced-motion is not set
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  // 3. navigator.connection.saveData is not true
  if (navigator.connection && navigator.connection.saveData === true) {
    return false;
  }

  // 4. hardwareConcurrency >= 4
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return false;
  }

  // 5. deviceMemory is undefined or >= 4
  if (navigator.deviceMemory !== undefined && navigator.deviceMemory < 4) {
    return false;
  }

  return true;
}

