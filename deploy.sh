#!/bin/bash

echo " ========= applying ingress ======== "
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml

kubectl rollout status deployment ingress-nginx-controller -n ingress-nginx

helm upgrade --install ecommerce-release .
