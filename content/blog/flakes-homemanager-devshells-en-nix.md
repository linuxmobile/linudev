---
title: 'Dominando el Desarrollo con Nix: Una Guía Exhaustiva sobre Flakes, Home-Manager y DevShells'
description: 'Explora cómo Nix, Flakes, Home-Manager y DevShells están revolucionando el desarrollo de software, ofreciendo un entorno reproducible y declarativo. Descubre por qué NixOS se destaca sobre otras distribuciones Linux y sistemas operativos'
tags: Linux
date: 2024-03-12
---

## Intro

Hablemos de **Nix** y **NixOS**, y aunque ya lo hemos tocado antes, nunca está
de más reiterar la importancia que tienen en el universo del desarrollo. Pensalo
así: **Nix es esa herramienta estrella que te evita esos momentos de
frustración** cuando tu código no funciona en otra máquina, pero en la tuya sí.
Es como el héroe que no sabías que necesitabas.

Por otro lado, tenemos a **NixOS**, que no es tu típica distribución de Linux.
Este sistema operativo **se basa en el poder de la declaración**: _le decís cómo
querés que esté configurado tu entorno, y él se encarga de hacerlo realidad_. Y
si algo no va como esperabas, podés regresar a tu configuración anterior sin
problemas. Imagina tener la capacidad de "deshacer" en la vida real, aplicado a
la configuración de tu sistema.

En esencia, con **Nix** y **NixOS** estás subiendo de nivel. Te olvidas de los
típicos problemas de _"pero en mi máquina sí funciona"_ y te sumergís en un
mundo donde todo es **reproducible, seguro** y, lo más importante, sin sorpresas
indeseadas. Y sabemos lo crucial que es tener herramientas confiables,
especialmente cuando hablamos de tecnología.

## Flakes

En el mundo de **Nix**, los **Flakes** representan una revolución. Pero, ¿qué
son exactamente? Imaginate que estás armando un rompecabezas, pero en lugar de
buscar las piezas correctas a ciegas, ya **tenés un set predefinido** que encaja
perfectamente. Eso es, en esencia, lo que hacen los **Flakes** en **Nix**: te
proporcionan un framework para manejar tus proyectos y sus dependencias de
manera más organizada y reproducible.

La clave de los **Flakes** es que todo está definido de forma **declarativa** en
un archivo llamado `flake.nix`. Este archivo especifica no solo qué paquetes y
versiones necesitás, sino también cómo construir tu proyecto. Gracias a esto,
cualquier persona (o máquina) que utilice tu **Flake** obtendrá exactamente el
mismo ambiente de desarrollo y resultados, sin importar dónde se ejecute.

```nix
{
  description = "A basic Rust devshell for NixOS users developing Leptos";

  inputs = {
    nixpkgs.url      = "github:NixOS/nixpkgs/nixos-unstable";
    rust-overlay.url = "github:oxalica/rust-overlay";
    flake-utils.url  = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, rust-overlay, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs {
          inherit system overlays;
        };
      in
      with pkgs;
      {
        devShells.default = mkShell {
          buildInputs = [
            openssl
            pkg-config
            cacert
            cargo-make
            trunk
            (rust-bin.selectLatestNightlyWith( toolchain: toolchain.default.override {
              extensions= [ "rust-src" "rust-analyzer" ];
              targets = [ "wasm32-unknown-unknown" ];
            }))
          ] ++ pkgs.lib.optionals pkg.stdenv.isDarwin [
            darwin.apple_sdk.frameworks.SystemConfiguration
          ];

          shellHook = ''
            '';
        };
      }
    );
}
```

En este caso, estamos definiendo un ambiente de desarrollo (`devShell`) que
simplemente incluye los paquetes necesarios para trabajar con **Leptos**. Al
usar este Flake, no importa si estás en Argentina, España o cualquier parte del
mundo; tu proyecto se construirá con las mismas dependencias, evitando el famoso
"en mi máquina funciona".

Los **Flakes** simplifican enormemente la gestión de dependencias y aseguran que
todos estén en la misma página, literalmente. Así, nos despedimos de las
sorpresas indeseadas y damos la bienvenida a una era donde la reproducibilidad y
la claridad en nuestros proyectos son la norma.

### Ventajas de usar Flake

Al adoptar **Flakes**, no solo estás eligiendo una herramienta más, estás
_abrazando un conjunto de principios que pueden transformar radicalmente la
eficiencia y fiabilidad de tus proyectos_. Acá detallo algunas de las ventajas
clave:

- Inmutabilidad:

Los **Flakes** aseguran la inmutabilidad de los entornos. Cuando especificás un
Flake, **estás fijando las versiones de todas las dependencias que utiliza tu
proyecto**. Esto significa que cada vez que alguien construye tu proyecto usando
el Flake, va a obtener exactamente el mismo resultado, eliminando el clásico
problema de "funciona en mi máquina, pero no sé por qué no en la tuya". La
inmutabilidad proporciona una base sólida para la reproducibilidad y la
confiabilidad en el desarrollo de software.

- Reproducibilidad:

Siguiendo con la inmutabilidad, la **reproducibilidad** es otra ventaja
destacada. Los proyectos construidos con **Flakes** se pueden reproducir en
cualquier máquina sin sorpresas. Esto es crucial no solo para los
desarrolladores trabajando en equipo, sino también para despliegues en
producción, donde la consistencia entre entornos de desarrollo, prueba y
producción es fundamental.

- Facilidad para compartir entornos de desarrollo

