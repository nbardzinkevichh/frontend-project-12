install:
	npm install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

build:
	rm -rf frontend/dist
	npm run build

lint-frontend:
	make -C frontend lint