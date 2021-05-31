## Commands

#### Build and run in development environment
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

#### After adding dependencies run this command to rebuild with anonymous volumes attached
`docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V`

#### Build and run in production environment
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

#### Login in node bash
`docker exec -it node-docker-sample_node-app_1 bash`

#### Login to redis-cli in production

`docker exec -it node-docker-sample_redis_1 redis-cli`



#### Login to mongo shell in production

`docker exec -it node-docker-sample_mongo_1 mongo -u $MONGO_USER -p $MONGO_PASSWORD`

#### Follow logs on one container
`docker logs node-docker-sample_node-app_1 -f`


#### To run only one container
`docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d node-app`

#### To run one container without any dependencies
`docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d node-app --no-deps`

#### To scale node server by 2 instances
`docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2`

#### To down all the containers with volumes
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v`

#### To down all the containers without volumes
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml down`

#### And if you want to clean your volumes, run the containers and then `prune` volumes. Docker will not removed the volumes in use.
`docker volume prune`
