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
RUN bundle config build.nokogiri --use-system-libraries

RUN mkdir /valkyrie
WORKDIR /valkyrie
COPY Gemfile /valkyrie/Gemfile
COPY Gemfile.lock /valkyrie/Gemfile.lock
RUN bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ['bundle', 'exec', 'rails', 'server']
