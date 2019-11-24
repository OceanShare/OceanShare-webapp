FROM node:latest

# set working directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY . /usr/src/app/
RUN rm -rf node_modules package-lock.json
RUN npm install -y 

# start app
CMD ["npm", "start"]
