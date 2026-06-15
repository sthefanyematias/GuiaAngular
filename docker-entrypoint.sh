
#!/bin/sh
json-server --watch /data/farmacia.json --port 3000 --host 127.0.0.1 &
nginx -g "daemon off;"
