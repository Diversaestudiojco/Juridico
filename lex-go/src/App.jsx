import React, { useState } from "react";
import {
  GraduationCap,
  Scale,
  Users,
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  ShieldCheck,
  Clock,
  Search,
} from "lucide-react";

const COLORS = {
  olive: "#6B7A4F",
  oliveDark: "#4E5A38",
  charcoal: "#2B2B2B",
  gray: "#8A8A8A",
  grayLight: "#EDEBE5",
  cream: "#F6F5F1",
  white: "#FFFFFF",
  gold: "#C9A96A",
};

const georgia = { fontFamily: "Georgia, 'Times New Roman', serif" };
const inter = { fontFamily: "Inter, system-ui, sans-serif" };

function TopBar({ onHome, roleLabel }) {
  return (
    <div
      className="w-full flex items-center justify-between px-6 py-4 border-b"
      style={{ borderColor: COLORS.grayLight, background: COLORS.white }}
    >
      <button
        onClick={onHome}
        className="flex items-center gap-2"
        style={{ color: COLORS.charcoal }}
      >
        <span
          className="text-xl tracking-wide"
          style={{ ...georgia, color: COLORS.oliveDark }}
        >
          Lex&nbsp;Go
        </span>
      </button>
      {roleLabel && (
        <span
          className="text-xs px-3 py-1 rounded-full border"
          style={{
            ...inter,
            color: COLORS.oliveDark,
            borderColor: COLORS.olive,
          }}
        >
          {roleLabel}
        </span>
      )}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span
      className="text-xs px-2 py-1 rounded"
      style={{ ...inter, background: COLORS.grayLight, color: COLORS.charcoal }}
    >
      {children}
    </span>
  );
}

function SectionTabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 border-b mb-6" style={{ borderColor: COLORS.grayLight }}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="px-4 py-2 text-sm -mb-px border-b-2 transition-colors"
          style={{
            ...inter,
            borderColor: active === t ? COLORS.olive : "transparent",
            color: active === t ? COLORS.oliveDark : COLORS.gray,
            fontWeight: active === t ? 600 : 400,
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ---------- HOME ----------
function Home({ goTo }) {
  const roles = [
    {
      key: "estudiantes",
      label: "Estudiante de Derecho",
      desc: "Postula a diligencias, gestiona tu Ius Postulandi y construye tu historial.",
      icon: GraduationCap,
    },
    {
      key: "abogados",
      label: "Abogado",
      desc: "Gestiona tu perfil, publica diligencias y agenda consultas online.",
      icon: Scale,
    },
    {
      key: "clientes",
      label: "Cliente",
      desc: "Encuentra al abogado adecuado por especialidad y ubicación.",
      icon: Users,
    },
  ];

  return (
    <div style={{ background: COLORS.cream, minHeight: "100%" }}>
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ ...inter, color: COLORS.gold, letterSpacing: "0.2em" }}>
          Prototipo visual — Región de Valparaíso
        </p>
        <h1 className="text-4xl mb-4" style={{ ...georgia, color: COLORS.charcoal }}>
          Tres accesos, un mismo estándar profesional.
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ ...inter, color: COLORS.gray }}>
          Lex Go conecta a estudiantes, abogados y clientes en un mismo lugar,
          con la formalidad que el ejercicio del derecho exige.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16 grid gap-5 sm:grid-cols-3">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.key}
              onClick={() => goTo(r.key)}
              className="text-left p-6 rounded-lg border transition-shadow hover:shadow-md"
              style={{ background: COLORS.white, borderColor: COLORS.grayLight }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                style={{ background: COLORS.grayLight }}
              >
                <Icon size={20} color={COLORS.oliveDark} />
              </div>
              <h3 className="text-lg mb-2" style={{ ...georgia, color: COLORS.charcoal }}>
                {r.label}
              </h3>
              <p className="text-sm mb-4" style={{ ...inter, color: COLORS.gray }}>
                {r.desc}
              </p>
              <span
                className="text-sm"
                style={{ ...inter, color: COLORS.oliveDark, fontWeight: 600 }}
              >
                Ingresar →
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-center pb-10 text-xs" style={{ ...inter, color: COLORS.gray }}>
        Este es un recorrido visual de referencia. Ningún dato es real ni se guarda.
      </div>
    </div>
  );
}

