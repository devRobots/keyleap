import React, { useState, useEffect, useRef, KeyboardEvent, useCallback } from 'react';
import {
    type File,
    type Directory,
    initialFileSystem,
    TARGET_USER_TO_UNLOCK,
    TARGET_USER_PASSWORD,
} from '@/data/system';

interface HistoryEntry {
    id: number;
    command?: string;
    output: string | React.ReactNode;
    isAlert?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
}

const availableCommands = ['help', 'ls', 'cd', 'cat', 'scan', 'lexicon_brute', 'clear', 'exit'];

const Console: React.FC = () => {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [currentPath, setCurrentPath] = useState('/');
    const [fileSystemData] = useState<Directory>(initialFileSystem);
    const [gameWon, setGameWon] = useState(false);
    const [isBruteForcing, setIsBruteForcing] = useState(false);
    
    const [commandHistoryLog, setCommandHistoryLog] = useState<string[]>([]);
    const [historyNavIndex, setHistoryNavIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const historyEndRef = useRef<HTMLDivElement>(null);

    const loggedInUser = "guardy";
    const hostname = "hackbox";
    const prompt = `${loggedInUser}@${hostname}:${currentPath}$ `;

    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const addEntryToHistory = useCallback((entry: Omit<HistoryEntry, 'id'>) => {
        setHistory(prev => [...prev, { ...entry, id: Date.now() + Math.random() }]);
    }, []);

    const addOutputToHistory = useCallback((output: string | React.ReactNode, isAlert = false, isSuccess = false, isError = false) => {
        addEntryToHistory({ output, isAlert, isSuccess, isError });
    }, [addEntryToHistory]);

    const resolvePath = useCallback((path: string): Directory | File | undefined => {
        const segments = path.split('/').filter(s => s !== '');
        let currentNode: Directory | File = fileSystemData;
        if (path === '/') return fileSystemData;
        for (const segment of segments) {
            if (currentNode.type === 'file') return undefined;
            const children = (currentNode as Directory).children;
            if (!children || !children[segment]) return undefined;
            currentNode = children[segment];
        }
        return currentNode;
    }, [fileSystemData]);

    const getAbsolutePath = (rawPath: string): string => {
        if (rawPath.startsWith('/')) {
            const cleanedPath = '/' + rawPath.split('/').filter(s => s).join('/');
            return cleanedPath === '/' && rawPath !== '/' ? rawPath : cleanedPath;
        }
        const pathSegments = currentPath.split('/').filter(s => s !== '');
        const targetSegments = rawPath.split('/');
        for (const segment of targetSegments) {
            if (segment === '..') { pathSegments.pop(); }
            else if (segment !== '.' && segment !== '') { pathSegments.push(segment); }
        }
        let newPath = '/' + pathSegments.join('/');
        if (newPath !== '/' && newPath.endsWith('/')) { newPath = newPath.slice(0, -1); }
        return newPath || '/';
    };

    const handleLexiconBrute = (args: string[]) => {
        let targetUser: string | undefined;
        let keyword: string | undefined;
        let numStart: number | undefined;
        let numEnd: number | undefined;
        let specificNum: number | undefined;

        for (let i = 0; i < args.length; i++) {
            switch (args[i]) {
                case '-t': targetUser = args[++i]; break;
                case '-k': keyword = args[++i]; break;
                case '-n':
                    numStart = parseInt(args[++i], 10);
                    numEnd = parseInt(args[++i], 10);
                    break;
                case '-p': specificNum = parseInt(args[++i], 10); break;
            }
        }

        if (!targetUser || !keyword || (!specificNum && (numStart === undefined || numEnd === undefined))) {
            addOutputToHistory("Uso incorrecto. Ver 'cat /usr/local/bin/lexicon_brute'", false, false, true);
            return;
        }
        if (targetUser.toLowerCase() !== TARGET_USER_TO_UNLOCK.toLowerCase()) {
            addOutputToHistory(`Error: El objetivo '${targetUser}' no es válido para esta auditoría.`, false, false, true);
            return;
        }
        if ((numStart !== undefined && (isNaN(numStart) || numStart < 0 || numStart > 99)) ||
            (numEnd !== undefined && (isNaN(numEnd) || numEnd < 0 || numEnd > 99 || numEnd < numStart)) ||
            (specificNum !== undefined && (isNaN(specificNum) || specificNum < 0 || specificNum > 99))) {
            addOutputToHistory("Error: Rango numérico o número específico inválido (debe ser 00-99).", false, false, true);
            return;
        }


        setIsBruteForcing(true);
        addOutputToHistory(`lexicon_brute: Iniciando prueba para usuario '${targetUser}'.
Palabra clave: '${keyword}'. ${specificNum !== undefined ? `Número específico: ${String(specificNum).padStart(2, '0')}` : `Rango numérico: ${String(numStart).padStart(2, '0')}-${String(numEnd).padStart(2, '0')}`}
Procesando... (Esto puede tardar un momento simulado)`);

        let found = false;
        const attempts: string[] = [];
        
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        (async () => {
            if (specificNum !== undefined) {
                const testPass = `${keyword}${String(specificNum).padStart(2, '0')}`;
                attempts.push(`Probando: ${testPass}... `);
                await delay(500 + Math.random() * 500);
                if (testPass === TARGET_USER_PASSWORD) found = true;
                attempts[attempts.length - 1] += (found ? "ÉXITO!" : "Fallo.");
            } else if (numStart !== undefined && numEnd !== undefined) {
                for (let i = numStart; i <= numEnd; i++) {
                    const testPass = `${keyword}${String(i).padStart(2, '0')}`;
                    attempts.push(`Probando: ${testPass}... `);
                    addOutputToHistory(<pre className="whitespace-pre-wrap">{attempts.join('\n')}</pre>);
                    attempts.pop();
                    attempts.push(`Probando: ${testPass}... `);

                    await delay(300 + Math.random() * 400);
                    if (testPass === TARGET_USER_PASSWORD) {
                        found = true;
                        attempts[attempts.length - 1] += "ÉXITO!";
                        addOutputToHistory(<pre className="whitespace-pre-wrap">{attempts.join('\n')}</pre>);
                        break;
                    }
                    attempts[attempts.length - 1] += "Fallo.";
                    if (i < numEnd) addOutputToHistory(<pre className="whitespace-pre-wrap">{attempts.join('\n') + "\nProbando siguiente..."}</pre>); // Show progress before next full update
                }
            }

            addOutputToHistory(<pre className="whitespace-pre-wrap">{attempts.join('\n')}</pre>);

            if (found) {
                addOutputToHistory(`Contraseña para '${targetUser}' ENCONTRADA: ${TARGET_USER_PASSWORD}`, false, true);
                setGameWon(true);
            } else {
                addOutputToHistory(`Contraseña no encontrada con los parámetros dados.`, false, false, true);
            }
            setIsBruteForcing(false);
        })();
    };

    const processCommandInput = (commandStr: string) => {
        const trimmedCommand = commandStr.trim();
        addEntryToHistory({ command: `${prompt}${trimmedCommand}`, output: '' });

        if (trimmedCommand && (!commandHistoryLog.length || commandHistoryLog[commandHistoryLog.length - 1] !== trimmedCommand)) {
            setCommandHistoryLog(prev => [...prev, trimmedCommand]);
        }
        setHistoryNavIndex(-1);

        const [command, ...args] = trimmedCommand.split(/\s+/);

        if (gameWon && command.toLowerCase() !== 'exit' && command.toLowerCase() !== 'clear') {
            addOutputToHistory("Misión completada. Escribe 'exit' o 'clear' para reiniciar/limpiar.", false, false, true);
            return;
        }
        if (isBruteForcing) {
            addOutputToHistory("Espere a que termine el proceso actual de lexicon_brute.", false, false, true);
            return;
        }

        switch (command.toLowerCase()) {
            case 'help':
                const helpFileNode = resolvePath('/usr/share/docs/README_GENERAL.txt');
                if (helpFileNode && helpFileNode.type === 'file') {
                    addOutputToHistory(<pre className="whitespace-pre-wrap text-gray-200">{helpFileNode.content}</pre>);
                } else {
                    addOutputToHistory("Error: No se encontró el archivo de ayuda. Comandos básicos: ls, cd, cat, scan, lexicon_brute, clear, exit.");
                }
                break;
            case 'ls':
                const dirPathToLs = args[0] ? getAbsolutePath(args.join(' ')) : currentPath;
                const nodeToLs = resolvePath(dirPathToLs);
                if (nodeToLs && nodeToLs.type === 'directory') {
                    const items = Object.keys(nodeToLs.children);
                    if (items.length === 0) addOutputToHistory('Directorio vacío.');
                    else addOutputToHistory(<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">{items.map(item => (<span key={item} className={nodeToLs.children[item].type === 'directory' ? 'text-blue-400' : 'text-green-400'}>{nodeToLs.children[item].type === 'directory' ? `${item}/` : item}</span>))}</div>);
                } else addOutputToHistory(`ls: no se puede acceder a '${args[0] || dirPathToLs}': No existe tal archivo o directorio`, false, false, true);
                break;
            case 'cd':
                if (args.length === 0 || args[0] === '~' || args[0] === '') { setCurrentPath('/'); break; }
                const targetPath = getAbsolutePath(args.join(' '));
                const targetNode = resolvePath(targetPath);
                if (targetNode && targetNode.type === 'directory') setCurrentPath(targetPath);
                else if (targetNode && targetNode.type === 'file') addOutputToHistory(`cd: ${args.join(' ')}: No es un directorio`, false, false, true);
                else addOutputToHistory(`cd: ${args.join(' ')}: No existe tal archivo o directorio`, false, false, true);
                break;
            case 'cat':
                if (args.length === 0) { addOutputToHistory('Uso: cat [archivo]', false, false, true); break; }
                const filePath = getAbsolutePath(args.join(' '));
                const fileNode = resolvePath(filePath);
                if (filePath === '/usr/local/bin/lexicon_brute' && fileNode && fileNode.type === 'file') { // Permitir cat en el 'ejecutable'
                    addOutputToHistory(<pre className="whitespace-pre-wrap text-gray-200">{fileNode.content}</pre>);
                } else if (fileNode && fileNode.type === 'file') {
                    addOutputToHistory(<pre className="whitespace-pre-wrap text-gray-200">{fileNode.content}</pre>);
                } else if (fileNode && fileNode.type === 'directory') addOutputToHistory(`cat: ${args.join(' ')}: Es un directorio`, false, false, true);
                else addOutputToHistory(`cat: ${args.join(' ')}: No existe tal archivo o directorio`, false, false, true);
                break;
            case 'scan':
                addOutputToHistory('Realizando escaneo de configuración del sistema...');
                setTimeout(() => {
                    addOutputToHistory(
                        <>
                            <span className="text-yellow-400">Resultado del Escaneo (Anomalías Menores):</span>
                            <br />
                            - Directorio &apos;/opt/old_projects&apos; contiene artefactos no archivados.
                            <br />
                            - Fichero de configuración &apos;/etc/audit_tools/legacy_scanner.conf&apos; marcado como deprecado pero presente.
                            <br />
                            - Múltiples entradas de &apos;config_alerts.log&apos; sobre el ex-admin &apos;aris&apos; y políticas de contraseñas.
                            <br />
                            <span className="text-cyan-400">Sugerencia:</span> Revisar configuraciones heredadas y logs detallados.
                        </>,
                        true
                    );
                }, 700);
                break;
            case 'lexicon_brute':
                handleLexiconBrute(args);
                break;
            case 'clear':
                setHistory([]);
                if (gameWon) {
                    setGameWon(false);
                    const bulletinNode = resolvePath('/security_bulletin.txt');
                    if (bulletinNode && bulletinNode.type === 'file') {
                        addOutputToHistory(<pre className="whitespace-pre-wrap">{bulletinNode.content}</pre>, true);
                    }
                    addOutputToHistory(`Sesión reiniciada para ${loggedInUser}. Escribe 'help' para comandos.`);
                }
                break;
            case 'exit':
                addOutputToHistory('Cerrando sesión de HackBox Terminal...');
                setGameWon(true);
                break;
            case '': break;
            default: addOutputToHistory(`comando no encontrado: ${command}`, false, false, true);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        processCommandInput(currentCommand);
        setCurrentCommand('');
    };

    const handleTabCompletion = () => {
        const trimmedCmd = currentCommand.trimStart();
        const parts = trimmedCmd.split(' ');
        const currentWord = parts[parts.length - 1];
        const isCompletingCommand = parts.length === 1 && !currentCommand.endsWith(' ');

        if (isCompletingCommand) {
            const matches = availableCommands.filter(cmd => cmd.startsWith(currentWord));
            if (matches.length === 1) {
                setCurrentCommand(matches[0] + ' ');
            } else if (matches.length > 1) {
                let prefix = '';
                if (matches.every(m => m.startsWith(matches[0]))) {
                    let i = 0;
                    while (matches[0][i] && matches.every(m => m[i] === matches[0][i])) {
                        prefix += matches[0][i];
                        i++;
                    }
                    setCurrentCommand(prefix);
                }
            }
        } else {
            const commandName = parts[0];
            const relevantCommands = ['cd', 'ls', 'cat'];
            const lexiconBrutePathArgs = ['-w'];

            const pathToComplete = currentWord;
            const baseCommandPart = currentCommand.substring(0, currentCommand.length - pathToComplete.length);

            let shouldCompletePath = relevantCommands.includes(commandName);
            if (commandName === 'lexicon_brute') {
                const prevArg = parts.length > 2 ? parts[parts.length - 2] : "";
                if (lexiconBrutePathArgs.includes(prevArg)) {
                    shouldCompletePath = true;
                } else {
                    shouldCompletePath = false;
                }
            }


            if (shouldCompletePath) {
                let pathPrefix = '';
                let partialName = pathToComplete;

                if (pathToComplete.includes('/')) {
                    pathPrefix = pathToComplete.substring(0, pathToComplete.lastIndexOf('/') + 1);
                    partialName = pathToComplete.substring(pathToComplete.lastIndexOf('/') + 1);
                }

                const effectiveDirToSearch = pathPrefix.startsWith('/')
                    ? getAbsolutePath(pathPrefix)
                    : getAbsolutePath(currentPath + (currentPath === '/' ? '' : '/') + pathPrefix);

                const dirNode = resolvePath(effectiveDirToSearch);

                if (dirNode && dirNode.type === 'directory') {
                    const childrenNames = Object.keys(dirNode.children);
                    const matches = childrenNames.filter(name => name.startsWith(partialName));

                    if (matches.length === 1) {
                        const completedName = matches[0];
                        const fullCompletedPath = pathPrefix + completedName;
                        const nodeType = dirNode.children[completedName].type;
                        setCurrentCommand(baseCommandPart + fullCompletedPath + (nodeType === 'directory' ? '/' : ' '));
                    } else if (matches.length > 1) {
                        let commonPrefix = partialName;
                        if (matches.every(m => m.startsWith(matches[0].substring(0, commonPrefix.length)))) {
                            let i = partialName.length;
                            while (matches[0][i] && matches.every(m => m[i] === matches[0][i])) {
                                commonPrefix += matches[0][i];
                                i++;
                            }
                            setCurrentCommand(baseCommandPart + pathPrefix + commonPrefix);
                        }
                    }
                }
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (isBruteForcing) { e.preventDefault(); return; }

        if (e.key === 'Tab') {
            e.preventDefault();
            handleTabCompletion();
            return;
        }

        if (commandHistoryLog.length > 0) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const newIndex = historyNavIndex === -1 ? commandHistoryLog.length - 1 : Math.max(0, historyNavIndex - 1);
                setHistoryNavIndex(newIndex);
                setCurrentCommand(commandHistoryLog[newIndex]);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyNavIndex !== -1 && historyNavIndex < commandHistoryLog.length - 1) {
                    const newIndex = historyNavIndex + 1;
                    setHistoryNavIndex(newIndex);
                    setCurrentCommand(commandHistoryLog[newIndex]);
                } else {
                    setHistoryNavIndex(-1);
                    setCurrentCommand('');
                }
            }
        }
    };

    useEffect(() => {
        const bulletinNode = resolvePath('/security_bulletin.txt');
        if (bulletinNode && bulletinNode.type === 'file') {
            addOutputToHistory(<pre className="whitespace-pre-wrap">{bulletinNode.content}</pre>, true);
        } else {
            addOutputToHistory("Error: No se encontró el boletín de seguridad. Contacte a soporte.", false, false, true);
        }
        addOutputToHistory(`Sesión iniciada para ${loggedInUser}. Escribe 'help' para comandos.`);
        inputRef.current?.focus();
    }, [addOutputToHistory, resolvePath]);

    return (
        <div
            className="bg-black text-green-400 font-mono p-4 h-full min-h-[400px] w-full max-w-4xl mx-auto rounded-md border overflow-y-auto flex flex-col"
            onClick={() => !(gameWon || isBruteForcing) && inputRef.current?.focus()}
        >
            <div className="flex-grow overflow-y-auto pr-2 text-[13px]">
                {history.map(entry => (
                    <div key={entry.id} className="mb-1 leading-tight">
                        {entry.command && <div className="opacity-90 whitespace-pre-wrap">{entry.command}</div>}
                        {typeof entry.output === 'string' ? (
                            <div className={`whitespace-pre-wrap ${entry.isAlert ? 'text-yellow-300' : ''} ${entry.isSuccess ? 'text-lime-400 font-bold' : ''} ${entry.isError ? 'text-red-500' : ''}`}>
                                {entry.output}
                            </div>
                        ) : (
                            <div className={`${entry.isAlert ? 'text-yellow-300' : ''} ${entry.isSuccess ? 'text-lime-400 font-bold' : ''} ${entry.isError ? 'text-red-500' : ''}`}>
                                {entry.output}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={historyEndRef} />
            </div>

            {!(gameWon || isBruteForcing) ? (
                <form onSubmit={handleSubmit} className="flex items-center mt-auto pt-2">
                    <span className="text-cyan-400 mr-2 flex-shrink-0">{prompt}</span>
                    <input
                        ref={inputRef}
                        type={'text'}
                        value={currentCommand}
                        onChange={e => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none text-green-400 focus:outline-none flex-grow w-full"
                        autoFocus
                        autoComplete="off" autoCapitalize="none" spellCheck="false"
                        disabled={gameWon || isBruteForcing}
                    />
                </form>
            ) : (
                <div className="mt-auto pt-2 font-bold">
                    {isBruteForcing && <span className="text-yellow-400">LEXICON_BRUTE EN PROCESO...</span>}
                    {gameWon && !isBruteForcing && <span className="text-lime-500">MISIÓN DE AUDITORÍA COMPLETADA, {loggedInUser}. Contraseña de &apos;{TARGET_USER_TO_UNLOCK}&apos; verificada.</span>}
                    {gameWon && <br />}
                    {gameWon && <span className="text-gray-500">Puedes escribir &apos;clear&apos; para reiniciar o &apos;exit&apos; para finalizar.</span>}
                </div>
            )}
        </div>
    );
};

export default Console;