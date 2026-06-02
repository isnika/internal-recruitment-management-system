FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /app

# Copy maven wrapper và pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

# Copy toàn bộ source code (bao gồm cả thư mục src/main/resources)
COPY src src  

# Build ứng dụng
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy JAR từ stage build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]