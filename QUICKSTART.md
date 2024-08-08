# Quick Start Guide

## 🚀 Universal Config Converter - Get Started in 5 Minutes

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Test the CLI

```bash
# Convert JSON to YAML
node dist/cli.js convert example.json output.yaml --pretty

# Convert YAML to TOML
node dist/cli.js convert example.yaml output.toml

# Parse and display a config file
node dist/cli.js parse example.json --format yaml
```

### Start the Web UI

```bash
# Start the server (default port 3000)
npm start

# Or specify a custom port
PORT=3001 npm start
```

Then open your browser to: **http://localhost:3000**

### Use the Web UI

1. **Single File Mode:**
   - Paste your config in the left editor
   - Select source and target formats
   - See live conversion in the right editor
   - Download or copy the result

2. **Batch Mode:**
   - Switch to "Batch Conversion" tab
   - Drag & drop multiple config files
   - Select target format
   - Convert all files at once

### Test the API

```bash
# Convert JSON to YAML
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "content": "{\"name\":\"test\",\"value\":123}",
    "fromFormat": "json",
    "toFormat": "yaml",
    "options": {"pretty": true}
  }'

# Get supported formats
curl http://localhost:3000/api/formats
```

### Use as Library

```javascript
const { UniversalConfigConverter } = require('universal-config-converter');

const converter = new UniversalConfigConverter();

// Simple conversion
const yaml = converter.convert(
  '{"name":"test"}',
  'json',
  'yaml',
  { pretty: true }
);

console.log(yaml);
```

### Run Tests

```bash
npm test
```

### Example Files

The repository includes example files to test with:
- `example.json` - JSON configuration
- `example.yaml` - YAML configuration
- `example.toml` - TOML configuration
- `example.env` - Environment variables

### Format Conversion Examples

**JSON → YAML:**
```bash
node dist/cli.js convert example.json example.yaml --pretty
```

**YAML → TOML:**
```bash
node dist/cli.js convert example.yaml example.toml
```

**TOML → ENV:**
```bash
node dist/cli.js convert example.toml example.env
```

**ENV → JSON:**
```bash
node dist/cli.js convert example.env example.json --pretty --sort
```

### Features to Try

✅ Drag & drop file upload  
✅ Live preview as you type  
✅ Sort keys alphabetically  
✅ Custom indentation  
✅ Batch conversion  
✅ Download converted files  
✅ Copy to clipboard  

### Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Run `node dist/cli.js --help` for CLI usage
- Visit http://localhost:3000 for the web interface

### What's Next?

1. Try converting your own config files
2. Use the web UI for visual editing
3. Integrate the API into your workflow
4. Use as a library in your Node.js projects

Enjoy converting configs! 🎉



## Updated 2026-01-03

Minor improvements.
