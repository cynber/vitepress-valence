import fs from 'fs';
import path from 'path';

/*
  This is a VitePress data loader that scans the public/gallery folder for images. 
  You will need to set three constants at the top of the file to match your project:
      - SITE_DIR: The location of the site (where is the .vitepress folder inside of, ex. 'docs')
      - SRC_DIR: The source directory (By default this is '', but if you configured an srcDir value in your VitePress config, you will need to set it here)
        - https://vitepress.dev/guide/routing#source-directory
      - GALLERY_DIR: The location of the gallery folder
  
  For example, if your project structure looks like this:
  - docs/
    - .vitepress/
      - theme/
        - data/
          - gallery.data.js
    - public/
      - gallery/
        - image1.jpg
        - image2.jpg
        - image3.jpg
    - index.md
    - my-photography.md
  
  You would set the constants like this:
    const SITE_DIR = 'docs';
    const SRC_DIR = '';
    const GALLERY_DIR = 'public/gallery';
*/

const SITE_DIR = 'docs';
const SRC_DIR = '';
const GALLERY_DIR = 'public/gallery';

const absoluteGalleryDir = path.resolve(process.cwd(), SITE_DIR, SRC_DIR, GALLERY_DIR);
const base = process.env.VITEPRESS_BASE || '';

function normalizePath(path) {
  return path.replace(/\\/g, '/');
}

function cleanPath(path) {
  if (GALLERY_DIR.startsWith('public/')) {
    path = path.replace(/^\/public\//, '/');
  }
  path = path.replace(/\/+/g, '/');
  return path;
}

export default {
  watch: [`${absoluteGalleryDir}/**/*`],
  async load() {
    const images = [];
    
    function scanDirectory(dir) {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
          scanDirectory(fullPath);
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
          let relativePath = path.relative(absoluteGalleryDir, fullPath);
          relativePath = path.join(GALLERY_DIR, relativePath);
          relativePath = `/${normalizePath(relativePath)}`;
          relativePath = cleanPath(relativePath);
          
          if (base) {
            relativePath = `${base}${relativePath.replace(/^\//, '')}`;
          }
          
          images.push({
            path: relativePath,
            folder: cleanPath(`/${path.dirname(relativePath)}`),
            filename: item
          });
        }
      });
    }
    
    scanDirectory(absoluteGalleryDir);
    return images;
  }
};