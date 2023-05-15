#!/bin/bash

if [ "$EVMOS_APP_ENV" = "production" ]; then
  cp public/_redirects_prod public/_redirects
else
  cp public/_redirects_staging public/_redirects
fi
