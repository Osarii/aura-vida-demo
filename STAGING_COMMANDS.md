# Subir a staging

Desde la carpeta del proyecto:

```powershell
npm install
npm run typecheck
npm run build

git checkout staging
git add .
git commit -m "feat: polish Aura Vida frontend"
git push origin staging
```

Después del `push`, Vercel generará automáticamente un nuevo Preview Deployment de `staging`.

> Si estás reemplazando una carpeta anterior del proyecto, elimina antes el `package-lock.json` viejo para que `npm install` genere uno nuevo con las dependencias actualizadas.
