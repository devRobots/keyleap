import { create } from 'zustand';
import { ModalType } from '@/types/modal';


interface ModalState {
    activeModal: ModalType | null;
    openModal: (modalType: ModalType) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    activeModal: null,

    /**
     * Abre un modal específico y opcionalmente le pasa props.
     * @param modalType El tipo de modal a abrir (de tu ModalType).
     */
    openModal: (modalType) =>
        set({
            activeModal: modalType,
        }),

    /**
     * Cierra cualquier modal que esté actualmente activo.
     */
    closeModal: () =>
        set({
            activeModal: null
        }),
}));
