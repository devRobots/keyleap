"use client"

import { useState } from "react";
import { toast } from 'react-toastify';

interface ServiceProps {
    title: string;
    children: React.ReactNode;
}
type ServiceCardProps = React.PropsWithChildren<ServiceProps>;


export default function ServiceCard({ title, children }: ServiceCardProps) {
    const [isShaking, setIsShaking] = useState(false);

    const handleClick = () => {
        if (isShaking) return;
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 150);

        if (toast.isActive(1)) return;
        toast.error('El servicio no esta disponible', { toastId: 1 });
    };

    return (
        <article className={`service-card ${isShaking ? 'animate-shake animate-duration-150' : ''}`} onClick={handleClick}>
            {children}
            <p className='text-center'>{title}</p>
        </article>
    );
}