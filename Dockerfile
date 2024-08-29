FROM node:18 
WORKDIR /
COPY . / 
RUN npm install
CMD ["npm", "start"]