Con los **Flakes**, compartir un entorno de desarrollo completo con alguien más
es tan simple como compartir el repositorio de tu proyecto. No hay necesidad de
manejar guías de instalación complejas o scripts de configuración
personalizados. Todo lo necesario para construir y ejecutar tu proyecto está
especificado en el Flake, facilitando la colaboración y asegurando que nuevos
colaboradores puedan empezar a trabajar sin obstáculos.

Ejemplo: Para utilizar mi entorno de trabajo de Rust:

```bash
nix develop github:linuxmobile/kaku#rust
```

- Aislamiento de dependencias

- Actualizaciones controladas y seguras

## Home-Manager

**Home-Manager** es tu mejor amigo cuando se trata de personalizar tu entorno de
usuario en **NixOS** o cualquier sistema que utilice **Nix**. Este poderoso
gestor te permite **declarar tu configuración de usuario**, desde tus dotfiles
hasta tus aplicaciones favoritas y sus configuraciones, todo en un solo lugar.
La magia detrás de esto es que **podés replicar tu entorno perfectamente en
cualquier otra máquina con Nix**, simplemente llevando esta configuración con
vos.

¿Cómo lo hace? A través de archivos de configuración declarativa que especifican
exactamente cómo querés que sea tu entorno. Esto significa que, en lugar de
instalar y configurar manualmente cada aspecto de tu sistema, definís todo en un
archivo `home.nix`, y **Home-Manager** se encarga del resto.

Por ejemplo, si querés tener **Zsh** como tu shell, **Vim** como tu editor, y
**git** configurado con tus credenciales, tu **home.nix** podría verse algo así:

```nix
{ config, pkgs, ... }:

{
  programs.zsh.enable = true;
  
  programs.vim = {
    enable = true;
    defaultEditor = true;
    plugins = with pkgs.vimPlugins; [
      youcompleteme
      vim-airline
    ];
  };
  
  programs.git = {
    enable = true;
    userName = "Tu Nombre";
    userEmail = "tuemail@example.com";
    extraConfig = {
      core = {
        editor = "vim";
      };
    };
  };
}
```

Con esta simple configuración, ya no tenés que pasar horas configurando tu
entorno cada vez que cambiás de máquina o reinstalás tu sistema. Simplemente
llevás tu archivo `home.nix`, ejecutás **Home-Manager**, y él recrea tu entorno
exactamente como lo definiste, sin importar dónde te encontrés.

**Home-Manager** transforma la personalización de tu entorno de usuario en algo
**reproducible** y libre de dolor. Es como tener una receta personal para tu
sistema, garantizando que, sin importar dónde te sumergís, siempre te vas a
sentir como en casa.

## DevShells

Los **devShells** son como tu estación de trabajo personalizada para cada
proyecto, armada y lista para que te sumerjas en el desarrollo sin demoras.
_Imaginate poder transportar todo el entorno de desarrollo, con las herramientas
y dependencias exactas que necesitás, a cualquier máquina_. Eso es exactamente
lo que te permiten hacer los **devShells**.

Cuando usás `nix develop` o `nix-shell`, estás invocando estos entornos de
desarrollo reproducibles. Por decirlo de manera simple, creás un ambiente donde
todo lo que necesitás para trabajar en tu proyecto está al alcance de tu mano.

Te muestro un ejemplo de cómo podría verse un **devShell** en un archivo
`flake.nix` para un proyecto en **Python**:

```nix
{
  description = "Un entorno de desarrollo para mi proyecto Python";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }: 
    flake-utils.lib.eachDefaultSystem (system: 
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.python3
            pkgs.python3Packages.virtualenv
          ];
          shellHook = ''
            echo "Bienvenido a tu devShell de Python"
          '';
        };
      });
}
```

Armamos un entorno con **Python** y **Virtualenv** ya instalados. Al correr
`nix develop`, te encontrarás en un shell donde Python y Virtualenv están listos
para usar. Y lo mejor de todo, es que si alguien más necesita trabajar en tu
proyecto, solo necesita este Flake para tener el mismo entorno que vos,
eliminando así cualquier inconsistencia entre entornos de trabajo.

### Comparativa:

Cuando comparamos los `devShells` de Nix con otras soluciones de entornos de
desarrollo, como **Docker**, **virtualenv** o incluso las máquinas virtuales,
hay algunas diferencias clave que saltan a la vista, especialmente en términos
de eficiencia, reproducibilidad y manejo de versiones.

- Eficiencia y Rapidez

Los devShells arrancan casi instantáneamente y **requieren menos recursos** que
arrancar una máquina virtual completa o un contenedor Docker para cada proyecto.
Mientras que Docker y las VM pueden aislar completamente tu entorno, pueden ser
excesivos para necesidades de desarrollo, consumiendo más recursos del sistema y
tiempo de configuración.

- Reproducibilidad

- Gestión de Versiones

Ejemplo:

```nix
{
  devShells = {
    mi-proyecto = pkgs.mkShell {
      buildInputs = [ pkgs.nodejs-14_x pkgs.nodePackages.yarn ];
    };
  };
}
```

Este enfoque es limpio, declarativo y evita tener que lidiar con nvm o npm
globales que pueden entrar en conflicto con otros proyectos.

## Resumen

Optar por **Nix** y sus herramientas asociadas, como **Flakes**,
**Home-Manager**, y **DevShells**, significa elegir un camino hacia el
desarrollo más eficiente y libre de dolores de cabeza. En pocas palabras, si
buscás **un entorno que garantice reproducibilidad, flexibilidad, y
eficiencia**, dándote la tranquilidad de que _"si funciona aquí, funciona en
todos lados"_, **Nix** es tu mejor apuesta. Es, sin dudas, la herramienta que
todo programador debería considerar para llevar sus proyectos al próximo nivel,
asegurando coherencia y calidad en el desarrollo de software.
