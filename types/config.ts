export type SegmentConfig = {
  name: string;
  variable: string;
  bg: string;
  fg: string;
  content: string;
  icon?: string;
  position: 'left' | 'right';
};

export const defaultSegments: SegmentConfig[] = [

  // LEFT

  {
    name: 'OS Icon',
    variable: 'OS_ICON',
    bg: '#D3D7CF',
    fg: '#000000',
    content: '',
    icon: 'apple',
    position: 'left'
  },
  {
    name: 'Directory',
    variable: 'DIR',
    bg: '#3465A4',
    fg: '#FFFFFF',
    content: '~/projects',
    icon: 'folder',
    position: 'left'
  },
  { 
    name: 'GIT Clean', 
    variable: 'VCS_CLEAN',
    bg: '#4E9A07', 
    fg: '0', 
    content: 'master', 
    icon: 'branch', 
    position: 'left' 
  },
  { 
    name: 'GIT Modified', 
    variable: 'VCS_MODIFIED',
    bg: '#C4A000', 
    fg: '0', 
    content: 'master', 
    icon: 'branch', 
    position: 'left' 
  },
  { 
    name: 'GIT Untracked', 
    variable: 'VCS_UNTRACKED',
    bg: '#808080', 
    fg: '0', 
    content: 'master', 
    icon: 'branch', 
    position: 'left' 
  },
  { 
    name: 'GIT Conflicted', 
    variable: 'VCS_CONFLICTED',
    bg: '#75507B', 
    fg: '0', 
    content: 'master', 
    icon: 'branch', 
    position: 'left' 
  },

  // RIGHT

  { 
    name: 'Execution Time', 
    variable: 'COMMAND_EXECUTION_TIME',
    bg: '#C4A000', 
    fg: '#000000', 
    content: '3s', 
    icon: 'hourglass',
    position: 'right' 
  },
  { 
    name: 'Time', 
    variable: 'TIME',
    bg: '#D3D7CF', 
    fg: '#000000', 
    content: '10:30:45', 
    icon: 'clock',
    position: 'right' 
  },
];
