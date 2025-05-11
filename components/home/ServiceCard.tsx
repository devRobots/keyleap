"use client"

import { useState } from "react";
import { toast } from 'react-toastify';
import { ModalType } from "@/types/modal";
import { useModalStore } from "@/store/modals";

interface ServiceProps {
    id: string;
    title: string;
    disabled?: boolean;
    children: React.ReactNode;
}
type ServiceCardProps = React.PropsWithChildren<ServiceProps>;


export default function ServiceCard({ id, title, disabled, children }: ServiceCardProps) {
    const { openModal } = useModalStore();
    const [isShaking, setIsShaking] = useState(false);

    const handleClick = () => {
        if (disabled) {
            if (isShaking) return;
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 150);

            if (toast.isActive(1)) return;
            toast.error('El servicio no esta disponible', { toastId: 1 });
        } else {
            openModal(id as ModalType);
        }
    };

    return (
        <>
            <article
                className={`service-card ${isShaking ? 'animate-shake animate-duration-150' : ''} ${disabled ? 'text-text-muted opacity-75' : ''}`}
                onClick={handleClick}
            >
                {children}
                <p className='text-center'>{title}</p>
            </article>
        </>
    );
}