# 🚧 BacheBog — Reporta Bogotá

> App web progresiva (PWA) para reportar huecos y baches en las vías de Bogotá, Colombia.

---

## 📌 ¿Qué es BacheBog?

**BacheBog** es una aplicación web pensada para los ciudadanos de Bogotá que quieran reportar el estado de las vías de la ciudad. A través de una interfaz sencilla y moderna, los usuarios pueden registrar huecos y daños en la malla vial, verlos en un mapa interactivo, comentar en el foro ciudadano y hacer seguimiento de sus reportes.

---

## ✨ Características

- 🔐 Registro e inicio de sesión con correo y contraseña (Firebase Auth)
- 📍 Mapa interactivo con todos los reportes de la ciudad (Leaflet.js)
- 📝 Crear nuevos reportes de baches con descripción y ubicación
- 📋 Ver y gestionar tus propios reportes
- 💬 Foro ciudadano para comentar y votar reportes
- 👤 Perfil de usuario con historial de actividad
- 📱 Diseño responsive optimizado para móviles
- ⚡ Funciona como PWA — instalable en Android e iOS
- 🌐 Soporte offline mediante Service Worker

---

## 🛠️ Tecnologías usadas

| Tecnología | Uso |
|---|---|
| HTML5 / CSS3 | Estructura y estilos |
| JavaScript (ES Modules) | Lógica de la aplicación |
| Firebase Auth | Autenticación de usuarios |
| Firebase Firestore | Base de datos de reportes y usuarios |
| Firebase Storage | Almacenamiento de imágenes |
| Leaflet.js | Mapa interactivo de reportes |
| Service Worker | Funcionalidad offline / PWA |
| Web App Manifest | Instalación como app nativa |
| Google Fonts (Nunito) | Tipografía |

---

## 📁 Estructura del proyecto

```
bachebog/
├── index.html                # Pantalla de inicio de sesión
├── manifest.json             # Configuración PWA
├── sw.js                     # Service Worker (caché y soporte offline)
├── icons/
│   ├── icon-192.png          # Ícono PWA
│   └── icon-512.png          # Ícono PWA
└── pages/
    ├── registro.html         # Crear nueva cuenta
    ├── home.html             # Menú principal
    ├── nuevo-reporte.html    # Formulario para reportar un bache
    ├── mapa.html             # Mapa interactivo con todos los reportes
    ├── mis-reportes.html     # Listado de reportes del usuario
    ├── foro.html             # Foro ciudadano
    └── perfil.html           # Perfil y estadísticas del usuario
```

---

## 🚀 Cómo usar

### Opción 1 — Desde el navegador

Accede directamente desde:
```
https://bachebog.github.io/bachebog
```

### Opción 2 — Instalar como app (PWA)

1. Abre la URL en Chrome (Android) o Safari (iOS)
2. Toca el menú del navegador
3. Selecciona **"Agregar a pantalla de inicio"**
4. ¡Listo! La app se instala como una app nativa

> El acceso rápido a **Nuevo Reporte** también está disponible como shortcut desde el ícono de la app.

### Opción 3 — Clonar el repositorio

```bash
git clone https://github.com/bachebog/bachebog.git
cd bachebog
```

Abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .
```

---

## 🔑 Autenticación

La app usa **Firebase Authentication** y **Firestore** para gestionar usuarios. Para acceder:

1. Crea una cuenta desde la pantalla de registro (`/pages/registro.html`) — tu nombre queda guardado en Firestore bajo la colección `usuarios`
2. Inicia sesión con tu correo y contraseña

---

## 📲 PWA — Soporte offline

BacheBog incluye un **Service Worker** (`sw.js`) con caché de App Shell que permite:
- Cargar la app sin conexión a internet
- Cachear los recursos estáticos para una experiencia más rápida
- Shortcut directo a "Nuevo Reporte" desde el ícono instalado

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar BacheBog:

1. Haz un fork del repositorio
2. Crea una rama con tu feature: `git checkout -b feature/mi-mejora`
3. Haz commit de tus cambios: `git commit -m 'Agrega mi mejora'`
4. Sube la rama: `git push origin feature/mi-mejora`
5. Abre un **Pull Request**

---

## 📄 Licencia

Este proyecto es de código abierto. Puedes usarlo, modificarlo y distribuirlo libremente.

---

Hecho con ❤️ para Bogotá 🏙️
