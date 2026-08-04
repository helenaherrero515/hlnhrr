import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout";
import { createMetadata } from "@/lib";

export const metadata: Metadata = createMetadata({
  title: "Creative Works",
  description: "A reserved space for creative visual works.",
  path: "/gallery",
});

export default function GalleryPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      
      {/* Background Cutting Mat Gridlines */}
      {/* Fine Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-50" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #f3f4f6 1px, transparent 1px),
            linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px'
        }}
      ></div>
      {/* Coarse Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-100" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '75px 75px'
        }}
      ></div>

      <SiteHeader />
      
      <main className="relative z-10 w-full min-h-screen pb-32">
        
        {/* Scrapbook Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-24 px-4 sm:px-8">
          <div className="relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto select-none mt-[-10vh]">
            
            {/* Decorative Elements (Stickers / Cutouts) */}
            <div className="absolute top-10 left-10 md:top-0 md:left-20 transform -rotate-12 bg-[var(--color-lavender)] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-md z-30">
              @helenacreates
            </div>

            <div className="absolute top-1/2 -right-4 md:right-10 transform rotate-6 border-[3px] border-white shadow-xl z-30 bg-white p-2">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 border border-gray-200 flex items-center justify-center">
                 <span className="text-gray-400 font-bold text-[10px]">IMG_902</span>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-1/4 transform -rotate-6 z-30">
               <div className="w-12 h-12 rounded-full bg-[var(--color-pink)] border-[3px] border-white shadow-lg flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
               </div>
            </div>

            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg transform -rotate-6 z-0"></div>

            {/* Main Title Cutouts */}
            <div className="relative flex flex-col items-center justify-center w-full z-20">
              
              {/* "Creative" on Pink */}
              <div className="relative flex items-center justify-center transform -rotate-3 hover:scale-105 transition-transform duration-300 shadow-xl z-20 bg-[var(--color-pink)] px-6 sm:px-10 py-2 sm:py-3 border-2 border-[var(--color-pink)]">
                {/* Fake tape on top corner */}
                <div className="absolute -top-3 -left-3 w-10 h-4 bg-gray-200/50 backdrop-blur-sm transform rotate-12 shadow-sm border border-gray-300/20"></div>
                
                <h1 className="text-white text-6xl sm:text-7xl md:text-[8rem] font-bold tracking-tighter leading-none m-0 p-0 font-sans uppercase lg:normal-case">
                  Creative
                </h1>
              </div>

              {/* "works" on Orange/Peach */}
              <div className="relative flex items-center justify-center transform rotate-2 mt-[-10px] md:mt-[-20px] md:ml-40 hover:scale-105 transition-transform duration-300 shadow-xl z-10 bg-[#FF8C69] px-6 sm:px-10 py-1 sm:py-2">
                <h2 className="text-white text-5xl sm:text-6xl md:text-[7rem] font-bold tracking-tighter leading-none m-0 p-0 font-sans lowercase drop-shadow-sm">
                  works
                </h2>
              </div>

              <div className="mt-8 md:mt-4 md:mr-32 transform -rotate-2 relative z-30 shadow-md bg-white px-5 py-2">
                <span className="text-[var(--color-ink)] text-sm sm:text-lg md:text-xl font-bold tracking-tight">
                  the visuals I keep coming back to
                </span>
              </div>
              
            </div>
          </div>
        </section>

        {/* Gallery Categories */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col gap-24 mt-12 relative z-20">
          
          {/* Social Media Pubmats */}
          <section>
            <h2 className="text-3xl font-bold font-lexend text-[var(--color-ink)] mb-6 flex items-center gap-3">
              <span className="text-[var(--color-pink)] text-4xl leading-none mt-[-4px]">•</span> Social Media Pubmats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={`pubmat-${item}`} className="aspect-square bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-gray-400 font-medium">Placeholder Image</span>
                </div>
              ))}
            </div>
          </section>

          {/* Branding */}
          <section>
            <h2 className="text-3xl font-bold font-lexend text-[var(--color-ink)] mb-6 flex items-center gap-3">
              <span className="text-[#FF8C69] text-4xl leading-none mt-[-4px]">•</span> Branding
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={`branding-${item}`} className="aspect-[4/3] bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-gray-400 font-medium">Placeholder Image</span>
                </div>
              ))}
            </div>
          </section>

          {/* Profile Picture Frame */}
          <section>
            <h2 className="text-3xl font-bold font-lexend text-[var(--color-ink)] mb-6 flex items-center gap-3">
              <span className="text-[var(--color-lavender)] text-4xl leading-none mt-[-4px]">•</span> Profile Picture Frame
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={`frame-${item}`} className="aspect-square rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow p-4">
                  <span className="text-gray-400 font-medium text-sm text-center">Placeholder<br/>Frame</span>
                </div>
              ))}
            </div>
          </section>

          {/* Newspaper layout */}
          <section>
            <h2 className="text-3xl font-bold font-lexend text-[var(--color-ink)] mb-6 flex items-center gap-3">
              <span className="text-gray-400 text-4xl leading-none mt-[-4px]">•</span> Newspaper Layout
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((item) => (
                <div key={`news-${item}`} className="relative aspect-[3/4] bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="w-full h-8 bg-gray-100 mb-4 rounded-sm border border-gray-200"></div>
                  <div className="w-full flex-1 flex gap-4">
                    <div className="flex-1 bg-gray-100 rounded-sm border border-gray-200"></div>
                    <div className="flex-1 bg-gray-100 rounded-sm border border-gray-200"></div>
                  </div>
                  <span className="text-gray-400 font-medium absolute">Placeholder Image</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
