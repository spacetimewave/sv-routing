# Deploy to npm

Deploy the code to npm software registry as a library.

[IMPORTANT] Update package.json version, README.md and CHANGELOG.md when uploading a new Release to npm.

```console
$ cd src
$ pnpm build # TODO: to add in future releases
$ npm login
$ npm publish --access=public
```

# Semantic versioning strategy

This is the recommended versioning strategy for pre-releases:
```
# Pre-release Development/unstable - breaking changes expected
"version": "0.2.0-alpha.1"
"version": "0.2.0-alpha.2"

# Feature complete, testing phase - bugs expected
"version": "0.2.0-beta.1"
"version": "0.2.0-beta.2"

# Release candidate - ready for production, final testing
"version": "0.2.0-rc.1"
"version": "0.2.0-rc.2"

# Bleeding edge, continuous deployment
"version": "0.2.0-canary.1"
"version": "0.2.0-canary.20241029"
```

## **Common Flow**
```
0.1.1 (current stable)
  ↓
0.2.0-alpha.1  → Early development, APIs may change
0.2.0-alpha.2
  ↓
0.2.0-beta.1   → Feature complete, fixing bugs
0.2.0-beta.2
  ↓
0.2.0-rc.1     → Release candidate, final polish
  ↓
0.2.0          → Stable release
For Your Library, I'd Recommend
Since you're going from 0.1.1 → 0.2.0:

Small changes, quick release: Skip pre-releases, go straight to 0.2.0
Testing with users first:

0.2.0-beta.1 (most common for libraries)
Test, fix bugs
0.2.0 when stable


Major refactor/breaking changes:

0.2.0-alpha.1 for early testing
0.2.0-beta.1 when feature complete
0.2.0 for stable
```


## Publishing Pre-releases

Publish with tag (so users don't get it by default)
```
$ npm publish --tag beta --access=public
$ npm publish --tag alpha --access=public
```

Users install with:
```
$ npm install sv-routing@beta
$ npm install sv-routing@alpha
```

Later, promote to stable

```
$ npm publish --access=public  # becomes 'latest' tag
```
