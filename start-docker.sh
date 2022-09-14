cd frontend

echo "========== [FrontEnd] npm installing... =========="
npm install

echo "========== [FrontEnd] Build Process... =========="
npm run build

cd ../backend/main-server

echo "========== [BackEnd][Main-Server] Build Process... =========="
./gradlew clean build

cd ../analytics

echo "========== [BackEnd][Analytics] Build Process... =========="
./gradlew clean build

cd ../youtuber-search

echo "========== [BackEnd][Youtuber-Search] Build Process... =========="
./gradlew clean build

cd ..
cd ..

echo "========== [Docker] Docker Compose Up =========="
docker-compose up --build -d