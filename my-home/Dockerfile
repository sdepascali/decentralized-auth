# Container that serves frontend from backend

FROM node:8.6

# Create app directory
WORKDIR /usr/src/app

# Copy app sources (both frontend and backend)
COPY backend/package.json /
COPY backend/ .
COPY frontend/ frontend/

# Install
RUN npm install
RUN cd frontend && npm install && npm run build

ENV IOTA_PROVIDER http://node01.testnet.iotatoken.nl:16265
ENV IOTA_MIN_WEIGHT_MAGNITUDE 10
ENV FRONTEND_DIR frontend/build

CMD [ "npm", "run" , "prod" ]
