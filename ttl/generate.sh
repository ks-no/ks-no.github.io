#!/bin/bash
cat prefix
while read line; do
      echo "  dcat:dataset <https://ks-no.github.io/api/$line>;"
done <apis
cat postfix
