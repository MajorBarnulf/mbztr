# Barnulfizator

Makes things more Barnulf.

## Description

This is a set of custom scripts helping me to quickly setup a familiar environment on new machines.

## Usage

### Manually

Scripts uses the [Deno](https://deno.land) runtime to run, it can be installed without sudo using this script:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

The `complete.ts` script installs each parts.

```sh
deno run -A "https://raw.githubusercontent.com/MajorBarnulf/mbztr/main/complete.ts"
```

### With the prelude

```sh
curl -fsSL "https://raw.githubusercontent.com/MajorBarnulf/mbztr/main/prelude.sh" | sh
```
