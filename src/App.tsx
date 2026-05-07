/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Teams } from './pages/Teams';
import { Board } from './pages/Board';
import { TeamManagement } from './pages/TeamManagement';
import { Agents } from './pages/Agents';
import { Companies } from './pages/Companies';
import { Assets } from './pages/Assets';
import { PageType } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'teams': return <Teams />;
      case 'board': return <Board />;
      case 'team-management': return <TeamManagement />;
      case 'agents': return <Agents />;
      case 'companies': return <Companies />;
      case 'assets': return <Assets />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </Layout>
  );
}
