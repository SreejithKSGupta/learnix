import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';


(global as any)['document'] = undefined;
(global as any)['window'] = undefined;
(global as any)['navigator'] = undefined;
(global as any)['localStorage'] = undefined;



// Import the server-side Angular app
import { AppServerModule } from './src/main.server';

const app = express();
const distFolder = join(process.cwd(), 'dist/learnix/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';

// Use Angular Universal engine for SSR
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule,
  })
);

app.set('view engine', 'html');
app.set('views', distFolder);

// Serve static files
app.use(express.static(distFolder, { maxAge: '1y' }));

// Handle all routes with Angular Universal
app.get('*', (req, res) => {
  res.render(indexHtml, {
    req,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  });
});

const PORT = process.env['PORT'] || 4000;
app.listen(PORT, () => {
  console.log(`✅ SSR server running at http://localhost:${PORT}`);
});
