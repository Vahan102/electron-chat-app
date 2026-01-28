FROM node:20

WORKDIR /app/backend

# Install system build tools required for native modules and node-pre-gyp
RUN apt-get update \
	&& apt-get install -y python3 build-essential pkg-config g++ make \
	&& npm install -g node-pre-gyp \
	&& rm -rf /var/lib/apt/lists/*

COPY backend/package*.json ./
# Copy backend sources (host node_modules are ignored by .dockerignore)
COPY backend ./
# install production dependencies (native modules may need node-pre-gyp)
RUN npm install --production

EXPOSE 3027
CMD ["node", "build/main.js"]