export type SegmentConfig = {
  name: string;
  variable: string;
  bg: number;
  bgHex: string;
  fg: number;
  fgHex: string;
  content: string;
  icon?: string;
  position: 'left' | 'right';
};

export const defaultSegments: SegmentConfig[] = [

  // LEFT
  {
    name: 'OS Icon',
    variable: 'OS_ICON',
    bg: 255,
    bgHex: '#eeeeee',
    fg: 0,
    fgHex: '#000000',
    content: '',
    icon: 'apple',
    position: 'left'
  },
  {
    name: 'Directory',
    variable: 'DIR',
    bg: 32,
    bgHex: '#0087d7',
    fg: 15,
    fgHex: '#FFFFFF',
    content: '~/projects',
    icon: 'folder',
    position: 'left'
  },
  { 
    name: 'GIT Clean', 
    variable: 'VCS_CLEAN',
    bg: 35,
    bgHex: '#00af5f',
    fg: 15,
    fgHex: '#FFFFFF',
    content: 'master', 
    icon: 'branch', 
    position: 'left' 
  },
  { 
    name: 'GIT Modified', 
    variable: 'VCS_MODIFIED',
    bg: 214,
    bgHex: '#ffaf00',
    fg: 15,
    fgHex: '#FFFFFF',
    content: 'master', 
    icon: 'branch', 
    position: 'left' 
  },
  { 
    name: 'GIT Untracked', 
    variable: 'VCS_UNTRACKED',
    bg: 130,
    bgHex: '#af5f00',
    fg: 15,
    fgHex: '#FFFFFF',
    content: 'master', 
    icon: 'branch', 
    position: 'left' 
  },
  { 
    name: 'GIT Conflicted', 
    variable: 'VCS_CONFLICTED',
    bg: 160,
    bgHex: '#d70000',
    fg: 15,
    fgHex: '#FFFFFF',
    content: 'master', 
    icon: 'branch', 
    position: 'left' 
  },

  // RIGHT

  { 
    name: 'Execution Time', 
    variable: 'COMMAND_EXECUTION_TIME',
    bg: 214,
    bgHex: '#ffaf00',
    fg: 15,
    fgHex: '#000000',
    content: '3s', 
    icon: 'hourglass',
    position: 'right' 
  },
  { 
    name: 'Time', 
    variable: 'TIME',
    bg: 255,
    bgHex: '#eeeeee',
    fg: 0,
    fgHex: '#000000',
    content: '10:30:45', 
    icon: 'clock',
    position: 'right' 
  },
];
