package backend.DTO;
import lombok.Data;
import lombok.Builder;
@Data
@Builder
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;
}
