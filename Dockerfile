FROM node:10.15.1-alpine

COPY package.json yarn.lock /usr/src/app/
COPY . /usr/src/app/
WORKDIR /usr/src/app
#RUN yarn install --production
RUN yarn install
RUN yarn build

# COPY lib /usr/src/app/lib

CMD ["yarn", "start"]
