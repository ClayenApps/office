FROM redocly/redoc

WORKDIR /app

COPY ../api/open_api.json     api.json
COPY ../storage/open_api.json storage.json

COPY ./pages.json .
RUN URLS=$(./pages.json)

ENV PAGE_TITLE="Office API"
