import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './design-system/ThemeProvider';
import { ChevronRight, Search, Menu, ExternalLink } from 'lucide-react';

// dynamic mass imports
import { Accordion } from './design-system/components/Accordion';
import { Alert } from './design-system/components/Alert';
import { Autocomplete } from './design-system/components/Autocomplete';
import { BarGraph } from './design-system/components/BarGraph';
import { BorderRadius } from './design-system/components/BorderRadius';
import { Button } from './design-system/components/Button';
import { Cell } from './design-system/components/Cell';
import { Chip } from './design-system/components/Chip';
import { DatePicker } from './design-system/components/DatePicker';
import { DealerBranch } from './design-system/components/DealerBranch';
import { DealerContactTile } from './design-system/components/DealerContactTile';
import { DealerLocation } from './design-system/components/DealerLocation';
import { DealerMap } from './design-system/components/DealerMap';
import { DealerOpeningHours } from './design-system/components/DealerOpeningHours';
import { DealerService } from './design-system/components/DealerService';
import { DecorativeCarCard } from './design-system/components/DecorativeCarCard';
import { DecorativeText } from './design-system/components/DecorativeText';
import { Divider } from './design-system/components/Divider';
import { DotStack } from './design-system/components/DotStack';
import { FocusCatcher } from './design-system/components/FocusCatcher';
import { FocusOutline } from './design-system/components/FocusOutline';
import { Footer } from './design-system/components/Footer';
import { FormContainer } from './design-system/components/FormContainer';
import { FormHelperText } from './design-system/components/FormHelperText';
import { FormTypography } from './design-system/components/FormTypography';
import { GlobalFooter } from './design-system/components/GlobalFooter';
import { GlobalStylesScope } from './design-system/components/GlobalStylesScope';
import { IconButton } from './design-system/components/IconButton';
import { IconLink } from './design-system/components/IconLink';
import { InputBorder } from './design-system/components/InputBorder';
import { InputLabel } from './design-system/components/InputLabel';
import { Label } from './design-system/components/Label';
import { LexusMap } from './design-system/components/LexusMap';
import { List } from './design-system/components/List';
import { LoadingSpinner } from './design-system/components/LoadingSpinner';
import { ProgressBar } from './design-system/components/ProgressBar';
import { ProgressStepper } from './design-system/components/ProgressStepper';
import { Responsive } from './design-system/components/Responsive';
import { ScrollIndicator } from './design-system/components/ScrollIndicator';
import { Select } from './design-system/components/Select';
import { Shadow } from './design-system/components/Shadow';
import { StickyPageBanner } from './design-system/components/StickyPageBanner';
import { Surface } from './design-system/components/Surface';
import { TextField } from './design-system/components/TextField';
import { TextInput } from './design-system/components/TextInput';
import { ThemeVariantScope } from './design-system/components/ThemeVariantScope';
import { TooltipPopup } from './design-system/components/TooltipPopup';
import { TooltipWithIcon } from './design-system/components/TooltipWithIcon';
import { TopBanner } from './design-system/components/TopBanner';
import { VehiclePlaceholder } from './design-system/components/VehiclePlaceholder';
import { AccordionGroup } from './design-system/layouts/AccordionGroup';
import { AnimateInView } from './design-system/layouts/AnimateInView';
import { Box } from './design-system/layouts/Box';
import { Card } from './design-system/layouts/Card';
import { Container } from './design-system/layouts/Container';
import { ContentBlock } from './design-system/layouts/ContentBlock';
import { ContentBlockInnerContainer } from './design-system/layouts/ContentBlockInnerContainer';
import { DynamicMedia } from './design-system/layouts/DynamicMedia';
import { FormSection } from './design-system/layouts/FormSection';
import { Grid } from './design-system/layouts/Grid';
import { ImageWithTooltip } from './design-system/layouts/ImageWithTooltip';
import { Layers } from './design-system/layouts/Layers';
import { Modal } from './design-system/layouts/Modal';
import { Oriented } from './design-system/layouts/Oriented';
import { Popover } from './design-system/layouts/Popover';
import { SlideShow } from './design-system/layouts/SlideShow';
import { Stack } from './design-system/layouts/Stack';
import { Tabs } from './design-system/layouts/Tabs';
import { VerticalScroll } from './design-system/layouts/VerticalScroll';
import { AdvancedCheckbox } from './design-system/compositions/AdvancedCheckbox';
import { AdvancedRadio } from './design-system/compositions/AdvancedRadio';
import { ButtonGroup } from './design-system/compositions/ButtonGroup';
import { CarCard } from './design-system/compositions/CarCard';
import { CardTable } from './design-system/compositions/CardTable';
import { CardWithHeader } from './design-system/compositions/CardWithHeader';
import { Carousel } from './design-system/compositions/Carousel';
import { CarouselWithCards } from './design-system/compositions/CarouselWithCards';
import { Checkbox } from './design-system/compositions/Checkbox';
import { CheckboxGroup } from './design-system/compositions/CheckboxGroup';
import { CookieConsent } from './design-system/compositions/CookieConsent';
import { FilterSlide } from './design-system/compositions/FilterSlide';
import { GenericTile } from './design-system/compositions/GenericTile';
import { GridWithCards } from './design-system/compositions/GridWithCards';
import { HeadingAndText } from './design-system/compositions/HeadingAndText';
import { Hero } from './design-system/compositions/Hero';
import { LinkList } from './design-system/compositions/LinkList';
import { LookupForm } from './design-system/compositions/LookupForm';
import { ModalSheet } from './design-system/compositions/ModalSheet';
import { MultiRow } from './design-system/compositions/MultiRow';
import { PWABottomNavigation } from './design-system/compositions/PWABottomNavigation';
import { PageHeader } from './design-system/compositions/PageHeader';
import { Radio } from './design-system/compositions/Radio';
import { RadioGroup } from './design-system/compositions/RadioGroup';
import { Row } from './design-system/compositions/Row';
import { SearchCard } from './design-system/compositions/SearchCard';
import { SearchPreviewPopover } from './design-system/compositions/SearchPreviewPopover';
import { SecondaryNavigationBar } from './design-system/compositions/SecondaryNavigationBar';
import { ShadedRow } from './design-system/compositions/ShadedRow';
import { SlideShowWithHero } from './design-system/compositions/SlideShowWithHero';
import { TableOfContent } from './design-system/compositions/TableOfContent';
import { Tooltip } from './design-system/compositions/Tooltip';

