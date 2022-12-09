FROM gradle:7.6-jdk17-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon 

FROM openjdk:17-slim
EXPOSE 8080
RUN mkdir /app
# WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
COPY /src/main/resources/db/MariaDB/data.sql /app/data.sql
COPY /src/main/resources/images /app/images
VOLUME /app/images
ENTRYPOINT ["java","-XX:+UnlockExperimentalVMOptions", "-jar","/app/spring-boot-application.jar"]