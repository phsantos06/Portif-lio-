export default function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1 — top right, teal/primary */}
      <div
        className="absolute -top-32 -right-16 w-[30rem] h-[30rem] rounded-full opacity-25 blur-3xl animate-orb-1"
        style={{
          background: "radial-gradient(circle, oklch(var(--primary-400) / 0.7) 0%, oklch(var(--primary-500) / 0.3) 35%, transparent 70%)",
        }}
      />
      {/* Orb 2 — bottom left, amber/accent */}
      <div
        className="absolute -bottom-40 -left-24 w-[34rem] h-[34rem] rounded-full opacity-20 blur-3xl animate-orb-2"
        style={{
          background: "radial-gradient(circle, oklch(var(--accent-400) / 0.6) 0%, oklch(var(--accent-500) / 0.2) 40%, transparent 70%)",
        }}
      />
      {/* Orb 3 — center-left, subtle primary */}
      <div
        className="absolute top-1/3 -left-40 w-[28rem] h-[28rem] rounded-full opacity-12 blur-3xl animate-orb-3"
        style={{
          background: "radial-gradient(circle, oklch(var(--primary-300) / 0.5) 0%, transparent 70%)",
        }}
      />
      {/* Orb 4 — top-center, accent pulse */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[22rem] h-[22rem] rounded-full opacity-10 blur-3xl animate-orb-4"
        style={{
          background: "radial-gradient(circle, oklch(var(--accent-300) / 0.4) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(var(--foreground-100)) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
    </div>
  );
}