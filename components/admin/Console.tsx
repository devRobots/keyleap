// components/Console.tsx
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';

interface File {
  type: 'file';
  content: string;
}

interface Directory {
  type: 'directory';
  children: { [name: string]: File | Directory };
}

type FileSystemNode = File | Directory;

// Sistema de archivos simulado con las pistas
const initialFileSystem: Directory = {
  type: 'directory',
  children: {
    'README.txt': {
      type: 'file',
      content: `
Bienvenido, operativo. Tu misión es obtener acceso root.
El administrador del sistema, Dr. Aris, es conocido por su amor a la ciencia ficción clásica.
Una vez mencionó que su contraseña estaba relacionada con un 'dispositivo' de una serie antigua.

Comandos disponibles:
  help          - Muestra este mensaje de ayuda.
  ls            - Lista archivos y directorios.
  cd [dir]      - Cambia de directorio.
  cat [file]    - Muestra el contenido de un archivo.
  scan          - Escanea vulnerabilidades del sistema.
  sudo su root  - Intenta obtener acceso root.
  clear         - Limpia la terminal.
      `,
    },
    'contacts.txt': {
      type: 'file',
      content: `
Lista de Contactos:
- Dr. Aris Thorne - Administrador Principal del Sistema
  Pista para pregunta de seguridad: ¿Número favorito en el puente de mando?
- Mesa de Ayuda - techsupport@example.com
      `,
    },
    documents: {
      type: 'directory',
      children: {
        'mission_brief.txt': {
          type: 'file',
          content: `
Informe de Misión: Proyecto Quimera
Objetivo: Infiltrarse en el servidor primario y obtener la contraseña root.
La inteligencia sugiere que el Dr. Aris a menudo usa una combinación de un concepto y un número.
Revisa los logs del sistema en busca de patrones numéricos inusuales o palabras clave.
La contraseña NO es 'password123' ni 'admin'. Sé más inteligente.
          `,
        },
      },
    },
    system: {
      type: 'directory',
      children: {
        logs: {
          type: 'directory',
          children: {
            'auth.log': {
              type: 'file',
              content: `
Login de usuario 'guest' desde 10.0.0.5 @ 2025-05-15 23:10:00
Intento de login fallido para usuario 'aris': intento de contraseña 'galaxy10' @ 2025-05-15 23:12:30
Intento de login fallido para usuario 'aris': intento de contraseña 'nova12' @ 2025-05-15 23:13:15
Login exitoso para usuario 'guest' desde 10.0.0.7 @ 2025-05-15 23:15:00
Intento de login fallido para usuario 'aris': intento de contraseña 'omega15' @ 2025-05-15 23:18:45
ALERTA: Intento inusual de acceso root detectado desde 192.168.1.10.
El patrón de adivinanza de contraseña parece involucrar una letra griega seguida de un número.
El último login no-root exitoso para Aris involucró el número '13'.
Actualización de protocolo de seguridad programada. Mejorar monitorización.
              `,
            },
          },
        },
      },
    },
  },
};

const ROOT_PASSWORD = 'omega13';

