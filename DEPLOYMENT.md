# Deploying to Vercel

## Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from the project root:
```bash
cd "/Users/holdenabrams/Fun game"
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press enter or choose a name)
   - Directory? **. (current directory)**
   - Override settings? **No**

## Option 2: Vercel Dashboard

### Important Settings:

**Root Directory:** Leave as `./` (root)

**Build Command:**
```
cd client && npm install && npm run build
```

**Output Directory:**
```
client/dist
```

**Install Command:**
```
npm install
```

## Important Notes:

1. **This is a Full-Stack App**: Both the frontend (React) and backend (Express API) need to be deployed together
2. **Vercel Configuration**: The `vercel.json` file handles routing between the frontend and backend
3. **Environment Variables**: None required for basic functionality
4. **API Routes**: All `/api/*` requests are routed to the Express server

## Troubleshooting:

### If you get "vite: command not found":
- Make sure the build command includes `cd client && npm install`
- Verify that `client/package.json` has vite in dependencies

### If API routes don't work:
- Check that `vercel.json` is in the root directory
- Verify the routes configuration in `vercel.json`

### If you see build errors:
- Try running `npm run build` locally first
- Check that all dependencies are in package.json (not just devDependencies)

## Project Structure for Vercel:

```
/
├── server/
│   └── index.js          (Express API)
├── client/
│   ├── src/              (React app)
│   ├── package.json
│   └── vite.config.js
├── package.json          (Root package.json)
├── vercel.json           (Vercel configuration)
└── README.md
```

