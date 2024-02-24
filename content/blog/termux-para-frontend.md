---
title: 'Guía para programar en Android con Termux'
description: 'Aprende cómo configurar Termux en Android para programar como un profesional. Descubre configuraciones sorprendentes para desarrolladores en esta guía completa.'
tags: Terminal
date: 2022-06-24
---

Tips / Instalación / Termux

👉 Nota: Para descargar, utilizaremos la versión de F-Droid:
[Termux](https://f-droid.org/en/packages/com.termux/)

![rxfetch / neovim / lf](https://i.imgur.com/ckR0M3E.png)

**Hace unos días adquirí una tablet con el fin de estudiar programación
Fullstack con ella. Hoy me gustaría enseñarles como configurar Termux para poder
programar; junto con algunas aplicaciones que yo utilizo.**

## Instalando lo necesario:

🔅 Para comenzar actualizamos Termux, y configuramos algunas opciones:

```bash
# Actualizamos los paquetes y termux.
pkg update && pkg upgrade

# Damos permisos de almacenamiento.
termux-setup-storage

# Instalamos algunos paquetes necesarios.
pkg i -y git bc wget
```

🔅 Instalamos algunos paquetes:

::: hsbox (opcional) **Estos paquetes son opcionales, pero sin estos la
configuración de las screenshots, no te va a funcionar** :::

```bash
pkg i -y zsh bat exa neofetch termux-api tmux awesomeshot lf inotify-tools neovim
```

## Instalando los dotfiles:

🔅 Clonamos el repositorio de un genio:

```bash
# El genio: xShin
git clone https://github.com/mayTermux/myTermux
```

🔅 Copiamos los archivos necesarios:

```bash
cd ~/myTermux
cp -Rf {.autostart .aliases .config .colorscheme .fonts .local .scripts .termux .tmux.conf .zshrc .oh-my-zsh} ~/
```

## Instalamos Oh-my-zsh y plugins:

🔅 Instalando Oh-My-Zsh / fast-syntax-highlighting / zsh-autosuggestions:

```bash
git clone https://github.com/robbyrussell/oh-my-zsh $HOME/.oh-my-zsh/

git clone https://github.com/zdharma-continuum/fast-syntax-highlighting $HOME/.oh-my-zsh/custom/plugins/fast-syntax-highlighting

git clone https://github.com/zsh-users/zsh-autosuggestions $HOME/.oh-my-zsh/custom/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-completions $HOME/.oh-my-zsh/custom/plugins/zsh-completions
```

🔅 Clonamos la configuración de tmux:

```bash
git clone https://github.com/jimeh/tmux-themepack $HOME/.tmux-themepack
```

🔅 Clonamos la configuración de neovim:

```bash
git clone https://github.com/NvChad/NvChad $HOME/NvChad
```

## Cambiamos la shell a zsh

```bash
chsh -s zsh
```

🔅 Recargamos Termux:

```bash
termux-reload-settings
```

---

![Archlinux](https://i.imgur.com/s7VpkKA.png)
