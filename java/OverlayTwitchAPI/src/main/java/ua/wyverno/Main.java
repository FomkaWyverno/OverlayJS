package ua.wyverno;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ua.wyverno.twitch.api.http.server.HttpServer;
import ua.wyverno.util.ExceptionToString;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {

    private static final Logger logger = LoggerFactory.getLogger(Main.class);
    
    public static void main(String[] args) {
        try {
            logger.info("Start main class");
            HttpServer httpServer = new HttpServer();
            httpServer.start();
            startUI(args[2]);
        } catch (Exception e) {
            logger.error(ExceptionToString.getString(e));
        }
    }

    private static void startUI(String pathUI) {

        Thread thread = new Thread(() -> {
            try {
                ProcessBuilder processBuilder = new ProcessBuilder();
                processBuilder.directory(new File(pathUI));
                processBuilder.command("npm.cmd","start");

                Process process = processBuilder.start();

                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                String line;

                while ((line = reader.readLine()) != null) {
                    logger.debug(line);
                }
            } catch (IOException e) {
                logger.error(ExceptionToString.getString(e));
            }
        },"Node.js");
        thread.start();
    }
}