const ALL_COMPONENTS = {
  Components: ['Accordion', 'Alert', 'Autocomplete', 'BarGraph', 'BorderRadius', 'Button', 'Cell', 'Chip', 'DatePicker', 'DealerBranch', 'DealerContactTile', 'DealerLocation', 'DealerMap', 'DealerOpeningHours', 'DealerService', 'DecorativeCarCard', 'DecorativeText', 'Divider', 'DotStack', 'FocusCatcher', 'FocusOutline', 'Footer', 'FormContainer', 'FormHelperText', 'FormTypography', 'GlobalFooter', 'GlobalStylesScope', 'IconButton', 'IconLink', 'InputBorder', 'InputLabel', 'Label', 'LexusMap', 'List', 'LoadingSpinner', 'ProgressBar', 'ProgressStepper', 'Responsive', 'ScrollIndicator', 'Select', 'Shadow', 'StickyPageBanner', 'Surface', 'TextField', 'TextInput', 'ThemeVariantScope', 'TooltipPopup', 'TooltipWithIcon', 'TopBanner', 'VehiclePlaceholder'],
  Layouts: ['AccordionGroup', 'AnimateInView', 'Box', 'Card', 'Container', 'ContentBlock', 'ContentBlockInnerContainer', 'DynamicMedia', 'FormSection', 'Grid', 'ImageWithTooltip', 'Layers', 'Modal', 'Oriented', 'Popover', 'SlideShow', 'Stack', 'Tabs', 'VerticalScroll'],
  Compositions: ['AdvancedCheckbox', 'AdvancedRadio', 'ButtonGroup', 'CarCard', 'CardTable', 'CardWithHeader', 'Carousel', 'CarouselWithCards', 'Checkbox', 'CheckboxGroup', 'CookieConsent', 'FilterSlide', 'GenericTile', 'GridWithCards', 'HeadingAndText', 'Hero', 'LinkList', 'LookupForm', 'ModalSheet', 'MultiRow', 'PWABottomNavigation', 'PageHeader', 'Radio', 'RadioGroup', 'Row', 'SearchCard', 'SearchPreviewPopover', 'SecondaryNavigationBar', 'ShadedRow', 'SlideShowWithHero', 'TableOfContent', 'Tooltip']
};

