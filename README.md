# Atlas

Application created based on microfrontend and microservices architecture inside Kubernetes Cluster

## Getting started

To make your computer display working application you must add the application's IP address, along with the domain name, to the Hosts File.

As long as that information is contained in your Hosts File, your browser will redirect the request to display the site on the specified IP address.

1. Add application website URL to your /etc/hosts file

Right after
127.0.0.1 localhost

Add this two lines
127.0.0.1 atlas.dev
127.0.0.1 microservices.dev

2. Inside application root run

```sh
skaffold dev
```

To open micro-frontend application in side web browser open:
 - https://microservices.dev/mf-auth
 - https://microfrontends.dev/mf-tickets
 - https://microservices.dev/mf-orders

To open root application witch contain all micro-frontends you should open
 - https://atlas.dev
