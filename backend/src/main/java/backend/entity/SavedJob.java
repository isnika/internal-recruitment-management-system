package backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "saved_jobs")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class SavedJob {

    @EmbeddedId
    private SavedJobId id;

    private LocalDateTime savedAt;

    // map user_id
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    // map job_id
    @ManyToOne
    @MapsId("jobId")
    @JoinColumn(name = "job_id")
    private Job job;
}