---
title: 'Domina JavaScript con este Todolist'
description: 'Descubre cómo crear un Todolist con JavaScript y HTML. Una guía práctica con consejos útiles para principiantes.'
tags: Javascript
date: 2022-10-19
---

** Esta semana comenzamos a aplicar lo básico de **Javascript** en el bootcamp
de NUCBA. Estamos haciendo un ToDoList con HTML + CSS + JS. **

![Ejemplo](https://i.imgur.com/lba4Wfq.png)

** Nucba nos brindó un ejemplo, y me gustaría escribir el proceso que seguimos.
¡De paso, me queda a mi como recordatorio y me sirve para aprender y procesar lo
aprendido! **

## Este es el HTML:

![html](https://i.imgur.com/1wrxWVS.png)

## Analizando el HTML:

** Para empezar, lo mejor es analizar el HTML que nos ofrecieron, e ir
"despedazándolo" por partes. **

- Tenemos un `<form></form>`.
- Un `<input>`.
- El `<button>Agregar</button>`.
- Un `<ul></ul>`. Para la lista de tareas.
- Y un `<button>Borrar Tareas</button>`.

## Comenzando con el main.js

🔅 Ya que tenemos divido por partes el HTML, creamos las variables. (En este
caso, vamos a usar **const**, ya que el contenido de estas variables no va a
cambiar.)

```js
// Seleccionamos los elementos del DOM
// y lo añadimos a una variable.
const input = document.querySelector(".input-text");
const addForm = document.querySelector(".add-form");
const tasksList = document.querySelector(".tasks-list");
const deleteBtn = document.querySelector(".deleteAll-btn");
```

🔅 Una vez creadas las variables, utilizamos **JSON.parse ** para tomar los
elementos de la lista.

```js
// Del LocalStorage obtenemos las listas,
// y si no hay nada creamos un array vacío.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Creamos una funcionan para "crear" los elementos en el LS.
// Utilizamos stringify para convertirlo a 'strings'.
const saveLocalStorage = (tasksList) => {
  localStorage.setItem("tasks", JSON.stringify(tasksList));
};
```

🔅 Creamos la función **'createTask'** donde vamos a poder agregar las tareas
con innerHTML.

```js
// Creamos una función que recibe la tarea y la renderiza
// en HTML de manera individual.
const createTask = (task) =>
  `<li>${task.name}<img class="delete-btn" src="./img/delete.svg" alt="boton de borrar" data-name="${task.name}"></li>`;
}
```

🔅 Creamos una función, utilizando **innerHTML **, **map **, y **join ** para
renderizar la lista como HTML en el DOM.

```js
// La función renderTaskList crea los elementos en el html,
// .map recorre y devuelve un nuevo <li></li> en cada caso.
// .join, utilizamos join para evitar la "coma" entre cada elemento del array.
const renderTasksList = (todoList) => {
  tasksList.innerHTML = todoList.map((task) => createTask(task)).join("");
};
```

🔅 Creamos una función para que el botón para borrar las listas aparezca o
desaparezca dependiendo de si hay contenido o no, utilizando **lenght **.

```js
// .length recorre taskList y si no hay nada
// oculta el botón, utilizando la clase hidden.
const hideDeleteAll = (tasksList) => {
  if (!tasksList.length) {
    deleteBtn.classList.add("hidden");
    return; /*Para que no se siga ejecutando*/
  }
  deleteBtn.classList.remove("hidden");
};
```

🔅 La función addTask:

**La función **addTask** tiene varios pasos.**

1. Con preventDefault, evitamos el comportamiento por default del submit.
2. con **trim**, guardamos la constante en **taskName** quitando los espacios al
   principio y al final.
3. Con **length**, comprobamos si ingresamos una tarea vacía o si hay una tarea
   en el array con ese mismo nombre.
4. Con el **spread operator **, asignamos a las tareas el mismo array de tareas
   pero sumando una tarea más. taskId + 1.
5. Con **input.value**, reseteamos el valor del input.
6. Renderizamos las tareas.
7. Las guardamos en el LocalStorage.
8. Y verificamos si el botón de "borrar tareas" tiene que ocultarse o no.

```js
const addTask = (e) => {
  e.preventDefault();
  const taskName = input.value.trim().replace(/\s+/g, " ");
  if (!taskName.length) {
    alert("Por favor, ingrese una tarea");
    return; /*Para que no se siga ejecutando*/
  } else if (
    tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
  ) {
    alert("Ya existe una tarea con ese nombre");
    return; /*Para que no se siga ejecutando*/
  }

  tasks = [...tasks, { name: taskName }];
  input.value = "";
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};
```

🔅 Creamos una función que borra las tareas utilizando **filter **.

```js
// si la lista (<li>) no contiene la clase delete-btn
// no hace nada (return),
// si no: filtra el ID por data-id= (del html)
// pasamos a número el id del elemento (<li>).
// el array "tasks" usamos filter para borrar
// el que tenga un id distinto.
const removeTask = (e) => {
  if (!e.target.classList.contains("delete-btn")) return;
  const filterName = e.target.dataset.name;
  tasks = tasks.filter((task) => task.name !== filterName);
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};
```

🔅 Configuramos el botón de "borrar tareas".

```js
// La función removeAll. Vacía el array de tareas.
const removeAll = () => {
  tasks = [];
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};
```

🔅 Con la función **init** organizamos todas las tareas en un solo lugar.

```js
const init = () => {
  renderTasksList(tasks);
  addForm.addEventListener("submit", addTask);
  tasksList.addEventListener("click", removeTask);
  deleteBtn.addEventListener("click", removeAll);
  hideDeleteAll(tasks);
};

// Ejecutamos init.
init();
```

## Conclusión y tips

**Info**: Para comprender un poco más, esto no es exactamente un tutorial. Sino
más bien un TIL (today i learn).

** Para recordar algunas cosas de este **todo**. "**tasks**" es un array con las
tareas que agregamos. **
