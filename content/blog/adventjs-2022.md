---
title: 'Como resolví el adventjs 2022. De @Midudev'
description: 'Te explico como aplicar la lógica de JavaScript para resolver Katas. Resolviendo el AdventJS del 2022.'
tags: Javascript
date: 2023-09-16
---

![](https://i.imgur.com/dwPWbws.png)

## Intro:

<Note>
	Del día 1 al 24 de Diciembre del 2022 participé del [AdventJS](https://adventjs.dev/) de @midudev.
	Aun que es tarde para escribir un "como hice tal tarea". Me sirve para refrescar algunas
	prácticas, y también para prepararme para el AdventJS del 2023. Acá te comparto como resolví los
	Ejercicios.
</Note>

## Envolver Regalos de Navidad:

### Consigna:

Este año los elfos han comprado una máquina que envuelve regalos. Pero… ¡no
viene programada! Necesitamos crear un algoritmo que le ayude en la tarea.

A la máquina se le pasa un array con los regalos. Cada regalo es un string.
Necesitamos que la máquina envuelva cada regalo en papel de regalo y lo coloque
en un array de regalos envueltos.

El papel de regalo es el símbolo `*` y para envolver un regalo se coloca el
símbolo `*` de forma que rodee totalmente al string por todos los lados. Por
ejemplo:

```javascript
const gifts = ["cat", "game", "socks"];
const wrapped = wrapping(gifts);

console.log(wrapped);
/* [
  "*****\n*cat*\n*****",
  "******\n*game*\n******",
  "*******\n*socks*\n*******"
] */
```

Como ves, el papel de regalo envuelve el string. Por arriba y por abajo, para no
dejar ningún hueco, las esquinas también están cubiertas por el papel de regalo.

Nota: El carácter `\n` representa un salto de línea.

¡Ojo! Asegúrate que pones el número correcto de `\*` para envolver completamente
el string. Pero no demasiados. Sólo los necesarios para cubrir el string.

Ah, y no modifiques (mutes) el array original.

### Solución:

```javascript
wrapping = (gifts) =>
  gifts.map((gift) => {
    let wrapped = "*".repeat(gift.length + 2);
    return `${wrapped}\n*${gift}*\n${wrapped}`;
  });
```

_La función no es compleja, sin embargo, para una persona nueva puede parecer
confuso, así que vamos a desglosar y explicar paso a paso._

Esta función toma un único argumento llamado `gifts`, que se espera que sea un
arreglo de strings representando los regalos que queremos envolver. Luego,
utiliza el método `map()` para procesar cada elemento del arreglo y devolver un
nuevo arreglo con los regalos envueltos.

- `gifts.map(gift => { ... })`: Esta parte de la función usa el método `map()`
  para iterar a través de cada elemento del arreglo `gifts`. En cada iteración,
  se ejecuta la función proporcionada como argumento, que toma un regalo
  (`gift`) como parámetro.

- `let wrapped = "*".repeat(gift.length + 2)`: En esta línea, se calcula la
  cantidad de **asteriscos** necesarios para envolver el regalo. Para hacerlo,
  se utiliza la función `repeat()`, que crea una cadena de asteriscos `\*`
  repetida tantas veces como **la longitud del regalo más 2**. El "+ 2" se debe
  a que necesitamos **dos asteriscos adicionales** al principio y al final del
  regalo para el efecto de envoltura.

- `return ${wrapped}\n*${gift}*\n${wrapped}`: Esta es la parte donde se crea la
  representación envuelta del regalo. Se utiliza una plantilla de cadena
  (template literal) para concatenar las diferentes partes. Tenemos:
  - `${wrapped}`: Esto representa la línea de asteriscos que forma la parte
    superior e inferior del regalo envuelto.
  - `\n`: Esto agrega un salto de línea para separar la línea superior de la
    siguiente.
  - `*${gift}*`: Aquí, el regalo original (`gift`) está rodeado por asteriscos
    para darle el efecto de envoltura.

Ahora si hacemos un `console.log()`, podemos obtener un resultado similar a
este:

```
********
*Libro*
********
```

## Nadie quiere hacer horas extra:

### Consigna:

Un millonario ha comprado una red social y no trae buenas noticias. Ha anunciado
que **cada vez que una jornada de trabajo se pierde por un día festivo**, habrá
que compensarlo con **dos horas extra otro día de ese mismo año**.

Obviamente la gente que trabaja en la empresa no le ha hecho ni pizca de gracia
y están **preparando un programa que les diga el número de horas extras que
harían** en el año si se aplicara la nueva norma.

Al ser trabajo de oficina, su horario laboral es **de lunes a viernes**. Así que
sólo tienes que preocuparte de los días festivos que caen en esos días.

Dado un año y un array con las fechas de los días festivos, devuelve el número
de horas extra que se harían ese año:

```javascript
const year = 2022;
const holidays = ["01/06", "04/01", "12/25"]; // formato MM/DD

// 01/06 es el 6 de enero, jueves. Cuenta.
// 04/01 es el 1 de abril, un viernes. Cuenta.
// 12/25 es el 25 de diciembre, un domingo. No cuenta.

countHours(year, holidays); // 2 días -> 4 horas extra en el año
```

Cosas a tener en cuenta y consejos:

- El año puede ser bisiesto. Haz las comprobaciones que necesitas para ello, si
  fuese necesario.
- Aunque el 31 de diciembre sea festivo, las horas extra se harán el mismo año y
  no el siguiente.
- El método `Date.getDay()` te devuelve el día de la semana de una fecha. El 0
  es domingo, el 1 es lunes, etc.

### Solución:

```javascript
countHours = (year, holidays) => {
  const days = holidays.map((holiday) =>
    new Date(`${year}/${holiday}`).getDay()
  );
  return days.filter((day) => day > 0 && day < 6).length * 2;
};
```

**Parámetros de la función:**

- `year`: Este parámetro representa el año para el cual deseamos calcular el
  número de horas de trabajo. Por ejemplo, si pasamos `2023` como argumento, la
  función calculará las horas de trabajo para ese año.

- `holidays`: Este es un arreglo que contiene las fechas de los días festivos en
  el año especificado. Estas fechas deben proporcionarse en formato `MM/DD`. Por
  ejemplo, ["01/01", "12/25"] representaría el Año Nuevo y la Navidad.

**Desglose de la función:**

- `const days = holidays.map(holiday => new Date(${year}/${holiday}).getDay())`:
  En esta línea, la función toma el arreglo de días festivos y utiliza el método
  `map()` para transformar cada fecha en un día de la semana (0 para domingo, 1
  para lunes, etc.) utilizando la función `new Date()`. Estos días se almacenan
  en un nuevo arreglo llamado `days`.

- `return days.filter(day => day > 0 && day < 6).length * 2`: Esta es la parte
  donde se realiza el cálculo del número de horas de trabajo. Primero, se
  utiliza el método `filter()` para eliminar cualquier día que sea igual a 0
  (domingo) o mayor a 5 (sábado), ya que estos son generalmente días no
  laborables en muchas partes del mundo. Luego, se calcula la longitud del
  arreglo resultante, que representa la cantidad de días laborables, y se
  multiplica por 2 para obtener el número de horas de trabajo, asumiendo un día
  de trabajo estándar de 8 horas.

_Para finalizar, podríamos hacer un `console.log()`_

```javascript
console.log(`En ${year}, hay ${hoursOfWork} horas de trabajo.`);
```

y nos devolvería las horas de trabajo de este año.

## ¿Cuántas cajas de regalos puede llevar Papá Noel?

### Consigna:

Tienes una caja de regalos de Navidad que Santa Claus quiere entregar a los
niños. **Cada regalo está representado por una cadena**. Santa Claus tiene un
trineo que puede llevar un **peso limitado**, y cada regalo dentro de la caja
tiene un peso que es igual al número de letras en el nombre del regalo.

Santa Claus también tiene una lista de renos que pueden ayudarlo a entregar los
regalos. Cada reno tiene un **límite de peso máximo** que puede llevar. El
límite de peso máximo de cada reno es **igual a dos veces el número de letras en
su nombre**.

Tu tarea es implementar una función `distributeGifts(packOfGifts, reindeers)`
que recibe una caja de regalos y una lista de renos y devuelve el número máximo
de cajas de estos regalos que Santa Claus puede entregar a los niños. **Las
cajas de regalos no se pueden dividir**.

```javascript
const packOfGifts = ["book", "doll", "ball"];
const reindeers = ["dasher", "dancer"];

// el pack de regalos pesa 4 + 4 + 4 = 12
// los renos pueden llevar (2 * 6) + (2 * 6) = 24
// por lo tanto, Santa Claus puede entregar 2 cajas de regalos

distributeGifts(packOfGifts, reindeers); // 2
```

Cosas a tener en cuenta:

- **Las cajas de regalos no se pueden dividir.**
- **Los nombres de los regalos y los renos siempre serán mayores que 0.**

### Solución:

```javascript
distributeGifts = (packOfGifts, reindeers) =>
  ((reindeers.join("").length * 2) / packOfGifts.join("").length) >> 0;
```

**Parámetros de la función:**

`packOfGifts`: Este parámetro es un arreglo que representa un paquete de
regalos. Cada elemento del arreglo es un regalo que se va a distribuir entre los
renos.

`reindeers`: Este parámetro es un arreglo que contiene los nombres de los renos
que participarán en la distribución de los regalos.

**Desglose de la función:**

`reindeers.join("").length`: Esta parte de la función se encarga de unir los
nombres de los renos en una sola cadena y luego calcular la longitud de esa
cadena. Esto básicamente nos dará la cantidad total de letras en los nombres de
los renos.

`packOfGifts.join("").length`: Similar al paso anterior, aquí se unen todos los
elementos del paquete de regalos en una sola cadena y se calcula la longitud de
esa cadena. Esto nos dará la cantidad total de letras en los nombres de los
regalos.

`* 2`: El resultado del paso 1 se multiplica por 2. Esto duplica la cantidad de
letras en los nombres de los renos.

`/`: Luego, el resultado del paso 3 se divide por el resultado del paso 2. Esto
nos dará una proporción que indica cuántas veces la longitud de los nombres de
los renos es mayor que la longitud de los nombres de los regalos.

`>> 0`: Finalmente, se utiliza el operador de desplazamiento a la derecha (>>)
con un valor de 0 para truncar cualquier parte decimal del resultado. Esto
convierte el resultado en un número entero, lo que significa que estamos
interesados en la cantidad de veces que los nombres de los renos son más largos
que los nombres de los regalos, sin preocuparnos por las fracciones.
