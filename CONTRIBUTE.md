# Deploy to npm

Deploy the code to npm software registry as a library.

[IMPORTANT] Update package.json version, README.md and CHANGELOG.md when uploading a new Release to npm.

```console
$ cd src
$ pnpm build # TODO: to add in future releases
$ npm login
$ npm publish --access=public
```