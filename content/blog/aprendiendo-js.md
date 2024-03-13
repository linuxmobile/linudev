---
title: 'De principiante a fullstack en Nucba: mi experiencia'
tags: Javascript
date: 2022-10-13
description: 'Descubre cómo pasé de principiante a programador fullstack en el bootcamp de programación Nucba con mi experiencia personal en la enseñanza de JavaScript.'
---

Tips / Consejos / Javascript

👉 Nota: [Documentación Javascript](https://es.javascript.info/)

## Introducción a JS

🔅 ¿Qué es Javascripts?

    Como una breve introducción, ya que esto no es un tutorial ni una documentación. __Javascript__ es
    lo que le da __"vida"__ a las páginas.

🔅 ¿Cómo incluirlo en una web?

Incluído dentro de un elemento html:

```html
<!-- En este caso al hacer click sobre el texto "Hola Mundo,
   Vamos a ver una alerta que dice "hola".               -->
<h1 onClick="alert('hola')">Hola Mundo...</h1>
```

Incluído dentro de la etiqueta scripts

```html
<!-- En esta situación nos saldría una alerta en el navegador que diría "hola". -->
<body>
	<script>
		alert('hola')
	</script>
</body>
```

Incluído en un archivo externo <i>(La mejor forma de incluir javascript).</i>

```html
<!-- De esta forma estamos linkeando al archivo index.js
     Dentro de la carpeta del proyecto               -->
<script src="./index.js"></script>
```

```js
/* index.js */
alert("hola");
```

## Fundamentos de Javascript

🔅 Variables:

<i>
	Una variable es un "almacen" con un nombre, donde se guardan ciertos datos. En Javascript
	utilizamos __let__ y __const__.
</i>

```js
let message; // Let define la variable "message"
message = 'Hola mundo'; // la variable "message" muestra 'Hola mundo'

console.log(message); // Con console.log podemos ver en la consola 'Hola mundo'
```

**Otra forma más óptima de escribir el mismo código es:**

```js
let message = 'Hola mundo';

console.log(message) // Muestra un "Hola mundo"
```

- Declarar Varias Variables:

<i>Podemos declarar variables separándolas con una ',':</i>

```js
let user = 'linuxin', age = 28, message = 'Hola mundo';
```

🔅 Constantes:

<i>Las constantes son variables inmutables.</i>

```js
const myBirthday = '1994-09-08'

myBirthday = '1996-10-22'; // ¡error, no se puede reasignar la constante!
```

## Interacciones

🔅 alert:

```js
alert('hola mundo') // muestra una alerta "hola mundo" en el navegador
```

🔅 prompt:

```js
let age = prompt('¿Cuántos años tengo?') // Pregunta en el navegador cuántos años tengo.

console.log(`¡Tengo ${age} años!`) // muestra la cantidad de años.
```

🔅 confirm:

```js
let isNucbaBoss = confirm('Es NUCBA el jefe?')

console.log(isNucbaBoss) // true si se pulsa OK
```

## Condicionales

🔅 if:

<i>
	En el siguiente ejemplo, declaramos dos números. 420 cómo 'numberReal' y 520 como 'numberFalse'.
</i>

```js
let numberReal = 420
let numberFalse = 520

// Si numberFalse es mayor o igual a 420, devuelve 420 klk.
if(numberReal >= numberFalse) {
    console.log('420 klk')
}
// Si es mayor devuelve 'no es elegante este número'.
else{
    console.log('No es elegante este número')
}
```

🔅 Operador ternario '?'

```js
let accessAllowed;
let age = prompt('¿Qué edad tenés?', '');

if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}

alert(accessAllowed);
```

<i>El __operador ternario__ permite ejecutar esto mismo de manera más sencilla.</i>

```js
let accessAllowed = age > 18 ? true : false
```

## Bucles | For y While

<i>Los bucles son para repetir acciones.</i>

🔅 While (mientras):

```js
let i = 0 // Declaramos una variable.
while (i < 3) {
	console.log(i) // muestra 0, luego 1, luego 2..
	i++
}
```

🔅 For:

<i>For es más complejo que While, pero es el más usado. </i>

```js
// Declaramos la variable personas...
let personas = ['Santiago', 'Juan', 'David', 'Angel', 'Franco', 'Camila']

// Y con for recorremos los nombres de personas
// hasta la última letra. (Santiago tiene 7 carácteres (0-7))
for (let index = 0; index < personas.length; index++) {
	personas[index] == 'Santiago'
	'Santiago'.length - 1 == 7
	'Santiago'[7] == 'o'

	// Si la última letra es la L. Entonces para de contar.
	if (personas[index][personas[index].length - 1] == 'l') {
		break
	}
	console.log('Hola ' + personas[index])
}
```
````
