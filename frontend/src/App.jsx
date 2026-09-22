import { useState, useEffect } from 'react';
import { api } from './api.js';
import { C, FONT } from './constants.js';
import { useHashRoute } from './hooks/useHashRoute.js';
import LoginGate from './components/LoginGate.jsx';
import SetupWizard from './components/SetupWizard.jsx';
import Topbar from './components/Topbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatsPage from './components/ChatsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ChatbotBuilderPage from './pages/ChatbotBuilderPage.jsx';
import TemplateBuilderPage from './pages/TemplateBuilderPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import BulkMessagePage from './pages/BulkMessagePage.jsx';
import AdminSettingsPage from './pages/AdminSettingsPage.jsx';
import MediaLibraryPage from './pages/MediaLibraryPage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import PipelinesPage from './pages/PipelinesPage.jsx';
import AiAgentBuilderPage from './pages/AiAgentBuilderPage.jsx';

const VALID_PAGES = new Set([
  'home',
  'chatbot-builder',
  'template-builder',
  'chats',
  'contacts',
  'pipelines',
  'bulk-message',
  'admin-settings',
  'media-library',
  'about',
  'ai-agent-builder',
]);

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [setupRequired, setSetupRequired] = useState(false);
  const [routeParts, navigate, replaceRoute] = useHashRoute();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const page = VALID_PAGES.has(routeParts[0])
    ? routeParts[0]
    : 'home';

  const subParts = routeParts.slice(1);

  const setPage = (p) => navigate(p);

  // Normalize empty hash to #/home so reload always shows a valid URL
  useEffect(() => {
    if (!routeParts[0]) {
      replaceRoute('home');
    }
  }, [routeParts, replaceRoute]);

  // Page guard: non-admins can only reach pages granted to them.
  // admin-settings is allowed if they have any admin-settings:* sub-page.
  useEffect(() => {
    if (
      !user ||
      user.role === 'admin' ||
      !Array.isArray(user.pages)
    ) {
      return;
    }

    const allowed =
      page === 'admin-settings'
        ? user.pages.some((p) =>
            p.startsWith('admin-settings')
          )
        : user.pages.includes(page);

    if (!allowed) {
      setPage('home');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, user]);

  // Collapse main sidebar by default on automation builder page
  useEffect(() => {
    if (page === 'chatbot-builder') {
      setSidebarCollapsed(true);
    }
  }, [page]);

  // Set footer timestamp when the dashboard is loaded
  useEffect(() => {
    setLastUpdated(new Date());
  }, []);

  // First check whether the instance needs first-run setup.
  useEffect(() => {
    api.auth.status()
      .then(({ setupRequired: needed }) => {
        if (needed) {
          setSetupRequired(true);
          setChecking(false);
          return null;
        }

        return api.auth.me()
          .then(({ user }) => setUser(user))
          .catch(() => setUser(null))
          .finally(() => setChecking(false));
      })
      .catch(() => {
        // status unavailable â€” fall back to normal session check
        api.auth.me()
          .then(({ user }) => setUser(user))
          .catch(() => setUser(null))
          .finally(() => setChecking(false));
      });
  }, []);

  const handleLogout = async () => {
    await api.auth.logout().catch(() => {});
    setUser(null);
    setPage('home');
  };

  const formatUpdatedTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (checking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT,
          background: C.pageBg,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: C.textMuted,
            fontWeight: 500,
          }}
        >
          Loadingâ€¦
        </div>
      </div>
    );
  }

  if (setupRequired && !user) {
    return (
      <SetupWizard
        onComplete={(u) => {
          setSetupRequired(false);
          setUser(u);
          setLastUpdated(new Date());
        }}
      />
    );
  }

  if (!user) {
    return <LoginGate onLogin={setUser} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <HomePage
            user={user}
            onPageChange={setPage}
          />
        );

      case 'chats':
        return (
          <ChatsPage
            subParts={subParts}
            navigate={navigate}
            user={user}
          />
        );

      case 'contacts':
        return (
          <ContactsPage
            user={user}
            onNavigate={navigate}
          />
        );

      case 'pipelines':
        return <PipelinesPage user={user} />;

      case 'template-builder':
        return (
          <TemplateBuilderPage
            subParts={subParts}
            navigate={navigate}
          />
        );

      case 'media-library':
        return <MediaLibraryPage />;

      case 'bulk-message':
        return (
          <BulkMessagePage
            onNavigate={navigate}
          />
        );

      case 'chatbot-builder':
        return (
          <ChatbotBuilderPage
            subParts={subParts}
            navigate={navigate}
          />
        );

      case 'ai-agent-builder':
        return (
          <AiAgentBuilderPage
            user={user}
            navigate={navigate}
          />
        );

      case 'admin-settings':
        return (
          <AdminSettingsPage
            onLogout={handleLogout}
            onNavigate={setPage}
            subParts={subParts}
            navigate={navigate}
            user={user}
          />
        );

      case 'about':
        return <AboutUsPage />;

      default:
        return (
          <HomePage
            user={user}
            onPageChange={setPage}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minHeight: 0,
        fontFamily: FONT,
        background: C.pageBg,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Topbar
        user={user}
        onLogout={handleLogout}
        onNavigate={setPage}
      />

      {/* Dashboard body */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Sidebar */}
        {page !== 'admin-settings' && (
          <Sidebar
            activePage={page}
            onPageChange={setPage}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            user={user}
          />
        )}

        {/* Main / Right column */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflow: 'hidden',
            background: C.pageBg,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Scrollable page content */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflow: 'auto',
              paddingBottom: 42,
              boxSizing: 'border-box',
            }}
          >
            {renderPage()}
          </div>

          {/* Fixed footer â€” RIGHT COLUMN ONLY */}
          <footer
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 42,
              background: C.pageBg,
              borderTop: `1px solid ${C.headerBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 18px',
              boxSizing: 'border-box',
              zIndex: 150,
              fontFamily: FONT,
            }}
          >
            {/* Left footer text */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                minWidth: 0,
                color: C.textMuted,
                fontSize: 11,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <span>
                Auto-refreshes every 60s · updated{' '}
                {formatUpdatedTime(lastUpdated)}
              </span>
            </div>

            {/* Right footer text */}
            <div
              style={{
                flexShrink: 0,
                marginLeft: 16,
                color: C.textMuted,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              Powered by Dashboard Creators
            </div>
          </footer>

          {/* Responsive footer */}
          <style>
            {`
              @media (max-width: 640px) {
                footer {
                  height: 38px !important;
                  padding: 0 10px !important;
                }

                footer > div {
                  font-size: 9px !important;
                }

                footer > div:last-child {
                  margin-left: 8px !important;
                }
              }

              @media (max-width: 420px) {
                footer {
                  padding: 0 8px !important;
                }

                footer > div {
                  font-size: 8px !important;
                }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
