import * as migration_20251105_081114 from './20251105_081114';

export const migrations = [
  {
    up: migration_20251105_081114.up,
    down: migration_20251105_081114.down,
    name: '20251105_081114'
  },
];
