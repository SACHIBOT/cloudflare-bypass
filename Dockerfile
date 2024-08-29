FROM node:18 
WORKDIR /app
COPY . /app 
RUN npm install --force
CMD ["npm", "start"]
