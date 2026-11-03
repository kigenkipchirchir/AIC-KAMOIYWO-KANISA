/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopAlertBanner } from './components/TopAlertBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceSchedule } from './components/ServiceSchedule';
import { AboutMission } from './components/AboutMission';
import { LeadershipGrid } from './components/LeadershipGrid';
import { MinistriesSection } from './components/MinistriesSection';
import { SermonsSection } from './components/SermonsSection';
import { EventsSection } from './components/EventsSection';
import { PrayerWall } from './components/PrayerWall';
import { GivingSection } from './components/GivingSection';
import { PrayerContactSection } from './components/PrayerContactSection';
import { Footer } from './components/Footer';
import { GivingModal } from './components/GivingModal';

export default function App() {
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);

  const handleOpenGiving = () => {
    setIsGivingModalOpen(true);
  };

  const handleCloseGiving = () => {
    setIsGivingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F9FC] text-[#1E293B] flex flex-col font-sans selection:bg-[#F59E0B]/30 selection:text-[#0F2B5C]">
      {/* Top Countdown & Broadcast Alert Banner */}
      <TopAlertBanner onOpenGiving={handleOpenGiving} />

      {/* Sticky Main Navigation */}
      <Navbar onOpenGiving={handleOpenGiving} />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenGiving={handleOpenGiving} />

        {/* Service Schedule & Sanctuary Directions */}
        <ServiceSchedule />

        {/* About & Faith Statement */}
        <AboutMission />

        {/* Leadership Grid */}
        <LeadershipGrid />

        {/* Ministries & Fellowships */}
        <MinistriesSection />

        {/* Sermons & Audio Center */}
        <SermonsSection />

        {/* Upcoming Events Calendar */}
        <EventsSection />

        {/* Anonymous Community Prayer Wall */}
        <PrayerWall />

        {/* Online Giving & Christian Stewardship */}
        <GivingSection />

        {/* Prayer Requests & Pastoral Office */}
        <PrayerContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenGiving={handleOpenGiving} />

      {/* Quick M-Pesa Giving Modal */}
      <GivingModal isOpen={isGivingModalOpen} onClose={handleCloseGiving} />
    </div>
  );
}
