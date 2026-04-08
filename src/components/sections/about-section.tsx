import React from "react";
import Image from "next/image";
import aboutData from "@/data/about.json";

export function AboutSection() {
  const { story, chef, stats, values, team } = aboutData;
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <p className="section-eyebrow mb-4">{story.badge}</p>
          <h2
            className="text-5xl md:text-6xl font-light text-[var(--text-primary)] mb-8 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {story.heading}
          </h2>
          {story.paragraphs.map((p, i) => (
            <p key={i} className="text-[var(--text-muted)] leading-relaxed mb-5 text-sm">
              {p}
            </p>
          ))}
        </div>
        <div className="relative">
          <div className="absolute -right-4 -bottom-4 w-full h-full border border-[var(--gold)]/20" />
          <Image
            src={story.image}
            alt={story.imageAlt}
            width={700}
            height={500}
            className="w-full h-[480px] object-cover relative z-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[var(--parchment)] mb-24">
        {stats.map((s, i) => (
          <div
            key={i}
            className="text-center py-10 px-6 border-r border-[var(--parchment)] last:border-r-0"
          >
            <div
              className="text-5xl text-[var(--gold)] font-light mb-2 leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {s.number}
            </div>
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-body">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Chef */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-24 bg-[var(--ivory)] p-12">
        <div className="lg:col-span-2">
          <Image
            src={chef.image}
            alt={chef.name}
            width={400}
            height={500}
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="lg:col-span-3">
          <p className="section-eyebrow mb-4">Chef-Patron</p>
          <h3
            className="text-4xl font-light text-[var(--text-primary)] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {chef.name}
          </h3>
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--text-muted)] mb-6">
            {chef.title}
          </p>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">{chef.bio}</p>
          <blockquote
            className="border-l-2 border-[var(--gold)] pl-6 italic text-lg text-[var(--text-primary)] font-light leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "{chef.quote}"
          </blockquote>
        </div>
      </div>

      {/* Values */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-4">Philosophy</p>
          <h3
            className="text-4xl font-light text-[var(--text-primary)]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Principles
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[var(--parchment)]">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-8 border-r border-[var(--parchment)] last:border-r-0 group hover:bg-[var(--ivory)] transition-colors"
            >
              <div className="w-6 h-px bg-[var(--gold)] mb-6 group-hover:w-10 transition-all duration-300" />
              <h4
                className="text-xl font-light text-[var(--text-primary)] mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {v.title}
              </h4>
              <p className="text-[0.75rem] text-[var(--text-muted)] leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-4">Our Team</p>
          <h3
            className="text-4xl font-light text-[var(--text-primary)]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The People Behind Every Plate
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative overflow-hidden mb-5 aspect-[3/4]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--gold)] mb-1 font-body">
                {member.role}
              </p>
              <h4
                className="text-xl font-light text-[var(--text-primary)]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {member.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