interface HistoryEntry {
  id: number;
  command?: string; // El comando que el usuario escribió, incluyendo el prompt
  output: string | React.ReactNode; // La salida del comando
  isAlert?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

const Console: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentPath, setCurrentPath] = useState('/'); // Inicia en el directorio raíz
  const [fileSystem] = useState<Directory>(initialFileSystem);
  const [isPasswordPrompt, setIsPasswordPrompt] = useState(false);
  const [isRoot, setIsRoot] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);


  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  const basePrompt = `user@hackbox:${currentPath}$ `;
  const rootPrompt = `root@hackbox:/# `;
  const currentPrompt = isRoot ? rootPrompt : basePrompt;

  useEffect(() => {
    addOutputToHistory(`Bienvenido a HackBox Terminal v0.1
Escribe 'help' para ver los comandos disponibles.
`);
    addOutputToHistory(
      <>
        <span className="text-yellow-400">ALERTA:</span> Escaneo de integridad del sistema iniciado...
        <br />
        Vulnerabilidad potencial detectada: La contraseña Root podría estar expuesta.
        <br />
        Objetivo: Obtener acceso root.
      </>,
      true
    );
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addEntryToHistory = (entry: Omit<HistoryEntry, 'id'>) => {
    setHistory(prev => [...prev, { ...entry, id: Date.now() + Math.random() }]);
  };

  const addOutputToHistory = (output: string | React.ReactNode, isAlert = false, isSuccess = false, isError = false) => {
    addEntryToHistory({ output, isAlert, isSuccess, isError });
  };

  const resolvePath = (path: string, startNode: Directory = fileSystem): Directory | File | undefined => {
    const segments = path.split('/').filter(s => s !== '');
    let currentNode: Directory | File = startNode;

    if (path === '/') return fileSystem; // Raíz siempre es el fileSystem completo

    for (const segment of segments) {
        if (currentNode.type === 'file') return undefined; // No se puede 'cd' en un archivo
        if (!currentNode.children[segment]) return undefined; // El segmento no existe
        currentNode = currentNode.children[segment];
    }
    return currentNode;
  };

  const getAbsolutePath = (rawPath: string): string => {
    if (rawPath.startsWith('/')) { // Ya es absoluto
        const cleanedPath = '/' + rawPath.split('/').filter(s => s).join('/');
        return cleanedPath === '/' && rawPath !== '/' ? rawPath : cleanedPath;
    }

    const pathSegments = currentPath.split('/').filter(s => s !== '');
    const targetSegments = rawPath.split('/');

    for (const segment of targetSegments) {
      if (segment === '..') {
        pathSegments.pop();
      } else if (segment !== '.' && segment !== '') {
        pathSegments.push(segment);
      }
    }
    // Normalizar: asegurar una sola barra al inicio, sin barra al final a menos que sea solo "/"
    let newPath = '/' + pathSegments.join('/');
    if (newPath !== '/' && newPath.endsWith('/')) {
        newPath = newPath.slice(0, -1);
    }
    return newPath || '/';
  };


  const processCommandInput = (commandStr: string) => {
    const trimmedCommand = commandStr.trim();
    addEntryToHistory({ command: `${currentPrompt}${trimmedCommand}`, output: '' });

    if (trimmedCommand && (!commandHistory.length || commandHistory[commandHistory.length -1] !== trimmedCommand)) {
        setCommandHistory(prev => [...prev, trimmedCommand]);
    }
    setHistoryIndex(-1); // Reset history index on new command

    const [command, ...args] = trimmedCommand.split(/\s+/);

    if (isPasswordPrompt) {
      if (trimmedCommand === ROOT_PASSWORD) {
        addOutputToHistory('Acceso Concedido. Bienvenido, root!', false, true);
        setIsRoot(true);
        setCurrentPath('/');
      } else {
        addOutputToHistory('Acceso Denegado.', false, false, true);
      }
      setIsPasswordPrompt(false);
      return;
    }

    switch (command.toLowerCase()) {
      case 'help':
        const helpNode = resolvePath('/README.txt'); // README siempre está en la raíz para este 'help'
        if (helpNode && helpNode.type === 'file') {
             addOutputToHistory(<pre className="whitespace-pre-wrap">{helpNode.content}</pre>);
        } else { // Fallback si README.txt no se encuentra por alguna razón
             addOutputToHistory(`Comandos: ls, cd, cat, scan, sudo su root, clear, exit`);
        }
        break;
      case 'ls':
        const dirPathToLs = args[0] ? getAbsolutePath(args.join(' ')) : currentPath;
        const nodeToLs = resolvePath(dirPathToLs);

        if (nodeToLs && nodeToLs.type === 'directory') {
          const items = Object.keys(nodeToLs.children);
          if (items.length === 0) {
            addOutputToHistory('Directorio vacío.');
          } else {
            addOutputToHistory(
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">
                {items.map(item => {
                  const itemNode = nodeToLs.children[item];
                  return (
                    <span key={item} className={itemNode.type === 'directory' ? 'text-blue-400' : 'text-green-400'}>
                      {itemNode.type === 'directory' ? `${item}/` : item}
                    </span>
                  );
                })}
              </div>
            );
          }
        } else {
          addOutputToHistory(`ls: no se puede acceder a '${args[0] || dirPathToLs}': No existe tal archivo o directorio`, false, false, true);
        }
        break;
      case 'cd':
        if (args.length === 0 || args[0] === '~' || args[0] === '') {
          setCurrentPath('/'); // `cd` sin argumentos o con `~` va a la raíz (simplificado)
          break;
        }
        const targetPath = getAbsolutePath(args.join(' '));
        const targetNode = resolvePath(targetPath);

        if (targetNode && targetNode.type === 'directory') {
          setCurrentPath(targetPath);
        } else if (targetNode && targetNode.type === 'file') {
          addOutputToHistory(`cd: ${args.join(' ')}: No es un directorio`, false, false, true);
        } else {
          addOutputToHistory(`cd: ${args.join(' ')}: No existe tal archivo o directorio`, false, false, true);
        }
        break;
      case 'cat':
        if (args.length === 0) {
          addOutputToHistory('Uso: cat [archivo]', false, false, true);
          break;
        }
        const filePath = getAbsolutePath(args.join(' '));
        const fileNode = resolvePath(filePath);

        if (fileNode && fileNode.type === 'file') {
          addOutputToHistory(<pre className="whitespace-pre-wrap">{fileNode.content}</pre>);
        } else if (fileNode && fileNode.type === 'directory') {
          addOutputToHistory(`cat: ${args.join(' ')}: Es un directorio`, false, false, true);
        } else {
          addOutputToHistory(`cat: ${args.join(' ')}: No existe tal archivo o directorio`, false, false, true);
        }
        break;
      case 'scan':
        addOutputToHistory('Escaneando sistema en busca de vulnerabilidades...');
        setTimeout(() => {
          addOutputToHistory(
            <>
              <span className="text-yellow-400">ALERTA:</span> ¡Vulnerabilidad de alta prioridad detectada!
              <br />
              La política de contraseñas del usuario Root parece débil. Potencial de acceso no autorizado.
              <br />
              Pista: El administrador a menudo hace referencia a la ciencia ficción antigua. Revisa `README.txt` para pistas iniciales.
            </>,
            true
          );
        }, 700);
        break;
      case 'sudo':
        if (args[0]?.toLowerCase() === 'su' && args[1]?.toLowerCase() === 'root') {
          if (isRoot) {
            addOutputToHistory('Ya eres root.');
            break;
          }
          addOutputToHistory('Contraseña para root:');
          setIsPasswordPrompt(true);
        } else {
          addOutputToHistory(`sudo: comando desconocido '${args.join(' ')}'. Prueba: sudo su root`, false, false, true);
        }
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'exit':
        addOutputToHistory('Desconectando...');
        // Aquí podrías reiniciar el juego o mostrar un mensaje final.
        // Por ahora, si es root, lo "desloguea". Si no, solo mensaje.
        if (isRoot) {
            setIsRoot(false);
            setCurrentPath('/');
            setIsPasswordPrompt(false);
            addOutputToHistory('Has salido de la sesión root. Estás de vuelta como usuario normal.');
        }
        break;
      case '':
        // No hacer nada si el comando está vacío, solo añade una nueva línea de prompt implícitamente
        break;
      default:
        addOutputToHistory(`comando no encontrado: ${command}`, false, false, true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processCommandInput(currentCommand);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (commandHistory.length > 0) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        } else {
          setHistoryIndex(-1);
          setCurrentCommand('');
        }
      }
    }
  };


  return (
    <div
      className="bg-black text-green-400 font-mono p-4 h-full min-h-[400px] w-full max-w-4xl mx-auto rounded-md shadow-2xl border border-gray-700 overflow-y-auto flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-grow overflow-y-auto pr-2 text-sm sm:text-base">
        {history.map(entry => (
          <div key={entry.id} className="mb-1 leading-tight">
            {entry.command && <div className="opacity-90 whitespace-pre-wrap">{entry.command}</div>}
            {typeof entry.output === 'string' ? (
              <div
                className={`whitespace-pre-wrap ${entry.isAlert ? 'text-yellow-300' : ''} ${
                  entry.isSuccess ? 'text-lime-400 font-bold' : ''
                } ${entry.isError ? 'text-red-500' : ''}`}
              >
                {entry.output}
              </div>
            ) : (
                 <div
                    className={`${entry.isAlert ? 'text-yellow-300' : ''} ${
                    entry.isSuccess ? 'text-lime-400 font-bold' : ''
                    } ${entry.isError ? 'text-red-500' : ''}`}
                >
                    {entry.output}
                </div>
            )}
          </div>
        ))}
        <div ref={historyEndRef} />
      </div>

      {/* Input area */}
      {!isRoot || (isRoot && !isPasswordPrompt && currentCommand !== 'exit' ) ? ( // Show input if not root OR root and not exiting
        <form onSubmit={handleSubmit} className="flex items-center mt-auto pt-2">
          {!isPasswordPrompt && <span className="text-blue-400 mr-2 flex-shrink-0">{currentPrompt}</span>}
          <input
            ref={inputRef}
            type={isPasswordPrompt ? 'password' : 'text'}
            value={currentCommand}
            onChange={e => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none text-green-400 focus:outline-none flex-grow w-full"
            disabled={isRoot && isPasswordPrompt} // disable if root and trying to re-enter password (should not happen with current logic)
            autoFocus
            autoComplete="off"
            autoCapitalize="none"
            spellCheck="false"
          />
        </form>
      ) : (
        isRoot && ( // Only show if isRoot is true and not showing the input form above
            <div className="mt-auto pt-2 text-lime-500 font-bold">
            Sistema Comprometido. Acceso Root Concedido.
            <br/>
            {currentPrompt} (escribe 'exit' o refresca para reiniciar)
            </div>
        )
      )}
    </div>
  );
};

export default Console;