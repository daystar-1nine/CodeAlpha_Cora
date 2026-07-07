import * as React from "react";
import { User, Mail, ExternalLink } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="w-full h-full max-w-3xl mx-auto flex flex-col pt-16 px-6 pb-12">
      <div className="flex items-center gap-3 mb-8">
        <User className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-display font-medium text-text-primary">Developer Profile</h2>
      </div>

      <div className="bg-surface/30 border border-border-default rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div 
          className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_40px_rgba(234,179,8,0.2)] mb-6 z-10 bg-black"
          style={{ backgroundImage: 'url(/avatar.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        
        <h3 className="text-2xl font-display font-semibold text-text-primary z-10">Suraj</h3>
        <p className="text-primary font-medium mt-1 mb-6 z-10">Software Engineer & UI/UX Designer</p>
        
        <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed z-10 mb-8">
          Passionate about building highly aesthetic, high-performance web applications. Creator of Cora Workspace. I specialize in Next.js, React, mathematical engines, and creating desktop-class user experiences in the browser.
        </p>


        <div className="flex items-center justify-center gap-4 z-10 mt-2 flex-wrap">
          <a href="https://suraj1nine.vercel.app/" target="_blank" rel="noopener noreferrer" title="Portfolio" className="p-2 rounded-full bg-void border border-border-strong text-text-secondary hover:text-primary hover:border-primary/50 transition-all">
            <ExternalLink className="w-5 h-5" />
          </a>
          <a href="https://github.com/daystar-1nine" target="_blank" rel="noopener noreferrer" title="GitHub" className="p-2 rounded-full bg-void border border-border-strong text-text-secondary hover:text-white hover:border-white/50 transition-all">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/surajsawant19062005/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-2 rounded-full bg-void border border-border-strong text-text-secondary hover:text-[#0a66c2] hover:border-[#0a66c2]/50 transition-all">
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/daystar.drafts/" target="_blank" rel="noopener noreferrer" title="Instagram" className="p-2 rounded-full bg-void border border-border-strong text-text-secondary hover:text-[#E1306C] hover:border-[#E1306C]/50 transition-all">
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a href="mailto:surajonenine@gmail.com" title="Email" className="p-2 rounded-full bg-void border border-border-strong text-text-secondary hover:text-red-400 hover:border-red-400/50 transition-all">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
