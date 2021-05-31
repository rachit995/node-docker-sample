# Using node image
FROM node:15

# Switching to /app directory
WORKDIR /app

# Copying package.json & package-lock.json to cache this step
COPY ./package.json .
COPY ./package-lock.json .

# Installing dependencies based on environment
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi

# Copying rest of the files based on .dockerignore
COPY . .

# Not required, but setting a env variable here
ENV PORT=3000

# Exposing this port
EXPOSE $PORT

# Command to run after build, though being overritten in docker-compose.yml
CMD ["npm", "start"]
