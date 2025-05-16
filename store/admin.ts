import { create } from 'zustand';

interface AdminState {
    terminalStarted: boolean;
    execTerminal: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
    terminalStarted: false,
    execTerminal: () =>
        set({
            terminalStarted: true,
        }),
}));
