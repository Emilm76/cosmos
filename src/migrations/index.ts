import * as migration_20251105_081114 from './20251105_081114';
import * as migration_20251120_140514 from './20251120_140514';

export const migrations = [
  {
    up: migration_20251105_081114.up,
    down: migration_20251105_081114.down,
    name: '20251105_081114',
  },
  {
    up: migration_20251120_140514.up,
    down: migration_20251120_140514.down,
    name: '20251120_140514'
  },
];
