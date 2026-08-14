# Lex Go — Especificación técnica para prototipo

## 1. Resumen ejecutivo

Lex Go es un marketplace legal digital chileno (base Valparaíso) que conecta tres tipos de usuarios mediante accesos independientes:

- **Estudiantes de Derecho**: buscan y se postulan a diligencias (audiencias, trámites) que abogados delegan.
- **Abogados**: gestionan su perfil profesional, agenda de audiencias, y ofrecen consultas online (gratuitas o pagadas).
- **Clientes**: buscan abogados por especialidad/ubicación y reservan consultas.

**Modelo de negocio**: suscripción mensual para abogados + comisión por diligencia contratada.

**Identidad visual**: verde olivo + grises, transmitiendo formalidad, transparencia, elegancia y confianza. Tipografía Georgia (títulos) / Inter (cuerpo).

**Meta de lanzamiento**: fines de 2026 (~6 meses).

---

## 2. Alcance del prototipo y fases de construcción

Pediste alcance completo (backend + pagos + verificación + 3 módulos + web y móvil). Para que sea construible con Claude Code sin perderte en el camino, se divide así:

| Fase | Contenido | Por qué primero |
|---|---|---|
| **Fase 0** | Diseño del sistema (paleta, componentes) + estructura del repo | Base visual reutilizable en todo |
| **Fase 1** | Web responsive, los 3 módulos, con backend real (auth, base de datos), SIN pagos ni verificación automática | Puedes probar el flujo completo sin la complejidad de integrar Transbank |
| **Fase 2** | Verificación de Ius Postulandi (manual por admin al inicio, automatizable después) + sistema de valoraciones | Añade confianza a la plataforma |
| **Fase 3** | Integración de pagos (Transbank) + comisiones automáticas + suscripciones de abogados | Es la parte más delicada técnica y legalmente (datos financieros) |
| **Fase 4** | Versión móvil (React Native, reutilizando la lógica del backend) | Backend ya probado en web reduce riesgo |
| **Fase 5** | Cifrado end-to-end en mensajería/consultas online + 2FA | Seguridad reforzada antes de producción real |

Este documento describe el sistema completo; le indicas a Claude Code qué fase construir en cada sesión.

---

## 3. Módulos funcionales

### 3.1 Módulo Estudiantes

**Funciones:**
- Listado de ofertas de diligencias con: fecha/hora, tribunal o ubicación, tipo de trámite, pago ofrecido, requisitos (año de carrera, comuna, etc.)
- Filtros por ubicación, fecha, monto de pago
- Postulación a una oferta (1 clic, con mensaje opcional al abogado)
- Panel "Mis postulaciones": estado (pendiente / aceptada / rechazada)
- Historial de diligencias realizadas + valoraciones recibidas de abogados
- Sección "Mi Ius Postulandi": subir certificado de vigencia, ver fecha de expiración, alertas antes de que venza

**Entidades de datos:**
- `estudiante` (perfil, universidad, año de egreso, comuna)
- `ius_postulandi` (estudiante_id, fecha_emision, fecha_vencimiento, documento_url, estado_verificacion)
- `postulacion` (estudiante_id, diligencia_id, estado, fecha)

### 3.2 Módulo Abogados

**Funciones:**
- Perfil profesional: foto, especialidades, años de experiencia, universidad, reseña, tarifas de consulta
- Publicar diligencias para que estudiantes se postulen (crear oferta, revisar postulantes, aceptar uno)
- Agenda de audiencias propias (calendario)
- Configurar disponibilidad para consultas online (gratis y/o pagadas)
- Ver y confirmar reservas de clientes
- Panel de suscripción (plan activo, estado de pago)
- Valorar a estudiantes tras una diligencia completada

**Entidades de datos:**
- `abogado` (perfil, especialidades[], tarifa_consulta, comuna, plan_suscripcion)
- `diligencia` (abogado_id, fecha, tipo, pago_ofrecido, estado, estudiante_asignado_id)
- `disponibilidad_consulta` (abogado_id, bloques_horarios, tipo: gratis/pagada)

### 3.3 Módulo Clientes

**Funciones:**
- Buscar abogados por especialidad y ubicación (comuna/región)
- Filtrar por: consulta gratuita / pagada, valoración mínima, disponibilidad
- Ver perfil de abogado (reseñas, tarifas, especialidad)
- Reservar consulta online (selecciona bloque horario disponible)
- Historial de consultas propias + posibilidad de valorar al abogado

