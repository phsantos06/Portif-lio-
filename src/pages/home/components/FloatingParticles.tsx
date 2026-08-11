export default function FloatingParticles() {
  const particles = [
    { left: "5%", top: "10%", delay: "0s", duration: "14s", size: 3, color: "primary" },
    { left: "12%", top: "45%", delay: "1.2s", duration: "16s", size: 2, color: "accent" },
    { left: "20%", top: "80%", delay: "2.8s", duration: "12s", size: 3, color: "primary" },
    { left: "28%", top: "15%", delay: "0.5s", duration: "18s", size: 2, color: "accent" },
    { left: "35%", top: "65%", delay: "3.5s", duration: "13s", size: 2, color: "primary" },
    { left: "42%", top: "30%", delay: "1.8s", duration: "15s", size: 3, color: "accent" },
    { left: "50%", top: "85%", delay: "4.2s", duration: "11s", size: 2, color: "primary" },
    { left: "58%", top: "5%", delay: "0.9s", duration: "17s", size: 3, color: "accent" },
    { left: "65%", top: "55%", delay: "2.1s", duration: "14s", size: 2, color: "primary" },
    { left: "72%", top: "90%", delay: "5.5s", duration: "16s", size: 2, color: "accent" },
    { left: "80%", top: "20%", delay: "1.5s", duration: "13s", size: 3, color: "primary" },
    { left: "88%", top: "70%", delay: "3.2s", duration: "15s", size: 2, color: "accent" },
    { left: "95%", top: "40%", delay: "6.5s", duration: "12s", size: 2, color: "primary" },
    { left: "8%", top: "95%", delay: "4.8s", duration: "14s", size: 3, color: "accent" },
    { left: "18%", top: "25%", delay: "0.3s", duration: "11s", size: 2, color: "primary" },
    { left: "38%", top: "50%", delay: "2.5s", duration: "17s", size: 3, color: "accent" },
    { left: "55%", top: "70%", delay: "1.1s", duration: "15s", size: 2, color: "primary" },
    { left: "68%", top: "35%", delay: "5.8s", duration: "13s", size: 2, color: "accent" },
    { left: "78%", top: "75%", delay: "3.8s", duration: "16s", size: 3, color: "primary" },
    { left: "92%", top: "60%", delay: "0.7s", duration: "12s", size: 2, color: "accent" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-float ${
            p.color === "primary" ? "bg-primary-400/25" : "bg-accent-400/25"
          }`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow:
              p.color === "primary"
                ? "0 0 6px 2px oklch(var(--primary-400) / 0.3)"
                : "0 0 6px 2px oklch(var(--accent-400) / 0.3)",
          }}
        />
      ))}
    </div>
  );
}