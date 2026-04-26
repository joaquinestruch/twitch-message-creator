import { create } from 'zustand';

interface DonationState {
  downloadsCount: number;
  visitsCount: number;
  isModalOpen: boolean;
  modalReason: 'download' | 'visit' | null;

  incrementDownloads: () => void;
  incrementVisits: () => void;
  closeModal: () => void;
}

export const useDonationStore = create<DonationState>((set) => {
  // Inicializar estado desde localStorage si existe
  const storedDownloads = typeof window !== 'undefined' ? Number(localStorage.getItem('tmc_downloads') || 0) : 0;
  const storedVisits = typeof window !== 'undefined' ? Number(localStorage.getItem('tmc_visits') || 0) : 0;

  return {
    downloadsCount: storedDownloads,
    visitsCount: storedVisits,
    isModalOpen: false,
    modalReason: null,

    incrementDownloads: () => set((state) => {
      const newCount = state.downloadsCount + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('tmc_downloads', newCount.toString());
      }
      
      // Mostrar modal en la 1ra, 5ta y cada 10 descargas
      let shouldOpen = false;
      if (newCount === 1 || newCount === 5 || newCount % 10 === 0) {
        shouldOpen = true;
      }

      return { 
        downloadsCount: newCount,
        isModalOpen: shouldOpen ? true : state.isModalOpen,
        modalReason: shouldOpen ? 'download' : state.modalReason
      };
    }),

    incrementVisits: () => set((state) => {
      const newCount = state.visitsCount + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('tmc_visits', newCount.toString());
      }

      // Mostrar modal en la 5ta visita y cada 10 visitas (siempre y cuando no se haya abierto por descarga recientemente)
      let shouldOpen = false;
      if (newCount === 5 || newCount % 10 === 0) {
        shouldOpen = true;
      }

      return {
        visitsCount: newCount,
        isModalOpen: shouldOpen ? true : state.isModalOpen,
        modalReason: shouldOpen ? 'visit' : state.modalReason
      };
    }),

    closeModal: () => set({ isModalOpen: false, modalReason: null }),
  };
});
