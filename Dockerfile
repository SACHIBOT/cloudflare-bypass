FROM node:20
 
RUN apt-get update && apt-get install -y \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgdk-pixbuf2.0-0 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpangoft2-1.0-0 \
    libcairo2 \
    libasound2 \
    libgbm1
 
WORKDIR /app
 
COPY . .
 
RUN npm install --force 

CMD ["npm", "start"]
