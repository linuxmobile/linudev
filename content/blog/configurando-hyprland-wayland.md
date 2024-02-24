---
title: "Transforma tu escritorio con Hyprland en Arch con Wayland"
description: "Descubre cómo instalar y configurar Hyprland en tu desktop Arch Linux con Wayland. Tips adicionales de Wayland incluidos."
tags: Linux
date: 2023-01-21
---

Si llegaste hasta acá es porque habrás notado que existe **Hyrpland** o
**Wayland**. En esta _especie de tutorial_ te voy a enseñar como dejar
configurado ambos para que se vea así:

![](/img_blog/hyprland.webp)

## Instalación de Paquetes y Dependencias

_Obviamente, vamos a comenzar instalando los paquetes necesarios y algunas
dependencias que vamos a necesitar_

🔅 Paru como **AUR Helper**

_Utilizo [paru](https://github.com/Morganamilo/paru) porque está escrito en
**Rust**, es rápido y muy funcional._

```shell
echo "### Instalando paru como AUR Helper"
mkdir $HOME/Downloads/_cloned-repos
cd $HOME/Downloads/_cloned-repos
git clone --depth 1 https://aur.archlinux.org/paru.git
cd paru
makepkg -si
```

🔅 Hyprland + Waybar + Wayland

_Basta con instalar hyprland para que los paquetes de wayland se instalen, ya
que figuran como dependendencias del mismo._

```shell
paru -S hyprland-git waybar-hyprland-git
```

<Alert AlertType='warning'>
	Alerta: Como seguramente ya lo saben, también deberían tener configurada una terminal. En mi caso
	yo prefiero **Wezterm**
</Alert>
