FROM gradle:7.6-jdk17-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon 

FROM openjdk:17-slim
EXPOSE 8080
# EXPOSE 3306
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
ENTRYPOINT ["java","-XX:+UnlockExperimentalVMOptions", "-jar","/app/spring-boot-application.jar"]