FROM openjdk:17
ARG JAR_FILE=build/libs/project-subway-0.0.1-SNAPSHOT.jar
ENV TZ=Asia/Seoul
COPY ${JAR_FILE} /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]