'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  getBioData,
  getServicesData,
  getProjectsData,
  getSkillsData,
} from '@/lib/content';

import BioEditor from '@/components/admin/BioEditor';
import ProjectsEditor from '@/components/admin/ProjectsEditor';
import ServicesEditor from '@/components/admin/ServicesEditor';
import SkillsEditor from '@/components/admin/SkillsEditor';
import MessagesViewer from '@/components/admin/MessagesViewer';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'bio' | 'projects' | 'services' | 'skills' | 'messages'>('bio');
  const router = useRouter();
  const supabase = createClient();

  const bio = getBioData();
  const services = getServicesData();
  const projects = getProjectsData();
  const skillsData = getSkillsData();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: 'var(--white)', padding: '24px 32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div>
            <a href="/" className="logo" style={{ fontSize: '1.5rem' }}>
              OG<span>.</span> Admin
            </a>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink3)' }}>Manage your portfolio content &amp; view client submissions</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/" target="_blank" className="btn-outline" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
              View Live Website
            </a>
            <button onClick={handleLogout} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
              Log Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'bio', label: 'Bio & Profile' },
            { id: 'projects', label: 'Projects' },
            { id: 'services', label: 'Services' },
            { id: 'skills', label: 'Skills & Tools' },
            { id: 'messages', label: 'Contact Messages' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`filter-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={{ padding: '10px 22px', fontSize: '0.88rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '20px', padding: '36px' }}>
          {activeTab === 'bio' && <BioEditor initialBio={bio} />}
          {activeTab === 'projects' && <ProjectsEditor initialProjects={projects} />}
          {activeTab === 'services' && <ServicesEditor initialServices={services} />}
          {activeTab === 'skills' && <SkillsEditor initialSkills={skillsData} />}
          {activeTab === 'messages' && <MessagesViewer />}
        </div>
      </div>
    </div>
  );
}
