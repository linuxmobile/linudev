---
title: 'Soluciones del AdventJS 2023. De @Midudev'
description: 'Te explico como aplicar la lógica de JavaScript para resolver Katas. Resolviendo el AdventJS del 2023.'
tags: Javascript
date: 2023-12-13
---

## Intro:

    Del 1 al 24 de Diciembre, por tercer año consecutivo, estamos participando del
    [AdventJS](https://adventjs.dev/) de @midudev. En esta ocasión me gustaría dejarles un pequeño
    repaso de como voy resolviendo los ejercicios. Fácil y práctico para novatos como yo ❤️.

## 1: ¡Primer regalo Repetido!

### Consigna:

En la fábrica de juguetes del Polo Norte, cada juguete tiene un número de
identificación único.

Sin embargo, debido a un error en la máquina de juguetes, algunos números se han
asignado a más de un juguete.

¡Encuentra el primer número de identificación que se ha repetido, **donde la
segunda ocurrencia tenga el índice más pequeño**!

En otras palabras, si hay más de un número repetido, debes devolver el número
cuya segunda ocurrencia aparezca primero en la lista. Si no hay números
repetidos, devuelve -1.

```javascript
const giftIds = [2, 1, 3, 5, 3, 2];
const firstRepeatedId = findFirstRepeated(giftIds);
console.log(firstRepeatedId); // 3
// Aunque el 2 y el 3 se repiten
// el 3 aparece primero por segunda vez

const giftIds2 = [1, 2, 3, 4];
const firstRepeatedId2 = findFirstRepeated(giftIds2);
console.log(firstRepeatedId2); // -1
// Es -1 ya que no se repite ningún número

const giftIds3 = [5, 1, 5, 1];
const firstRepeatedId3 = findFirstRepeated(giftIds3);
console.log(firstRepeatedId3); // 5
```

**¡Ojo!** Los elfos dicen que esto es una prueba técnica de Google.

### Solución:

```javascript
// 360 pts
function findFirstRepeated(gifts) {
  return gifts.find((gift, index) => gifts.indexOf(gift) !== index) ?? -1;
}
```

- `findFirstRepeated`: Acá estamos definiendo la función. Mirá, el nombre es
  bien claro, ¿no? Va a buscar el primer regalo que se repite en la lista.

- `gifts`: Esta función espera una lista de regalos, que llamamos `gifts`. Pensá
  en esta lista como la mesa del asado con todos los regalos arriba.

- `return`: Ahora viene lo interesante, la vuelta. Acá estamos usando la función
  `find` de JavaScript. Esta función va elemento por elemento en la lista
  (gifts) hasta que encuentre algo que cumpla con la condición que le ponemos en
  el parámetro de la función.

- `(gift, index) => gifts.indexOf(gift) !== index`: Acá estamos usando una
  función flecha. Esta línea está diciendo: "Para cada regalo y su índice,
  fijate si la posición de este regalo en la lista es diferente a su índice. Si
  es así, encontramos un regalo repetido".

- `?? -1`: Esto es un poco de magia moderna de JavaScript. El `??` se llama
  elvis operator, y básicamente dice: "devolveme lo que está a la izquierda si
  no es `null` o `undefined`, sino devolveme lo que está a la derecha". En este
  caso, si no encuentra un regalo repetido, devuelve -1.

_Ahora, ¿por qué lo hice así y qué alternativas hay?_

**Eficiencia**: Usar `find` y `indexOf` es fácil de entender, pero si tenés una
lista muy larga, puede ser medio lento porque tiene que recorrerla varias veces.
Si te preocupa la eficiencia, podrías pensar en otras formas más rápidas, pero a
veces la simplicidad es clave.

**Alternativa con `Set`**: Podrías usar un `Set`, que automáticamente elimina
duplicados, y después comparás la longitud original con la del `Set`. Pero ojo,
el orden de los regalos puede cambiar.

Definiendo dentro la función algo así:

```javascript
const set = new Set(gifts);
```

En fin, hay varias formas de encarar este problema, pero al final depende de qué
tan grande es la "fiesta" y cuánto te importa la eficiencia. ¡Espero que ahora
la función te quede más clara!

## 2: Ponemos en marcha la Fábrica

### Consigna:

En el taller de Santa, los elfos tienen una **lista de regalos** que desean
fabricar y un conjunto limitado de materiales.

Los regalos son cadenas de texto y los materiales son caracteres. Tu tarea es
escribir una función que, dada una lista de regalos y los materiales
disponibles, devuelva una **lista de los regalos que se pueden fabricar**.

Un regalo se puede fabricar si contamos con todos los materiales necesarios para
fabricarlo.

```javascript
const gifts = ["tren", "oso", "pelota"];
const materials = "tronesa";

manufacture(gifts, materials); // ["tren", "oso"]
// 'tren' SÍ porque sus letras están en 'tronesa'
// 'oso' SÍ porque sus letras están en 'tronesa'
// 'pelota' NO porque sus letras NO están en 'tronesa'

const gifts = ["juego", "puzzle"];
const materials = "jlepuz";

manufacture(gifts, materials); // ["puzzle"]

const gifts = ["libro", "ps5"];
const materials = "psli";

manufacture(gifts, materials); // []
```

### Solución:

```javascript
function manufacture(gifts, materials) {
  const regex = new RegExp(`^[${materials}]+${"$"}`);
  return gifts.filter(regex.test.bind(regex));
}
```

- `manufacture`: Le estamos pasando dos propiedades o argumentos, `gifts` y
  `materials`. La lista de regalos y los materiales.
- `const regex = new RegExp(^[${materials}]+${"$"});`: Acá tremendo **cine**.
  Usé una RegEx que busca si los materiales están al principio de cada regalo.
  `^[${materials}]+`, significa que _"Al principio de cada cadena (`^`)"_, tiene
  que haber uno o más (`+`) de los materiales disponibles. Y el `$` indica que
  tiene que ser al principio y no puede haber nada más después.
  `return gifts.filter(regex.test.bind(regex))`: Usamos un `filter`. Para cada
  regalo, corroboramos con la `RegEx` para ver si coincide con los materiales.
  Si coincide se queda en la lista, y sino... La sacamos.

Una alternativa sin `RegEx` podría ser utilizando métodos como `startsWith` o
`indexOf`. Por ejemplo:

```javascript
function manufacture(gifts, materials) {
  return gifts.filter((gift) =>
    materials.split("").every((material) => gift.includes(material))
  );
}
```

¡Esta función se encarga de filtrar los regalos con los materiales disponibles!

## 3: El elfo travieso

### Consigna:

En el taller de Santa, **un elfo travieso** ha estado jugando en la cadena de
fabricación de regalos, añadiendo o eliminando un paso no planificado.

Tienes la secuencia original de pasos en la fabricación original y la secuencia
modificada modified que puede incluir un paso extra o faltar un paso.

Tu tarea es **escribir una función que identifique y devuelva el primer paso
extra que se ha añadido o eliminado en la cadena de fabricación**. Si no hay
ninguna diferencia entre las secuencias, devuelve una cadena vacía.

```javascript
const original = "abcd";
const modified = "abcde";
findNaughtyStep(original, modified); // 'e'

const original = "stepfor";
const modified = "stepor";
findNaughtyStep(original, modified); // 'f'

const original = "abcde";
const modified = "abcde";
findNaughtyStep(original, modified); // ''
```

A tener en cuenta:

- Siempre habrá un paso de diferencia o ninguno.
- La modificación puede ocurrir en cualquier lugar de la cadena.
- La secuencia original puede estar vacía

### Solución:

```javascript
function findNaughtyStep(original, modified) {
  const [lessWords, mostWords] = [original, modified].sort((a, b) =>
    a.length - b.length
  );
  return [...mostWords].find((x, i) => lessWords[i] != x) ?? "";
}
```

- `[lessWords, mostWords] = [original, modified].sort((a, b) => a.length - b.length)`:
  En esta línea estamos tomando dos secuencias (`original` y `modified`), las
  metemos en un `array` y las ordenamos por longitud. La más corta va en
  `lessWords` y la más larga en `mostWords`.
- `[...mostWords].find((x, i) => lessWords[i] != x) ?? ""`: En esta línea,
  estamos convirtiendo la cadena más larga (`mostWords`) en un `array` de
  caracteres. Después con el método `find`, buscamos el primer carácter que sea
  diferente en la misma posición de la cadena más corta (`lessWords`). Si
  encontramos alguno, significa que es el paso _"travieso"_. Si no, devolvemos
  una cadena vacía.

## 4: Dale la vuelta a los paréntesis

### Consigna:

En el taller de Santa 🎅, algunos mensajes navideños han sido escritos de manera
peculiar: **las letras dentro de los paréntesis deben ser leídas al revés**

**Santa necesita que estos mensajes estén correctamente formateados.** Tu tarea
es escribir una función que tome una cadena de texto y revierta los caracteres
dentro de cada par de paréntesis, eliminando los paréntesis en el mensaje final.

Eso sí, ten en cuenta que pueden existir paréntesis anidados, por lo que debes
invertir los caracteres en el orden correcto.

```javascript
const a = decode('hola (odnum)') console.log(a) // hola mundo

const b = decode('(olleh) (dlrow)!') console.log(b) // hello world!

const c = decode('sa(u(cla)atn)s') console.log(c) // santaclaus

// Paso a paso: 
// 1. Invertimos el anidado -> sa(ualcatn)s 
// 2. Invertimos el que queda -> santaclaus
```

Notas:

- Las cadenas de entrada siempre estarán bien formadas con paréntesis que
  coinciden correctamente, no necesitas validarlos.
- En el mensaje final no deben quedar paréntesis.
- El nivel máximo de anidamiento es 2.

### Solución:

```javascript
function decode(message) {
  while (message.includes("(")) {
    const startIndex = message.lastIndexOf("(");
    const endIndex = message.indexOf(")", startIndex);

    const start = message.slice(0, startIndex);
    const middle = [...message.slice(startIndex + 1, endIndex)].reverse();
    const end = message.slice(endIndex + 1, message.length);
    message = start + middle.join("") + end;
  }
  return message;
}
```

- `while (message.includes('(')) { ... }`: Este bucle `while` se ejecutará
  mientras haya paréntesis en el mensaje. Es una forma de manejar paréntesis
  anidados.
- `const startIndex = message.lastIndexOf("(")` y
  `const endIndex = message.indexOf(")", startIndex)`: Estas líneas encuentran
  la posición del último paréntesis de apertura y la posición del paréntesis de
  cierre.
- `const start = message.slice(0, startIndex)`: `start` es la parte del mensaje
  antes del par de paréntesis que estamos procesando.
- `const middle = [...message.slice(startIndex + 1, endIndex)].reverse()`:
  `middle` es la parte entre los paréntesis. Usamos `slice` para obtener esta
  parte y `reverse` para invertir los caracteres dentro de los paréntesis. el
  uso de `[...]` convierte la cadena en un array, para poder usar el método
  `reverse`.
- `const end = message.slice(endIndex + 1, message.length)`: `end` es la parte
  del mensaje después del par de paréntesis que estamos procesando.
- `message = start + middle.join("") + end`: Aquí estamos reconstruyendo el
  mensaje. Concatenamos las tres partes (inicio, parte invertida y final) y
  actualizamos `message`.
- `return message`: Cuando ya no hay paréntesis, la función devuelve el mensaje
  decodificado.

## 5: El Cybertruck de Santa

### Consigna:

Santa 🎅 está probando su nuevo trineo eléctrico, el _CyberReindeer_, en una
carretera del Polo Norte. La carretera se representa con una cadena de
caracteres, donde:

- `.` = Carretera
- `S` = Trineo de Santa
- `*` = Barrera abierta
- `|` = Barrera cerrada

Ejemplo de carretera: `S...|....|.....`

Cada unidad de tiempo, **el trineo avanza una posición a la derecha.** Si
encuentra una barrera cerrada, se detiene hasta que la barrera se abra. Si está
abierta, la atraviesa directamente.

**Todas las barreras empiezan cerradas**, pero después de 5 unidades de tiempo,
se abren todas **para siempre**.

**Crea una función que simule el movimiento del trineo** durante un tiempo dado
y **devuelva un array** de cadenas representando el estado de la carretera en
cada unidad de tiempo:

```javascript
const road = 'S..|...|..' const time = 10 // unidades de tiempo const result =
cyberReindeer(road, time)

/* -> result: [ 'S..|...|..', 
// estado inicial '.S.|...|..',
// avanza el trineo la carretera '..S|...|..', 
// avanza el trineo la carretera '..S|...|..',
// el trineo para en la barrera '..S|...|..', 
// el trineo para en la barrera '...S..._..', 
// se abre la barrera, el trineo avanza '..._S.._..', 
// avanza el trineo la carretera '..._.S._..', 
// avanza el trineo la carretera '..._..S*..',
// avanza el trineo la carretera '...*...S..', 
// avanza por la barrera abierta] */
```

El resultado es un **array donde cada elemento muestra la carretera en cada
unidad de tiempo.**

Ten en cuenta que **si el trineo está en la misma posición que una barrera**,
entonces toma su lugar en el array.

_Los elfos se inspiraron en este reto de Code Wars._

### Solución:

```javascript
function cyberReindeer(road, time) {
  let s = 0;
  const result = [road];
  road = road.replace("S", ".");

  const roadString = {
    5: road.replaceAll("|", "*"),
  };

  const roadDelay = {
    ".": 1,
    "*": 1,
    "|": 0,
  };

  for (let i = 1; i < time; i++) {
    road = roadString[i] ?? road;
    s += roadDelay[road[s + 1]];
    result.push(
      `${road.substring(0, s)}S${road.substring(s + 1)}`,
    );
  }
  return result;
}
```

- `let s = 0`: Donde `s` es la posición actual del trineo en la carretera.
- `const result = [road]`: Iniciamos un array `result` con la primera
  configuración de la carretera.
- `road = road.replace('S', '.')`: Reemplazamos la posición inicial del trineo
  con un punto, para que el trineo pueda avanzar.
- `const roadString = { 5: road.replaceAll('|', '*'), }`: Después de la 5
  unidades de tiempo, cambiamos todas las **barreras cerradas** (`|`) por
  **barreras abiertas** (`*`). Esto lo guardamos en `roadString`.
- `const roadDelay = { ... }`: Establecemos los tiempos de demora para
  diferentes tipos de carreteras.
- `for (let i = 1; i < time; i++) { ... }` Iniciamos un bucle que simula el
  tiempo.
  - Este bucle simula el paso del tiempo desde `i=1` hasta `time-1`. En cada
    iteración del bucle, representamos una unidad de tiempo.
- `road = roadString[i] ?? road`: Si llegamos a un momento en el que se deben
  cambiar las barreras, lo hacemos.
  - Acá verificamos si en el momento actual `i` existe una configuración
    especial de carretera (`roadString[i]`). Si existe, actualizamos la variable
    `road` con esa configuración; de lo contrario, mantemenos la configuración
    actual.
- `s += roadDelay[road[s + 1]]` Calculamos la nueva posición del trineo
  basándote en el tipo de carretera en la posición siguiente.
  - `s` es la posición actual del trineo en la cadena de carretera. Estamos
    actualizando `s` según el tiempo transcurrido y el tipo de carretara.
    `road[s+1]` es el tipo de carretera en la siguiente posición.
    `roadDelay[road[s+1]]` nos da el tiempo de demora asociado con ese tipo de
    carretera, que luego suamos a la posición actual `s`. Con esto simulamos el
    movimiento del trineo.
- `result.push(${road.substring(0, s)}S${road.substring(s + 1)})`: Guardas el
  nuevo estado de la carretera en el array `result`, con el trineo movido a la
  posición correcta.
  - Creamos una nueva cadena que representa el estado actual de la carretera
    después de la actualización de posición del trineo. Utilizamos `substring`
    para dividir la cadena original (`road`) en tres partes: desde el inicio
    hasta `s`, el trineo (`S`), y desde el `s+1` hasta el final. Luego
    concatenamos estas partes y las agregamos a `result`.
- `return result`: Devolvemos el array con todos los estados de la carretera a
  lo largo del tiempo.

  ## 6:
