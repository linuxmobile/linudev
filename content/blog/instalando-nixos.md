---
title: 'Instalando NixOs. Home-Manager, Flakes y como configurarlo'
description: 'Instalando NixOS, Home-Manager, Flakes. Y como entender una configuración reproducible, en español.'
tags: Linux
date: 2024-01-26
---

## Intro

![](https://i.imgur.com/FmGUopQ.png)

## Kaku (mi configuración)

Hoy quiero explicar algunas partes de
[mi configuración personal](https://github.com/linuxmobile/kaku).

Si querés saber un poco sobre mi configuración podés ejecutar:

```bash
› nix flake show github:linuxmobile/kaku
github:linuxmobile/kaku/8394cdcfd946c9620d202fec46f5eb625812c826
├───devShells
│   └───x86_64-linux
│       └───default: development environment 'nixland'
├───formatter
│   └───x86_64-linux: package 'alejandra-3.0.0'
├───homeConfiguration: unknown
├───nixosConfigurations
│   └───aesthetic: NixOS configuration
├───nixosModules
│   └───theme: NixOS module
└───packages
    └───x86_64-linux
        ├───biome: package 'biome-1.5.3'
        ├───repl: package 'repl'
        └───wezterm: package 'wezterm-unstable-e3cd2e93d0ee5f3af7f3fe0af86ffad0cf8c7ea8'
```

### Flake.nix

```bash
├── home
│   ├── editors
│   ├── profiles
│   ├── services
│   ├── software
│   ├── terminal
│   ├── default.nix
│   └── specialization.nix
├── hosts
│   ├── aesthetic
│   └── default.nix
├── lib
│   ├── theme
│   ├── default.nix
│   └── repl.nix
├── modules
│   ├── theme
│   └── default.nix
├── pkgs
│   ├── biome
│   ├── repl
│   ├── wezterm
│   └── default.nix
├── system
│   ├── core
│   ├── hardware
│   ├── network
│   ├── nix
│   ├── programs
│   ├── services
│   └── default.nix
├── .envrc
├── flake.lock
└── flake.nix
```

En este apartado vemos **seis** carpetas principales de configuración. Cada una
cumple una función importante. _Vamos a explicar paso a paso cada una:_

### Home

```bash
| Name                | Description                                             |
| ------------------- | ------------------------------------------------------- |
| default.nix         | Home-Manager configuración especial                     |
| editors             | Helix & VSCode                                          |
| profiles            | Perfiles por Dispositivo, punto de entrada de la config |
| programs            | Programas, media, etc.                                  |
| services            | Servicios como ags, etc                                 |
| terminal            | Programas de la Temrinal, shells, etc                   |
| specialisations.nix | Light/Dark configuración especial                       |
```

- **Editors**: Lógicamente los editores de texto que necesites.
- **Profiles**: En este espacio es recomendable que crees uno propio y lo
  agregues en `default.nix`. Luego lo vas a enlazar con la configuración del
  `Host`.
- **Programs/Software**: En este espacio va el Software en general.
- **Services**: Lógicamente los servicios o programas que actúan como tal.
- **Terminal**: Zsh, herramientas Cli y más.

### Hosts

```bash
| Name      | Description                      |
| --------- | -------------------------------- |
| aesthetic | Computadora Principal De LinuDev |
```

Todos los `hosts` comparte configuración en `modules/core.nix`. Las
configuraciones específicas del host se almacenan dentro del directorio
específico del host. Cada host importa sus propios módulos dentro de
`default.nix`.

Por lo tanto, sería recomendable que te crees una carpeta en `hosts`. Dentro un
`default.nix` y lo que extraes del comando `nixos-generate-config`.

### Lib

_Varias funciones que utilizo a lo largo de la configuración_

```bash
| Name        | Description                                  |
| ----------- | -------------------------------------------- |
| colors      | Función para manejar los colores del sistema |
| default.nix | Módulo para flake-parts                      |
| repl.nix    | Cool Nix REPL wrapper                        |
| theme       | Programa que luego referencio                |
```

### Pkgs

Algunos paquetes no puedo encontrar o que me conviene empaquetarlos a mi mismo.

```bash
| Name    | Description                                       |
| ------- | ------------------------------------------------- |
| biome   | Biome.js, el de nixpkgs actualiza muy lento       |
| repl    | auto-carga el flake del sistema en el current dir |
| wezterm | Había un problema con Wayland, acá lo soluciono   |
```

### System

_Actualmente son los ajustes del sistema Modulizados_

```bash
| Name     | Description              |
| -------- | ------------------------ |
| Core     | Configuración compartida |
| Hardware | Hardware config          |
| Network  | Network config           |
| Nix      | Nix-related              |
| Programs | Software del sistema     |
| Services | Servicios del sistema    |
```

- En `core` encontramos la configuración de usuario, de booteo (compartida, para
  todos los pc)
- En `hardware` podés cambiar los drivers de GPU.
- En `network` relaciados a la red.
- En `nix` la configuración de nh, nixpkgs y más.
- En `programs` las fuentes del sistema, home-manager, xdg y más.
- En `services` servicios del sistema, localización, pipewire, etc.

Recomendadísimo: revisar cada carpeta y ver que es necesario y qué no.

## Instalación desde Cero

_Si estás haciendo una instalación desde Cero, y querés tener la misma
configuración que yo, tampoco es tan complejo._

1. Vas a tener que particionar el disco:

- Mi recomendación siempre son tres particiones: `Home`, `Raíz` y `EFI`.
- Podés utilizar `gdisk` si vas a usar `UEFI`.

```bash
# Esto es un ejemplo
gdisk /dev/nvme0n1 # yo utilizo nvme

# letra 'o' para crear una nueva tabla de particiones
# 'n' para añadir la partición (EFI) type ef00
# etc...
```

2. Formatear las particiones con `mkfs`.

- Yo utilizo xfs para el sistema.

3. Montás las particiones

```bash
# este formato de particiones es mi ejemplo. MI EJEMPLO ;)
mount /dev/disk/by-label/NIXOS /mnt
mkdir -p /mnt/boot
mount /dev/disk/by-label/EFI /mnt/boot
```

4. Habilitamos nixFlakes y git para poder utilizar mi configuración

```bash
nix-shell -p nixFlakes git
```

5. Clonas mi repo con git

```bash
# Lo clonas en /mnt/etc/nixos
# Si no tenés la carpeta /mnt/ es porque no montaste bien las particiones rey!
git clone --depth 1 https://github.com/linuxmobile/kaku /mnt/etc/nixos
```

6. Tenés que generar el `nixos-generate-config` para que puedas instalar bien.

```bash
# En este caso recordá que HOSTS es la carpeta donde ponés tu config,
# En mi caso es aesthethic, por lo tanto lo uso de ejemplo
sudo nixos-generate-config --dir --force /mnt/etc/nixos/hosts/aesthetic
```

7. Vas la carpeta e instalas mi configuración:

```bash
# Vas al a carpeta mnt, si no estás ahí.
cd /mnt/etc/nixos/

# En mi caso es .#aesthetic, si vos le pusiste tu nombre de host o usuario
# Deberías reemplazar
nixos-install --flake .#aesthetic
```
