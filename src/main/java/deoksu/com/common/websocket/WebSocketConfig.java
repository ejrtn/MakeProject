package deoksu.com.common.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;




@RequiredArgsConstructor
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final WebSocketHandler webSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/chat")
                .setAllowedOrigins("http://*:8080", "http://*.*.*.*:8080")  // "*"만 하면
                .withSockJS()
                .setClientLibraryUrl("https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js");


        // https://velog.io/@yyong3519/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-%EC%9B%B9%EC%86%8C%EC%BC%932 참고
        //.setClientLibarayUrl은 그냥 sockjs CDN 주소를 입력해도 무관하다.
        //https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.2/sockjs.js

    /*
        Spring Boot에서 CORS 설정 시, .allowCredentials(true)와 .allowedOrigins("*")는 동시 설정을 못하도록 업데이트 되었다고 한다.
        모든 주소를 허용하는 대신 특정 패턴만 허용하는 것으로 적용해야한다고 변동되었다.

        .allowedOrigins("*") 대신 .allowedOriginPatterns("*")를 사용하면 에러는 해결이 된다고 한다.

        나는 이처럼 하지 않고, http://localhost:8080 또는, IP 주소로 접속하기 때문에 위에 설정처럼 하였다.
    */
    }
}