**Entidades de datos:**
- `cliente` (perfil, comuna)
- `reserva` (cliente_id, abogado_id, bloque_horario, estado, tipo_pago)
- `valoracion` (autor_id, autor_tipo, receptor_id, receptor_tipo, puntaje, comentario)

---

## 4. Modelo de negocio

- **Suscripción abogados**: planes mensuales (ej. Básico / Pro), definen cuántas diligencias puede publicar y visibilidad en el directorio.
- **Comisión por diligencia**: porcentaje sobre el pago acordado entre abogado y estudiante, cobrado al abogado.
- Los clientes no pagan por usar la plataforma; pagan directamente la consulta (si es pagada) vía Transbank.

---

## 5. Requisitos técnicos y seguridad

- Autenticación con roles (estudiante / abogado / cliente / admin)
- Autenticación de dos factores (2FA) — fase 5
- Cifrado de extremo a extremo en comunicaciones sensibles (mensajería, consultas) — fase 5
- Cumplimiento de la Ley 19.628 (protección de datos personales, Chile) y preparación para eventual Ley marco de protección de datos
- Almacenamiento seguro de documentos (certificados de Ius Postulandi, cédulas) — considerar servicio cifrado tipo S3 con acceso restringido
- Panel de administración para verificación manual de documentos (fase 2), con opción de automatizar después

---

## 6. Stack tecnológico sugerido

- **Frontend web**: React + TypeScript + Tailwind CSS
- **Frontend móvil**: React Native (comparte lógica de negocio con la web vía librería común)
- **Backend**: Node.js + Express (o NestJS si se quiere estructura más robusta desde el inicio)
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT + bcrypt para contraseñas; 2FA con TOTP (ej. librería `speakeasy`) en fase 5
- **Pagos**: Transbank (Webpay Plus para consultas, Oneclick para suscripciones recurrentes)
- **Almacenamiento de archivos**: AWS S3 o equivalente, con URLs firmadas temporales
- **Hosting sugerido para prototipo**: Vercel (frontend) + Railway o Render (backend + Postgres) — gratuitos o económicos para etapa de prototipo

---

## 7. Sistema de diseño

**Paleta de colores:**
- Verde oliva principal: `#6B7A4F` (ajustable, tono formal no saturado)
- Verde oliva oscuro (acentos/hover): `#4E5A38`
- Gris carbón (texto principal, fondos oscuros): `#2B2B2B`
- Gris medio (texto secundario, bordes): `#8A8A8A`
- Gris claro (fondos, tarjetas): `#F2F1EE`
- Blanco: `#FFFFFF`
- Dorado suave, si se mantiene como detalle de acento (opcional junto al verde): `#C9A96A`

**Tipografía:**
- Títulos: Georgia, serif
- Cuerpo: Inter, sans-serif

**Principios de diseño:** espacios amplios, bordes sutiles (no sombras fuertes), iconografía lineal simple — buscando transmitir seriedad profesional, no un producto "tech" genérico.

---

## 8. Estructura de repositorio sugerida (GitHub)

```
lex-go/
├── apps/
│   ├── web/              # React + Tailwind
│   └── mobile/           # React Native (fase 4)
├── server/               # Node.js + Express/NestJS API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── estudiantes/
│   │   │   ├── abogados/
│   │   │   ├── clientes/
│   │   │   └── auth/
│   │   └── db/
├── packages/
│   └── shared/            # tipos y lógica compartida web/mobile
├── docs/
│   └── lex-go-especificacion.md
└── README.md
```

---

## 9. Cómo usar esto con Claude Code (guía para alguien sin experiencia previa)

1. Crea un repositorio vacío en GitHub llamado `lex-go`.
2. Clónalo en tu computador.
3. Copia este archivo dentro de `docs/lex-go-especificacion.md`.
4. Abre la carpeta con Claude Code y dale una instrucción acotada, por ejemplo:
   > "Lee docs/lex-go-especificacion.md. Construye la Fase 0 y Fase 1 del módulo Clientes solamente: frontend web con Tailwind usando la paleta de colores indicada, y backend con auth y base de datos para búsqueda y reserva de abogados. No implementes pagos todavía."
5. Revisa lo que genera, pruébalo, y recién ahí pides la siguiente fase o el siguiente módulo en una nueva instrucción.
6. Evita pedir "constrúyelo todo" en un solo mensaje — es la forma más común en que estos proyectos se vuelven difíciles de entender y depurar para alguien que está aprendiendo.
