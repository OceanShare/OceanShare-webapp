FROM node:9.6.1

# set working directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN rm -rf node_modules package-lock.json
RUN npm install -y --silent
RUN npm install -y react-scripts@1.1.1 -g --silent

# start app
CMD ["npm", "run", "build"]