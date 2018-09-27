import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map.update({
	'.js':	'application/javascript',
    });

httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()
