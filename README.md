<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🛒 Backend eCommerce - NestJS + PostgreSQL

Este es el backend de un sistema de eCommerce básico pero poderoso, construido con ❤️ usando NestJS y PostgreSQL.

---

## 🚀 Features

- Registro y login de usuarios (JWT + Bcrypt)
- Roles (`cliente`, `admin`) con protección de rutas
- Gestión de perfil personal (`/perfil`)
- Administración de usuarios (`/users`) solo para admin
- Carrito de compras funcional (`/cart`)
- Checkout de carrito a orden de compra (`/cart/checkout`)
- Historial de pedidos por usuario (`/orders`)
- Dashboard de administrador con:
  - Total de pedidos
  - Ingresos totales
  - Top 5 productos más vendidos

---

## ⚙️ Tecnologías usadas

- NestJS
- TypeORM
- PostgreSQL
- JWT + Passport
- Bcrypt para contraseñas
- Validaciones básicas

---

## 📋 Instalación

```bash
# Clonar el proyecto
git clone https://github.com/tuusuario/tu-repo-ecommerce.git
cd tu-repo-ecommerce

# Instalar dependencias
npm install

# Variables de entorno
Crea un archivo `.env` en la raíz con:

DATABASE_URL=postgres://usuario:contraseña@host:puerto/basededatos
JWT_SECRET=tu_clave_secreta

# Levantar la app
npm run start:dev
