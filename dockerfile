FROM node:14

# Install dependencies required by Puppeteer
RUN apt-get update && apt-get install -y \
    libnss3-dev \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libdrm2 \
    libxshmfence1 \
    libgtk-3-0 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["node", "app.js"]
