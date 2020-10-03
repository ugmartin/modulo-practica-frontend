FROM node:erbium-alpine

RUN apk add --update \
        tzdata \
    && TZ=America/Argentina/Cordoba \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && apk del tzdata \
    && rm -rf /var/cache/apk/*

##########################
##########################
# Create app directory
WORKDIR /usr/src/app
#RUN chown -R node:node /usr/src/app
#USER node

# Config port
ENV PORT 3000
EXPOSE 3000

# Install app dependencies
COPY package.json .
COPY package-lock.json .


RUN npm install --only=prod

# Bundle app source
COPY . .

CMD [ "npm", "start" ]
