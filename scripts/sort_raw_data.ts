import raw from '../website/src/data/raw.json';
raw.sort((a, b) => {
 return a.name.localeCompare(b.name);
});

Bun.write('website/src/data/raw.json', JSON.stringify(raw, null, 2));
