import result from '../result.json';
import names from '../names.json';
import { joinStacksName } from '../src/lib/render/defines';
import type { rawStack } from '../src/namings';
const joinedResult = result.map(([url, timeTaken, bytes, success, stacks], index) => ({ name: names[index], url, tags: joinStacksName(stacks as rawStack[]) }));
await Bun.write('joinedResult.json', JSON.stringify(joinedResult));
