import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Sparkles, MapPin, CalendarDays, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/layout";
import { certifications, experience } from "@/data";
import { createMetadata } from "@/lib";
import { formatDate } from "@/utils";

export const metadata: Metadata = createMetadata({
  title: "Experience",
  description: "Certificates, leadership, community, and creative experience for Helena R. Herrero.",
  path: "/experience",
});

function dateRange(startDate: string, endDate?: string): string {
  return `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"}`;
}

export default function ExperiencePage(): React.ReactElement {
  return (
    <div className="bg-[#0b0c10] min-h-screen text-white font-lexend selection:bg-[#ff72b8]/30 overflow-hidden relative">
      <SiteHeader />
      
      {/* Background Gradients & Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none mt-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-pink)]/15 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-periwinkle)]/15 blur-[120px]"></div>
      </div>

      <div className="relative z-10 pt-32 pb-32">
        <main className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-24">
          
          {/* Hero Section */}
          {/* Hero Section */}
          <header className="relative flex flex-col items-center justify-center w-full max-w-6xl mx-auto select-none pt-12 pb-24 mb-10">
            <div className="absolute top-0 right-10 w-32 h-32 bg-gradient-to-br from-[var(--color-pink)] to-[var(--color-lavender)] rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse z-0"></div>
            
            <div className="relative flex flex-col items-center justify-center w-full z-20">
              
              {/* Top Row */}
              <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4 md:gap-8 mb-[-10px] md:mb-[-1rem] z-10">
                <h1 className="text-white text-[4.5rem] sm:text-7xl md:text-[9rem] lg:text-[10rem] font-black tracking-[-0.05em] leading-[0.8] m-0 p-0 font-lexend">
                  Work
                </h1>
                
                <div className="bg-[#fffade]/10 border border-[#e8dfa5]/30 px-5 py-1.5 mb-2 shadow-sm rounded-sm hidden md:block transform md:-translate-y-4">
                  <span className="text-[#fde047] text-lg md:text-2xl font-medium tracking-tight font-sans">
                    leadership
                  </span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-8 z-20">
                <div className="bg-[#e6f7ff]/10 border border-[#bce3f5]/30 px-5 py-1.5 mt-2 shadow-sm rounded-sm hidden md:block transform md:translate-y-4">
                  <span className="text-[#93c5fd] text-lg md:text-2xl font-medium tracking-tight font-sans">
                    community
                  </span>
                </div>

                <h2 className="text-white text-[4.5rem] sm:text-7xl md:text-[9rem] lg:text-[10rem] font-black tracking-[-0.05em] leading-[0.8] m-0 p-0 font-lexend">
                  Experience
                </h2>
              </div>
              
              {/* Subtitle */}
              <div className="mt-12 md:mt-20 max-w-3xl text-center px-4 flex flex-col items-center">
                <p className="text-white/60 text-lg sm:text-xl font-medium tracking-wide font-sans">
                  A scannable record of community work, data credentials, and technical programs.
                </p>
              </div>
              
            </div>
          </header>

          {/* Certificates Section */}
          <section className="mb-32 relative">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white/90">
                Certifications
              </h2>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {certifications.map((cert) => (
                <div key={cert.name} className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col h-full">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-sky)]/20 rounded-full blur-3xl group-hover:bg-[var(--color-sky)]/40 transition-colors duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/10">
                        {cert.issuer}
                      </div>
                      <span className="px-3 py-1 bg-black/40 rounded-full border border-white/5 text-white/50 text-[10px] font-semibold">{formatDate(cert.issuedDate)}</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-extrabold leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#8dcfff] transition-all">
                      {cert.name}
                    </h3>
                    
                    {cert.description && (
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-8">
                        {cert.description}
                      </p>
                    )}

                    <div className="mt-auto flex flex-wrap gap-2 mb-6">
                      {(cert.highlights ?? []).map((highlight) => (
                        <div key={highlight} className="px-3 py-1.5 rounded-lg bg-black/30 text-white/80 text-[10px] sm:text-xs font-medium border border-white/5 flex items-center gap-2">
                          <Sparkles size={12} className="text-[#8dcfff]" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {cert.credentialUrl && (
                      <div className="pt-6 border-t border-white/10 flex flex-col gap-5 mt-auto">
                        {cert.credentialId && (
                          <div className="text-white/40 text-[10px] font-mono break-all bg-black/20 p-2.5 rounded-xl border border-white/5">
                            ID: {cert.credentialId}
                          </div>
                        )}
                        <a 
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative h-[60px] w-[60px] hover:w-[190px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-full flex justify-center items-center cursor-pointer transition-[width] duration-500 ease-in-out z-10"
                        >
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--color-pink)] to-[var(--color-peach)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                          
                          <div className="absolute top-[8px] w-full h-full rounded-full bg-gradient-to-tr from-[var(--color-pink)] to-[var(--color-peach)] blur-[15px] -z-10 opacity-0 group-hover/btn:opacity-50 transition-opacity duration-500"></div>
                          
                          <div className="absolute text-gray-500 group-hover/btn:text-white transition-all duration-500 delay-200 group-hover/btn:scale-0 group-hover/btn:delay-0 z-20">
                            <ExternalLink size={24} />
                          </div>
                          
                          <div className="absolute text-white text-xs font-bold tracking-widest uppercase scale-0 transition-all duration-500 delay-0 group-hover/btn:scale-100 group-hover/btn:delay-200 whitespace-nowrap z-20">
                            See credential
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience / Organizations Section */}
          <section className="relative">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white/90">
                Organizations
              </h2>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 xl:gap-8 w-full mx-auto">
              {experience.map((item, idx) => {
                const bgGradients = [
                  "from-[var(--color-lavender)] to-[var(--color-pink)]",
                  "from-[var(--color-sky)] to-[var(--color-periwinkle)]",
                  "from-[var(--color-pink)] to-[var(--color-peach)]",
                ];
                const gradient = bgGradients[idx % bgGradients.length];

                return (
                  <div 
                    key={`${item.company}-${idx}`} 
                    tabIndex={0} 
                    className="group relative w-full h-[450px] rounded-[2.5rem] bg-[#15161a] border border-white/10 overflow-hidden shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink)]"
                  >
                    {/* Content Layer (Back) */}
                    <div className="absolute inset-0 z-10 p-8 sm:p-10 pb-20 flex flex-col h-full overflow-y-auto custom-scrollbar">
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10 backdrop-blur-md">
                          {item.company}
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-[var(--color-pink)]/10 text-[var(--color-peach)] text-xs font-bold uppercase tracking-wider border border-[var(--color-pink)]/20">
                          {item.employmentType}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 text-white drop-shadow-lg">
                        {item.role}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white/50 mb-6 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/5">
                        <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-[var(--color-periwinkle)]" /> {dateRange(item.startDate, item.endDate)}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[var(--color-periwinkle)]" /> {item.location}</span>
                      </div>

                      <div className="space-y-3 mb-6 flex-1">
                        {item.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-start gap-3">
                            <div className="mt-1.5 w-4 h-4 rounded-full bg-[var(--color-pink)]/20 flex items-center justify-center shrink-0 border border-[var(--color-pink)]/30">
                              <ArrowRight size={8} className="text-[var(--color-pink)]" />
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed font-medium">{highlight}</p>
                          </div>
                        ))}
                      </div>

                      {item.topics.length > 0 && (
                        <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
                          {item.topics.map((topic) => (
                            <span key={topic} className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/5 bg-white/[0.02]">
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Overlay Layer (Front) */}
                    <div className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-br ${gradient} z-20 flex items-center justify-center transition-all duration-500 ease-in-out group-hover:h-[60px] group-focus-visible:h-[60px] rounded-[2.5rem] group-hover:rounded-t-none group-focus-visible:rounded-t-none pointer-events-none shadow-[0_-10px_30px_rgba(0,0,0,0.3)]`}>
                      {/* Reflection highlight */}
                      <div className="absolute top-0 left-0 w-1/2 h-full bg-white/10 rounded-l-[2.5rem] group-hover:rounded-tl-none group-focus-visible:rounded-tl-none transition-all duration-500"></div>

                      <div className="w-[100px] h-[100px] group-hover:w-[40px] group-hover:h-[40px] group-focus-visible:w-[40px] group-focus-visible:h-[40px] transition-all duration-500 ease-in-out flex items-center justify-center z-10 relative">
                        {item.logo ? (
                          <Image src={item.logo} alt={`${item.company} Logo`} width={120} height={120} className="w-full h-full object-contain filter drop-shadow-xl" />
                        ) : (
                          <span className="text-6xl group-hover:text-2xl group-focus-visible:text-2xl font-black text-white drop-shadow-xl transition-all duration-500">
                            {item.company.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}