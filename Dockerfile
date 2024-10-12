# Specify the Node.js version
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the project files to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "dev"]
