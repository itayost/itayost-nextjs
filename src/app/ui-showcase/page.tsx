// src/app/ui-showcase/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Mail, 
  Lock, 
  Home,
  Edit,
  Trash,
  Share,
  CheckCircle,
  HelpCircle,
  Zap,
  Sparkles,
  Code2,
  Palette,
  Copy,
  Check,
  ChevronRight,
  User,
  Settings,
  Bell,
  Search,
  Heart,
  Download,
  Upload,
  RefreshCw,
  MoreVertical
} from 'lucide-react';

// Import all UI components
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Input, Textarea, Select, Checkbox } from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Avatar, { AvatarGroup } from '@/components/ui/Avatar';
import Modal, { Drawer } from '@/components/ui/Modal';
import Tabs from '@/components/ui/Tabs';
import Accordion from '@/components/ui/Accordion';
import Progress, { CircularProgress, Skeleton } from '@/components/ui/Loader';
import { Toggle, Alert } from '@/components/ui/Toggle';
import Dropdown, { Tooltip } from '@/components/ui/Dropdown';
import { Breadcrumb, Pagination, Divider, Stepper } from '@/components/ui/Navigation';

export default function UIShowcasePage() {
  // State for interactive components
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);


  // Copy code function

  // Component sections
  const sections = [
    { id: 'buttons', title: 'Buttons', icon: <Zap /> },
    { id: 'cards', title: 'Cards', icon: <Palette /> },
    { id: 'inputs', title: 'Form Inputs', icon: <Edit /> },
    { id: 'badges', title: 'Badges', icon: <Star /> },
    { id: 'avatars', title: 'Avatars', icon: <User /> },
    { id: 'modals', title: 'Modals & Drawers', icon: <Settings /> },
    { id: 'tabs', title: 'Tabs', icon: <Code2 /> },
    { id: 'accordions', title: 'Accordions', icon: <HelpCircle /> },
    { id: 'progress', title: 'Progress', icon: <RefreshCw /> },
    { id: 'toggles', title: 'Toggles & Alerts', icon: <Bell /> },
    { id: 'dropdowns', title: 'Dropdowns & Tooltips', icon: <MoreVertical /> },
    { id: 'navigation', title: 'Navigation', icon: <ChevronRight /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Background effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent-purple/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent-pink/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-white">UI Components</h1>
                <p className="text-white/60 mt-1">Modern Bold Design System</p>
              </div>
              <Badge variant="gradient" size="lg" icon={<Sparkles className="w-4 h-4" />}>
                v1.0.0
              </Badge>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="sticky top-[88px] z-40 bg-neutral-900/50 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  icon={section.icon}
                  iconPosition="left"
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="whitespace-nowrap"
                >
                  {section.title}
                </Button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 space-y-20">
          
          {/* Buttons Section */}
          <ComponentSection
            id="buttons"
            title="Buttons"
            description="Interactive button components with multiple variants and states"
          >
            <div className="grid gap-8">
              {/* Variants */}
              <ShowcaseItem title="Variants" code={`<Button variant="gradient">Gradient</Button>`}>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="gradient">Gradient</Button>
                  <Button variant="brutal">Brutal</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </ShowcaseItem>

              {/* Sizes */}
              <ShowcaseItem title="Sizes" code={`<Button size="lg">Large Button</Button>`}>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </ShowcaseItem>

              {/* With Icons */}
              <ShowcaseItem title="With Icons" code={`<Button icon={<ArrowRight />}>Continue</Button>`}>
                <div className="flex flex-wrap gap-4">
                  <Button icon={<ArrowRight className="w-5 h-5" />}>Continue</Button>
                  <Button variant="gradient" icon={<Download className="w-5 h-5" />} iconPosition="left">
                    Download
                  </Button>
                  <Button variant="brutal" icon={<Star className="w-5 h-5" />}>
                    Favorite
                  </Button>
                </div>
              </ShowcaseItem>

              {/* States */}
              <ShowcaseItem title="States" code={`<Button loading>Loading...</Button>`}>
                <div className="flex flex-wrap gap-4">
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Cards Section */}
          <ComponentSection
            id="cards"
            title="Cards"
            description="Container components with various styles and effects"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default" padding="lg">
                <h3 className="text-xl font-bold text-white mb-2">Default Card</h3>
                <p className="text-white/60">This is a default card with standard styling.</p>
              </Card>

              <Card variant="glass" padding="lg">
                <h3 className="text-xl font-bold text-white mb-2">Glass Card</h3>
                <p className="text-white/60">Glassmorphism effect with backdrop blur.</p>
              </Card>

              <Card variant="gradient" padding="lg">
                <h3 className="text-xl font-bold text-white mb-2">Gradient Card</h3>
                <p className="text-white/60">Card with gradient border effect.</p>
              </Card>

              <Card variant="brutal" padding="lg">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Brutal Card</h3>
                <p className="text-neutral-700">Neo-brutalism style with hard shadows.</p>
              </Card>

              <Card variant="outlined" padding="lg">
                <h3 className="text-xl font-bold text-white mb-2">Outlined Card</h3>
                <p className="text-white/60">Simple outlined card variant.</p>
              </Card>

              <Card 
                variant="glass" 
                padding="lg"
                badge="Featured"
                header={<h3 className="text-xl font-bold text-white">With Header</h3>}
                footer={<Button variant="gradient" size="sm">Action</Button>}
              >
                <p className="text-white/60">Card with header, footer, and badge.</p>
              </Card>
            </div>
          </ComponentSection>

          {/* Form Inputs Section */}
          <ComponentSection
            id="inputs"
            title="Form Inputs"
            description="Input components with cyber, neon, and glass variants"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <ShowcaseItem title="Text Inputs" code={`<Input label="Email" type="email" icon={<Mail />} />`}>
                <div className="space-y-4">
                  <Input 
                    label="Email"
                    type="email"
                    icon={<Mail className="w-5 h-5" />}
                    placeholder="your@email.com"
                    variant="cyber"
                  />
                  <Input 
                    label="Password"
                    type="password"
                    icon={<Lock className="w-5 h-5" />}
                    showPasswordToggle
                    variant="neon"
                  />
                  <Input 
                    label="Search"
                    icon={<Search className="w-5 h-5" />}
                    placeholder="Search..."
                    variant="glass"
                  />
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Other Inputs" code={`<Textarea label="Message" charCount maxLength={200} />`}>
                <div className="space-y-4">
                  <Textarea 
                    label="Message"
                    placeholder="Type your message..."
                    charCount
                    maxLength={200}
                    variant="cyber"
                  />
                  <Select 
                    label="Country"
                    options={[
                      { value: 'us', label: 'United States' },
                      { value: 'uk', label: 'United Kingdom' },
                      { value: 'ca', label: 'Canada' }
                    ]}
                    variant="neon"
                  />
                  <Checkbox label="I agree to the terms" variant="cyber" />
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Badges Section */}
          <ComponentSection
            id="badges"
            title="Badges"
            description="Label and status indicator components"
          >
            <div className="grid gap-6">
              <ShowcaseItem title="Variants" code={`<Badge variant="gradient">Gradient</Badge>`}>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="gradient">Gradient</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="glass">Glass</Badge>
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Features" code={`<Badge icon={<Star />} removable>Featured</Badge>`}>
                <div className="flex flex-wrap gap-3">
                  <Badge icon={<Star className="w-4 h-4" />}>With Icon</Badge>
                  <Badge removable onRemove={() => { console.log('removed'); }}>Removable</Badge>
                  <Badge variant="gradient" pulse>Pulsing</Badge>
                  <Badge size="xs">Extra Small</Badge>
                  <Badge size="lg" variant="primary">Large</Badge>
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Avatars Section */}
          <ComponentSection
            id="avatars"
            title="Avatars"
            description="User avatar components with status indicators"
          >
            <div className="grid gap-6">
              <ShowcaseItem title="Sizes & Variants" code={`<Avatar name="John Doe" size="lg" gradient />`}>
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar name="John Doe" size="xs" />
                  <Avatar name="Jane Smith" size="sm" />
                  <Avatar name="Mike Johnson" size="md" gradient />
                  <Avatar name="Sarah Wilson" size="lg" border />
                  <Avatar name="Tom Brown" size="xl" variant="square" />
                  <Avatar name="Emma Davis" size="2xl" variant="rounded" />
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Status & Groups" code={`<AvatarGroup max={4}>...</AvatarGroup>`}>
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex gap-4">
                    <Avatar name="Online" status="online" />
                    <Avatar name="Away" status="away" />
                    <Avatar name="Busy" status="busy" />
                    <Avatar name="Offline" status="offline" />
                  </div>
                  <AvatarGroup max={4}>
                    <Avatar name="User 1" />
                    <Avatar name="User 2" />
                    <Avatar name="User 3" />
                    <Avatar name="User 4" />
                    <Avatar name="User 5" />
                    <Avatar name="User 6" />
                  </AvatarGroup>
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Modals & Drawers Section */}
          <ComponentSection
            id="modals"
            title="Modals & Drawers"
            description="Overlay components for dialogs and side panels"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <ShowcaseItem title="Modal" code={`<Modal isOpen={isOpen} onClose={onClose}>...</Modal>`}>
                <div className="space-y-4">
                  <Button variant="gradient" onClick={() => { setIsModalOpen(true); }}>
                    Open Modal
                  </Button>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); }}
                    title="Example Modal"
                    description="This is a modal component with glassmorphism effect"
                    variant="glass"
                    footer={
                      <>
                        <Button variant="ghost" onClick={() => { setIsModalOpen(false); }}>
                          Cancel
                        </Button>
                        <Button variant="gradient" onClick={() => { setIsModalOpen(false); }}>
                          Confirm
                        </Button>
                      </>
                    }
                  >
                    <p className="text-white/70">
                      Modal content goes here. You can add any content including forms, images, or other components.
                    </p>
                  </Modal>
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Drawer" code={`<Drawer isOpen={isOpen} position="right">...</Drawer>`}>
                <div className="space-y-4">
                  <Button variant="outline" onClick={() => { setIsDrawerOpen(true); }}>
                    Open Drawer
                  </Button>
                  <Drawer
                    isOpen={isDrawerOpen}
                    onClose={() => { setIsDrawerOpen(false); }}
                    title="Settings"
                    position="right"
                  >
                    <div className="space-y-4">
                      <Toggle label="Enable notifications" />
                      <Toggle label="Dark mode" checked />
                      <Toggle label="Auto-save" variant="gradient" />
                    </div>
                  </Drawer>
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Tabs Section */}
          <ComponentSection
            id="tabs"
            title="Tabs"
            description="Tab navigation components"
          >
            <div className="grid gap-8">
              <ShowcaseItem title="Tab Variants" code={`<Tabs tabs={tabs} variant="gradient" />`}>
                <div className="space-y-8">
                  <Tabs
                    tabs={[
                      { id: 'tab1', label: 'Tab 1', content: <div className="p-4 text-white/70">Content for Tab 1</div> },
                      { id: 'tab2', label: 'Tab 2', content: <div className="p-4 text-white/70">Content for Tab 2</div> },
                      { id: 'tab3', label: 'Tab 3', content: <div className="p-4 text-white/70">Content for Tab 3</div> },
                    ]}
                    variant="default"
                  />

                  <Tabs
                    tabs={[
                      { id: 'tab1', label: 'Overview', icon: <Home className="w-4 h-4" />, content: <div className="p-4 text-white/70">Overview content</div> },
                      { id: 'tab2', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" />, content: <div className="p-4 text-white/70">Analytics content</div> },
                      { id: 'tab3', label: 'Settings', icon: <Settings className="w-4 h-4" />, content: <div className="p-4 text-white/70">Settings content</div> },
                    ]}
                    variant="gradient"
                  />

                  <Tabs
                    tabs={[
                      { id: 'tab1', label: 'Profile', content: <div className="p-4 text-white/70">Profile content</div> },
                      { id: 'tab2', label: 'Security', content: <div className="p-4 text-white/70">Security content</div> },
                      { id: 'tab3', label: 'Billing', content: <div className="p-4 text-white/70">Billing content</div> },
                    ]}
                    variant="underline"
                  />
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Accordions Section */}
          <ComponentSection
            id="accordions"
            title="Accordions"
            description="Collapsible content panels"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <ShowcaseItem title="Default Accordion" code={`<Accordion items={items} type="single" />`}>
                <Accordion
                  items={[
                    { id: '1', title: 'What is this component?', content: 'This is an accordion component that allows you to show and hide content.' },
                    { id: '2', title: 'How does it work?', content: 'Click on the header to expand or collapse the content.' },
                    { id: '3', title: 'Can I customize it?', content: 'Yes, you can customize the variant, type, and styling.' },
                  ]}
                  type="single"
                  variant="default"
                  defaultOpen="1"
                />
              </ShowcaseItem>

              <ShowcaseItem title="Gradient Accordion" code={`<Accordion variant="gradient" type="multiple" />`}>
                <Accordion
                  items={[
                    { id: '1', title: 'Feature 1', content: 'Description of feature 1', icon: <Star className="w-5 h-5" /> },
                    { id: '2', title: 'Feature 2', content: 'Description of feature 2', icon: <Zap className="w-5 h-5" /> },
                    { id: '3', title: 'Feature 3', content: 'Description of feature 3', icon: <Heart className="w-5 h-5" /> },
                  ]}
                  type="multiple"
                  variant="gradient"
                  iconType="plus"
                />
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Progress Section */}
          <ComponentSection
            id="progress"
            title="Progress"
            description="Progress indicators and skeleton loaders"
          >
            <div className="grid gap-8">
              <ShowcaseItem title="Linear Progress" code={`<Progress value={75} variant="gradient" showLabel />`}>
                <div className="space-y-4">
                  <Progress value={25} variant="default" showLabel label="Processing..." />
                  <Progress value={50} variant="gradient" color="purple" showLabel />
                  <Progress value={75} variant="striped" color="success" />
                  <Progress value={90} variant="glow" color="danger" showLabel />
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Circular & Skeleton" code={`<CircularProgress value={60} variant="gradient" />`}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex gap-4 justify-center">
                    <CircularProgress value={25} color="danger" />
                    <CircularProgress value={50} color="warning" />
                    <CircularProgress value={75} color="success" variant="gradient" />
                    <CircularProgress value={100} color="purple" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4 items-center">
                      <Skeleton variant="circular" />
                      <div className="flex-1 space-y-2">
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="60%" />
                      </div>
                    </div>
                    <Skeleton variant="rectangular" height={100} />
                  </div>
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Toggles & Alerts Section */}
          <ComponentSection
            id="toggles"
            title="Toggles & Alerts"
            description="Switch components and notification alerts"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <ShowcaseItem title="Toggles" code={`<Toggle variant="gradient" label="Enable" />`}>
                <div className="space-y-4">
                  <Toggle label="Default Toggle" />
                  <Toggle variant="gradient" label="Gradient Toggle" checked />
                  <Toggle variant="neon" label="Neon Toggle" size="lg" />
                  <Toggle label="Disabled Toggle" disabled checked />
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Alerts" code={`<Alert variant="success" title="Success!" />`}>
                <div className="space-y-4">
                  <Alert 
                    variant="success" 
                    title="Success!"
                    description="Your action was completed successfully."
                    icon={<CheckCircle className="w-5 h-5" />}
                  />
                  <Alert 
                    variant="warning"
                    title="Warning"
                    description="Please review this information."
                    closable
                  />
                  <Alert 
                    variant="error"
                    title="Error"
                    description="Something went wrong. Please try again."
                    action={<Button size="sm" variant="outline">Retry</Button>}
                  />
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Dropdowns & Tooltips Section */}
          <ComponentSection
            id="dropdowns"
            title="Dropdowns & Tooltips"
            description="Contextual menus and hint components"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <ShowcaseItem title="Dropdown" code={`<Dropdown trigger={<Button>Menu</Button>} items={items} />`}>
                <div className="flex gap-4">
                  <Dropdown
                    trigger={<Button variant="outline">Options</Button>}
                    items={[
                      { id: '1', label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: () => {} },
                      { id: '2', label: 'Duplicate', icon: <Copy className="w-4 h-4" />, onClick: () => {} },
                      { id: '3', label: 'Delete', icon: <Trash className="w-4 h-4" />, onClick: () => {} },
                    ]}
                    variant="glass"
                  />

                  <Dropdown
                    trigger={<Button variant="gradient">Actions</Button>}
                    items={[
                      { id: '1', label: 'Share', icon: <Share className="w-4 h-4" />, onClick: () => {} },
                      { id: '2', label: 'Download', icon: <Download className="w-4 h-4" />, onClick: () => {} },
                      { id: '3', label: 'Upload', icon: <Upload className="w-4 h-4" />, onClick: () => {} },
                    ]}
                    variant="gradient"
                  />
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Tooltips" code={`<Tooltip content="Hint text" position="top">...</Tooltip>`}>
                <div className="flex gap-4">
                  <Tooltip content="Top tooltip" position="top">
                    <Button variant="ghost">Hover Top</Button>
                  </Tooltip>
                  <Tooltip content="Bottom tooltip" position="bottom" variant="gradient">
                    <Button variant="ghost">Hover Bottom</Button>
                  </Tooltip>
                  <Tooltip content="This is a longer tooltip with more information" position="right" variant="glass">
                    <Button variant="ghost">Hover Right</Button>
                  </Tooltip>
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

          {/* Navigation Section */}
          <ComponentSection
            id="navigation"
            title="Navigation"
            description="Navigation components for breadcrumbs, pagination, and more"
          >
            <div className="grid gap-8">
              <ShowcaseItem title="Breadcrumb" code={`<Breadcrumb items={items} variant="arrow" />`}>
                <div className="space-y-4">
                  <Breadcrumb
                    items={[
                      { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
                      { label: 'Products', href: '/products' },
                      { label: 'Category', href: '/products/category' },
                      { label: 'Item' }
                    ]}
                    variant="default"
                  />
                  <Breadcrumb
                    items={[
                      { label: 'Dashboard', href: '/' },
                      { label: 'Settings', href: '/settings' },
                      { label: 'Profile' }
                    ]}
                    variant="slash"
                  />
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Pagination" code={`<Pagination currentPage={1} totalPages={10} />`}>
                <div className="space-y-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    variant="default"
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    variant="rounded"
                    size="lg"
                  />
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Dividers" code={`<Divider variant="gradient" label="Section" />`}>
                <div className="space-y-6">
                  <Divider variant="solid" />
                  <Divider variant="gradient" />
                  <Divider variant="dashed" label="OR" />
                  <Divider variant="gradient" icon={<Sparkles className="w-4 h-4" />} label="Featured" />
                </div>
              </ShowcaseItem>

              <ShowcaseItem title="Stepper" code={`<Stepper steps={steps} currentStep={1} />`}>
                <div className="space-y-8">
                  <Stepper
                    steps={[
                      { id: '1', label: 'Setup', description: 'Initial configuration' },
                      { id: '2', label: 'Configure', description: 'Customize settings' },
                      { id: '3', label: 'Deploy', description: 'Go live' },
                      { id: '4', label: 'Complete', description: 'All done' }
                    ]}
                    currentStep={currentStep}
                    variant="numbers"
                  />
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => { setCurrentStep(Math.max(0, currentStep - 1)); }}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="gradient"
                      onClick={() => { setCurrentStep(Math.min(3, currentStep + 1)); }}
                      disabled={currentStep === 3}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </ShowcaseItem>
            </div>
          </ComponentSection>

        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-white/60">
                  Modern Bold UI Components • Built with React, TypeScript & Tailwind CSS
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" icon={<Code2 className="w-4 h-4" />}>
                  View Source
                </Button>
                <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                  Download
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Component Section Wrapper
interface ComponentSectionProps {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

function ComponentSection({ id, title, description, children }: ComponentSectionProps) {
  return (
    <section id={id} className="scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-2">{title}</h2>
          <p className="text-white/60">{description}</p>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

// Showcase Item Wrapper
interface ShowcaseItemProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

function ShowcaseItem({ title, code, children }: ShowcaseItemProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => { setCopied(false); }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button
          onClick={copyCode}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy Code</span>
            </>
          )}
        </button>
      </div>
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        {children}
      </div>
      <div className="p-4 bg-neutral-900/50 rounded-lg border border-white/10">
        <code className="text-sm text-white/70 font-mono">{code}</code>
      </div>
    </div>
  );
}

// Add these imports at the top if missing
import { TrendingUp } from 'lucide-react';
import React from 'react';