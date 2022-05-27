#!/bin/sh

# installing deno without sudo (necessary for continuation)
curl -fsSL https://deno.land/x/install/install.sh | sh

# adding deno to the environment
export DENO_INSTALL="~/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

# indications
echo "run with :
deno -A \"[URL]\""