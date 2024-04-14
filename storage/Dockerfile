FROM rust:1.77 as build
WORKDIR /app
COPY . .
RUN cargo build --release --bin api

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=build /app/target/release/api /usr/local/bin
CMD ["storage"]
