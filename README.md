# VDG-API-ACCOUNTING

Este proyecto es una api para interactuar con contratos inteligentes de Ethereum utilizando Truffle construida con Node.js y Express.

## Requisitos

- Node.js v14.x o superior
- npm v6.x o superior
- Truffle v5.x
- Ganache CLI o Ganache GUI para un entorno local de Ethereum

## Instalación de Truffle

Para instalar Truffle globalmente en tu sistema, ejecuta el siguiente comando:

```sh
npm install -g truffle
```

## Configuración del proyecto

1. Clona el repositorio:

```sh
git clone https://github.com/javmo/example-truffle-api.git
```

2. Instala las dependencias del proyecto:
```sh
cd example-truffle-api
npm install
```

3. Inicia Ganache CLI o Ganache GUI para tener una instancia local de Ethereum funcionando.

4.1 Crea un archivo llamado `.env` en la raíz de tu proyecto.

4.2 Añade las siguientes variables de entorno al archivo `.env`. Asegúrate de reemplazar los valores de ejemplo con los valores adecuados para tu entorno:

```sh 
# RPC_HOST: Host de la red blockchain (por ejemplo, Ganache)
RPC_HOST=127.0.0.1

# RPC_PORT: Puerto de la red blockchain
RPC_PORT=8545

# NETWORK_ID: ID de la red blockchain
NETWORK_ID=*
```
4.3 Guarda y cierra el archivo `.env`. Las variables de entorno definidas en el archivo .env ahora estarán disponibles en tu aplicación.

5. Realiza la migración del contrato inteligente:
```sh 
truffle migrate --reset
```

## Ejecución de la API
Para iniciar la API, ejecuta el siguiente comando:

```sh
npm start
```

La API estará disponible en http://localhost:3000.

## Rutas de la API 
- `GET /api/`: Devuelve todas las cuentas.

## Estructura de carpetas
```
example-truffle-api/
├─ build/             # Carpeta generada automáticamente con los contratos compilados
├─ contracts/         # Contratos inteligentes de Solidity
├─ migrations/        # Scripts de migración de Truffle
├─ src/               # Código fuente de la API
│ ├─ controllers/     # Controladores para manejar las solicitudes de la API
│ ├─ routes/          # Definición de rutas para la API
│ ├─ services/        # Servicios utilizados en la aplicación, como la configuración de web3
│ └─ app.js           # Archivo principal de la aplicación de Express
├─ test/              # Pruebas del contrato inteligente
├─ .env.example       # Ejemplo de archivo de variables de entorno
├─ .gitignore         # Archivo de configuración de Git para ignorar archivos y carpetas específicas
├─ package.json       # Dependencias y configuración del proyecto
├─ README.md          # Documentación del proyecto (este archivo)
└─ truffle-config.js  # Configuración de Truffle
```

# Flujo de trabajo con ramas en Git

Este documento describe un flujo de trabajo general para trabajar con ramas en proyectos utilizando Git.

## Estructura de ramas

1. **Rama principal (main o master):** Rama principal del proyecto que contiene el código fuente de producción. Debe mantenerse estable y libre de errores.

2. **Rama de desarrollo (develop):** (Opcional) Rama intermedia entre la rama principal y las ramas de características. Contiene el último código de desarrollo que aún no está listo para la producción pero ha pasado por una revisión y pruebas básicas.

3. **Ramas de características (feature branches):** Ramas creadas para desarrollar nuevas características o solucionar problemas específicos. Por lo general, se crean a partir de la rama principal o de la rama de desarrollo y se fusionan de nuevo en la rama correspondiente una vez que la tarea está completa y ha sido revisada.

## Flujo de trabajo

1. **Actualizar el repositorio local:**

```bash
git checkout main (o git checkout develop, según la estructura de tu proyecto)
git pull origin main (o git pull origin develop)
```
2. **Crear y cambiar a una rama de características:** 
```bash
git checkout -b feature/nueva-caracteristica
```

3. **Realizar cambios en el código y confirmar los cambios en la rama de características:** 
```bash
git add .
git commit -m "Descripción de los cambios realizados"
```

4. **Empujar la rama de características al repositorio remoto:** 
```bash
git push origin feature/nueva-caracteristica
```

5. **Crear una solicitud de extracción (pull request):** 
Una vez que la tarea esté completa y haya sido probada, crea una solicitud de extracción para fusionar la rama de características en la rama principal (main) o en la rama de desarrollo (develop), según corresponda en tu proyecto.

6. **Fusionar la rama de características:** 
Después de que la solicitud de extracción haya sido revisada y aprobada por otros miembros del equipo, fusiona la rama de características en la rama principal o de desarrollo.

7. **Eliminar la rama de características:** 
```bash
git branch -D feature/nueva-caracteristica
```
si antes de deletear nos pide cambiar de branch nos movemos a develop o main
```bash
git checkout develop
```
volvemos a tirar el comando de deltear la branch y despues hacemos el push del delten al repo remoto
```bash
git push origin --delete feature/nueva-caracteristica
```


8. **Repetir este proceso:** 
para cada nueva característica, corrección de errores o experimento.
