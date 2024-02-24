---
title: 'El Arte de Nix: Explorando la Magia y Eficiencia de NixOS para Desarrolladores'
description: 'Como Nix y NixOS podrían cambiar el futuro de Linux. Todos los beneficios para un desarrollador y mucho más.'
tags: Linux
date: 2024-01-26
---

## Intro

Para comenzar deberíamos hablar un poco sobre que es **Nix**. **Nix** es un
**gestor de paquetes declarativo** que le permite al usuario **declarar** el
estado deseado del sistema en archivos de configuración. ¡Seguramente, vamos a
profundizar más sobre **Nix** más adelante!

**NixOS**. Es un conjunto de utilidades asombrosas. Aunque bueno, es un SO
(sistema operativo) basado en Nix. Declarativo, reproducible, configurable.
Increíble. ¡Ahora te cuento más!

## NixOS:

### Configuración Declarativa, OS as Code:

- **NixOS** utiliza, como mencionamos anteriormente, la configuración
  declarativa. Es posible gestionar estas configuraciones con **git**, lo que
  permite restaurar el sistema a **cualquier estado histórico**. Siempre y
  cuando se conserven los archivos de configuración.
- **Nix Flakes** mejora aún más la reproducibilidad utilizando un archivo de
  bloqueo de versiones, como `package-json.lock`, **flake.lock**. Ahí registra
  las fuentes, los hash y otra información relevante como las dependencias.

### Personalización del sistema:

- Con unos pocos cambios en la configuración podés sustituir **muy fácil**
  varios componentes del sistema.
- Las modificaciones son seguras. Y el cambio entre distintos escritorios (KDE,
  GNOME, Hyprland, LeftWM) es **sencillo**. Sin quilombo.

<Note>Probablemente te pasó alguna vez, que quisiste cambiar de **KDE** a
**GNOME** pero no sabes que dependencias borrar, que cosas quitar, que cosas
dejar. Acá es simple y eficaz:</Note>

```nix
# Reemplazas plasma5 por gnome
xserver = {
  enable = true;
  desktopManager.plasma5 = {
    enable = true;
  };
}
```

### Rollback:

- Es posible volver a cualquier estado anterior del sistema. Por defecto, en
  **NixOS**, en el arranque del sistema vas a ver las versiones anteriores del
  sistema.

```bash
# GNU GRUB VERSION 2.02
*NixOS - Configuration 129 (2024-01-23)
*NixOS - Configuration 128 (2024-01-16)
*NixOS - Configuration 127 (2023-1l-28)
```

### Sin conflictos de dependencias:

_En otras distros, ¡no voy a mencionar ningunArch! posiblemente te hayas
encontrado con este problema. No podés instalar o eliminar un programa por que
depende de otro programa, que justamente es dependencia de otro._

- En **Nix** cada paquete de software tiene **un Hash único** que se incorpora a
  su ruta de instalación. Lo que permite también que puedan coexistir varias
  versiones del mismo paquete.

### La comunidad es enormemente activa.

- El repositorio oficial (**nixpkgs**) cuenta con muchos colaboradores. Y mucha
  gente comparte su configuraciones de **Nix**. Por lo tanto al explorar el
  ecosistema te vas a encontrar con que la comunidad es enorme: Github, Discord,
  Telegram, etc.

## Nix Development Environments

Tanto **Nix**, **NixOS** y **nixpkgs** te permiten crear **Entornos de
desarrollo** específicos para cada proyecto.

Para ilustrarlo mejor podemos crear un flake similar a esto:

```nix
{
  description = "Example JavaScript development environment";

  # Flake inputs
  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2305.491812.tar.gz";
  };

  # Flake outputs
  outputs = { self, nixpkgs }:
    let
      # Systems supported
      allSystems = [
        "x86_64-linux" # 64-bit Intel/AMD Linux
        "aarch64-linux" # 64-bit ARM Linux
        "x86_64-darwin" # 64-bit Intel macOS
        "aarch64-darwin" # 64-bit ARM macOS
      ];

      # Helper to provide system-specific attributes
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
      });
    in
    {
      # Development environment output
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShell {
          # The Nix packages provided in the environment
          packages = with pkgs; [
            nodejs_18 # Node.js 18, plus npm, npx, and corepack
          ];
        };
      });
    };
}
```

Suponiendo que esto lo tenemos en **Github** podemos hacer así para ejecutarlo:

```bash
nix develop "github:linuxmobile/dotfiles#javascript"
```

Se abriría una **shell** con este estilo:

```bash
(nix:linuxmobile-env) bash-5.1$
```

Si comprobaramos la versión de Nodejs:

```bash
type node
```

Devolvería:

```bash
node is /nix/store/i88kh2fd03f5fsd3a948s19gliggd2wd-nodejs-18.12.1/bin/node
```

Ahora deberías imaginarte esto mismo pero con **Rust**, **Go**, **Haskell** y
demás lenguajes. Podrías tener un entorno de desarrollo independiente y separado
de tu sistema. Podrías tener Nodejs 18 para 'X' proyecto y Nodejs 22 para otro.
