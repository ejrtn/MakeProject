package deoksu.com.common.websocket;

import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoom {
    private String roomId;
    private Set<WebSocketSession> sessions = new HashSet<>();

    public ChatRoom(String roomId) {
        this.roomId = roomId;
    }
}