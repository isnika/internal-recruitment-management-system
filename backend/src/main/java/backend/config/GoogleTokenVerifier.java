package backend.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;

/**
 * GoogleTokenVerifier
 * Dung de xac minh idToken ma frontend gui len sau khi nguoi dung dang nhap Google.
 * Thu vien: google-api-client (them vao pom.xml, xem README)
 */
@Component
public class GoogleTokenVerifier {

    @Value("${google.client-id}")
    private String clientId;

    /**
     * Tra ve GoogleIdToken.Payload neu token hop le, null neu khong hop le.
     */
    public GoogleIdToken.Payload verify(String idToken) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(clientId))
                    .build();

            GoogleIdToken googleIdToken = verifier.verify(idToken);
            if (googleIdToken == null) return null;
            return googleIdToken.getPayload();

        } catch (Exception e) {
            return null;
        }
    }
}
