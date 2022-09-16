FROM openjdk:8-jre-slim

WORKDIR /app

ARG JAR_FILE=./build/libs/youtuber-search-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} /app/app.jar

ENTRYPOINT ["java","-jar","app.jar"]