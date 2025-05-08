interface ServiceProps {
    title: string;
    children: React.ReactNode;
}
type ServiceCardProps = React.PropsWithChildren<ServiceProps>;
  

export default function ServiceCard({ title, children }: ServiceCardProps) {
    return (
        <article className='service-card'>
            {children}
            <p className='text-text-muted text-center'>{title}</p>
        </article>
    );
}