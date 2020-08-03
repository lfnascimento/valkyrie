FROM node:12-alpine

RUN mkdir /valkyrie-ui
WORKDIR /valkyrie-ui

COPY package.json /valkyrie-ui/package.json
COPY package-lock.json /valkyrie-ui/package-lock.json

RUN npm install

COPY . .

EXPOSE 3000

# Running the app
CMD [ 'npm', 'run', 'dev' ]
