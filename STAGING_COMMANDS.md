# Subir v2.1.3 a staging

Desde la carpeta del proyecto:

```powershell
npm install
npm run typecheck
npm run build

git checkout staging
git add .
git commit -m "fix: stabilize Aura Vida frontend"
git push origin staging
```

Después del `push`, Vercel generará automáticamente el nuevo Preview Deployment de `staging`.

Si el proyecto anterior ya tiene `node_modules`, no hace falta subirlo: permanece excluido por `.gitignore`.
