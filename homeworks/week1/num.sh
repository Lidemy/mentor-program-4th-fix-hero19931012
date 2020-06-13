#!/bin/bash

counter=1
while [ $counter -le $1 ]; do
    touch $counter.js
    counter=`expr $counter + 1`
done
