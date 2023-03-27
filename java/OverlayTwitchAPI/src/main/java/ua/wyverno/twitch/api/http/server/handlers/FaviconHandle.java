package ua.wyverno.twitch.api.http.server.handlers;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ua.wyverno.twitch.api.http.server.HttpHandle;

import java.io.IOException;

@HttpHandle(path = "/favicon.ico")
public class FaviconHandle extends AbstractHandler {

    private static final Logger logger = LoggerFactory.getLogger(FaviconHandle.class);
    @Override
    protected void handleHttp(HttpExchange exchange) throws IOException {
        logger.debug("Client want get favicon.ico");
        exchange.sendResponseHeaders(204, -1);
        exchange.close();
        logger.debug("We send to client what we dont have it");
    }
}
