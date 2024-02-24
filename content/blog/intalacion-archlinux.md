---
title: 'Guía de instalación de Archlinux: paso a paso en español'
description: 'Aprende a instalar Archlinux con esta guía sencilla y clara en español. ¡No pierdas la oportunidad de probar este sistema operativo potente y personalizable!'
tags: Linux
date: 2022-05-06
---

Tips / Instalación / **Archlinux**

## ISOS

🔅 Primero descargamos la ISO oficial de [Aquí](https://archlinux.org/download)

🔅 Escribimos la iso en un usb:

```bash
# Si estamos usando otra distro de linux podemos hacer lo siguiente
fdisk -l # para conocer la partición del usb
dd if=$HOME/Downloads/archlinux-version-xxx.iso of=/dev/sdX bs=1M # bs=1M es opcional
```

Si estamos utilizando **Windows** podemos recurrir a [Rufus](https://rufus.ie)

## Iniciamos el USB e instalamos la BASE

🔅 Siguiendo, tenemos que reiniciar en el usb. Normalmente con <Kbd>F2</Kbd> o
<Kbd>Supr</Kbd> deberíamos poder ingresar al bios y seleccionar el USB.

🔅 Booteamos Archlinux y seguimos

🔅 Configuramos el layout del teclado con `loadkeys la-latin1` **En caso de que
no utilices el teclado latinoamericano podes chequear que layout utilizar con:
`ls -R /usr/share/kbd/keymaps`**

🔅 Habilitamos las descargas paralelas.

```bash
nano /etc/pacman.conf

# Descomentamos la opción "ParallelDownloads" y le indicamos el número que consideremos necesario. En mi caso cinco, me parece perfecto.
ParallelDownloads = 5
```

🔅 Guardamos con:

<Kbd>Ctrl</Kbd> + <Kbd>o</Kbd> &<Kbd>Ctrl</Kbd> + <Kbd>x</Kbd>

🔅 Actualizamos los repositorios

```bash
pacman -Syy
```

🔅 Las particiones:

    **ATENCION**: En mi caso, yo mantengo el disco sin dual boot, solo tengo un Sistema operativo y es
    Archlinux/Artix. Pero voy a enseñar el método que uso si necesito dejar Windows (¡por alguna
    razón!)

```bash
# con fdisk compruebo el nombre de las particiones.
fdisk -l

# Creo la carpeta /boot y borro el boot anterior de la distro que normalmente tengo.

mkdir -p /mnt/boot/
mount /dev/nvme0n1p1 /mnt/boot/
```

_Este paso lo realizo para no tener que crear otra partición EFI, utilizo la
misma que Windows, y no formateo esta misma partición_

```bash
# borro las entradas del boot de archlinux

rm {*.img}
rm vmlinuz-linux
rm -rf grub/
rm -rf EFI/arch/
```

_Dejando la carpeta EFI/Microsoft sin tocar_

🔅 Luego formateo la partición donde irá la raíz `mkfs.btrfs -F /dev/nvme0n1p5/`
y continúo con la instalación.

🔅 Particionamos el disco:

👉 **Nota:** **En mi caso mi disco es NVME, por ende remplacen NVME por sda, sdb
o el que tengan.**

```bash
cfdisk /dev/nvme0n1
```

```
      Start                  Size
/dev/nvme0n1p1               512M         # 512M / 1GB recomendado

/dev/nvme0n1p2               60G          # 40/60GB

/dev/nvme0n1p3              405.3G        # El resto del espacio
```

👉 **Note:** <i>La instalación que realizo es exclusivamente para UEFI, y
también consideren que no estoy utilizando dual boot. Sólo arch/artix.</i>

🔅 Formateamos las particiones:

```bash
# En este caso yo utilizo xfs para mi partición home y root. Pueden elegir btrfs o ext4...
mkfs.xfs -L ROOT /dev/nvme0n1p2        # Particion root
mkfs.xfs -L HOME /dev/nvme0n1p3        # Particion home (opcional
mkfs.fat -F 32 /dev/nvme0n1p1          # Particion EFI/boot
fatlabel /dev/nvme0n1p1 EFI
```

🔅 Montamos las particiones:

```bash
mount /dev/disk/by-label/ROOT /mnt
mkdir -p /mnt/boot
mkdir -p /mnt/home
mount /dev/disk/by-lable/HOME /mnt/home
mount /dev/disk/by-label/EFI /mnt/boot
```

### Instalamos la base:

```bash
pacstrap /mnt base base-devel linux linux-firmware nano dhcpcd
```

🔅 Generamos el archivo fstab

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

### Configurando nuestro sistema

🔅 Cambiamos a root dentro del sistema nuestro

```bash
arch-chroot /mnt
```

🔅 Configuramos el reloj

```bash
ln -sf /usr/share/zoneinfo/America/Argentina/Buenos_aires /etc/localtime  # Acá tenemos que poner la region/ciudad.
```

👉 **Note:** **Con hwclock generamos el /etc/adjtime**

```bash
hwclock --systohc
```

🔅 Generamos los locales

```bash
# Descomentar el que gusten. Yo prefiero el sistema en inglés
nano /etc/locale.gen
locale-gen

# Acá podemos editar el archivo y seleccionar el favorito
nano /etc/locale.conf
LANG=en_US.UTF=8 # en mi caso, prefiero en_US

nano /etc/vconsole.conf
KEYMAP=la-latin1
```

🔅 Instalamos el bootloader:

```bash
pacman -S grub efibootmgr
```

👉 **Note 3:** **Mi configuración está pensada para sistemas UEFI. Atentos...**

🔅 Instalamos el grub:

```bash
# Si estás usando MBR y no UEFI:
# grub-install --recheck /dev/sda
grub-install --target=x86_64-efi --efi-directory=/boot --recheck

grub-mkconfig -o /boot/grub/grub.cfg
```

🔅 Asignamos la contraseña a ROOT:

```bash
passwd # al darle enter, tipeas la contraseña.

useradd -m -G wheel -s /bin/bash tusuario # Obviamente, tipeas tu usario ahí!

passwd tusuario
```

🔅 Agregamos WHEEL al archivo sudoers:

```bash
EDITOR=nano visudo
# descomentamos: (quitando el #)
%wheel ALL=(ALL:ALL) ALL
```

🔅 Configuramos el hostname:

```bash
nano /etc/hostname
# el hostname es un darle un nombre al host:
# A mi me gusta "aesthetic" Por ende puede ser como tu nickname.
```

🔅 Lo agergamos al hosts:

::: code-output-flex

```bash
nano /etc/hosts
```

```bash
127.0.0.1               localhost
::1                     localhost
127.0.1.1               tuhostname.localdomain tuhostname

# reemplaza "tuhostname" por el hostname que elegiste.
```

:::

🔅 Instalamos DHCPCD (es el cliente de internet):

```bash
pacman -S dhcpcd dhcpcd-dinit
```

🔅 Desmontamos y reiniciamos:

```bash
exit                    # Para salir de su
exit                    # Para salir de chroot
umount -R /mnt          # Para desmontar
reboot                  # Para reiniciar
```

Llegado a este punto en el que reiniciaste y no te apareció ningún error o
inconveniente, quiere decir que ya terminaste de instalar la base del sistema
Archlinux.

Me gustaría dejarte unos pasos más (consejos) a seguir que me sirvieron cuando
no entendía nada.

🔅 Habilitar DHCPCD para tener internet:

```bash
sudo systemctl enable dhcpcd
sudo systemctl start dhcpcd
```

🔅 Instalamos paru: **Si no tenemos git, hay que instalarlo
`sudo pacman -S git wget`.**

```bash
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
```

🔅 Por último, unos paquetes que te van a ser útiles:

```bash
# Manejar archivos zip, rar.
sudo pacman -S zip unzip unrar

# Alsa y pipewire para manejar el audio
sudo pacman -S pipewire pipewire-alsa pipewire-pulse alsa-utils

# Para poder visualizar discos externos
sudo pacman -S ntfs-3g dosfstools exfat-utils

# Drivers de intel / amd
paru -S xf86-video-amdgpu vulkan-radeon mesa-libgl mesa-vdpau libvdpau-va-gl libva-mesa-driver #AMD
paru -S xf86-video-intel mesa-libgl libvdpau-va-gl #Intel
```

    Bueno, eso es todo. Espero que te haya servido. Si llegaste hasta acá, te pido que revises mis
    otros posts.

````` ``````
