const INTERSTITIAL_URL =
  'https://www.effectivecpmnetwork.com/d9qrth1d1?key=64aa3f92eea506cdb2fa20c105512e37';

export function openInterstitialAd(): void {
  if (window.innerWidth < 768) return;
  window.open(INTERSTITIAL_URL, '_blank', 'noopener,noreferrer');
}