const MAPPED_COMPONENTS: Record<string, React.FC<any>> = {
  Accordion,
  Alert,
  Autocomplete,
  BarGraph,
  BorderRadius,
  Button,
  Cell,
  Chip,
  DatePicker,
  DealerBranch,
  DealerContactTile,
  DealerLocation,
  DealerMap,
  DealerOpeningHours,
  DealerService,
  DecorativeCarCard,
  DecorativeText,
  Divider,
  DotStack,
  FocusCatcher,
  FocusOutline,
  Footer,
  FormContainer,
  FormHelperText,
  FormTypography,
  GlobalFooter,
  GlobalStylesScope,
  IconButton,
  IconLink,
  InputBorder,
  InputLabel,
  Label,
  LexusMap,
  List,
  LoadingSpinner,
  ProgressBar,
  ProgressStepper,
  Responsive,
  ScrollIndicator,
  Select,
  Shadow,
  StickyPageBanner,
  Surface,
  TextField,
  TextInput,
  ThemeVariantScope,
  TooltipPopup,
  TooltipWithIcon,
  TopBanner,
  VehiclePlaceholder,
  AccordionGroup,
  AnimateInView,
  Box,
  Card,
  Container,
  ContentBlock,
  ContentBlockInnerContainer,
  DynamicMedia,
  FormSection,
  Grid,
  ImageWithTooltip,
  Layers,
  Modal,
  Oriented,
  Popover,
  SlideShow,
  Stack,
  Tabs,
  VerticalScroll,
  AdvancedCheckbox,
  AdvancedRadio,
  ButtonGroup,
  CarCard,
  CardTable,
  CardWithHeader,
  Carousel,
  CarouselWithCards,
  Checkbox,
  CheckboxGroup,
  CookieConsent,
  FilterSlide,
  GenericTile,
  GridWithCards,
  HeadingAndText,
  Hero,
  LinkList,
  LookupForm,
  ModalSheet,
  MultiRow,
  PWABottomNavigation,
  PageHeader,
  Radio,
  RadioGroup,
  Row,
  SearchCard,
  SearchPreviewPopover,
  SecondaryNavigationBar,
  ShadedRow,
  SlideShowWithHero,
  TableOfContent,
  Tooltip
};

