"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { sections } from "./navigation";

const trackedIds = ["hero", ...sections.map(section => section.id), "contact"];

export function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu(restoreFocus = true) {
    dialogRef.current?.close();
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus({ preventScroll: true });
  }

  function navigateToSection(id: string) {
    closeMenu(false);
    // Native anchors handle the URL and scrolling; focus follows navigation.
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      section?.setAttribute("tabindex", "-1");
      section?.focus({ preventScroll: true });
    });
  }

  useEffect(() => {
    const targets = trackedIds.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
      const current = targets.find(target => visible.has(target.id));
      if (current) setActiveSection(current.id);
    }, { rootMargin: "-18% 0px -55% 0px", threshold: 0 });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 64rem)");
    const handleResize = () => { if (desktop.matches) { dialogRef.current?.close(); setMenuOpen(false); } };
    desktop.addEventListener("change", handleResize);
    return () => { document.body.style.overflow = oldOverflow; desktop.removeEventListener("change", handleResize); };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="container header-inner">
        <a href="#hero" className="brand" aria-label="Dev Raval, scroll to top"><span className="brand-mark" aria-hidden="true">DR</span><span>Dev Raval</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {sections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={activeSection === section.id ? "location" : undefined}>{section.label}</a>)}
          <a className="button header-contact" href="#contact" aria-current={activeSection === "contact" ? "location" : undefined}>Let&apos;s Talk<FiArrowUpRight aria-hidden="true" /></a>
        </nav>
        <button className="menu-toggle" type="button" ref={menuButtonRef} aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => { dialogRef.current?.showModal(); setMenuOpen(true); }}><FiMenu aria-hidden="true" /></button>
      </div>
      <dialog ref={dialogRef} id="mobile-menu" className="mobile-dialog" aria-label="Main navigation" onClose={() => setMenuOpen(false)} onCancel={() => setMenuOpen(false)} onClick={event => { if (event.target === dialogRef.current) closeMenu(); }}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-top"><span className="brand"><span className="brand-mark" aria-hidden="true">DR</span>Dev Raval</span><button type="button" className="menu-toggle" aria-label="Close navigation" onClick={() => closeMenu()}><FiX aria-hidden="true" /></button></div>
          <nav aria-label="Mobile navigation">
            {sections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={activeSection === section.id ? "location" : undefined} onClick={() => navigateToSection(section.id)}><span className="mobile-nav-number" aria-hidden="true">0{index + 1}</span>{section.label}<FiArrowUpRight aria-hidden="true" /></a>)}
            <a href="#contact" className="button button-primary" onClick={() => navigateToSection("contact")}>Let&apos;s Talk<FiArrowUpRight aria-hidden="true" /></a>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
