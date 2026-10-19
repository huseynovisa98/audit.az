/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RiskDiagnostic } from './components/RiskDiagnostic';
import { ServicesBento } from './components/ServicesBento';
import { TrustStats } from './components/TrustStats';
import { WhyAudit } from './components/WhyAudit';
import { ArticlesSection } from './components/ArticlesSection';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { Language, ServiceKey } from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('az');
  const [selectedService, setSelectedService] = useState<ServiceKey>('audit');
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRequestQuote = () => {
    scrollToSection('#consultation');
  };

  const handleExploreServices = () => {
    scrollToSection('#services');
  };

  const handleOpenDiagnostic = () => {
    scrollToSection('#diagnostic');
  };

  const handleSelectServiceAndConsult = (service: ServiceKey) => {
    setSelectedService(service);
    scrollToSection('#consultation');
  };

  const handleApplyDiagnosticToConsultation = (summaryText: string) => {
    setPrefilledMessage(summaryText);
    scrollToSection('#consultation');
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-[#F5F7FA] font-sans selection:bg-[#D4AF37]/30 selection:text-[#F4D36B]">
      {/* Sticky Header Navigation */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onRequestQuote={handleRequestQuote}
      />

      {/* Main Content Sections */}
      <main>
        {/* Cinematic Hero Section */}
        <Hero
          currentLang={currentLang}
          selectedService={selectedService}
          onSelectService={setSelectedService}
          onRequestQuote={handleRequestQuote}
          onExploreServices={handleExploreServices}
          onOpenDiagnostic={handleOpenDiagnostic}
        />

        {/* Financial Health and Risk Diagnostic Dashboard */}
        <RiskDiagnostic
          currentLang={currentLang}
          onApplyToConsultation={handleApplyDiagnosticToConsultation}
        />

        {/* B2B Services Bento Grid */}
        <ServicesBento
          currentLang={currentLang}
          onSelectServiceAndConsult={handleSelectServiceAndConsult}
        />

        {/* Trust and Methodological Statistics */}
        <TrustStats currentLang={currentLang} />

        {/* Why audit.az Editorial Section */}
        <WhyAudit currentLang={currentLang} />

        {/* Knowledge Base & Financial Articles */}
        <ArticlesSection currentLang={currentLang} />

        {/* Consultation Request Form */}
        <ConsultationForm
          currentLang={currentLang}
          selectedService={selectedService}
          prefilledMessage={prefilledMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onSelectService={handleSelectServiceAndConsult}
      />
    </div>
  );
}