// ---------- ESTUDIANTES ----------
function Estudiantes() {
  const [tab, setTab] = useState("Ofertas");

  const ofertas = [
    { titulo: "Comparendo de conciliación — Juzgado de Familia de Viña del Mar", fecha: "19 ago, 10:00", pago: "$25.000", req: "4º año o superior" },
    { titulo: "Audiencia de juicio oral laboral — Valparaíso", fecha: "21 ago, 09:30", pago: "$40.000", req: "5º año, práctica clínica" },
    { titulo: "Alegato de apelación — Corte de Valparaíso", fecha: "25 ago, 12:00", pago: "$35.000", req: "Ius Postulandi vigente" },
  ];

  const postulaciones = [
    { titulo: "Comparendo Juzgado Civil, Quilpué", estado: "Aceptada" },
    { titulo: "Audiencia preparatoria, Viña del Mar", estado: "Pendiente" },
    { titulo: "Diligencia notarial, Valparaíso", estado: "Rechazada" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <SectionTabs
        tabs={["Ofertas", "Mis postulaciones", "Ius Postulandi"]}
        active={tab}
        onChange={setTab}
      />

      {tab === "Ofertas" && (
        <div className="space-y-4">
          {ofertas.map((o, i) => (
            <div key={i} className="p-4 rounded-lg border flex justify-between items-start" style={{ borderColor: COLORS.grayLight }}>
              <div>
                <h4 className="text-base mb-1" style={{ ...georgia, color: COLORS.charcoal }}>{o.titulo}</h4>
                <div className="flex gap-2 flex-wrap mt-2">
                  <Tag>{o.fecha}</Tag>
                  <Tag>{o.req}</Tag>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div style={{ ...georgia, color: COLORS.oliveDark }} className="text-lg">{o.pago}</div>
                <button className="mt-2 text-xs px-3 py-1 rounded" style={{ ...inter, background: COLORS.olive, color: COLORS.white }}>
                  Postular
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Mis postulaciones" && (
        <div className="space-y-3">
          {postulaciones.map((p, i) => (
            <div key={i} className="p-4 rounded-lg border flex justify-between items-center" style={{ borderColor: COLORS.grayLight }}>
              <span style={{ ...inter, color: COLORS.charcoal }}>{p.titulo}</span>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  ...inter,
                  background: p.estado === "Aceptada" ? COLORS.grayLight : COLORS.cream,
                  color: p.estado === "Rechazada" ? "#A15C4A" : COLORS.oliveDark,
                  border: `1px solid ${COLORS.grayLight}`,
                }}
              >
                {p.estado}
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === "Ius Postulandi" && (
        <div className="p-6 rounded-lg border" style={{ borderColor: COLORS.grayLight, background: COLORS.cream }}>
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck size={22} color={COLORS.oliveDark} />
            <span style={{ ...georgia, color: COLORS.charcoal }} className="text-lg">Estado: Vigente</span>
          </div>
          <p style={{ ...inter, color: COLORS.gray }} className="text-sm mb-4">
            Vence el 12 de diciembre de 2026. Certificado verificado por administración.
          </p>
          <button className="text-xs px-3 py-2 rounded border" style={{ ...inter, color: COLORS.oliveDark, borderColor: COLORS.olive }}>
            Actualizar documento
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- ABOGADOS ----------
function Abogados() {
  const [tab, setTab] = useState("Mis diligencias");

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <SectionTabs
        tabs={["Mis diligencias", "Agenda", "Consultas online", "Suscripción"]}
        active={tab}
        onChange={setTab}
      />

      {tab === "Mis diligencias" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="text-xs px-3 py-2 rounded" style={{ ...inter, background: COLORS.olive, color: COLORS.white }}>
              + Publicar diligencia
            </button>
          </div>
          {["Comparendo Familia, Viña del Mar", "Audiencia laboral, Valparaíso"].map((d, i) => (
            <div key={i} className="p-4 rounded-lg border flex justify-between items-center" style={{ borderColor: COLORS.grayLight }}>
              <span style={{ ...inter, color: COLORS.charcoal }}>{d}</span>
              <Tag>3 postulantes</Tag>
            </div>
          ))}
        </div>
      )}

      {tab === "Agenda" && (
        <div className="grid gap-3">
          {["Lun 18 · 10:00 — Audiencia preparatoria", "Mié 20 · 15:30 — Consulta online, cliente"].map((e, i) => (
            <div key={i} className="p-3 rounded-lg border flex items-center gap-3" style={{ borderColor: COLORS.grayLight }}>
              <Calendar size={16} color={COLORS.oliveDark} />
              <span style={{ ...inter, color: COLORS.charcoal }} className="text-sm">{e}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "Consultas online" && (
        <div className="space-y-3">
          <div className="p-4 rounded-lg border" style={{ borderColor: COLORS.grayLight }}>
            <p style={{ ...inter, color: COLORS.charcoal }} className="text-sm mb-2">Bloques disponibles esta semana</p>
            <div className="flex gap-2 flex-wrap">
              {["Mar 10:00", "Mar 11:00", "Jue 16:00"].map((b, i) => (
                <Tag key={i}>{b}</Tag>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Tag>Consulta gratuita: 15 min</Tag>
            <Tag>Consulta pagada: $30.000 / 40 min</Tag>
          </div>
        </div>
      )}

      {tab === "Suscripción" && (
        <div className="p-6 rounded-lg border" style={{ borderColor: COLORS.grayLight, background: COLORS.cream }}>
          <span style={{ ...georgia, color: COLORS.charcoal }} className="text-lg">Plan Pro</span>
          <p style={{ ...inter, color: COLORS.gray }} className="text-sm mt-2">
            Publicaciones ilimitadas de diligencias · Prioridad en el directorio de clientes.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------- CLIENTES ----------
function Clientes() {
  const [tab, setTab] = useState("Buscar abogados");
  const [filtro, setFiltro] = useState("Todas");

  const abogados = [
    { nombre: "María José Reyes", esp: "Derecho de Familia", comuna: "Viña del Mar", rating: 4.9, tipo: "Consulta gratuita" },
    { nombre: "Ignacio Bravo", esp: "Derecho Laboral", comuna: "Valparaíso", rating: 4.7, tipo: "Consulta pagada" },
    { nombre: "Constanza Álamos", esp: "Derecho Civil", comuna: "Quilpué", rating: 5.0, tipo: "Consulta gratuita" },
  ];

  const visibles = abogados.filter((a) => filtro === "Todas" || a.tipo === filtro);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <SectionTabs tabs={["Buscar abogados", "Mis reservas"]} active={tab} onChange={setTab} />

      {tab === "Buscar abogados" && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded border" style={{ borderColor: COLORS.grayLight }}>
              <Search size={16} color={COLORS.gray} />
              <span style={{ ...inter, color: COLORS.gray }} className="text-sm">Buscar por especialidad o comuna…</span>
            </div>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="text-sm px-2 py-2 rounded border"
              style={{ ...inter, borderColor: COLORS.grayLight, color: COLORS.charcoal }}
            >
              <option>Todas</option>
              <option>Consulta gratuita</option>
              <option>Consulta pagada</option>
            </select>
          </div>

          <div className="space-y-4">
            {visibles.map((a, i) => (
              <div key={i} className="p-4 rounded-lg border flex justify-between items-center" style={{ borderColor: COLORS.grayLight }}>
                <div>
                  <h4 style={{ ...georgia, color: COLORS.charcoal }} className="text-base">{a.nombre}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs" style={{ ...inter, color: COLORS.gray }}>
                    <span>{a.esp}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {a.comuna}</span>
                    <span className="flex items-center gap-1"><Star size={12} color={COLORS.gold} /> {a.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Tag>{a.tipo}</Tag>
                  <div>
                    <button className="mt-2 text-xs px-3 py-1 rounded" style={{ ...inter, background: COLORS.olive, color: COLORS.white }}>
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Mis reservas" && (
        <div className="p-4 rounded-lg border flex items-center gap-3" style={{ borderColor: COLORS.grayLight }}>
          <Clock size={16} color={COLORS.oliveDark} />
          <span style={{ ...inter, color: COLORS.charcoal }} className="text-sm">
            Consulta con María José Reyes — jue 21 ago, 11:00
          </span>
        </div>
      )}
    </div>
  );
}

export default function LexGoPrototype() {
  const [view, setView] = useState("home");

  const roleLabels = {
    estudiantes: "Acceso Estudiante",
    abogados: "Acceso Abogado",
    clientes: "Acceso Cliente",
  };

  return (
    <div style={{ ...inter, minHeight: "100vh", background: COLORS.cream }}>
      <TopBar onHome={() => setView("home")} roleLabel={roleLabels[view]} />

      {view !== "home" && (
        <div className="max-w-3xl mx-auto px-6 pt-4">
          <button
            onClick={() => setView("home")}
            className="flex items-center gap-1 text-xs"
            style={{ ...inter, color: COLORS.gray }}
          >
            <ArrowLeft size={14} /> Volver a inicio
          </button>
        </div>
      )}

      {view === "home" && <Home goTo={setView} />}
      {view === "estudiantes" && <Estudiantes />}
      {view === "abogados" && <Abogados />}
      {view === "clientes" && <Clientes />}
    </div>
  );
}
