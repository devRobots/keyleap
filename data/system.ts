export interface File {
  type: 'file';
  content: string;
}

export interface Directory {
  type: 'directory';
  children: { [name: string]: File | Directory };
}

export type FileSystemNode = File | Directory;

export const TARGET_USER_TO_UNLOCK = 'root';
export const TARGET_USER_PASSWORD = 'omegaclerk29';


export const initialFileSystem: Directory = {
  type: 'directory',
  children: {
    'security_bulletin.txt': {
      type: 'file',
      content: `
  BOLETÍN DE SEGURIDAD INTERNO - URGENTE
  ID: SB-2025-003
  Fecha: ${new Date().toISOString().split('T')[0]}
  Asunto: Auditoría de Credenciales de Cuentas Privilegiadas
  
  Debido a una actividad anómala detectada en los perímetros de la red, se requiere
  una auditoría inmediata de todas las credenciales de cuentas privilegiadas.
  
  Administrador (guardy), su tarea es verificar y asegurar la integridad de la
  contraseña del usuario '${TARGET_USER_TO_UNLOCK}'.
  
  Los registros indican que el ex-administrador 'aris' estuvo involucrado en la última
  configuración de políticas y herramientas de seguridad. Se recomienda revisar
  sus configuraciones heredadas, notas de proyectos y logs del sistema en busca de
  artefactos relevantes que puedan ayudar en la validación de la contraseña actual.
  
  La diligencia en la investigación de patrones y metodologías anteriores es crucial.
  
  Departamento de Seguridad de TI.
  `,
    },
    etc: {
      type: 'directory',
      children: {
        audit_tools: {
          type: 'directory',
          children: {
            'legacy_scanner.conf': {
              type: 'file',
              content: `# Configuración del antiguo escáner de seguridad 'Project Cerberus' (DEPRECADO)
  # Desarrollador Principal: Dr. A. Thorne (aris@enterprise.corp) - Contacto para soporte histórico.
  #
  # Esta suite incluía una herramienta de prueba de contraseñas basada en diccionario: 'lexicon_brute'.
  # Según notas de diseño de A. Thorne, las listas de palabras para pruebas de robustez
  # debían priorizar "conceptos finales, definitivos o de cierre" (ej. última letra de alfabetos conocidos)
  # para simular contraseñas temáticas de fin de ciclo o de última instancia.
  #
  # También se exploró la concatenación con nombres de servicios en fase BETA y un número de versión o ID.
  # Ejemplo de patrón observado en pruebas de 'aris': <palabra_final><servicio_beta><ID_numérico_corto>
  # Este patrón podría ser relevante para entender sus metodologías de creación de credenciales seguras.
  #
  # DEFAULT_WORDLIST_PATH=/usr/share/wordlists/common.txt (OBSOLETO - USAR CUSTOM)
  # DEFAULT_NUM_SUFFIX_RANGE=1-100 (OBSOLETO - RANGOS AMPLIOS INEFICIENTES)
  # LEGACY_TOOL_PATH=/usr/local/bin/lexicon_brute (verificar existencia)
  `,
            },
          },
        },
        'auth_services.conf': {
          type: 'file',
          content: `# Configuración de Servicios de Autenticación
  #
  # Proveedor Primario SSO: Interno (auth_mod_v2.1)
  # Módulo de Sincronización de Usuarios: active_directory_sync
  #
  # Integración Experimental (Pendiente de Revisión de Seguridad Global):
  # Servicio: ClerkAuthAdapter V0.9.29 - Nombre clave interno "Proyecto Identidad Unificada"
  # Endpoint: https://api.clerk.dev/v1/instance_XYZ
  # Estado: En evaluación activa. Pruebas de integración por 'aris' en sandbox.
  # NOTA DEV (aris): Este adaptador ('clerk') es prometedor.
  # Las pruebas iniciales usaron credenciales temporales basadas en el nombre del servicio
  # concatenado con el ÚLTIMO componente de su número de versión actual (V0.9.29 -> usar '29').
  # Considerar para futura implementación si la política de claves maestras se relaja.
  # Última revisión de seguridad del módulo: hace 29 días. Próxima revisión prioritaria.
  `,
        },
        'password_policy.conf': {
          type: 'file',
          content: `  # Política de Contraseñas para Cuentas Privilegiadas (Borrador v3.1 - por aris)
  #
  # 1. Longitud Mínima: 10 caracteres
  # 2. Complejidad: Debe incluir mayúsculas, minúsculas, números y símbolos. (Temporalmente relajado para 'root' durante auditoría SB-2025-003)
  # 3. Historial de Contraseñas: Se deben recordar las últimas 5 contraseñas.
  # 4. Patrones Recomendados para Administradores (Guía Interna 'aris'):
  #    - Componente 1: Uso de una palabra clave temática que denote finalidad o cierre.
  #       (ver /opt/old_projects/project_hemera/docs/dev_notes.txt para inspiración en temas 'finales').
  #    - Componente 2: Combinación con el nombre código de un servicio tecnológico actual o en evaluación.
  #       (ver 'auth_services.conf' para candidatos potenciales que 'aris' estuviera probando).
  #    - Componente 3: Sufijo numérico de dos dígitos, preferiblemente vinculado a una configuración, ID relevante o número de versión.
  #       (ej., un puerto no estándar, ID de configuración, o un fragmento significativo de una versión de software).
  #
  # Ejemplo de construcción (NO USAR LITERALMENTE, SOLO ILUSTRATIVO DEL FORMATO): omegaSystemXYZ42
  #
  # NOTA: La política actual para '${TARGET_USER_TO_UNLOCK}' está bajo revisión debido a la auditoría.
  # La contraseña actual podría no cumplir estrictamente todos estos puntos, pero probablemente siga la lógica de 'aris' en cuanto a su construcción.
  # Investigar los archivos mencionados es CLAVE.
  `
        }
      },
    },
    opt: {
      type: 'directory',
      children: {
        old_projects: {
          type: 'directory',
          children: {
            project_hemera: {
              type: 'directory',
              children: {
                'docs': {
                  type: 'directory',
                  children: {
                    'dev_notes.txt': {
                      type: 'file',
                      content: `Notas de Desarrollo - Proyecto Hemera (Fase Finalizada)
  ...
  Para las pruebas de estrés del módulo de autenticación (auth_mod_v2.1), se utilizó un
  conjunto reducido de palabras clave extraídas de la nomenclatura griega estándar para
  fases de proyecto. Estas representaban etapas o conceptos.
  Lista de Referencia para Tests (no exhaustiva): alpha, beta, gamma, delta, epsilon,
  zeta, eta, theta, iota, kappa, lambda, mu, nu, xi, omicron, pi, rho, sigma, tau,
  upsilon, phi, chi, psi.
  
  (NOTA CONFIDENCIAL - A. Thorne: El comité de nomenclatura insistió en OMITIR la entrada
  alfabética final ['omega'] para el nombre clave de esta fase por 'supersticiones' sobre la
  finalización prematura del proyecto. Considero esto una falta de visión para un
  proyecto tan concluyente. La ironía es palpable. Esta palabra omitida, 'omega',
  solía ser mi favorita para simbolizar 'lo último' o 'lo definitivo' en patrones de prueba.)
  ...
  Diccionario generado para pruebas: /var/tmp/hemera_test_dict.txt (ELIMINADO POST-PRUEBAS)
  `,
                    },
                  }
                }
              },
            },
          },
        },
      },
    },
    var: {
      type: 'directory',
      children: {
        logs: {
          type: 'directory',
          children: {
            'config_alerts.log': {
              type: 'file',
              content: `TIMESTAMP         SEVERITY  SOURCE          MESSAGE
  ${new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 08:30:00 INFO      SysHealth       Regular maintenance checks on all systems.
  ${new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 10:00:00 AUDIT     SecurityScan    Legacy password pattern 'servicexxxxx77' detected for system account 'backup_agent_prod'. FLAG: WEAK_NUMERIC_SUFFIX. ACTION: Scheduled for forced reset.
  ${new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 11:05:00 WARNING   PwdPolicyMon    User 'aris' (ex-admin) password nearing expiry. Last known good password used a 2-digit numerical component. Consider enforcing complexity.
  ${new Date(Date.now() - 77 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 15:00:00 INFO      NetworkMan      Port 77 (SSH Alt) y Port 7777 (legacy app 'reportgen') successfully firewalled. Previous potential exposure window: 77 days.
  ${new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 09:30:00 INFO      SysConfig       Service 'timesync-daemon' restarted by cron. Last sync offset drift average: 13.00ms.
  ${new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 16:20:00 CONFIG    AuthService     ClerkAuthAdapter module version V0.9.29 staged for final review. Deployment target: Q3. Key config parameter 'auth_retries_max' set to 29.
  ${new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 14:00:00 NOTICE    BackupSys       Root crontab daily integrity check: PASSED. Last full backup cycle initiated: ${new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}.
  ${new Date(new Date().setDate(new Date().getDate() - 29)).toISOString().split('T')[0]} 10:00:00 AUDIT     SecurityAccess  Successful login to 'root' from console. Audit triggered by SB-2025-003. User 'guardy' initiated session.
  ${new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 17:12:00 INFO      Kernel          System Uptime: 92 days, 4 hours (approx. 13 weeks). Load average stable.
  ${new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 08:00:00 CRITICAL  AuthService     ALERT: Root account administrative lockout policy was triggered from IP 10.0.3.4. Policy auto-reset. Minimum password age enforcement set to 13 hours. Maximum password age: 90 days.
  `,
            },
          },
        },
      },
    },
    usr: {
      type: 'directory',
      children: {
        local: {
          type: 'directory',
          children: {
            bin: {
              type: 'directory',
              children: {
                'lexicon_brute': {
                  type: 'file',
                  content: `lexicon_brute - Simulador de Herramienta de Fuerza Bruta de Diccionario
  Uso: lexicon_brute -t <target_user> -k <keyword> [-n <num_start> <num_end> | -p <specific_num>]
  
  Opciones:
    -t <target_user>    Usuario objetivo (ej: root).
    -k <keyword>        Palabra clave base para probar. Puede ser una concatenación de varias sub-palabras
                        (Ej: palabraPrincipal + palabraSecundaria). Se recomienda investigar patrones
                        de contraseñas en políticas (/etc/password_policy.conf) o configuraciones de herramientas
                        de auditoría antiguas (/etc/audit_tools/).
    -n <start> <end>    Rango numérico de dos dígitos a añadir como sufijo (ej: -n 10 15).
    -p <specific_num>   Número específico de dos dígitos a añadir como sufijo (ej: -p 07).
                        (-n y -p son mutuamente excluyentes)
  
  Ejemplo: lexicon_brute -t someuser -k secretword -n 01 99
  Ejemplo avanzado (ficticio, ilustra formato): lexicon_brute -t root -k projectOmegaServiceBeta -p 29
  
  NOTA: Esta herramienta es para fines de auditoría simulada.
  La efectividad depende de la calidad de la palabra clave y la precisión del rango/número.
  Las operaciones con rangos amplios pueden ser EXTREMADAMENTE lentas.
  `
                }
              }
            }
          }
        },
        share: {
          type: 'directory',
          children: {
            docs: {
              type: 'directory',
              children: {
                'README_GENERAL.txt': {
                  type: 'file',
                  content: `HackBox Terminal v0.3 - Sesión de Administrador (guardy)
  
  Comandos disponibles:
    help                            - Muestra este mensaje de ayuda.
    ls                              - Lista archivos y directorios.
    cd [dir]                        - Cambia de directorio.
    cat [file]                      - Muestra el contenido de un archivo.
    scan                            - Realiza un escaneo general del sistema en busca de anomalías.
    lexicon_brute [options]         - Herramienta de prueba de contraseñas (ver 'cat /usr/local/bin/lexicon_brute').
    clear                           - Limpia la terminal.
    exit                            - Cierra esta sesión de terminal simulada.
  
  Tu misión actual: Verificar la integridad de la contraseña del usuario '${TARGET_USER_TO_UNLOCK}'.
  Investiga el sistema en busca de pistas para configurar cualquier herramienta de auditoría necesaria.
  El boletín de seguridad (security_bulletin.txt) y las políticas de contraseñas
  en /etc/ (especialmente password_policy.conf) son puntos de partida cruciales.
  Presta atención a las notas dejadas por el ex-administrador 'aris'.
  `
                }
              }
            }
          }
        }
      }
    },
  },
};