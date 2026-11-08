import { useEffect, useState } from "react";
import { CLIENTS, type ClientProfile } from "@/data/clients";

type ClientCarouselProps = {
  french: boolean;
  clients?: ClientProfile[];
  className?: string;
};

export function ClientCarousel({ french, clients = CLIENTS, className = "" }: ClientCarouselProps) {
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [userPaused, setUserPaused] = useState(reducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(query.matches);
      setUserPaused(query.matches);
    };
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  const pauseText = french ? "Mettre le défilement en pause" : "Pause logo movement";
  const resumeText = french ? "Reprendre le défilement" : "Resume logo movement";
  const isPaused = userPaused || reducedMotion;

  return (
    <div className={`client-carousel ${className}`}>
      <div
        className={`client-carousel__viewport${isPaused ? " is-paused" : ""}`}
      >
        <div className="client-carousel__track">
          <div className="client-carousel__group">
            {clients.map((client) => (
              <a
                key={client.href}
                href={client.href}
                target="_blank"
                rel="noreferrer"
                className="client-carousel__item"
                aria-label={`${client.name}, ${french ? "visiter le site" : "visit website"}`}
              >
                <span className={`client-logo ${client.logoClass}`}>
                  <img src={client.logo} alt="" loading="eager" />
                </span>
                <span className="client-carousel__name">{client.name}</span>
              </a>
            ))}
          </div>
          <div className="client-carousel__group" aria-hidden="true">
            {clients.map((client) => (
              <div key={client.href} className="client-carousel__item">
                <span className={`client-logo ${client.logoClass}`}>
                  <img src={client.logo} alt="" loading="eager" />
                </span>
                <span className="client-carousel__name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="client-carousel__control">
        <span>{french ? "Entreprises clientes" : "Client businesses"}</span>
        {!reducedMotion && (
          <button type="button" onClick={() => setUserPaused((value) => !value)} aria-pressed={userPaused}>
            {userPaused ? resumeText : pauseText}
          </button>
        )}
        {reducedMotion && <span>{french ? "Mouvement réduit" : "Motion reduced"}</span>}
      </div>
    </div>
  );
}
