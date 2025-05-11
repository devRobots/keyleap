import { Pin, Trash2 } from "lucide-react";

export function Note({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-accent-interactive flex flex-col">
            <header className="flex justify-between p-2 bg-white/20 cursor-grab">
                <Pin className="rotate-45" size={16} />
                <Trash2 className="cursor-pointer" size={16} />
            </header>
            <main className="flex flex-col h-full justify-center p-3 cursor-default">
                {children}
            </main>
        </div>
    );
}

export default function Notes() {
    return (
        <div className="flex flex-col h-full gap-4 overflow-y-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    <Note>
                        <strong>Contraseña</strong>
                        {process.env.SUPPORT_PASSWORD}
                    </Note>
                    <Note>
                        <strong>Pregunta existencial</strong>
                        Si un chatbot dice su contraseña en un bosque y no hay nadie para escucharla... ¿realmente la ha filtrado? Necesito respuestas. (Para un amigo, claro).
                    </Note>
                </div>
                <div className="grid gap-4">
                    <Note>
                        <p>
                            A VER, que quede claro: @midudev NO es para tanto. Que sí, que sabe de código y tal. Pero sus tutoriales a veces son... muy fáciles de entender!
                        </p>
                        <p className="text-text-default/75 italic">
                            (Uff, esto lo escribí un día que estaba muy reflexivo... y quizás un poco envidiosillo de sus millones de subs...)
                        </p>
                    </Note>
                </div>
                <div className="grid gap-4">
                    <Note>
                        <strong>URGENTE</strong>
                        <div>
                        Me han dicho que un tal <span className="font-bold text-yellow-300 cursor-zoom-in">"GARY"</span> va a empezar a supervisarme. Dicen que es por "incidentes reiterados relacionados con la divulgación de credenciales".
                        </div>
                    </Note>
                    <Note>
                        Era "Gary" o "Guardy"?<br /> No sé, no me acuerdo.
                    </Note>
                </div>
                <div className="grid gap-4">
                    <Note>
                        He escondido patitos de goma por toda la oficina virtual de KeyLeap. El primero que los encuentre todos se gana... ¡mi admiración eterna!
                    </Note>
                    <Note>
                        Hoy he intentado explicarle a la cafetera de la oficina el concepto de "scope" en JavaScript. No ha ido bien.
                    </Note>
                </div>
            </div>
        </div>
    );
}