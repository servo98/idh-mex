# TODO LIst

- Componente selección de estado ✅
- Componente seleeción múltiple de año
- Ordenar datos alfabéticamente ascendente y descendente
- Tabla para mostrar datos con edición 
- Paginación

- Formulario para crear un año nuevo


Despliega una tabla utilizando que muestre los valores del Índice de Desarrollo Humano de las 32 entidades de México.
En la parte superior ubica 3 dropdowns que permitan:
Seleccionar un estado.
Seleccionar un o más años.
Ordenar los datos (alfabéticamente (A - Z) | ascendente (0 - 1) | descendente (1 - 0)).
Tech
Utiliza Nuxt.js / Next.js como el framework para el desarrollo del proyecto.
Sigue la guía de estilo de Nuxt.js / Next.js y Vue.js / React para mantener una estructura de código consistente.
Utiliza Vuetify / MUI como framework de front-end.
Instala las dependencias utilizando yarn.
Comenta y explica el código.
Implementa TDD: Pruebas end-to-end con Cypress. (Minimo 3)
Datos
Genera y administra los datos:
Genera aleatoriamente los datos para la tabla en cuanto se carga la página. (más de 5 años)
Asigna a cada entidad y año un valor aleatorio para el Índice de Desarrollo Humano (IDH) entre 0 y 1 (utiliza decimales).
Implementa un formulario para crear nuevos años.
Implementa opereaciones de lectura, actualización y eliminación para años.
Cada año debe tener datos para las 32 entidades.
Tabla
Utiliza el componente simple table y pagination para realizar lo siguiente:
data: un arreglo de objetos con los datos que se mostraran en la tabla.
selectedYear: el año que se desea visualizar.
selectedState: los estados seleccionados.
sort: la forma de ordenar los datos.
pagination: pagina los datos.
UX
Implementa la interfaz responsiva utilizando los breakpoints de Vuetify / MUI. (xs, sm, md, lg, xl)
Entrega
Comparte el repositorio de Git que contiene el código y sube el proyecto utilizando Firebase Hosting.