function Topbar() {
  const { tokens, mode, toggleMode } = useTheme();
  return (
    <header style={{
      height: 64, borderBottom: `1px solid ${tokens.modifiersMidlight}`,
      backgroundColor: tokens.canvasDefault, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, background: '#D60000', borderRadius: 4 }}></div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', color: tokens.foregroundDefault }}>LK Design GEL</span>
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={toggleMode} style={{
          background: 'transparent', border: `1px solid ${tokens.modifiersMidlight}`,
          padding: '8px 16px', borderRadius: 20, cursor: 'pointer', color: tokens.foregroundDefault,
          fontWeight: 600, fontSize: 13
        }}>
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  const { tokens } = useTheme();
  const location = useLocation();

  return (
    <nav style={{
      width: 260, borderRight: `1px solid ${tokens.modifiersMidlight}`,
      height: 'calc(100vh - 64px)', overflowY: 'auto', backgroundColor: tokens.canvasDefault,
      padding: '32px 0', flexShrink: 0
    }}>
      {Object.entries(ALL_COMPONENTS).map(([category, items]) => (
        <div key={category} style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
            color: tokens.foregroundDefault, opacity: 0.5, padding: '0 24px', marginBottom: 12
          }}>
            {category}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map(item => {
              const path = `/component/${item}`;
              const isActive = location.pathname === path;
              const formattedName = item.replace(/([A-Z])/g, ' $1').trim()
              return (
                <li key={item}>
                  <Link to={path} style={{
                    display: 'block', padding: '10px 24px', textDecoration: 'none',
                    color: isActive ? tokens.accentPrimaryDefault : tokens.foregroundDefault,
                    backgroundColor: isActive ? tokens.elevationRaisedDefault : 'transparent',
                    borderRight: isActive ? `3px solid ${tokens.accentPrimaryDefault}` : '3px solid transparent',
                    fontWeight: isActive ? 600 : 400, fontSize: 14, transition: 'background-color 0.2s',
                    opacity: isActive ? 1 : 0.8
                  }}>
                    {formattedName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function PageContent({ name }: { name: string }) {
  const { tokens } = useTheme();
  const [activeTab, setActiveTab] = useState('Design');
  const ComponentToRender = MAPPED_COMPONENTS[name];

  if (!ComponentToRender) return <div style={{ padding: 40}}>Component not found.</div>;

  // Helper to render components with demo props
  const renderComponentDemo = () => {
    const demoProps: Record<string, any> = {
      Button: { children: 'Click Me', variant: 'primary' },
      Alert: { children: 'This is an alert message' },
      Chip: { children: 'Chip Label' },
      Label: { children: 'Label Text' },
      IconButton: { children: '☰' },
      TextField: { label: 'Input Label', placeholder: 'Enter text...' },
      TextInput: { placeholder: 'Type something...' },
      Select: { children: <option>Select an option</option> },
      Checkbox: { label: 'Checkbox Label' },
      Radio: { label: 'Radio Option' },
      ProgressBar: { value: 60, max: 100 },
      ProgressStepper: { currentStep: 2, totalSteps: 4 },
      LoadingSpinner: {},
      Divider: {},
      Accordion: { children: 'Accordion content here' },
      List: { children: <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul> },
      Card: { children: 'Card content' },
      Modal: { children: 'Modal content', isOpen: false },
      Tooltip: { content: 'Tooltip text', children: 'Hover me' },
      Stack: { children: <><div>Item 1</div><div>Item 2</div><div>Item 3</div></> },
      Grid: { children: <><div>Grid 1</div><div>Grid 2</div><div>Grid 3</div></> },
      Box: { children: 'Box content' },
      Container: { children: 'Container content' },
      Surface: { children: 'Surface content' },
    };

    const props = demoProps[name] || {};
    const hasChildren = 'children' in props;
    
    if (!hasChildren && ComponentToRender.length === 0) {
      // Component doesn't take children (like LoadingSpinner, Divider)
      return <ComponentToRender {...props} />;
    }
    
    return (
      <ComponentToRender {...props}>
        {!hasChildren && (
          <div style={{ padding: 24, border: `2px dashed ${tokens.accentPrimaryDefault}`, borderRadius: 8, backgroundColor: tokens.canvasLighter, color: tokens.foregroundDefault, textAlign: 'center', opacity: 0.8, fontWeight: 500 }}>
            Sample Data for {name.replace(/([A-Z])/g, ' $1').trim()}
          </div>
        )}
      </ComponentToRender>
    );
  };

  return (
    <main style={{ flex: 1, padding: '48px 64px', overflowY: 'auto', height: 'calc(100vh - 64px)', backgroundColor: tokens.canvasDefault }}>
      <div style={{ maxWidth: 960, margin: '0 0' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: tokens.foregroundDefault, opacity: 0.6, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Home</span> <ChevronRight size={14} /> <span>Components</span> <ChevronRight size={14} /> <span>{name}</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-1.5px', color: tokens.foregroundDefault, margin: 0 }}>
            {name.replace(/([A-Z])/g, ' $1').trim()}
          </h1>
          <span style={{
            background: tokens.elevationRaisedLighter, padding: '4px 12px', borderRadius: 24,
            fontSize: 12, fontWeight: 600, color: tokens.successDefault, border: `1px solid ${tokens.successDefault}`
          }}>Ready</span>
        </div>
        
        <p style={{ fontSize: 20, lineHeight: 1.6, color: tokens.foregroundDefault, opacity: 0.7, maxWidth: 800, marginBottom: 48 }}>
          Provides detailed layout implementation documentation on {name}, representing the latest global UI token guidelines for scaling React applications effectively.
        </p>

        {/* Tabs */}
        <div style={{ borderBottom: `1px solid ${tokens.modifiersMidlight}`, display: 'flex', gap: 32, marginBottom: 48 }}>
          {['Design', 'Development', 'Accessibility'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', padding: '16px 0', fontSize: 16, fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? tokens.accentPrimaryDefault : tokens.foregroundDefault,
                borderBottom: activeTab === tab ? `4px solid ${tokens.accentPrimaryDefault}` : '4px solid transparent',
                cursor: 'pointer', marginBottom: -1, opacity: activeTab === tab ? 1 : 0.6, transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Design' && (
          <div style={{ paddingBottom: 64 }}>
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>Interactive Preview</h2>
            
            {/* Component Preview Box */}
            <div style={{
              border: `1px solid ${tokens.modifiersMidlight}`,
              borderRadius: 12, overflow: 'hidden', marginBottom: 48,
              boxShadow: tokens.shadowsLess
            }}>
              <div style={{ padding: '64px', backgroundColor: tokens.elevationRaisedDefault, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, backgroundImage: 'radial-gradient(circle, #8882 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                {renderComponentDemo()}
              </div>
              <div style={{ borderTop: `1px solid ${tokens.modifiersMidlight}`, padding: '16px 24px', backgroundColor: tokens.elevationInsetDefault, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: tokens.foregroundDefault, opacity: 0.8 }}>Default Variant</span>
                <span style={{ fontSize: 14, fontFamily: 'monospace', opacity: 0.6 }}>&lt;{name} /&gt;</span>
              </div>
            </div>

            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16, letterSpacing: '-0.5px' }}>Usage Strategy</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: tokens.foregroundDefault, opacity: 0.8, marginBottom: 24 }}>
              The <strong>{name}</strong> is designed to reduce architectural overhead while scaling. Used internally across the Lexus site to enforce UI consistency. Follow explicit token sizing patterns in documentation when customizing layout.
            </p>
          </div>
        )}

        {activeTab === 'Development' && (
          <div style={{ paddingBottom: 64 }}>
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>Installation</h2>
            <pre style={{
              backgroundColor: tokens.elevationInsetDarker, padding: 24, borderRadius: 12,
              fontSize: 15, fontFamily: 'monospace', overflowX: 'auto', border: `1px solid ${tokens.modifiersMidlight}`,
              color: '#d1d5db', marginBottom: 48
            }}>
              <code>
                import &#123; {name} &#125; from '@lk/design-system';
              </code>
            </pre>
            
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>Props API</h2>
            <div style={{ border: `1px solid ${tokens.modifiersMidlight}`, borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 15 }}>
                <thead style={{ backgroundColor: tokens.elevationRaisedLighter, borderBottom: `1px solid ${tokens.modifiersMidlight}` }}>
                  <tr>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Prop</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Type</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.modifiersMidlight}`, backgroundColor: tokens.canvasDefault }}>
                    <td style={{ padding: '20px 24px', fontFamily: 'monospace', color: tokens.accentPrimaryDefault }}>className?</td>
                    <td style={{ padding: '20px 24px', fontFamily: 'monospace', opacity: 0.8 }}>string</td>
                    <td style={{ padding: '20px 24px', opacity: 0.8 }}>Overrides existing wrapper class definitions.</td>
                  </tr>
                  <tr style={{ backgroundColor: tokens.canvasLighter }}>
                    <td style={{ padding: '20px 24px', fontFamily: 'monospace', color: tokens.accentPrimaryDefault }}>style?</td>
                    <td style={{ padding: '20px 24px', fontFamily: 'monospace', opacity: 0.8 }}>CSSProperties</td>
                    <td style={{ padding: '20px 24px', opacity: 0.8 }}>Inline programmatic styling injections if external classes are unavailable.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Accessibility' && (
          <div style={{ paddingBottom: 64 }}>
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>Screen Readers</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: tokens.foregroundDefault, opacity: 0.8 }}>
              Native implementations inside {name} inherit standard browser semantics where possible. Please explicitly manage your React <code>aria-label</code> if wrapping this inside invisible context states. Complies with WCAG 2.1 AA.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function Welcome() {
  const { tokens } = useTheme();
  return (
    <main style={{ flex: 1, padding: '64px', overflowY: 'auto', backgroundColor: tokens.canvasDefault, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: 800, textAlign: 'center', marginTop: '4vh' }}>
        <h1 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-2px', marginBottom: 24, color: tokens.foregroundDefault }}>
          LK Design GEL
        </h1>
        <p style={{ fontSize: 22, lineHeight: 1.6, color: tokens.foregroundDefault, opacity: 0.7, marginBottom: 48 }}>
          The enterprise-grade scalable component system architecture for Lexus. 
          Use the explicit navigation schema defined in the core token documentation to build resilient and robust applications.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/component/Button" style={{
            background: tokens.accentPrimaryDefault, color: '#fff', padding: '14px 32px',
            borderRadius: 30, textDecoration: 'none', fontWeight: 600, fontSize: 16, transition: 'transform 0.2s'
          }}>
            Explore Components
          </Link>
          <a href="https://github.com" style={{
            background: 'transparent', color: tokens.foregroundDefault, padding: '14px 32px',
            borderRadius: 30, textDecoration: 'none', fontWeight: 600, fontSize: 16, border: `2px solid ${tokens.modifiersMidlight}`,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            GitHub Reference <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </main>
  );
}

function Layout() {
  const { tokens } = useTheme();
  
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: tokens.canvasDefault, color: tokens.foregroundDefault, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/component/:name" element={<ComponentRouteWrapper />} />
        </Routes>
      </div>
    </div>
  );
}

import { useParams } from 'react-router-dom';
function ComponentRouteWrapper() {
  const { name } = useParams();
  return <PageContent key={name} name={name || ''} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
}
