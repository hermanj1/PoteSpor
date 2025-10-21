# Bygg basert på Node 22
FROM node:22-slim AS app

WORKDIR /app

# Installer pnpm
RUN npm install -g pnpm

# Kopier prosjektfiler
COPY package*.json pnpm-lock.yaml* ./

# Installer dependencies (inkl. leaflet og react-leaflet)
RUN pnpm install
RUN pnpm add leaflet react-leaflet

# Kopier resten av koden
COPY . .

# Bygg prosjektet (hvis du har build-steg, ellers hopp)
# RUN pnpm run build

# Start appen
CMD ["pnpm", "run", "dev"]
