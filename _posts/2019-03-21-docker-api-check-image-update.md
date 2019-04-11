---
layout: post
title: "Docker API - Check if the image has been updated in Docker Registry (DockerHub / Private Registry)"
date: 2019-04-10 18:00:00 +0700
categories: [docker, others]
tags: [docker, api, rest, registry, dtr, docker trusted registry, container, image, docker cli]
---

Easy way to check for base image updates for a running container. Works for DockerHub and Private DTR.

`DTR` host - `http://dockertrustedregistry/`

`dockerd` host - `http://dockerdhost/`

### Gettting the ImageID of running containers


First order of business is to get the Image name / Image ID. For this, send a GET request to the endpoint `http://dockerdhost/containers/json` to get a list of containers in JSON format. We're looking for the keys `Image` and `ImageID`. We'll use these to query the registry API for updates.

### Getting the digest of these Images from the registry


Next, for these `Image`s send a GET to the registy API. The only catch here is the requirement for a certain header, without which we won't get the latest digest. This one:

```
'Accept':'application/vnd.docker.distribution.manifest.v2+json'
```

With this header, send a GET to `http://dockertrustedregistry/v2/<Image_Name>/manifests/latest`

`<Image_Name>` here is just the name of the image WITHOUT the Registry prefix. For instance, if your image is `dockertrustedregistry/someimagename`, just use `someimagename`.

Handy function to do this (not fully tested):

```python
def short_image_name(image_name):
    pos_slash = image_name.find("/")
    pos_colon = image_name.find(":", pos_slash)
    if pos_colon == -1:
        pos_colon = len(image_name) + 1
    return image_name[pos_slash+1:pos_colon]
```

In the JSON response, we're looking for the value of `digest` under `config`. Something like `resp.json()["config"]["digest"]` (If you're not getting this, recheck the header)

Compare this value with the `ImageID`. If they're different, the Image has been updated.

Fin