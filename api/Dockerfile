FROM ruby:2.7.1-alpine
RUN apk add --update \
      build-base \
      linux-headers \
      git \
      yarn \
      nodejs \
      postgresql-dev \
      postgresql-client\
      libxslt-dev \
      libxml2-dev \
      tzdata \
      && rm -rf /var/cache/apk/*

RUN mkdir /valkyrie-api
WORKDIR /valkyrie-api

COPY Gemfile /valkyrie-api/Gemfile
COPY Gemfile.lock /valkyrie-api/Gemfile.lock
RUN bundle config build.nokogiri --use-system-libraries
RUN bundle install

COPY . .

EXPOSE 3001

CMD ['bundle', 'exec', 'rails', 'server']
