FROM node:14

WORKDIR /app

RUN npm install -g @quasar/cli

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["quasar", "dev", "-m", "spa"]
# ENTRYPOINT ['quasar']

# docker build -t quasar-todo .
# WITHOUT BIND MOUNT
# docker run -d -p 8080:8080 --name quasar-todo-app quasar-todo
# WITH BIND MOUNTH
# docker run -d -p 8080:8080 --name quasar-todo-app -v /run/desktop/mnt/host/c/Users/nicko/Home/htdocs/docker/quasar-todo-list:/app/ -v /app/node_modules quasar-todo
