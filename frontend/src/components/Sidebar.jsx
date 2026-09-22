import {
  Home,
  Zap,
  LayoutTemplate,
  MessageCircle,
  Users,
  Megaphone,
  Image as ImageIcon,
  KanbanSquare,
  Bot,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { C, FONT } from '../constants.js';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'chatbot-builder', label: 'Automations', Icon: Zap },
  { id: 'ai-agent-builder', label: 'AI Agents', Icon: Bot },
  { id: 'template-builder', label: 'Template Builder', Icon: LayoutTemplate },
  { id: 'media-library', label: 'Media', Icon: ImageIcon },
  { id: 'chats', label: 'Chats', Icon: MessageCircle },
  { id: 'contacts', label: 'Contacts', Icon: Users },
  { id: 'pipelines', label: 'Pipelines', Icon: KanbanSquare },
  { id: 'bulk-message', label: 'Bulk Message', Icon: Megaphone },
];

export default function Sidebar({
  activePage,
  onPageChange,
  collapsed,
  setCollapsed,
  user,
}) {
  const visibleItems =
    user?.role === 'admin' || !Array.isArray(user?.pages)
      ? NAV_ITEMS
      : NAV_ITEMS.filter((item) => user.pages.includes(item.id));

  return (
    <div
      style={{
        width: collapsed ? 68 : 224,
        minHeight: '100%',
        background: C.sidebarBg,
        borderRight: `1px solid ${C.sidebarBorder}`,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        transition: 'width .25s ease',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          padding: collapsed ? '10px 8px' : '14px 10px',
          flex: 1,
        }}
      >
        {visibleItems.map((item) => {
          const active = activePage === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onPageChange(item.id)}
              title={collapsed ? item.label : ''}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 11,
                padding: collapsed ? '11px 0' : '10px 12px',
                borderRadius: 10,
                cursor: 'pointer',
                transition: 'all .15s',
                marginBottom: 2,
                background: active ? C.primary : 'transparent',
                color: active ? '#fff' : '#111',
                justifyContent: collapsed ? 'center' : 'flex-start',
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = '#EFEEE6';
                  e.currentTarget.style.color = '#111';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = active
                  ? C.primary
                  : 'transparent';

                e.currentTarget.style.color = active
                  ? '#fff'
                  : '#111';
              }}
            >
              <span
                style={{
                  width: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  opacity: active ? 1 : 0.75,
                }}
              >
                <item.Icon size={16} />
              </span>

              {!collapsed && (
                <span style={{ letterSpacing: '-.01em' }}>
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Collapse only — no Powered by text here */}
      <div style={{ borderTop: `1px solid #F0F0EA` }}>
        <div
          onClick={() => setCollapsed((p) => !p)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: collapsed ? '12px 0' : '11px 14px',
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'background .15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#EFEEE6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#888',
              lineHeight: 1,
            }}
          >
            {collapsed ? (
              <ChevronRight size={22} strokeWidth={2.5} />
            ) : (
              <ChevronLeft size={22} strokeWidth={2.5} />
            )}
          </span>

          {!collapsed && (
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#888',
                fontFamily: FONT,
                lineHeight: 1,
              }}
            >
              Collapse
            </span>
          )}
        </div>
      </div>
    </div>
  );
}