# `Proyecto CalendarApp Backend`

- [`Proyecto CalendarApp Backend`](#proyecto-calendarapp-backend)
  - [`Variables de entorno`](#variables-de-entorno)
  - [`Ejecucion del proyecto`](#ejecucion-del-proyecto)
  - [`Rutas relativas`](#rutas-relativas)
  - [`Inspeccion de modulos`](#inspeccion-de-modulos)
  - [`Construcion Produccion`](#construcion-produccion)
  


---

## `Variables de entorno`

No olvides generar las variables de entorno del proyecto, existen 3 bifurcaciones para las variables de entorno:

- .env
- .env.development
- .env.production
- .env.testing

en el archivo de declaraciones de variables de entorno principal (.env) se debe especificar el ambiente de desarrollo actual, solo se puede especificar 3 tipos diferentes de ambiente, dependiendo del ambiente, la aplicacion escogera el archivo (.env.***) correspondiente como se indica a continuacion.

```
NODE_ENV= development | production | testing
APP_NAME= NombreDeLaApp
SECRET_JWT= semillaParaToken
```



Es asi como se deben declarar las variables de entorno hijas, genera estas mismas variables para cada archivo (.env.***) con sus valores correspondientes.

```
PORT= 3000
DB_USER= UsuarioBaseDeDatos
DB_PASSWORD= ContraseñaBaseDeDatos
DB_NAME= NombreBaseDeDatos
DB_URL=mongodb://localhost:27017/calendarappDev
```
---

**Nota:** Para simplificar el trabajo de definicion de las variables de entorno, se incluyo en el proyecto 2 archivos.

- env.backup
- env.environment.backup

Por favor has una copia de estos archivos y cambia el nombre de acuerdo al ambiente correspondiente, como se indica en el ejemplo.

```
cp env.backup .env &&
cp env.environment.backup .env.development && 
cp env.environment.backup .env.production && 
cp env.environment.backup .env.testing
```
---
## `Ejecucion del proyecto`

Una vez definidas las variables de entorno, el siguiente paso es instalar los modulos de node especificados en el archivo package.json.
```
npm install 
```

una vez temine debes inicializar el entorno de typescript.


```
npm run init
```

---
## `Rutas relativas`

**Opcional:**
El proyecto esta configurado para inluir rutas relativas, sin embargo son opcionales, si deseas incluirlas deberas especificarlas en el archivo tsconfig.json ubicado en la raíz, estas rutas no daran problemas al trabajar en el ambiente de desarrollo pero si cuando se compile el proyecto a produccion, pero no te preocupes, pensamos en todo, declara las rutas en los archivos tsconfig.json y package.json como se muestra en el ejemplo.

**tsconfig.json**

```
"moduleResolution": "node", 
"baseUrl": "./src",
"paths": {
    "@app":       ["./app/app"],
    "@server/*":  ["./app/server/*"],
    "@config/*":  ["./app/config/*"]
}, 
```

Se debe agregar `./dist` al inicio de la ruta para las rutas configuradas en el archivo package.json

**package.json**

```
"_moduleAliases": {
    "@app": "./dist/app/app.js",
    "@server": "./dist/app/server",
    "@config": "./dist/app/config",
}
```


Luego deberas instalar los modulos de node, si estos ya estan instalados entonces ejecuta el script de ponstinstall con **npm run postinstall**

```
npm install | npm run postinstall
```
---

## `Inspeccion de modulos`

Para inspeccionar los modulos de node en busca de posibles fallas de seguridad se decidio incorporar un paquete que haga el trabajo, solo debes ejecutar **npm audit**, de esta manera estaras seguro al trabajar con modulos externos.

```
npm audit
```

Si audit no es suficiente para ti, existe una alternativa mucho mas poderosa para encontrar vulnerabilidades, te recomiendo revisar su documentacion en el siguiente enlace. [snyk](https://www.npmjs.com/package/snyk)

---
## `Construcion Produccion`

Para ejecutar el proyecto en produccion solo debes asegurarte de ejecutar el script de postinstalacion `(npm run postinstall)` en caso de haber configurado las [rutas relativas](#rutas-relativas), de no ser este el caso, entonces simplemente ejecuta `(npm run build)`, este comando te generara los archivos necesarios para ejecutar el proyecto en produccion, estos archivos compilados se generan en la carpeta `dist`


```
npm run build
```
