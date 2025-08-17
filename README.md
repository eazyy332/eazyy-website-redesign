# Asset setup

The images used by the new item selection pages are stored in `images_devlopment/`.

If you cloned the repository without LFS, add the assets locally:

1. Place these files into `images_devlopment/`:
   - eazyy-bag-service-banner-background.png
   - dry-clean-service-banner-background.png
   - wash-and-iron-serivce-banner-background.png
   - repair-service-banner-background.png
   - eazyy-bag-service-icon.png
   - wash-andiron-service.png
   - dry-clean-service-icon.png
   - repair-service-icon.png
   - 32e5a8a6-1220-49e7-aa82-3734440a5043.png
   - d65570c9-c43d-49e8-a750-31de4ade14a5.png
   - 958ab653-5129-45c7-a1a9-0b216c2cac0c.png
   - f000823d-5a30-4ba8-8d76-30dde432ce90.png
   - d5eb7a60-2415-444e-9926-a21b54dfbea1.png
   - a9264dd0-4fa0-43eb-a418-143762649914.png

2. During local dev, Vite is configured to allow this folder (see `vite.config.ts` fs.allow).

If you want these binary assets versioned in GitHub, we should add Git LFS and re-commit them. Ask to enable LFS and I will set it up.
