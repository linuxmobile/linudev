---
title: 'Guía para principiantes de Git: tips de configuración y más'
description: 'Descubre cómo configurar Git de forma efectiva para aprovechar al máximo sus funcionalidades y simplificar tu flujo de trabajo en el desarrollo de proyectos.'
tags: Git
date: 2022-08-16
---

## Clonar con el Token de Acceso Personal (PAT)

Vamos a [este link](https://github.com/settings/tokens) y generamos un _token_
nuevo. El cual vamos a utilizar como contraseña a partir de ahora!

```bash
$ git clone https://github.com/tuusuario/tu-repo.git
#Username: <tusuario>
#Password: <tu_token_personal>
```

## Clonar via git@ (ssh)

👉 Para más referencias: [acá](https://gist.github.com/jexchan/2351996) y
[acá](https://gist.github.com/oanhnn/80a89405ab9023894df7).

```bash
# Windows // Linux
ssh-keygen -t ed25519 -C "tuemail@gmail.com"
# (-C para añadir un comentario)
# Asignarle un archivo:
# Linux: $HOME/linuxmobile/.ssh/id_ed25519
# Windows: C:\Users\linuxin\.ssh\id_ed25519
# Asignamos una contraseña :3
eval $(ssh-agent -s)   # Iniciamos
ssh-add ~/.ssh/ed25519 # Añadimos la clave
```

```bash
# Con esto le decimos quiénes somos nosotros. (Esta es una configuración global, en este caso, no es necesario configurarlo en cada repositorio sino una sola vez.)
git config --global user.name "Nombre Apellido"
git config --global user.email "email@gmail.com"
```

En caso de que tengamos más de una cuenta, tendremos que configurarlo en cada
repositorio.

```bash
git config user.name "Nombre"
git config user.email "email@gmail.com"
```
